import React, { useState, useEffect } from 'react'
import { 
  ShoppingCart, Search, Filter, Plus, MoreHorizontal, Edit, Trash2, 
  Mail, Phone, MapPin, Calendar, Package, Truck, CreditCard,
  Download, Upload, RefreshCw, Eye, Settings, Star,
  ChevronLeft, ChevronRight, ChevronDown, X, Check,
  Building, Globe, Clock, Activity, AlertCircle, DollarSign,
  User, FileText, ShoppingBag, TrendingUp, TrendingDown,
  CheckCircle, XCircle, AlertTriangle, Pause, Play,
  Receipt, Banknote, Wallet, PieChart, BarChart3, Save,
  Minus, UserPlus, ImageIcon
} from 'lucide-react'

// 订单接口定义
interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string
}

interface Customer {
  name: string
  email: string
  phone: string
  avatar: string
}

interface Order {
  id: string
  orderNumber: string
  customer: Customer
  items: OrderItem[]
  totalAmount: number
  status: string
  paymentStatus: string
  shippingStatus: string
  orderDate: string
  expectedDelivery: string
  shippingAddress: string
  paymentMethod: string
  discount: number
  shippingFee: number
  notes: string
  priority: string
}

interface OrderStats {
  total: number
  pending: number
  completed: number
  total_revenue: number
  today_orders: number
}

// 表单数据接口
interface OrderFormData {
  customer: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  discount: number
  shippingFee: number
  notes: string
  priority: string
  status: string
  paymentStatus: string
  shippingStatus: string
  expectedDelivery: string
}

// 产品接口
interface Product {
  id: string
  name: string
  price: number
  image: string
  stock: number
}

// API 配置
const API_BASE_URL = 'http://localhost:3001/api'

// API 调用函数
const orderAPI = {
  // 获取订单列表
  getOrders: async (params: {
    page?: number
    limit?: number
    search?: string
    status?: string
    paymentStatus?: string
    shippingStatus?: string
    priority?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString())
      }
    })
    
    const response = await fetch(`${API_BASE_URL}/orders?${queryParams}`)
    if (!response.ok) {
      throw new Error('获取订单列表失败')
    }
    return response.json()
  },

  // 获取订单统计
  getOrderStats: async (): Promise<OrderStats> => {
    const response = await fetch(`${API_BASE_URL}/orders/stats`)
    if (!response.ok) {
      throw new Error('获取订单统计失败')
    }
    return response.json()
  },

  // 获取单个订单详情
  getOrder: async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`)
    if (!response.ok) {
      throw new Error('获取订单详情失败')
    }
    return response.json()
  },

  // 创建订单
  createOrder: async (orderData: Partial<OrderFormData>) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    if (!response.ok) {
      throw new Error('创建订单失败')
    }
    return response.json()
  },

  // 更新订单
  updateOrder: async (id: string, orderData: Partial<OrderFormData>) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    if (!response.ok) {
      throw new Error('更新订单失败')
    }
    return response.json()
  },

  // 更新订单状态
  updateOrderStatus: async (id: string, statusData: {
    status?: string
    paymentStatus?: string
    shippingStatus?: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    })
    if (!response.ok) {
      throw new Error('更新订单状态失败')
    }
    return response.json()
  },

  // 获取产品列表
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('获取产品列表失败')
    }
    return response.json()
  },

  // 批量操作
  batchOperation: async (action: string, orderIds: string[]) => {
    const response = await fetch(`${API_BASE_URL}/orders/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, orderIds }),
    })
    if (!response.ok) {
      throw new Error('批量操作失败')
    }
    return response.json()
  }
}

const orderStatuses = ['全部', 'pending', 'processing', 'completed', 'cancelled']
const paymentStatuses = ['全部', 'pending', 'paid', 'refunded', 'failed']
const shippingStatuses = ['全部', 'pending', 'preparing', 'shipped', 'delivered', 'cancelled']
const priorities = ['全部', 'high', 'medium', 'low']
const paymentMethods = ['credit_card', 'alipay', 'wechat_pay', 'bank_transfer']

