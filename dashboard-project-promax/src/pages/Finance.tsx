import React, { useState, useEffect } from 'react'
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, 
  PieChart, BarChart3, LineChart, Calendar, Download, Upload,
  RefreshCw, Filter, Search, Plus, Settings, Eye, FileText,
  ArrowUpRight, ArrowDownRight, Banknote, Receipt, Building,
  Globe, Clock, Activity, AlertCircle, CheckCircle, XCircle,
  ShoppingCart, Users, Package, Truck, Mail, Phone, MapPin,
  ChevronLeft, ChevronRight, ChevronDown, X, MoreHorizontal,
  Calculator, Target, Percent, Hash, Star, Award, Zap,
  BookOpen, Briefcase, Home, Car, Coffee, ShoppingBag
} from 'lucide-react'

// 模拟财务数据
const mockFinanceData = {
  overview: {
    totalRevenue: 2845600,
    totalExpenses: 1234500,
    netProfit: 1611100,
    profitMargin: 56.6,
    monthlyGrowth: 12.5,
    yearlyGrowth: 28.3,
    cashFlow: 892300,
    accountsReceivable: 456700,
    accountsPayable: 234500,
    inventory: 678900
  },
  monthlyData: [
    { month: '1月', revenue: 180000, expenses: 95000, profit: 85000 },
    { month: '2月', revenue: 220000, expenses: 110000, profit: 110000 },
    { month: '3月', revenue: 195000, expenses: 102000, profit: 93000 },
    { month: '4月', revenue: 240000, expenses: 125000, profit: 115000 },
    { month: '5月', revenue: 285000, expenses: 140000, profit: 145000 },
    { month: '6月', revenue: 310000, expenses: 155000, profit: 155000 }
  ],
  categoryData: [
    { name: '产品销售', value: 1680000, percentage: 59, color: 'blue' },
    { name: '服务收入', value: 720000, percentage: 25, color: 'emerald' },
    { name: '授权费用', value: 288000, percentage: 10, color: 'purple' },
    { name: '其他收入', value: 157600, percentage: 6, color: 'amber' }
  ],
  expenseData: [
    { name: '人员成本', value: 540000, percentage: 44, color: 'red' },
    { name: '运营费用', value: 320000, percentage: 26, color: 'orange' },
    { name: '营销费用', value: 185000, percentage: 15, color: 'pink' },
    { name: '技术投入', value: 123000, percentage: 10, color: 'indigo' },
    { name: '其他支出', value: 66500, percentage: 5, color: 'gray' }
  ],
  transactions: [
    {
      id: 'TXN-001',
      date: '2024-06-09',
      type: 'income',
      category: '产品销售',
      description: 'iPhone 15 Pro 销售收入',
      amount: 15999,
      status: 'completed',
      reference: 'ORD-2024-001',
      customer: '张三科技有限公司'
    },
    {
      id: 'TXN-002',
      date: '2024-06-08',
      type: 'expense',
      category: '运营费用',
      description: '办公室租金支付',
      amount: 25000,
      status: 'completed',
      reference: 'RENT-2024-06',
      customer: '物业管理公司'
    },
    {
      id: 'TXN-003',
      date: '2024-06-08',
      type: 'income',
      category: '服务收入',
      description: '技术咨询服务费',
      amount: 8500,
      status: 'pending',
      reference: 'SRV-2024-015',
      customer: '创新科技公司'
    },
    {
      id: 'TXN-004',
      date: '2024-06-07',
      type: 'expense',
      category: '营销费用',
      description: '广告投放费用',
      amount: 12000,
      status: 'completed',
      reference: 'AD-2024-032',
      customer: '广告代理商'
    },
    {
      id: 'TXN-005',
      date: '2024-06-07',
      type: 'income',
      category: '授权费用',
      description: '软件授权费收入',
      amount: 45000,
      status: 'completed',
      reference: 'LIC-2024-008',
      customer: '企业客户A'
    }
  ],
  budgetData: [
    { category: '销售目标', budgeted: 3000000, actual: 2845600, variance: -5.1 },
    { category: '运营支出', budgeted: 1200000, actual: 1234500, variance: 2.9 },
    { category: '营销投入', budgeted: 200000, actual: 185000, variance: -7.5 },
    { category: '研发费用', budgeted: 150000, actual: 123000, variance: -18.0 },
    { category: '人员成本', budgeted: 500000, actual: 540000, variance: 8.0 }
  ],
  kpiData: [
    { name: '客户获取成本', value: 285, unit: '元', trend: 'down', change: -12.5 },
    { name: '客户生命周期价值', value: 8500, unit: '元', trend: 'up', change: 18.2 },
    { name: '平均订单价值', value: 1250, unit: '元', trend: 'up', change: 5.8 },
    { name: '库存周转率', value: 4.2, unit: '次/年', trend: 'up', change: 15.3 },
    { name: '应收账款周转天数', value: 28, unit: '天', trend: 'down', change: -8.1 },
    { name: '毛利率', value: 68.5, unit: '%', trend: 'up', change: 3.2 }
  ]
}

const timeRanges = ['今日', '本周', '本月', '本季度', '本年', '自定义']
const transactionTypes = ['全部', 'income', 'expense']
const transactionStatuses = ['全部', 'completed', 'pending', 'failed']

function FinanceManagement() {
  const [financeData] = useState(mockFinanceData)
  const [selectedTimeRange, setSelectedTimeRange] = useState('本月')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedStatus, setSelectedStatus] = useState('全部')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionsPerPage] = useState(10)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // 过滤交易记录
  const filteredTransactions = financeData.transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '全部' || transaction.type === selectedType
    const matchesStatus = selectedStatus === '全部' || transaction.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  // 分页逻辑
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)

  // 获取类型样式
  const getTypeStyle = (type: string) => {
    return type === 'income' 
      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      : 'bg-red-100 text-red-700 border border-red-200'
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getTypeText = (type: string) => {
    return type === 'income' ? '收入' : '支出'
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'pending': return '待处理'
      case 'failed': return '失败'
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  // 处理交易选择
  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTransactions.length === currentTransactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(currentTransactions.map(transaction => transaction.id))
    }
  }

  // 批量操作
  const handleBulkAction = (action: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(`执行批量操作: ${action}`, selectedTransactions)
      setSelectedTransactions([])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      {/* 标签导航 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm">
        <div className="p-8">
          <div className="flex items-center space-x-8">
            {[
              { id: 'overview', name: '财务概览', icon: PieChart },
              { id: 'transactions', name: '交易记录', icon: Receipt },
              { id: 'budget', name: '预算分析', icon: Target },
              { id: 'kpi', name: '关键指标', icon: BarChart3 }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 财务概览 */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 核心指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">总收入</p>
                    <p className="text-3xl font-black text-gray-900">{formatCurrency(financeData.overview.totalRevenue)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-600">{formatPercentage(financeData.overview.monthlyGrowth)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">总支出</p>
                    <p className="text-3xl font-black text-gray-900">{formatCurrency(financeData.overview.totalExpenses)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-bold text-red-600">-3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">净利润</p>
                    <p className="text-3xl font-black text-gray-900">{formatCurrency(financeData.overview.netProfit)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-blue-600">{formatPercentage(financeData.overview.yearlyGrowth)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Percent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">利润率</p>
                    <p className="text-3xl font-black text-gray-900">{financeData.overview.profitMargin}%</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-bold text-purple-600">+2.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 收入支出图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900">收入构成</h3>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {financeData.categoryData.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full bg-${category.color}-500`}></div>
                        <span className="font-bold text-gray-900">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900">{formatCurrency(category.value)}</p>
                        <p className="text-sm text-gray-600 font-semibold">{category.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900">支出构成</h3>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {financeData.expenseData.map((expense, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full bg-${expense.color}-500`}></div>
                        <span className="font-bold text-gray-900">{expense.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900">{formatCurrency(expense.value)}</p>
                        <p className="text-sm text-gray-600 font-semibold">{expense.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r from-${expense.color}-400 to-${expense.color}-600 h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${expense.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 月度趋势图 */}
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">月度财务趋势</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-bold text-gray-700">收入</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-bold text-gray-700">支出</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-bold text-gray-700">利润</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {financeData.monthlyData.map((data, index) => (
                <div key={index} className="text-center">
                  <div className="space-y-2 mb-4">
                    <div 
                      className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                      style={{ height: `${(data.revenue / 350000) * 200}px`, minHeight: '20px' }}
                    ></div>
                    <div 
                      className="bg-red-500 transition-all duration-500 hover:bg-red-600"
                      style={{ height: `${(data.expenses / 350000) * 200}px`, minHeight: '15px' }}
                    ></div>
                    <div 
                      className="bg-emerald-500 rounded-b-lg transition-all duration-500 hover:bg-emerald-600"
                      style={{ height: `${(data.profit / 350000) * 200}px`, minHeight: '10px' }}
                    ></div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{data.month}</p>
                  <div className="text-xs text-gray-600 space-y-1 mt-2">
                    <p>收入: {formatCurrency(data.revenue)}</p>
                    <p>支出: {formatCurrency(data.expenses)}</p>
                    <p className="font-bold text-emerald-600">利润: {formatCurrency(data.profit)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 财务健康度指标 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-gray-900 uppercase tracking-wide">现金流</h4>
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-blue-600 mb-2">{formatCurrency(financeData.overview.cashFlow)}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600">+15.2%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-gray-900 uppercase tracking-wide">应收账款</h4>
                <Receipt className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600 mb-2">{formatCurrency(financeData.overview.accountsReceivable)}</p>
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">-8.1%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-gray-900 uppercase tracking-wide">应付账款</h4>
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-2xl font-black text-amber-600 mb-2">{formatCurrency(financeData.overview.accountsPayable)}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600">+3.5%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-gray-900 uppercase tracking-wide">库存价值</h4>
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-black text-purple-600 mb-2">{formatCurrency(financeData.overview.inventory)}</p>
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">-2.8%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交易记录 */}
      {activeTab === 'transactions' && (
        <div className="space-y-8">
          {/* 搜索和筛选 */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-6 flex-1">
                  <div className="relative flex-1 max-w-lg">
                    <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索交易记录、客户或参考号..."
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
                  <button className="px-8 py-4 bg-emerald-100 text-emerald-700 rounded-2xl hover:bg-emerald-200 transition-all duration-300 font-bold">
                    <Download className="w-5 h-5 mr-3 inline" />
                    导出报表
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
                    <Plus className="w-5 h-5 mr-3 inline" />
                    添加交易
                  </button>
                </div>
              </div>
            </div>

            {/* 筛选器 */}
            {showFilters && (
              <div className="border-t border-gray-200/50 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">时间范围</label>
                    <select 
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    >
                      {timeRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">交易类型</label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    >
                      {transactionTypes.map(type => (
                        <option key={type} value={type}>
                          {type === '全部' ? '全部' : getTypeText(type)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">状态</label>
                    <select 
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    >
                      {transactionStatuses.map(status => (
                        <option key={status} value={status}>
                          {status === '全部' ? '全部' : getStatusText(status)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">金额范围</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="最小"
                        className="flex-1 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        placeholder="最大"
                        className="flex-1 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 交易记录列表 */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900">交易记录</h3>
                <div className="text-sm text-gray-600 font-semibold">
                  显示 {indexOfFirstTransaction + 1} - {Math.min(indexOfLastTransaction, filteredTransactions.length)} 条，
                  共 {filteredTransactions.length} 条记录
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
                        checked={selectedTransactions.length === currentTransactions.length && currentTransactions.length > 0}
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                      />
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">日期</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">交易信息</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">客户/供应商</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">金额</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">状态</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="px-8 py-6">
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(transaction.id)}
                          onChange={() => handleSelectTransaction(transaction.id)}
                          className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                        />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-gray-100 rounded-xl">
                            <Calendar className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{transaction.date}</p>
                            <p className="text-sm text-gray-600 font-medium">{transaction.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getTypeStyle(transaction.type)}`}>
                              {getTypeText(transaction.type)}
                            </span>
                            <span className="text-sm font-bold text-gray-600">{transaction.category}</span>
                          </div>
                          <p className="font-bold text-gray-900 text-lg">{transaction.description}</p>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 font-medium">{transaction.reference}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-xl">
                            <Building className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{transaction.customer}</p>
                            <p className="text-sm text-gray-600">企业客户</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-right">
                          <p className={`text-2xl font-black ${
                            transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            {transaction.type === 'income' ? '收入' : '支出'}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-2xl ${getStatusStyle(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" title="查看详情">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-200" title="编辑">
                            <FileText className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors duration-200" title="下载凭证">
                            <Download className="w-5 h-5" />
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
                  显示 {indexOfFirstTransaction + 1} - {Math.min(indexOfLastTransaction, filteredTransactions.length)} 条，
                  共 {filteredTransactions.length} 条记录
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
        </div>
      )}

      {/* 预算分析 */}
      {activeTab === 'budget' && (
        <div className="space-y-8">
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">预算 vs 实际对比</h3>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-colors duration-300 font-bold">
                  <Calendar className="w-5 h-5 mr-2 inline" />
                  本年度
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold">
                  <Settings className="w-5 h-5 mr-2 inline" />
                  设置预算
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {financeData.budgetData.map((budget, index) => (
                <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-lg">{budget.category}</h4>
                        <p className="text-sm text-gray-600 font-medium">预算对比分析</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl font-bold ${
                        budget.variance >= 0 
                          ? budget.variance > 10 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {budget.variance >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{formatPercentage(budget.variance)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">预算金额</p>
                      <p className="text-2xl font-black text-blue-600">{formatCurrency(budget.budgeted)}</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">实际金额</p>
                      <p className="text-2xl font-black text-gray-900">{formatCurrency(budget.actual)}</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">差异金额</p>
                      <p className={`text-2xl font-black ${
                        budget.actual - budget.budgeted >= 0 ? 'text-red-600' : 'text-emerald-600'
                      }`}>
                        {budget.actual - budget.budgeted >= 0 ? '+' : ''}{formatCurrency(budget.actual - budget.budgeted)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-gray-700">预算执行进度</span>
                      <span className="text-gray-900">{Math.round((budget.actual / budget.budgeted) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                          (budget.actual / budget.budgeted) > 1 
                            ? 'bg-gradient-to-r from-red-400 to-red-600' 
                            : (budget.actual / budget.budgeted) > 0.8
                            ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                            : 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                        }`}
                        style={{ width: `${Math.min((budget.actual / budget.budgeted) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 关键指标 */}
      {activeTab === 'kpi' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeData.kpiData.map((kpi, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300 ${
                      kpi.trend === 'up' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-6 h-6 text-white" />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{kpi.name}</h4>
                      <p className="text-sm text-gray-600 font-semibold">关键绩效指标</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end space-x-2">
                    <p className="text-4xl font-black text-gray-900">{kpi.value.toLocaleString()}</p>
                    <p className="text-lg font-bold text-gray-600 mb-1">{kpi.unit}</p>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-bold ${
                    kpi.trend === 'up' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{formatPercentage(kpi.change)}</span>
                    <span className="text-sm">vs 上期</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* KPI 趋势图 */}
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">KPI 趋势分析</h3>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-colors duration-300 font-bold">
                  <BarChart3 className="w-5 h-5 mr-2 inline" />
                  柱状图
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold">
                  <LineChart className="w-5 h-5 mr-2 inline" />
                  折线图
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-black text-gray-900 text-lg">财务效率指标</h4>
                {financeData.kpiData.slice(0, 3).map((kpi, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">{kpi.name}</span>
                      <div className={`flex items-center space-x-1 text-sm font-bold ${
                        kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{formatPercentage(kpi.change)}</span>
                      </div>
                    </div>
                    <div className="flex items-end space-x-2 mb-3">
                      <span className="text-2xl font-black text-gray-900">{kpi.value.toLocaleString()}</span>
                      <span className="text-sm font-bold text-gray-600">{kpi.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          kpi.trend === 'up' 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${Math.min(Math.abs(kpi.change) * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <h4 className="font-black text-gray-900 text-lg">运营效率指标</h4>
                {financeData.kpiData.slice(3).map((kpi, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">{kpi.name}</span>
                      <div className={`flex items-center space-x-1 text-sm font-bold ${
                        kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{formatPercentage(kpi.change)}</span>
                      </div>
                    </div>
                    <div className="flex items-end space-x-2 mb-3">
                      <span className="text-2xl font-black text-gray-900">{kpi.value.toLocaleString()}</span>
                      <span className="text-sm font-bold text-gray-600">{kpi.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          kpi.trend === 'up' 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${Math.min(Math.abs(kpi.change) * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 批量操作提示 */}
      {selectedTransactions.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg shadow-2xl border border-white/40 rounded-3xl p-6 flex items-center space-x-6 z-30">
          <span className="text-sm text-gray-700 font-bold">
            已选择 {selectedTransactions.length} 条交易记录
          </span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleBulkAction('export')}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl text-sm hover:bg-blue-200 transition-colors duration-200 font-bold"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              批量导出
            </button>
            <button 
              onClick={() => handleBulkAction('categorize')}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-2xl text-sm hover:bg-purple-200 transition-colors duration-200 font-bold"
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              批量分类
            </button>
            <button 
              onClick={() => handleBulkAction('approve')}
              className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl text-sm hover:bg-emerald-200 transition-colors duration-200 font-bold"
            >
              <CheckCircle className="w-4 h-4 mr-2 inline" />
              批量审批
            </button>
            <button 
              onClick={() => setSelectedTransactions([])}
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
          title="添加交易"
        >
          <Plus className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl shadow-2xl hover:from-emerald-700 hover:to-green-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-emerald-200"
          title="导入数据"
        >
          <Upload className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-purple-200"
          title="财务报表"
        >
          <BarChart3 className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-3xl shadow-2xl hover:from-amber-700 hover:to-orange-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-amber-200"
          title="财务计算器"
        >
          <Calculator className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-3xl shadow-2xl hover:from-gray-700 hover:to-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-gray-200"
          title="设置"
        >
          <Settings className="w-8 h-8" />
        </button>
      </div>

      

      

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
      {activeTab === 'transactions' && filteredTransactions.length === 0 && !isLoading && (
        <div className="bg-white/90 backdrop-blur-lg p-16 rounded-3xl text-center border border-white/40 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Receipt className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">未找到交易记录</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
            {searchTerm || selectedType !== '全部' || selectedStatus !== '全部'
              ? '没有符合筛选条件的交易记录，请尝试调整筛选条件'
              : '系统中暂无交易记录，请添加交易记录'
            }
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedType('全部')
                setSelectedStatus('全部')
              }}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-3 inline" />
              清除筛选
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
              <Plus className="w-5 h-5 mr-3 inline" />
              添加交易
            </button>
          </div>
        </div>
      )}

      {/* 财务报表导出模态框 */}
      <div className="hidden">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <h3 className="text-2xl font-black text-gray-900">导出财务报表</h3>
              <button className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">报表类型</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
                    <option>损益表</option>
                    <option>资产负债表</option>
                    <option>现金流量表</option>
                    <option>财务分析报告</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">导出格式</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
                    <option>Excel (.xlsx)</option>
                    <option>PDF (.pdf)</option>
                    <option>CSV (.csv)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">开始日期</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">结束日期</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">包含数据</label>
                <div className="space-y-3">
                  {['收入明细', '支出明细', '利润分析', '现金流分析', '预算对比', 'KPI指标'].map((item, index) => (
                    <label key={index} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-2 border-gray-300"
                      />
                      <span className="font-medium text-gray-900">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 p-8 border-t border-gray-200/50">
              <button className="px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold">
                取消
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
                <Download className="w-5 h-5 mr-3 inline" />
                导出报表
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceManagement

