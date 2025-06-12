import React, { useState, useEffect } from 'react'
import { 
  Monitor, BarChart3, UserCheck, Package, Wallet, Cog,
  Menu, X, Bell, Search, Settings, Download,
  Database, Shield, Layers, RefreshCw, Filter, Calendar,
  Cpu, HardDrive, Wifi, Server, Activity, CheckCircle,
  Signal, Globe, Eye, Users, Target, Clock, Smartphone, Heart
} from 'lucide-react'
import { Link, useLocation, Outlet } from 'react-router-dom'

// 导航配置
const navigation = [
  { name: '首页大屏', href: '/', icon: Monitor, active: true, badge: null, description: 'Overview' },
  { name: '数据分析', href: '/analytics', icon: BarChart3, active: false, badge: null, description: 'Analytics' },
  { name: '用户管理', href: '/users', icon: UserCheck, active: false, badge: '1.2K', description: 'Users' },
  { name: '订单中心', href: '/orders', icon: Package, active: false, badge: '23', description: 'Orders' },
  { name: '财务报表', href: '/finance', icon: Wallet, active: false, badge: null, description: 'Finance' },
  { name: '系统设置', href: '/settings', icon: Cog, active: false, badge: null, description: 'Settings' },
]

const systemMetrics = [
  { name: 'CPU使用率', value: '23%', status: 'normal', icon: Cpu, color: 'text-blue-600' },
  { name: '内存占用', value: '67%', status: 'warning', icon: HardDrive, color: 'text-orange-600' },
  { name: '网络延迟', value: '12ms', status: 'normal', icon: Wifi, color: 'text-green-600' },
  { name: '数据库', value: '正常', status: 'normal', icon: Database, color: 'text-emerald-600' },
]

const quickMetrics = [
  { title: '页面浏览', value: '45.2K', icon: Eye, color: 'bg-blue-500', description: '+12% 今日' },
  { title: '新用户', value: '1,234', icon: Users, color: 'bg-green-500', description: '+8% 今日' },
  { title: '转化率', value: '3.24%', icon: Target, color: 'bg-purple-500', description: '+2% 今日' },
  { title: '会话时长', value: '4:32', icon: Clock, color: 'bg-orange-500', description: '+15s 今日' },
  { title: '移动端', value: '67%', icon: Smartphone, color: 'bg-indigo-500', description: '主要流量' },
  { title: '满意度', value: '4.8★', icon: Heart, color: 'bg-pink-500', description: '用户评分' },
]

interface LayoutProps {
  children?: React.ReactNode // 注意：Outlet 结构下 children 可选
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [notifications] = useState(3)
  const location = useLocation()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // 获取当前页面标题
  const getCurrentPageTitle = () => {
    const currentNav = navigation.find(nav => nav.href === location.pathname)
    return currentNav?.name || '仪表板'
  }

  // 更新导航项的活跃状态
  const updatedNavigation = navigation.map(item => ({
    ...item,
    active: location.pathname === item.href
  }))