function OrderManagement() {
  // 状态管理
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    completed: 0,
    total_revenue: 0,
    today_orders: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('全部')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('全部')
  const [selectedShippingStatus, setSelectedShippingStatus] = useState('全部')
  const [selectedPriority, setSelectedPriority] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('order_date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 订单表单相关状态
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [showProductSelector, setShowProductSelector] = useState(false)

  // 表单数据
  const [formData, setFormData] = useState<OrderFormData>({
    customer: {
      name: '',
      email: '',
      phone: '',
      avatar: ''
    },
    items: [],
    shippingAddress: '',
    paymentMethod: 'credit_card',
    discount: 0,
    shippingFee: 0,
    notes: '',
    priority: 'medium',
    status: 'pending',
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    expectedDelivery: ''
  })

  // 加载订单数据
  const loadOrders = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = {
        page: currentPage,
        limit: ordersPerPage,
        search: searchTerm,
        status: selectedStatus === '全部' ? '' : selectedStatus,
        paymentStatus: selectedPaymentStatus === '全部' ? '' : selectedPaymentStatus,
        shippingStatus: selectedShippingStatus === '全部' ? '' : selectedShippingStatus,
        priority: selectedPriority === '全部' ? '' : selectedPriority,
        sortBy,
        sortOrder
      }

      const response = await orderAPI.getOrders(params)
      setOrders(response.orders || [])
      setTotalPages(response.totalPages || 0)
      setTotalOrders(response.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载订单失败')
      console.error('加载订单失败:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // 加载统计数据
  const loadStats = async () => {
    try {
      const statsData = await orderAPI.getOrderStats()
      setStats(statsData)
    } catch (err) {
      console.error('加载统计数据失败:', err)
    }
  }

  // 加载产品数据
  const loadProducts = async () => {
    try {
      const productsData = await orderAPI.getProducts()
      setProducts(productsData)
    } catch (err) {
      console.error('加载产品数据失败:', err)
    }
  }

  // 初始加载和依赖更新
  useEffect(() => {
    loadOrders()
  }, [currentPage, searchTerm, selectedStatus, selectedPaymentStatus, selectedShippingStatus, selectedPriority, sortBy, sortOrder])

  useEffect(() => {
    loadStats()
    loadProducts()
  }, [])

  // 重置到第一页当筛选条件改变时
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [searchTerm, selectedStatus, selectedPaymentStatus, selectedShippingStatus, selectedPriority])

  // 重置表单
  const resetForm = () => {
    setFormData({
      customer: {
        name: '',
        email: '',
        phone: '',
        avatar: ''
      },
      items: [],
      shippingAddress: '',
      paymentMethod: 'credit_card',
      discount: 0,
      shippingFee: 0,
      notes: '',
      priority: 'medium',
      status: 'pending',
      paymentStatus: 'pending',
      shippingStatus: 'pending',
      expectedDelivery: ''
    })
    setIsEditMode(false)
    setEditingOrderId(null)
  }

  // 处理创建订单
  const handleCreateOrder = () => {
    resetForm()
    setShowOrderForm(true)
  }

  // 处理编辑订单
  const handleEditOrder = async (order: Order) => {
    setIsEditMode(true)
    setEditingOrderId(order.id)
    setFormData({
      customer: order.customer,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      discount: order.discount,
      shippingFee: order.shippingFee,
      notes: order.notes,
      priority: order.priority,
      status: order.status,
      paymentStatus: order.paymentStatus,
      shippingStatus: order.shippingStatus,
      expectedDelivery: order.expectedDelivery
    })
    setShowOrderForm(true)
  }

  // 处理表单提交
  const handleSubmitOrder = async () => {
    setIsLoading(true)
    try {
      // 计算总金额
      const itemsTotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const totalAmount = itemsTotal - formData.discount + formData.shippingFee

      const orderData = {
        ...formData,
        totalAmount,
        customer: {
          ...formData.customer,
          avatar: formData.customer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.customer.name)}`
        }
      }

      if (isEditMode && editingOrderId) {
        await orderAPI.updateOrder(editingOrderId, orderData)
        alert('订单更新成功')
      } else {
        await orderAPI.createOrder(orderData)
        alert('订单创建成功')
      }

      setShowOrderForm(false)
      resetForm()
      await loadOrders()
      await loadStats()
    } catch (err) {
      alert(err instanceof Error ? err.message : '操作失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 添加商品到订单
  const handleAddProduct = (product: Product) => {
    const existingItem = formData.items.find(item => item.name === product.name)
    if (existingItem) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, {
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }]
      }))
    }
    setShowProductSelector(false)
  }

  // 更新商品数量
  const handleUpdateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, quantity } : item
        )
      }))
    }
  }

  // 移除商品
  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  // 计算总金额
  const calculateTotal = () => {
    const itemsTotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    return itemsTotal - formData.discount + formData.shippingFee
  }

  // 状态样式映射
  const getOrderStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      case 'processing':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getPaymentStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      case 'refunded':
        return 'bg-purple-100 text-purple-700 border border-purple-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getShippingStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700 border border-gray-200'
      case 'preparing':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border border-red-200'
      case 'medium':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      case 'low':
        return 'bg-green-100 text-green-700 border border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getStatusText = (status: string, type: string) => {
    if (type === 'order') {
      switch (status) {
        case 'pending': return '待处理'
        case 'processing': return '处理中'
        case 'completed': return '已完成'
        case 'cancelled': return '已取消'
        default: return status
      }
    } else if (type === 'payment') {
      switch (status) {
        case 'pending': return '待付款'
        case 'paid': return '已付款'
        case 'refunded': return '已退款'
        case 'failed': return '付款失败'
        default: return status
      }
    } else if (type === 'shipping') {
      switch (status) {
        case 'pending': return '待发货'
        case 'preparing': return '备货中'
        case 'shipped': return '已发货'
        case 'delivered': return '已送达'
        case 'cancelled': return '已取消'
        default: return status
      }
    } else if (type === 'priority') {
      switch (status) {
        case 'high': return '高优先级'
        case 'medium': return '中优先级'
        case 'low': return '低优先级'
        default: return status
      }
    }
    return status
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card': return '信用卡'
      case 'alipay': return '支付宝'
      case 'wechat_pay': return '微信支付'
      case 'bank_transfer': return '银行转账'
      default: return method
    }
  }

  // 处理订单选择
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order.id))
    }
  }

  // 批量操作
  const handleBulkAction = async (action: string) => {
    if (selectedOrders.length === 0) {
      alert('请选择要操作的订单')
      return
    }

    setIsLoading(true)
    try {
      await orderAPI.batchOperation(action, selectedOrders)
      setSelectedOrders([])
      await loadOrders() // 重新加载数据
      await loadStats() // 重新加载统计数据
      alert('批量操作成功')
    } catch (err) {
      alert(err instanceof Error ? err.message : '批量操作失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 订单操作
  const handleOrderAction = async (action: string, order: Order) => {
    if (action === 'view') {
      setSelectedOrder(order)
      setShowOrderModal(true)
    } else if (action === 'edit') {
      handleEditOrder(order)
    } else if (action === 'print') {
      // 打印订单逻辑
      console.log('打印订单:', order.orderNumber)
    }
  }

  // 更新订单状态
  const handleUpdateOrderStatus = async (orderId: string, statusData: any) => {
    setIsLoading(true)
    try {
      await orderAPI.updateOrderStatus(orderId, statusData)
      await loadOrders() // 重新加载数据
      await loadStats() // 重新加载统计数据
      alert('订单状态更新成功')
    } catch (err) {
      alert(err instanceof Error ? err.message : '更新订单状态失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 刷新数据
  const handleRefresh = async () => {
    await Promise.all([loadOrders(), loadStats()])
  }

  return (
    <div className="space-y-8">
      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">{error}</span>
          <button 
            onClick={handleRefresh}
            className="ml-auto px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-sm font-medium transition-colors"
          >
            重试
          </button>
        </div>
      )}

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">总订单数</p>
                <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">+{stats.today_orders} 今日新增</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">总收入</p>
                <p className="text-3xl font-black text-gray-900">¥{stats.total_revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">+12% 本月</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">待处理</p>
                <p className="text-3xl font-black text-gray-900">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">需要处理</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">已完成</p>
                <p className="text-3xl font-black text-gray-900">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">本月完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6 flex-1">
              <div className="relative flex-1 max-w-lg">
                <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索订单号、客户姓名或邮箱..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  showFilters 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-5 h-5 mr-3 inline" />
                筛选
              </button>
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-bold disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 mr-3 inline ${isLoading ? 'animate-spin' :
                ''}`} />
                刷新
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleCreateOrder}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
              >
                <Plus className="w-5 h-5 mr-3 inline" />
                创建订单
              </button>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        {showFilters && (
          <div className="border-t border-gray-200/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">订单状态</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>
                      {status === '全部' ? '全部' : getStatusText(status, 'order')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">付款状态</label>
                <select 
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {paymentStatuses.map(status => (
                    <option key={status} value={status}>
                      {status === '全部' ? '全部' : getStatusText(status, 'payment')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">配送状态</label>
                <select 
                  value={selectedShippingStatus}
                  onChange={(e) => setSelectedShippingStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {shippingStatuses.map(status => (
                    <option key={status} value={status}>
                      {status === '全部' ? '全部' : getStatusText(status, 'shipping')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">优先级</label>
                <select 
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === '全部' ? '全部' : getStatusText(priority, 'priority')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">排序</label>
                <select 
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-')
                    setSortBy(field || 'order_date')
                    setSortOrder((order as 'asc' | 'desc') || 'desc')
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  <option value="order_date-desc">下单时间 新-旧</option>
                  <option value="order_date-asc">下单时间 旧-新</option>
                  <option value="total_amount-desc">订单金额 高-低</option>
                  <option value="total_amount-asc">订单金额 低-高</option>
                  <option value="order_number-asc">订单号 A-Z</option>
                  <option value="order_number-desc">订单号 Z-A</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 订单列表 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">订单列表</h3>
            <div className="text-sm text-gray-600 font-semibold">
              显示 {((currentPage - 1) * ordersPerPage) + 1} - {Math.min(currentPage * ordersPerPage, totalOrders)} 条，
              共 {totalOrders} 条记录
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-8 py-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                  />
                </th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">订单信息</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">客户</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">商品</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">金额</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">状态</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-8 py-6">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                    />
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <p className="font-black text-gray-900 text-lg">{order.orderNumber}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getPriorityStyle(order.priority)}`}>
                          {getStatusText(order.priority, 'priority')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{new Date(order.orderDate).toLocaleString('zh-CN')}</span>
                      </div>
                      {order.expectedDelivery && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Truck className="w-4 h-4" />
                          <span className="font-medium">预计送达: {order.expectedDelivery}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={order.customer.avatar} 
                        alt={order.customer.name}
                        className="w-12 h-12 rounded-2xl border-2 border-white shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(order.customer.name)}`
                        }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{order.customer.name}</p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 font-medium">{order.customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 font-medium">{order.customer.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-10 h-10 rounded-xl border border-gray-200 shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-600">数量: {item.quantity} × ¥{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-500 font-medium">+{order.items.length - 2} 更多商品</p>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-gray-900">¥{order.totalAmount.toLocaleString()}</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600 font-medium">{getPaymentMethodText(order.paymentMethod)}</span>
                        </div>
                        {order.discount > 0 && (
                          <p className="text-xs text-green-600 font-bold">优惠: -¥{order.discount}</p>
                        )}
                        {order.shippingFee > 0 && (
                          <p className="text-xs text-gray-600">运费: +¥{order.shippingFee}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getOrderStatusStyle(order.status)}`}>
                        {getStatusText(order.status, 'order')}
                      </span>
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getPaymentStatusStyle(order.paymentStatus)}`}>
                        {getStatusText(order.paymentStatus, 'payment')}
                      </span>
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getShippingStatusStyle(order.shippingStatus)}`}>
                        {getStatusText(order.shippingStatus, 'shipping')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOrderAction('view', order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                        title="查看详情"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOrderAction('edit', order)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                        title="编辑订单"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOrderAction('print', order)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors duration-200"
                        title="打印订单"
                      >
                        <Receipt className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-semibold">
              显示 {((currentPage - 1) * ordersPerPage) + 1} - {Math.min(currentPage * ordersPerPage, totalOrders)} 条，
              共 {totalOrders} 条记录
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNum = currentPage <= 3 ? index + 1 : currentPage - 2 + index
                if (pageNum > totalPages) return null
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-xl font-bold transition-colors duration-200 ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 创建/编辑订单表单 */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-black text-gray-900">
                  {isEditMode ? '编辑订单' : '创建订单'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowOrderForm(false)
                  resetForm()
                }}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* 客户信息 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">客户信息</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">客户姓名 *</label>
                    <input
                      type="text"
                      value={formData.customer.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, name: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入客户姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">邮箱地址 *</label>
                    <input
                      type="email"
                      value={formData.customer.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入邮箱地址"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">联系电话 *</label>
                    <input
                      type="tel"
                      value={formData.customer.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入联系电话"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">头像链接</label>
                    <input
                      type="url"
                      value={formData.customer.avatar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, avatar: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入头像链接（可选）"
                    />
                  </div>
                </div>
              </div>

              {/* 商品信息 */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="font-black text-gray-900 text-lg uppercase tracking-wide">商品信息</h5>
                  <button
                    onClick={() => setShowProductSelector(true)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-200 font-bold"
                  >
                    <Plus className="w-4 h-4 mr-2 inline" />
                    添加商品
                  </button>
                </div>
                
                {formData.items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">暂无商品，请添加商品</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                          <p className="text-sm text-gray-600 font-medium">单价: ¥{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleUpdateItemQuantity(index, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-gray-900 min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateItemQuantity(index, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-blue-600">¥{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 订单设置 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">订单设置</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">配送地址 *</label>
                      <textarea
                        value={formData.shippingAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, shippingAddress: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="请输入配送地址"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">付款方式</label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>
                            {getPaymentMethodText(method)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">优先级</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">低优先级</option>
                        <option value="medium">中优先级</option>
                        <option value="high">高优先级</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">预计送达时间</label>
                      <input
                        type="datetime-local"
                        value={formData.expectedDelivery}
                        onChange={(e) => setFormData(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">金额设置</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">优惠金额</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">运费</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.shippingFee}
                        onChange={(e) => setFormData(prev => ({ ...prev, shippingFee: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-3 pt-4 border-t border-amber-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-700">商品总额:</span>
                        <span className="font-bold text-gray-900">
                          ¥{formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                      {formData.discount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-700">优惠金额:</span>
                          <span className="font-bold text-green-600">-¥{formData.discount.toLocaleString()}</span>
                        </div>
                      )}
                      {formData.shippingFee > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-700">运费:</span>
                          <span className="font-bold text-gray-900">+¥{formData.shippingFee.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-3 border-t border-amber-300">
                        <span className="font-black text-xl text-gray-900">订单总额:</span>
                        <span className="font-black text-2xl text-blue-600">¥{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 状态设置（仅编辑模式） */}
              {isEditMode && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">状态设置</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">订单状态</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">待处理</option>
                        <option value="processing">处理中</option>
                        <option value="completed">已完成</option>
                        <option value="cancelled">已取消</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">付款状态</label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentStatus: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">待付款</option>
                        <option value="paid">已付款</option>
                        <option value="refunded">已退款</option>
                        <option value="failed">付款失败</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">配送状态</label>
                      <select
                        value={formData.shippingStatus}
                        onChange={(e) => setFormData(prev => ({ ...prev, shippingStatus: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">待发货</option>
                        <option value="preparing">备货中</option>
                        <option value="shipped">已发货</option>
                        <option value="delivered">已送达</option>
                        <option value="cancelled">已取消</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 备注信息 */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
                <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">备注信息</h5>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入订单备注（可选）"
                  rows={3}
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200/50">
                <button
                  onClick={() => {
                    setShowOrderForm(false)
                    resetForm()
                  }}
                  className="px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading || formData.items.length === 0 || !formData.customer.name || !formData.customer.email || !formData.customer.phone || !formData.shippingAddress}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5 mr-3 inline" />
                  {isEditMode ? '更新订单' : '创建订单'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 产品选择器 */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <h3 className="text-2xl font-black text-gray-900">选择商品</h3>
              <button
                onClick={() => setShowProductSelector(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">暂无可用商品</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="relative mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-xl border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'
                          }}
                        />
                        {product.stock <= 0 && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">缺货</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-200">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-blue-600">¥{product.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-600 font-medium">库存: {product.stock}</span>
                        </div>
                        <button
                          onClick={() => handleAddProduct(product)}
                          disabled={product.stock <= 0}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 mr-2 inline" />
                          添加到订单
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 订单详情模态框 */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-black text-gray-900">订单详情</h3>
                <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getOrderStatusStyle(selectedOrder.status)}`}>
                  {getStatusText(selectedOrder.status, 'order')}
                </span>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* 订单基本信息 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">订单信息</h5>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">订单号</p>
                        <p className="font-bold text-gray-900 text-lg">{selectedOrder.orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">下单时间</p>
                        <p className="font-bold text-gray-900">{new Date(selectedOrder.orderDate).toLocaleString('zh-CN')}</p>
                      </div>
                    </div>
                    {selectedOrder.expectedDelivery && (
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <Truck className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">预计送达</p>
                          <p className="font-bold text-gray-900">{selectedOrder.expectedDelivery}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">优先级</p>
                        <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${getPriorityStyle(selectedOrder.priority)}`}>
                          {getStatusText(selectedOrder.priority, 'priority')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">客户信息</h5>
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={selectedOrder.customer.avatar} 
                      alt={selectedOrder.customer.name}
                      className="w-16 h-16 rounded-2xl border-2 border-white shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(selectedOrder.customer.name)}`
                      }}
                    />
                    <div>
                      <p className="font-black text-gray-900 text-xl">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-gray-600 font-semibold">客户</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{selectedOrder.customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 商品列表 */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">商品清单</h5>
                <div className="space-y-4">
                  {selectedOrder.items.map((item: OrderItem, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                        <p className="text-sm text-gray-600 font-medium">单价: ¥{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">数量: {item.quantity}</p>
                        <p className="text-lg font-black text-blue-600">¥{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 订单状态和金额 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">订单状态</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-gray-900">订单状态</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getOrderStatusStyle(selectedOrder.status)}`}>
                          {getStatusText(selectedOrder.status, 'order')}
                        </span>
                        <select 
                          value={selectedOrder.status}
                          onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { status: e.target.value })}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">待处理</option>
                          <option value="processing">处理中</option>
                          <option value="completed">已完成</option>
                          <option value="cancelled">已取消</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-gray-900">付款状态</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getPaymentStatusStyle(selectedOrder.paymentStatus)}`}>
                          {getStatusText(selectedOrder.paymentStatus, 'payment')}
                        </span>
                        <select 
                          value={selectedOrder.paymentStatus}
                          onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { paymentStatus: e.target.value })}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">待付款</option>
                          <option value="paid">已付款</option>
                          <option value="refunded">已退款</option>
                          <option value="failed">付款失败</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-purple-600" />
                        <span className="font-bold text-gray-900">配送状态</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getShippingStatusStyle(selectedOrder.shippingStatus)}`}>
                          {getStatusText(selectedOrder.shippingStatus, 'shipping')}
                        </span>
                        <select 
                          value={selectedOrder.shippingStatus}
                          onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { shippingStatus: e.target.value })}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">待发货</option>
                          <option value="preparing">备货中</option>
                          <option value="shipped">已发货</option>
                          <option value="delivered">已送达</option>
                          <option value="cancelled">已取消</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">金额明细</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <span className="font-bold text-gray-900">商品总额</span>
                      <span className="font-black text-gray-900 text-lg">¥{(selectedOrder.totalAmount + selectedOrder.discount - selectedOrder.shippingFee).toLocaleString()}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                        <span className="font-bold text-gray-900">优惠金额</span>
                        <span className="font-black text-green-600 text-lg">-¥{selectedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedOrder.shippingFee > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                        <span className="font-bold text-gray-900">运费</span>
                        <span className="font-black text-gray-900 text-lg">¥{selectedOrder.shippingFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md">
                      <span className="font-black text-xl">订单总额</span>
                      <span className="font-black text-2xl">¥{selectedOrder.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Wallet className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-gray-900">付款方式</span>
                      </div>
                      <span className="font-bold text-gray-900">{getPaymentMethodText(selectedOrder.paymentMethod)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 备注信息 */}
              {selectedOrder.notes && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
                  <h5 className="font-black text-gray-900 mb-4 text-lg uppercase tracking-wide">订单备注</h5>
                  <div className="p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                    <p className="text-gray-900 font-medium">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200/50">
                <button className="px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold">
                  <Receipt className="w-5 h-5 mr-3 inline" />
                  打印订单
                </button>
                <button className="px-8 py-4 text-green-700 bg-green-100 rounded-2xl hover:bg-green-200 transition-colors duration-300 font-bold">
                  <Truck className="w-5 h-5 mr-3 inline" />
                  更新物流
                </button>
                <button 
                  onClick={() => {
                    setShowOrderModal(false)
                    handleEditOrder(selectedOrder)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
                >
                  <Edit className="w-5 h-5 mr-3 inline" />
                  编辑订单
                </button>
              </div>
            </div>

            {/* 订单时间线 */}
            <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 mx-8 mb-8">
              <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">订单时间线</h5>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">

                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">订单创建</p>
                    <p className="text-sm text-gray-600">{new Date(selectedOrder.orderDate).toLocaleString('zh-CN')}</p>
                  </div>
                </div>
                {selectedOrder.paymentStatus === 'paid' && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">付款完成</p>
                      <p className="text-sm text-gray-600">通过{getPaymentMethodText(selectedOrder.paymentMethod)}付款</p>
                    </div>
                  </div>
                )}
                {selectedOrder.shippingStatus !== 'pending' && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">订单{getStatusText(selectedOrder.shippingStatus, 'shipping')}</p>
                      <p className="text-sm text-gray-600">物流状态更新</p>
                    </div>
                  </div>
                )}
                {selectedOrder.status === 'completed' && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">订单完成</p>
                      <p className="text-sm text-gray-600">客户确认收货</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl flex items-center space-x-4 border border-white/40">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
            <span className="text-gray-900 font-bold text-lg">处理中...</span>
          </div>
        </div>
      )}

      {/* 空状态 */}
      {orders.length === 0 && !isLoading && (
        <div className="bg-white/90 backdrop-blur-lg p-16 rounded-3xl text-center border border-white/40 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">未找到订单</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
            {searchTerm || selectedStatus !== '全部' || selectedPaymentStatus !== '全部' || selectedShippingStatus !== '全部'
              ? '没有符合筛选条件的订单，请尝试调整筛选条件'
              : '系统中暂无订单数据，请创建订单'
            }
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedStatus('全部')
                setSelectedPaymentStatus('全部')
                setSelectedShippingStatus('全部')
                setSelectedPriority('全部')
              }}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-3 inline" />
              清除筛选
            </button>
            <button 
              onClick={handleCreateOrder}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
            >
              <Plus className="w-5 h-5 mr-3 inline" />
              创建订单
            </button>
          </div>
        </div>
      )}

      {/* 批量操作提示 */}
      {selectedOrders.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg shadow-2xl border border-white/40 rounded-3xl p-6 flex items-center space-x-6 z-30">
          <span className="text-sm text-gray-700 font-bold">
            已选择 {selectedOrders.length} 个订单
          </span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleBulkAction('process')}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl text-sm hover:bg-blue-200 transition-colors duration-200 font-bold disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2 inline" />
              批量处理
            </button>
            <button 
              onClick={() => handleBulkAction('ship')}
              disabled={isLoading}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-2xl text-sm hover:bg-green-200 transition-colors duration-200 font-bold disabled:opacity-50"
            >
              <Truck className="w-4 h-4 mr-2 inline" />
              批量发货
            </button>
            <button 
              onClick={() => handleBulkAction('export')}
              disabled={isLoading}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-2xl text-sm hover:bg-purple-200 transition-colors duration-200 font-bold disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              导出订单
            </button>
            <button 
              onClick={() => setSelectedOrders([])}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 快捷操作面板 */}
      <div className="fixed right-8 bottom-8 space-y-4">
        <button 
          onClick={handleCreateOrder}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-blue-200"
          title="创建订单"
        >
          <Plus className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl shadow-2xl hover:from-emerald-700 hover:to-green-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-emerald-200"
          title="导入订单"
        >
          <Upload className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-purple-200"
          title="订单统计"
        >
          <BarChart3 className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-3xl shadow-2xl hover:from-amber-700 hover:to-orange-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-amber-200"
          title="打印标签"
        >
          <Receipt className="w-8 h-8" />
        </button>
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-3xl shadow-2xl hover:from-gray-700 hover:to-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-gray-200 disabled:opacity-50"
          title="刷新数据"
        >
          <RefreshCw className={`w-8 h-8 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* 订单状态快速筛选 */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 space-y-4 hidden xl:block">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg p-4 space-y-3">
          <h6 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4">快速筛选</h6>
          {[
            { status: '全部', icon: ShoppingCart, color: 'gray', count: stats.total },
            { status: 'pending', icon: Clock, color: 'amber', count: stats.pending },
            { status: 'processing', icon: Activity, color: 'blue', count: 0 },
            { status: 'completed', icon: CheckCircle, color: 'emerald', count: stats.completed },
            { status: 'cancelled', icon: XCircle, color: 'red', count: 0 }
          ].map(({ status, icon: Icon, color, count }) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedStatus === status
                  ? `bg-${color}-100 text-${color}-700 border border-${color}-200 shadow-sm`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-bold">
                {status === '全部' ? '全部' : getStatusText(status, 'order')}
              </span>
              <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${
                selectedStatus === status
                  ? `bg-${color}-200 text-${color}-800`
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderManagement


