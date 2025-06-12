-- 创建数据库
CREATE DATABASE user_management;
GO

USE user_management;
GO

-- 创建用户表
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    phone NVARCHAR(20),
    avatar NVARCHAR(500),
    role NVARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'moderator', 'user')),
    status NVARCHAR(20) DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
    department NVARCHAR(100),
    position NVARCHAR(100),
    join_date DATE,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    location NVARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0.0,
    projects INT DEFAULT 0,
    tasks INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- 插入测试数据
INSERT INTO users (name, email, phone, avatar, role, status, department, position, join_date, last_login, login_count, location, rating, projects, tasks) VALUES
(N'林红', 'linhong@example.com', '138-0013-8000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=linhong', 'admin', 'active', N'技术部', N'高级工程师', '2023-01-15', '2024-06-09 14:30:00', 245, N'北京', 4.8, 12, 89),
(N'张广', 'zhangguang@example.com', '139-0013-9000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangguang', 'user', 'active', N'产品部', N'产品经理', '2023-03-20', '2024-06-09 16:45:00', 189, N'上海', 4.6, 8, 67),
(N'全丹', 'quandan@example.com', '136-0013-6000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=quandan', 'user', 'inactive', N'设计部', N'UI设计师', '2023-05-10', '2024-06-05 09:20:00', 156, N'深圳', 4.9, 15, 134),
(N'王兵', 'wangbing@example.com', '137-0013-7000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangbing', 'moderator', 'pending', N'运营部', N'运营专员', '2023-08-01', '2024-06-09 11:15:00', 98, N'广州', 4.3, 6, 45),
(N'赵人', 'zhaoren@example.com', '135-0013-5000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoren', 'user', 'active', N'销售部', N'销售代表', '2024-01-15', '2024-06-08 17:30:00', 34, N'杭州', 4.1, 3, 23);
GO





-- 客户表
CREATE TABLE customers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    phone NVARCHAR(20),
    avatar NVARCHAR(500),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- 商品表
CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image NVARCHAR(500),
    stock INT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- 订单主表
CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_number NVARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status NVARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    payment_status NVARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    shipping_status NVARCHAR(20) DEFAULT 'pending' CHECK (shipping_status IN ('pending', 'preparing', 'shipped', 'delivered', 'cancelled')),
    payment_method NVARCHAR(20) DEFAULT 'credit_card' CHECK (payment_method IN ('credit_card', 'alipay', 'wechat_pay', 'bank_transfer')),
    shipping_address NVARCHAR(MAX),
    discount DECIMAL(10,2) DEFAULT 0,
    shipping_fee DECIMAL(10,2) DEFAULT 0,
    notes NVARCHAR(MAX),
    priority NVARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    expected_delivery DATE,
    order_date DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 订单商品详情表
CREATE TABLE order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name NVARCHAR(200) NOT NULL,
    product_image NVARCHAR(500),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 插入测试数据
INSERT INTO customers (name, email, phone, avatar) VALUES
(N'张三', 'zhangsan@example.com', '138-0013-8000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan'),
(N'李四', 'lisi@example.com', '139-0013-9000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi'),
(N'王五', 'wangwu@example.com', '136-0013-6000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu'),
(N'赵六', 'zhaoliu@example.com', '137-0013-7000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu'),
(N'孙七', 'sunqi@example.com', '135-0013-5000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunqi');

INSERT INTO products (name, price, image) VALUES
(N'iPhone 15 Pro', 7999.00, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop'),
(N'AirPods Pro', 1999.00, 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop'),
(N'MacBook Pro 14"', 15999.00, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop'),
(N'iPad Air', 4599.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop'),
(N'Apple Pencil', 899.00, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop'),
(N'Apple Watch Series 9', 2999.00, 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop'),
(N'AirPods Max', 4399.00, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop');

INSERT INTO orders (order_number, customer_id, total_amount, status, payment_status, shipping_status, payment_method, shipping_address, discount, shipping_fee, notes, priority, expected_delivery) VALUES
('ORD-2024-001', 1, 11997.00, 'pending', 'paid', 'preparing', 'credit_card', N'北京市朝阳区建国路88号', 200.00, 0.00, N'请在工作日送达', 'high', '2024-06-12'),
('ORD-2024-002', 2, 15999.00, 'processing', 'paid', 'shipped', 'alipay', N'上海市浦东新区陆家嘴环路1000号', 0.00, 15.00, N'', 'medium', '2024-06-11'),
('ORD-2024-003', 3, 5498.00, 'completed', 'paid', 'delivered', 'wechat_pay', N'深圳市南山区科技园南区', 100.00, 0.00, N'已送达并签收', 'low', '2024-06-08'),
('ORD-2024-004', 4, 2999.00, 'cancelled', 'refunded', 'cancelled', 'credit_card', N'广州市天河区珠江新城', 0.00, 10.00, N'客户取消订单', 'low', NULL),
('ORD-2024-005', 5, 4399.00, 'pending', 'pending', 'pending', 'bank_transfer', N'杭州市西湖区文三路', 0.00, 0.00, N'等待付款', 'medium', '2024-06-13');

INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price) VALUES
(1, 1, N'iPhone 15 Pro', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', 1, 7999.00),
(1, 2, N'AirPods Pro', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop', 2, 1999.00),
(2, 3, N'MacBook Pro 14"', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop', 1, 15999.00),
(3, 4, N'iPad Air', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', 1, 4599.00),
(3, 5, N'Apple Pencil', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop', 1, 899.00),
(4, 6, N'Apple Watch Series 9', 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop', 1, 2999.00),
(5, 7, N'AirPods Max', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop', 1, 4399.00);
