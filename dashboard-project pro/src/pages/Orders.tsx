import React, { useState, useEffect } from 'react'
import { 
  ShoppingCart, Search, Filter, Plus, MoreHorizontal, Edit, Trash2, 
  Mail, Phone, MapPin, Calendar, Package, Truck, CreditCard,
  Download, Upload, RefreshCw, Eye, Settings, Star,
  ChevronLeft, ChevronRight, ChevronDown, X, Check,
  Building, Globe, Clock, Activity, AlertCircle, DollarSign,
  User, FileText, ShoppingBag, TrendingUp, TrendingDown,
  CheckCircle, XCircle, AlertTriangle, Pause, Play,
  Receipt, Banknote, Wallet, PieChart, BarChart3
} from 'lucide-react'

// 模拟订单数据
const mockOrders = [
  {
    id: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138-0013-8000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan'
    },
    items: [
      { name: 'iPhone 15 Pro', quantity: 1, price: 7999, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop' },
      { name: 'AirPods Pro', quantity: 2, price: 1999, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop' }
    ],
    totalAmount: 11997,
    status: 'pending',
    paymentStatus: 'paid',
    shippingStatus: 'preparing',
    orderDate: '2024-06-09 14:30',
    expectedDelivery: '2024-06-12',
    shippingAddress: '北京市朝阳区建国路88号',
    paymentMethod: 'credit_card',
    discount: 200,
    shippingFee: 0,
    notes: '请在工作日送达',
    priority: 'high'
  },
  {
    id: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: '李四',
      email: 'lisi@example.com',
      phone: '139-0013-9000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi'
    },
    items: [
      { name: 'MacBook Pro 14"', quantity: 1, price: 15999, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop' }
    ],
    totalAmount: 15999,
    status: 'processing',
    paymentStatus: 'paid',
    shippingStatus: 'shipped',
    orderDate: '2024-06-08 10:15',
    expectedDelivery: '2024-06-11',
    shippingAddress: '上海市浦东新区陆家嘴环路1000号',
    paymentMethod: 'alipay',
    discount: 0,
    shippingFee: 15,
    notes: '',
    priority: 'medium'
  },
  {
    id: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: '王五',
      email: 'wangwu@example.com',
      phone: '136-0013-6000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu'
    },
    items: [
      { name: 'iPad Air', quantity: 1, price: 4599, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop' },
      { name: 'Apple Pencil', quantity: 1, price: 899, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop' }
    ],
    totalAmount: 5498,
    status: 'completed',
    paymentStatus: 'paid',
    shippingStatus: 'delivered',
    orderDate: '2024-06-05 16:45',
    expectedDelivery: '2024-06-08',
    shippingAddress: '深圳市南山区科技园南区',
    paymentMethod: 'wechat_pay',
    discount: 100,
    shippingFee: 0,
    notes: '已送达并签收',
    priority: 'low'
  },
  {
    id: 'ORD-2024-004',
    orderNumber: 'ORD-2024-004',
    customer: {
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '137-0013-7000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu'
    },
    items: [
      { name: 'Apple Watch Series 9', quantity: 1, price: 2999, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop' }
    ],
    totalAmount: 2999,
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingStatus: 'cancelled',
    orderDate: '2024-06-07 09:20',
    expectedDelivery: '',
    shippingAddress: '广州市天河区珠江新城',
    paymentMethod: 'credit_card',
    discount: 0,
    shippingFee: 10,
    notes: '客户取消订单',
    priority: 'low'
  },
  {
    id: 'ORD-2024-005',
    orderNumber: 'ORD-2024-005',
    customer: {
      name: '孙七',
      email: 'sunqi@example.com',
      phone: '135-0013-5000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunqi'
    },
    items: [
      { name: 'AirPods Max', quantity: 1, price: 4399, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop' }
    ],
    totalAmount: 4399,
    status: 'pending',
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    orderDate: '2024-06-09 11:30',
    expectedDelivery: '2024-06-13',
    shippingAddress: '杭州市西湖区文三路',
    paymentMethod: 'bank_transfer',
    discount: 0,
    shippingFee: 0,
    notes: '等待付款',
    priority: 'medium'
  }
]

const orderStatuses = ['全部', 'pending', 'processing', 'completed', 'cancelled']
const paymentStatuses = ['全部', 'pending', 'paid', 'refunded', 'failed']
const shippingStatuses = ['全部', 'pending', 'preparing', 'shipped', 'delivered', 'cancelled']
const priorities = ['全部', 'high', 'medium', 'low']

function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('全部')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('全部')
  const [selectedShippingStatus, setSelectedShippingStatus] = useState('全部')
  const [selectedPriority, setSelectedPriority] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('orderDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // 过滤和搜索逻辑
  useEffect(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.phone.includes(searchTerm)
      const matchesStatus = selectedStatus === '全部' || order.status === selectedStatus
      const matchesPayment = selectedPaymentStatus === '全部' || order.paymentStatus === selectedPaymentStatus
      const matchesShipping = selectedShippingStatus === '全部' || order.shippingStatus === selectedShippingStatus
      const matchesPriority = selectedPriority === '全部' || order.priority === selectedPriority

      return matchesSearch && matchesStatus && matchesPayment && matchesShipping && matchesPriority
    })

    // 排序
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]
      
      if (sortBy === 'totalAmount') {
        aValue = a.totalAmount
        bValue = b.totalAmount
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [orders, searchTerm, selectedStatus, selectedPaymentStatus, selectedShippingStatus, selectedPriority, sortBy, sortOrder])

  // 分页逻辑
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

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
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(currentOrders.map(order => order.id))
    }
  }

  // 批量操作
  const handleBulkAction = (action: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(`执行批量操作: ${action}`, selectedOrders)
      setSelectedOrders([])
      setIsLoading(false)
    }, 1000)
  }

  // 订单操作
  const handleOrderAction = (action: string, order: any) => {
    console.log(`对订单 ${order.orderNumber} 执行操作: ${action}`)
    if (action === 'view') {
      setSelectedOrder(order)
      setShowOrderModal(true)
    }
  }

  // 计算统计数据
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.totalAmount, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const todayOrders = orders.filter(o => new Date(o.orderDate).toDateString() === new Date().toDateString()).length

  return (
    <div className="space-y-8">
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
                <p className="text-3xl font-black text-gray-900">{orders.length}</p>
                <p className="text-xs text-gray-500 mt-1">+{todayOrders} 今日新增</p>
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
                <p className="text-3xl font-black text-gray-900">¥{totalRevenue.toLocaleString()}</p>
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
                <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
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
                <p className="text-3xl font-black text-gray-900">{completedOrders}</p>
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
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
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
                    setSortBy(field || 'orderDate')
                    setSortOrder((order as 'asc' | 'desc') || 'desc')
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  <option value="orderDate-desc">下单时间 新-旧</option>
                  <option value="orderDate-asc">下单时间 旧-新</option>
                  <option value="totalAmount-desc">订单金额 高-低</option>
                  <option value="totalAmount-asc">订单金额 低-高</option>
                  <option value="orderNumber-asc">订单号 A-Z</option>
                  <option value="orderNumber-desc">订单号 Z-A</option>
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
              显示 {indexOfFirstOrder + 1} - {Math.min(indexOfLastOrder, filteredOrders.length)} 条，
              共 {filteredOrders.length} 条记录
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
                    checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
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
              {currentOrders.map((order) => (
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
                        <span className="font-medium">{order.orderDate}</span>
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
              显示 {indexOfFirstOrder + 1} - {Math.min(indexOfLastOrder, filteredOrders.length)} 条，
              共 {filteredOrders.length} 条记录
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
                        <p className="font-bold text-gray-900">{selectedOrder.orderDate}</p>
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
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm"
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
                      <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getOrderStatusStyle(selectedOrder.status)}`}>
                        {getStatusText(selectedOrder.status, 'order')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-gray-900">付款状态</span>
                      </div>
                      <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getPaymentStatusStyle(selectedOrder.paymentStatus)}`}>
                        {getStatusText(selectedOrder.paymentStatus, 'payment')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-purple-600" />
                        <span className="font-bold text-gray-900">配送状态</span>
                      </div>
                      <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getShippingStatusStyle(selectedOrder.shippingStatus)}`}>
                        {getStatusText(selectedOrder.shippingStatus, 'shipping')}
                      </span>
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
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
                  <Edit className="w-5 h-5 mr-3 inline" />
                  编辑订单
                </button>
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
      {filteredOrders.length === 0 && !isLoading && (
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
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
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
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl text-sm hover:bg-blue-200 transition-colors duration-200 font-bold"
            >
              <Play className="w-4 h-4 mr-2 inline" />
              批量处理
            </button>
            <button 
              onClick={() => handleBulkAction('ship')}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-2xl text-sm hover:bg-green-200 transition-colors duration-200 font-bold"
            >
              <Truck className="w-4 h-4 mr-2 inline" />
              批量发货
            </button>
            <button 
              onClick={() => handleBulkAction('export')}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-2xl text-sm hover:bg-purple-200 transition-colors duration-200 font-bold"
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
          className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-3xl shadow-2xl hover:from-gray-700 hover:to-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-gray-200"
          title="设置"
        >
          <Settings className="w-8 h-8" />
        </button>
      </div>

      {/* 订单状态快速筛选 */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 space-y-4 hidden xl:block">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg p-4 space-y-3">
          <h6 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4">快速筛选</h6>
          {[
            { status: '全部', icon: ShoppingCart, color: 'gray' },
            { status: 'pending', icon: Clock, color: 'amber' },
            { status: 'processing', icon: Activity, color: 'blue' },
            { status: 'completed', icon: CheckCircle, color: 'emerald' },
            { status: 'cancelled', icon: XCircle, color: 'red' }
          ].map(({ status, icon: Icon, color }) => (
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
                {status === '全部' 
                  ? orders.length 
                  : orders.filter(o => o.status === status).length
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      

      {/* 订单时间线 */}
      {selectedOrder && showOrderModal && (
        <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
          <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">订单时间线</h5>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">订单创建</p>
                <p className="text-sm text-gray-600">{selectedOrder.orderDate}</p>
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
      )}
    </div>
  )
}

export default OrderManagement
              

