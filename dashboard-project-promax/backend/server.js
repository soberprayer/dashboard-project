const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接配置
const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // 如果使用 Azure，设置为 true
    trustServerCertificate: true
  }
};

// 连接数据库
sql.connect(config).then(() => {
  console.log('✅ 数据库连接成功');
}).catch(err => {
  console.error('❌ 数据库连接失败:', err);
});

// ==================== 用户管理 API ====================

// 获取用户列表
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '', department = '', role = '', status = '', sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    const pool = await sql.connect(config);
    let query = 'SELECT * FROM users WHERE 1=1';
    const request = pool.request();
    
    // 搜索条件
    if (search) {
      query += ' AND (name LIKE @search OR email LIKE @search OR phone LIKE @search)';
      request.input('search', sql.NVarChar, `%${search}%`);
    }
    
    if (department && department !== '全部') {
      query += ' AND department = @department';
      request.input('department', sql.NVarChar, department);
    }
    
    if (role && role !== '全部') {
      query += ' AND role = @role';
      request.input('role', sql.NVarChar, role);
    }
    
    if (status && status !== '全部') {
      query += ' AND status = @status';
      request.input('status', sql.NVarChar, status);
    }
    
    // 排序
    const validSortFields = ['name', 'email', 'department', 'role', 'status', 'join_date', 'last_login', 'rating'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${order}`;
    
    // 分页
    const offset = (page - 1) * limit;
    query += ` OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;
    request.input('offset', sql.Int, offset);
    request.input('limit', sql.Int, parseInt(limit));
    
    const result = await request.query(query);
    
    // 获取总数
    let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
    const countRequest = pool.request();
    
    if (search) {
      countQuery += ' AND (name LIKE @search OR email LIKE @search OR phone LIKE @search)';
      countRequest.input('search', sql.NVarChar, `%${search}%`);
    }
    
    if (department && department !== '全部') {
      countQuery += ' AND department = @department';
      countRequest.input('department', sql.NVarChar, department);
    }
    
    if (role && role !== '全部') {
      countQuery += ' AND role = @role';
      countRequest.input('role', sql.NVarChar, role);
    }
    
    if (status && status !== '全部') {
      countQuery += ' AND status = @status';
      countRequest.input('status', sql.NVarChar, status);
    }
    
    const countResult = await countRequest.query(countQuery);
    
    res.json({
      users: result.recordset,
      total: countResult.recordset[0].total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(countResult.recordset[0].total / limit)
    });
  } catch (err) {
    console.error('查询用户失败:', err);
    res.status(500).json({ error: '查询用户失败' });
  }
});

// 获取用户统计
app.get('/api/users/stats', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin
      FROM users
    `;
    
    const result = await pool.request().query(query);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('查询统计失败:', err);
    res.status(500).json({ error: '查询统计失败' });
  }
});

// 获取单个用户详情
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config);
    
    const query = 'SELECT * FROM users WHERE id = @id';
    const request = pool.request();
    request.input('id', sql.Int, id);
    
    const result = await request.query(query);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('查询用户详情失败:', err);
    res.status(500).json({ error: '查询用户详情失败' });
  }
});

// 创建用户
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone, department, position, role = 'user', status = 'pending' } = req.body;
    
    // 验证必填字段
    if (!name || !email || !phone || !department || !position) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }
    
    const pool = await sql.connect(config);
    
    // 检查邮箱是否已存在
    const checkEmailQuery = 'SELECT COUNT(*) as count FROM users WHERE email = @email';
    const checkRequest = pool.request();
    checkRequest.input('email', sql.NVarChar, email);
    const checkResult = await checkRequest.query(checkEmailQuery);
    
    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ error: '邮箱地址已存在' });
    }
    
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    
    const query = `
      INSERT INTO users (name, email, phone, department, position, role, status, join_date, avatar, location, rating, login_count, projects, tasks, last_login)
      VALUES (@name, @email, @phone, @department, @position, @role, @status, GETDATE(), @avatar, @location, @rating, @login_count, @projects, @tasks, GETDATE());
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    const request = pool.request();
    request.input('name', sql.NVarChar, name);
    request.input('email', sql.NVarChar, email);
    request.input('phone', sql.NVarChar, phone);
    request.input('department', sql.NVarChar, department);
    request.input('position', sql.NVarChar, position);
    request.input('role', sql.NVarChar, role);
    request.input('status', sql.NVarChar, status);
    request.input('avatar', sql.NVarChar, avatar);
    request.input('location', sql.NVarChar, '北京市');
    request.input('rating', sql.Float, 4.5);
    request.input('login_count', sql.Int, 0);
    request.input('projects', sql.Int, 0);
    request.input('tasks', sql.Int, 0);
    
    const result = await request.query(query);
    
    res.status(201).json({ id: result.recordset[0].id, message: '用户创建成功' });
  } catch (err) {
    console.error('创建用户失败:', err);
    res.status(500).json({ error: '创建用户失败' });
  }
});

// 更新用户
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, position, role, status } = req.body;
    
    const pool = await sql.connect(config);
    
    // 检查用户是否存在
    const checkQuery = 'SELECT COUNT(*) as count FROM users WHERE id = @id';
    const checkRequest = pool.request();
    checkRequest.input('id', sql.Int, id);
    const checkResult = await checkRequest.query(checkQuery);
    
    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 如果更新邮箱，检查邮箱是否已被其他用户使用
    if (email) {
      const emailCheckQuery = 'SELECT COUNT(*) as count FROM users WHERE email = @email AND id != @id';
      const emailCheckRequest = pool.request();
      emailCheckRequest.input('email', sql.NVarChar, email);
      emailCheckRequest.input('id', sql.Int, id);
      const emailCheckResult = await emailCheckRequest.query(emailCheckQuery);
      
      if (emailCheckResult.recordset[0].count > 0) {
        return res.status(400).json({ error: '邮箱地址已被其他用户使用' });
      }
    }
    
    // 构建更新查询
    let updateFields = [];
    const request = pool.request();
    request.input('id', sql.Int, id);
    
    if (name) {
      updateFields.push('name = @name');
      request.input('name', sql.NVarChar, name);
    }
    if (email) {
      updateFields.push('email = @email');
      request.input('email', sql.NVarChar, email);
    }
    if (phone) {
      updateFields.push('phone = @phone');
      request.input('phone', sql.NVarChar, phone);
    }
    if (department) {
      updateFields.push('department = @department');
      request.input('department', sql.NVarChar, department);
    }
    if (position) {
      updateFields.push('position = @position');
      request.input('position', sql.NVarChar, position);
    }
    if (role) {
      updateFields.push('role = @role');
      request.input('role', sql.NVarChar, role);
    }
    if (status) {
      updateFields.push('status = @status');
      request.input('status', sql.NVarChar, status);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: '没有要更新的字段' });
    }
    
    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = @id`;
    await request.query(query);
    
    res.json({ message: '用户更新成功' });
  } catch (err) {
    console.error('更新用户失败:', err);
    res.status(500).json({ error: '更新用户失败' });
  }
});

// 删除用户
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config);
    
    // 检查用户是否存在
    const checkQuery = 'SELECT COUNT(*) as count FROM users WHERE id = @id';
    const checkRequest = pool.request();
    checkRequest.input('id', sql.Int, id);
    const checkResult = await checkRequest.query(checkQuery);
    
    if (checkResult.recordset[0].count === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 删除用户
    const deleteQuery = 'DELETE FROM users WHERE id = @id';
    const deleteRequest = pool.request();
    deleteRequest.input('id', sql.Int, id);
    await deleteRequest.query(deleteQuery);
    
    res.json({ message: '用户删除成功' });
  } catch (err) {
    console.error('删除用户失败:', err);
    res.status(500).json({ error: '删除用户失败' });
  }
});

// 用户批量操作
app.post('/api/users/batch', async (req, res) => {
  try {
    const { action, userIds } = req.body;
    
    if (!action || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: '无效的批量操作参数' });
    }
    
    const pool = await sql.connect(config);
    const request = pool.request();
    
    // 构建 IN 子句的参数
    const placeholders = userIds.map((_, index) => `@id${index}`).join(',');
    userIds.forEach((id, index) => {
      request.input(`id${index}`, sql.Int, id);
    });
    
    let query = '';
    let affectedRows = 0;
    
    switch (action) {
      case 'activate':
        query = `UPDATE users SET status = 'active' WHERE id IN (${placeholders})`;
        break;
      case 'deactivate':
        query = `UPDATE users SET status = 'inactive' WHERE id IN (${placeholders})`;
        break;
      case 'delete':
        query = `DELETE FROM users WHERE id IN (${placeholders})`;
        break;
      default:
        return res.status(400).json({ error: '不支持的批量操作' });
    }
    
    const result = await request.query(query);
    affectedRows = result.rowsAffected[0];
    
    res.json({ 
      message: `批量操作成功，影响了 ${affectedRows} 条记录`,
      affectedRows 
    });
  } catch (err) {
    console.error('批量操作失败:', err);
    res.status(500).json({ error: '批量操作失败' });
  }
});

// ==================== 订单管理 API ====================

// 获取订单列表
app.get('/api/orders', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 5, 
      search = '', 
      status = '', 
      paymentStatus = '', 
      shippingStatus = '', 
      priority = '',
      sortBy = 'order_date', 
      sortOrder = 'desc' 
    } = req.query;
    
    let query = `
      SELECT 
        o.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        c.avatar as customer_avatar
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE 1=1
    `;
    
    const request = await sql.connect(config).then(pool => pool.request());
    
    // 搜索条件
    if (search) {
      query += ` AND (o.order_number LIKE @search OR c.name LIKE @search OR c.email LIKE @search OR c.phone LIKE @search)`;
      request.input('search', sql.NVarChar, `%${search}%`);
    }
    
    if (status && status !== '全部') {
      query += ' AND o.status = @status';
      request.input('status', sql.NVarChar, status);
    }
    
    if (paymentStatus && paymentStatus !== '全部') {
      query += ' AND o.payment_status = @paymentStatus';
      request.input('paymentStatus', sql.NVarChar, paymentStatus);
    }
    
    if (shippingStatus && shippingStatus !== '全部') {
      query += ' AND o.shipping_status = @shippingStatus';
      request.input('shippingStatus', sql.NVarChar, shippingStatus);
    }
    
    if (priority && priority !== '全部') {
      query += ' AND o.priority = @priority';
      request.input('priority', sql.NVarChar, priority);
    }
    
    // 排序
    const validSortFields = ['order_number', 'total_amount', 'order_date', 'status'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'order_date';
    const order = sortOrder === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY o.${sortField} ${order}`;
    
    // 分页
    const offset = (page - 1) * limit;
    query += ` OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;
    request.input('offset', sql.Int, offset);
    request.input('limit', sql.Int, parseInt(limit));
    
    const result = await request.query(query);
    const orders = result.recordset;
    
    // 获取每个订单的商品
    if (orders.length > 0) {
      const orderIds = orders.map(order => order.id);
      const pool = await sql.connect(config);
      const itemsRequest = pool.request();
      const itemsQuery = `
        SELECT oi.*, o.id as order_id
        FROM order_items oi
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE oi.order_id IN (${orderIds.map((_, index) => `@id${index}`).join(',')})
      `;
      
      orderIds.forEach((id, index) => {
        itemsRequest.input(`id${index}`, sql.Int, id);
      });
      
      const itemsResult = await itemsRequest.query(itemsQuery);
      const items = itemsResult.recordset;
      
      // 组装数据
      const ordersWithItems = orders.map(order => ({
        id: order.id.toString(),
        orderNumber: order.order_number,
        customer: {
          name: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          avatar: order.customer_avatar
        },
        items: items.filter(item => item.order_id === order.id).map(item => ({
          name: item.product_name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          image: item.product_image
        })),
        totalAmount: parseFloat(order.total_amount),
        status: order.status,
        paymentStatus: order.payment_status,
        shippingStatus: order.shipping_status,
        orderDate: order.order_date,
        expectedDelivery: order.expected_delivery,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
        discount: parseFloat(order.discount),
        shippingFee: parseFloat(order.shipping_fee),
        notes: order.notes,
        priority: order.priority
      }));
      
      // 获取总数
      let countQuery = `
        SELECT COUNT(*) as total 
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
        WHERE 1=1
      `;
      
      const countRequest = pool.request();
      
      if (search) {
        countQuery += ` AND (o.order_number LIKE @search OR c.name LIKE @search OR c.email LIKE @search OR c.phone LIKE @search)`;
        countRequest.input('search', sql.NVarChar, `%${search}%`);
      }
      
      if (status && status !== '全部') {
        countQuery += ' AND o.status = @status';
        countRequest.input('status', sql.NVarChar, status);
      }
      
      if (paymentStatus && paymentStatus !== '全部') {
        countQuery += ' AND o.payment_status = @paymentStatus';
        countRequest.input('paymentStatus', sql.NVarChar, paymentStatus);
      }
      
      if (shippingStatus && shippingStatus !== '全部') {
        countQuery += ' AND o.shipping_status = @shippingStatus';
        countRequest.input('shippingStatus', sql.NVarChar, shippingStatus);
      }
      
      if (priority && priority !== '全部') {
        countQuery += ' AND o.priority = @priority';
        countRequest.input('priority', sql.NVarChar, priority);
      }
      
      const countResult = await countRequest.query(countQuery);
      const total = countResult.recordset[0].total;
      
      res.json({
        orders: ordersWithItems,
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      });
    } else {
      res.json({
        orders: [],
        total: 0,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: 0
      });
    }
  } catch (err) {
    console.error('查询订单失败:', err);
    res.status(500).json({ error: '查询订单失败' });
  }
});

// 获取订单统计
app.get('/api/orders/stats', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN payment_status = 'paid' THEN total_amount ELSE 0 END) as total_revenue,
        SUM(CASE WHEN CAST(order_date AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) as today_orders
      FROM orders
    `;
    
    const result = await pool.request().query(query);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('查询统计失败:', err);
    res.status(500).json({ error: '查询统计失败' });
  }
});

// 获取单个订单详情
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config);
    
    const query = `
      SELECT 
        o.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        c.avatar as customer_avatar
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE o.id = @id
    `;
    
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query(query);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: '订单不存在' });
    }
    
    const order = result.recordset[0];
    
    // 获取订单商品
    const itemsQuery = 'SELECT * FROM order_items WHERE order_id = @id';
    const itemsRequest = pool.request();
    itemsRequest.input('id', sql.Int, id);
    const itemsResult = await itemsRequest.query(itemsQuery);
    
    const orderDetail = {
      id: order.id.toString(),
      orderNumber: order.order_number,
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        avatar: order.customer_avatar
      },
      items: itemsResult.recordset.map(item => ({
        name: item.product_name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        image: item.product_image
      })),
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      paymentStatus: order.payment_status,
      shippingStatus: order.shipping_status,
      orderDate: order.order_date,
      expectedDelivery: order.expected_delivery,
      shippingAddress: order.shipping_address,
      paymentMethod: order.payment_method,
      discount: parseFloat(order.discount),
      shippingFee: parseFloat(order.shipping_fee),
      notes: order.notes,
      priority: order.priority
    };
    
    res.json(orderDetail);
  } catch (err) {
    console.error('查询订单失败:', err);
    res.status(500).json({ error: '查询订单失败' });
  }
});

// 更新订单状态
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, shippingStatus } = req.body;
    
    const pool = await sql.connect(config);
    let query = 'UPDATE orders SET ';
    let updates = [];
    const request = pool.request();
    request.input('id', sql.Int, id);
    
    if (status) {
      updates.push('status = @status');
      request.input('status', sql.NVarChar, status);
    }
    
    if (paymentStatus) {
      updates.push('payment_status = @paymentStatus');
      request.input('paymentStatus', sql.NVarChar, paymentStatus);
    }
    
    if (shippingStatus) {
      updates.push('shipping_status = @shippingStatus');
      request.input('shippingStatus', sql.NVarChar, shippingStatus);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: '没有要更新的状态' });
    }
    
    query += updates.join(', ') + ' WHERE id = @id';
    
    const result = await request.query(query);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: '订单不存在' });
    }
    
    res.json({ message: '订单状态更新成功' });
  } catch (err) {
    console.error('更新订单状态失败:', err);
    res.status(500).json({ error: '更新订单状态失败' });
  }
});

// 订单批量操作
app.post('/api/orders/batch', async (req, res) => {
  try {
    const { action, orderIds } = req.body;
    
    if (!orderIds || orderIds.length === 0) {
      return res.status(400).json({ error: '请选择订单' });
    }
    
    const pool = await sql.connect(config);
    let query = '';
    const request = pool.request();
    
    switch (action) {
      case 'process':
        query = `UPDATE orders SET status = @status WHERE id IN (${orderIds.map((_, index) => `@id${index}`).join(',')})`;
        request.input('status', sql.NVarChar, 'processing');
        break;
      case 'ship':
        query = `UPDATE orders SET shipping_status = @shippingStatus WHERE id IN (${orderIds.map((_, index) => `@id${index}`).join(',')})`;
        request.input('shippingStatus', sql.NVarChar, 'shipped');
        break;
      case 'cancel':
        query = `UPDATE orders SET status = @status, shipping_status = @shippingStatus WHERE id IN (${orderIds.map((_, index) => `@id${index}`).join(',')})`;
        request.input('status', sql.NVarChar, 'cancelled');
        request.input('shippingStatus', sql.NVarChar, 'cancelled');
        break;
      default:
        return res.status(400).json({ error: '无效的操作' });
    }
    
    orderIds.forEach((id, index) => {
      request.input(`id${index}`, sql.Int, parseInt(id));
    });
    
    const result = await request.query(query);
    
    res.json({ message: `批量${action}操作成功`, affectedRows: result.rowsAffected[0] });
  } catch (err) {
    console.error('批量操作失败:', err);
    res.status(500).json({ error: '批量操作失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📊 用户管理 API: http://localhost:${PORT}/api/users`);
  console.log(`📦 订单管理 API: http://localhost:${PORT}/api/orders`);
});