  const SystemMetricCard = ({ name, value, status, icon: Icon, color }: {
    name: string
    value: string
    status: string
    icon: any
    color: string
  }) => (
    <div className="bg-white/80 backdrop-blur-lg p-5 rounded-xl border border-white/40 hover:shadow-sm transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${color}`} />
          <div>
            <p className="text-sm font-semibold text-gray-700">{name}</p>
            <p className="text-lg font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          status === 'normal' ? 'bg-green-500' : 
          status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        } animate-pulse`}></div>
      </div>
    </div>
  )

  // 模拟通知点击处理
  const handleNotificationClick = () => {
    console.log('查看通知')
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex overflow-hidden">
      {/* 侧边栏遮罩 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <div className={`fixed lg:relative left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-2xl shadow-lg transform transition-all duration-500 z-50 flex flex-col border-r border-gray-200/50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* 侧边栏头部 */}
        <div className="p-8 border-b border-gray-200/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900">DataHub</h2>
              
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* 侧边栏导航 */}
        <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
          {updatedNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                item.active 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.active && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
              )}
              <div className="flex items-center space-x-4 relative z-10">
                <item.icon className={`w-6 h-6 ${item.active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                <div>
                  <span className="font-bold">{item.name}</span>
                  <p className={`text-xs ${item.active ? 'text-blue-100' : 'text-gray-400'}`}>{item.description}</p>
                </div>
              </div>
              {item.badge && (
                <span className={`px-3 py-1 text-xs font-bold rounded-full relative z-10 ${
                  item.active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* 快速指标 */}
        <div className="p-6 border-t border-gray-200/50 flex-shrink-0">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">快速指标</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickMetrics.slice(0, 4).map((metric, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-lg p-4 rounded-xl border border-white/40 hover:bg-white/90 hover:shadow-sm transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${metric.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <metric.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide truncate">{metric.title}</p>
                      <p className="text-lg font-black text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 系统状态 */}
        <div className="p-6 border-t border-gray-200/50 flex-shrink-0">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">系统状态</h3>
            <div className="grid grid-cols-2 gap-3">
              {systemMetrics.map((metric, index) => (
                <SystemMetricCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </div>

{/* 侧边栏底部 - 缩小版 */}
<div className="p-3 border-t border-gray-200/50 flex-shrink-0">
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
    <div className="flex items-center space-x-2">
      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
        <Shield className="w-3 h-3 text-white" />
      </div>
      <div>
        <p className="text-xs font-bold text-blue-900">企业版</p>
        <p className="text-[10px] text-blue-600 font-semibold">v3.2.1 • 已授权</p>
      </div>
    </div>
  </div>
</div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <header className="bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 flex-shrink-0 z-30 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">{getCurrentPageTitle()}</h1>
                  <p className="text-sm text-gray-600 mt-2 font-semibold">实时业务监控与智能分析平台 • {currentTime.toLocaleString('zh-CN')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* 快速操作 */}
                <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-2">
                  <button className="p-3 hover:bg-white rounded-lg transition-all duration-200 shadow-sm" title="刷新数据">
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 hover:bg-white rounded-lg transition-all duration-200 shadow-sm" title="筛选">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 hover:bg-white rounded-lg transition-all duration-200 shadow-sm" title="日历">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* 时间选择器 */}
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  <option value="1d">今天</option>
                  <option value="7d">最近7天</option>
                  <option value="30d">最近30天</option>
                  <option value="90d">最近90天</option>
                </select>

                {/* 搜索 */}
                <div className="relative hidden md:block">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="搜索数据、报表..."
                    className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96 shadow-sm font-medium"
                  />
                </div>

                {/* 通知 */}
                <div className="relative">
                  <button 
                    onClick={handleNotificationClick}
                    className="p-3 hover:bg-gray-100 rounded-xl relative transition-colors"
                  >
                    <Bell className="w-6 h-6 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* 导出按钮 */}
                <button className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
                  <Download className="w-5 h-5 mr-3" />
                  <span className="hidden sm:inline">导出报告</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 主内容区域 - 可滚动 */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* 这里是嵌套路由内容渲染点 */}
          <Outlet />
        </main>

        {/* 底部状态栏 */}
        <footer className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t border-blue-100/50 backdrop-blur-xl shadow-sm flex-shrink-0">
          <div className="px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 rounded-xl border border-white/60 shadow-sm">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-indigo-800 text-sm">系统状态: 正常运行</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 rounded-xl border border-white/60 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-800 text-sm">数据同步: 已完成</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/80 rounded-xl border border-white/60 shadow-sm">
                  <Signal className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800 text-sm">API状态: 健康</span>
                </div>
              </div>
              <div className="text-left md:text-right text-sm text-gray-600 space-y-1">
                <p className="font-bold">最后更新: {currentTime.toLocaleString('zh-CN')}</p>
                <p className="text-xs text-gray-500">© 2025 DataHub Enterprise. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout