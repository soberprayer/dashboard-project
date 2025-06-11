import { useState, useEffect } from 'react'
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar,
  ScatterChart, Scatter, ComposedChart, Bar, LineChart, Line,
  BarChart, ReferenceLine
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, 
  Download, Bell, Search, Settings, Menu, X,
  Eye, Globe, Smartphone, Target, Zap, Clock, Award, ArrowUp, ArrowDown,
  CheckCircle, Home, BarChart3, UserCheck, Package, Wallet, Cog,
  Calendar, Filter, RefreshCw, Star, Heart, MessageSquare, Shield,
  Server, Database, Cpu, HardDrive, Wifi, Signal, Monitor, Layers
} from 'lucide-react'

// 增强的模拟数据
const salesData = [
  { month: '1月', sales: 45000, profit: 28000, orders: 340, growth: 12.5, target: 50000, lastYear: 38000 },
  { month: '2月', sales: 52000, profit: 31000, orders: 380, growth: 15.6, target: 48000, lastYear: 41000 },
  { month: '3月', sales: 48000, profit: 29000, orders: 360, growth: 6.7, target: 52000, lastYear: 45000 },
  { month: '4月', sales: 61000, profit: 38000, orders: 420, growth: 27.1, target: 55000, lastYear: 48000 },
  { month: '5月', sales: 55000, profit: 33000, orders: 390, growth: -9.8, target: 60000, lastYear: 61000 },
  { month: '6月', sales: 67000, profit: 42000, orders: 450, growth: 21.8, target: 58000, lastYear: 55000 },
  { month: '7月', sales: 59000, profit: 36000, orders: 410, growth: -11.9, target: 65000, lastYear: 67000 },
  { month: '8月', sales: 72000, profit: 45000, orders: 480, growth: 22.0, target: 62000, lastYear: 59000 },
]

const deviceData = [
  { name: '移动端', value: 45, color: '#6366F1', users: 12450, sessions: 8900, bounceRate: 32.1 },
  { name: '桌面端', value: 35, color: '#8B5CF6', users: 9680, sessions: 7200, bounceRate: 28.5 },
  { name: '平板端', value: 20, color: '#06B6D4', users: 5540, sessions: 4100, bounceRate: 35.8 },
]

const realtimeData = [
  { time: '00:00', users: 1200, sessions: 890, pageViews: 3400, revenue: 12000, conversion: 2.1 },
  { time: '02:00', users: 950, sessions: 720, pageViews: 2800, revenue: 9500, conversion: 1.8 },
  { time: '04:00', users: 800, sessions: 620, pageViews: 2100, revenue: 7800, conversion: 1.5 },
  { time: '06:00', users: 1100, sessions: 850, pageViews: 3200, revenue: 11200, conversion: 2.0 },
  { time: '08:00', users: 2400, sessions: 1800, pageViews: 6200, revenue: 28000, conversion: 3.2 },
  { time: '10:00', users: 3100, sessions: 2300, pageViews: 8100, revenue: 35000, conversion: 3.8 },
  { time: '12:00', users: 3200, sessions: 2400, pageViews: 8900, revenue: 42000, conversion: 4.1 },
  { time: '14:00', users: 3000, sessions: 2250, pageViews: 8200, revenue: 38000, conversion: 3.9 },
  { time: '16:00', users: 2800, sessions: 2100, pageViews: 7600, revenue: 33000, conversion: 3.5 },
  { time: '18:00', users: 2200, sessions: 1650, pageViews: 6000, revenue: 25000, conversion: 3.0 },
  { time: '20:00', users: 1800, sessions: 1350, pageViews: 4800, revenue: 18000, conversion: 2.5 },
  { time: '22:00', users: 1400, sessions: 1050, pageViews: 3900, revenue: 14000, conversion: 2.2 },
]

const performanceData = [
  { name: '页面加载速度', value: 85, maxValue: 100, fill: '#10B981', description: '平均 2.3s', trend: '+5%' },
  { name: '用户体验评分', value: 92, maxValue: 100, fill: '#6366F1', description: '4.6/5.0', trend: '+2%' },
  { name: 'SEO优化得分', value: 78, maxValue: 100, fill: '#F59E0B', description: '78/100', trend: '+12%' },
  { name: '安全性评级', value: 96, maxValue: 100, fill: '#EF4444', description: 'A+级别', trend: '+1%' },
  { name: '移动端适配', value: 88, maxValue: 100, fill: '#8B5CF6', description: '优秀', trend: '+8%' },
  { name: '内容质量', value: 91, maxValue: 100, fill: '#06B6D4', description: '高质量', trend: '+3%' },
]

const regionData = [
  { region: '北京', sales: 25000, users: 3200, x: 85, y: 92, growth: 15.2, marketShare: 18.5 },
  { region: '上海', sales: 32000, users: 4100, x: 78, y: 88, growth: 22.1, marketShare: 23.7 },
  { region: '广州', sales: 28000, users: 3600, x: 82, y: 85, growth: 8.9, marketShare: 20.7 },
  { region: '深圳', sales: 35000, users: 4500, x: 88, y: 95, growth: 28.3, marketShare: 25.9 },
  { region: '杭州', sales: 22000, users: 2800, x: 75, y: 82, growth: 12.4, marketShare: 16.3 },
  { region: '成都', sales: 18000, users: 2300, x: 72, y: 78, growth: 6.7, marketShare: 13.3 },
  { region: '南京', sales: 19500, users: 2500, x: 76, y: 80, growth: 9.8, marketShare: 14.4 },
  { region: '武汉', sales: 16800, users: 2100, x: 70, y: 75, growth: 5.2, marketShare: 12.4 },
]

const trendData = [
  { month: '1月', revenue: 45000, users: 1200, conversion: 3.2, orders: 340, avgOrderValue: 132 },
  { month: '2月', revenue: 52000, users: 1450, conversion: 3.8, orders: 380, avgOrderValue: 137 },
  { month: '3月', revenue: 48000, users: 1380, conversion: 3.1, orders: 360, avgOrderValue: 133 },
  { month: '4月', revenue: 61000, users: 1680, conversion: 4.2, orders: 420, avgOrderValue: 145 },
  { month: '5月', revenue: 55000, users: 1520, conversion: 3.6, orders: 390, avgOrderValue: 141 },
  { month: '6月', revenue: 67000, users: 1890, conversion: 4.5, orders: 450, avgOrderValue: 149 },
  { month: '7月', revenue: 59000, users: 1650, conversion: 3.9, orders: 410, avgOrderValue: 144 },
  { month: '8月', revenue: 72000, users: 2100, conversion: 4.8, orders: 480, avgOrderValue: 150 },
]

// 新增数据
const categoryData = [
  { category: '电子产品', sales: 45000, profit: 12000, margin: 26.7, orders: 280 },
  { category: '服装配饰', sales: 38000, profit: 15200, margin: 40.0, orders: 420 },
  { category: '家居用品', sales: 32000, profit: 9600, margin: 30.0, orders: 310 },
  { category: '运动户外', sales: 28000, profit: 8400, margin: 30.0, orders: 190 },
  { category: '美妆护肤', sales: 25000, profit: 11250, margin: 45.0, orders: 350 },
  { category: '图书文具', sales: 18000, profit: 5400, margin: 30.0, orders: 240 },
]

const hourlyData = [
  { hour: '0时', orders: 12, revenue: 1800, users: 150 },
  { hour: '1时', orders: 8, revenue: 1200, users: 120 },
  { hour: '2时', orders: 5, revenue: 750, users: 90 },
  { hour: '3时', orders: 3, revenue: 450, users: 60 },
  { hour: '4时', orders: 2, revenue: 300, users: 45 },
  { hour: '5时', orders: 4, revenue: 600, users: 70 },
  { hour: '6时', orders: 8, revenue: 1200, users: 110 },
  { hour: '7时', orders: 15, revenue: 2250, users: 180 },
  { hour: '8时', orders: 25, revenue: 3750, users: 280 },
  { hour: '9时', orders: 35, revenue: 5250, users: 380 },
  { hour: '10时', orders: 45, revenue: 6750, users: 450 },
  { hour: '11时', orders: 52, revenue: 7800, users: 520 },
  { hour: '12时', orders: 48, revenue: 7200, users: 480 },
  { hour: '13时', orders: 42, revenue: 6300, users: 420 },
  { hour: '14时', orders: 38, revenue: 5700, users: 380 },
  { hour: '15时', orders: 35, revenue: 5250, users: 350 },
  { hour: '16时', orders: 32, revenue: 4800, users: 320 },
  { hour: '17时', orders: 28, revenue: 4200, users: 280 },
  { hour: '18时', orders: 25, revenue: 3750, users: 250 },
  { hour: '19时', orders: 22, revenue: 3300, users: 220 },
  { hour: '20时', orders: 20, revenue: 3000, users: 200 },
  { hour: '21时', orders: 18, revenue: 2700, users: 180 },
  { hour: '22时', orders: 15, revenue: 2250, users: 150 },
  { hour: '23时', orders: 12, revenue: 1800, users: 120 },
]

function Dashboard() {
  const [activeUsers, setActiveUsers] = useState(12847)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // 模拟实时数据更新
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 20 - 10))
      setCurrentTime(new Date())
    }, 2000)
    
    setTimeout(() => setIsLoading(false), 1500)
    
    return () => clearInterval(timer)
  }, [])

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color, 
    trend, 
    subtitle,
    isPositive = true 
  }: {
    title: string
    value: string | number
    change: number
    icon: any
    color: string
    trend?: string
    subtitle?: string
    isPositive?: boolean
  }) => (
    <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 border border-white/30 group overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50/50 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-1 group-hover:w-16 transition-all duration-500"></div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-5xl font-black text-gray-900 tracking-tight">{value}</p>
              {subtitle && <p className="text-sm text-gray-600 font-semibold">{subtitle}</p>}
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center text-sm font-bold px-4 py-2 rounded-full shadow-sm ${
              isPositive 
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}>
              {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}%
            </div>
            {trend && <p className="text-xs text-gray-400 mt-3 font-semibold">{trend}</p>}
          </div>
        </div>
      </div>
    </div>
  )

  const MetricCard = ({ title, value, icon: Icon, color, description }: {
    title: string
    value: string
    icon: any
    color: string
    description?: string
  }) => (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/40 hover:bg-white/90 hover:shadow-md transition-all duration-500 group">
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-2 font-medium">{description}</p>}
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-400 mx-auto absolute top-0"></div>
            <div className="animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
          </div>
          <div className="mt-10 space-y-4">
            <p className="text-2xl text-white font-bold">正在加载数据...</p>
            <p className="text-sm text-blue-200">连接到企业数据中心</p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 space-y-8">

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="总收入"
          value="¥1,234,567"
          change={18.2}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          trend="vs 上月"
          subtitle="月度收入"
        />
        <StatCard
          title="活跃用户"
          value={activeUsers.toLocaleString()}
          change={12.5}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          trend="实时数据"
          subtitle="在线用户"
        />
        <StatCard
          title="订单转化"
          value="3.24%"
          change={-2.1}
          icon={Target}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="需要关注"
          subtitle="转化率"
          isPositive={false}
        />
        <StatCard
          title="系统性能"
          value="99.9%"
          change={0.1}
          icon={Server}
          color="bg-gradient-to-br from-orange-500 to-red-600"
          trend="稳定运行"
          subtitle="可用性"
        />
      </div>

      {/* 快速指标 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="页面浏览" value="45.2K" icon={Eye} color="bg-blue-500" description="+12% 今日" />
        <MetricCard title="新用户" value="1,234" icon={Users} color="bg-green-500" description="+8% 今日" />
        <MetricCard title="跳出率" value="23.4%" icon={TrendingDown} color="bg-red-500" description="-2% 今日" />
        <MetricCard title="会话时长" value="4:32" icon={Clock} color="bg-purple-500" description="+15s 今日" />
        <MetricCard title="移动端" value="67%" icon={Smartphone} color="bg-indigo-500" description="主要流量" />
        <MetricCard title="满意度" value="4.8★" icon={Heart} color="bg-pink-500" description="用户评分" />
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 销售趋势 - 增强版 */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">销售趋势分析</h3>
              <p className="text-sm text-gray-600 mt-2 font-semibold">收入、利润与目标对比</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">实际销售</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">利润</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">目标</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight="600" />
              <YAxis stroke="#64748b" fontSize={12} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Legend />
              <Bar dataKey="sales" fill="#6366F1" radius={[6, 6, 0, 0]} name="销售额" />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="利润" dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="目标" dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }} />
              <Line type="monotone" dataKey="lastYear" stroke="#94A3B8" strokeWidth={2} name="去年同期" dot={{ fill: '#94A3B8', strokeWidth: 2, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* 销售数据摘要 */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-black text-gray-900">¥456K</p>
              <p className="text-xs text-gray-600 font-semibold">本月销售</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-600">¥278K</p>
              <p className="text-xs text-gray-600 font-semibold">本月利润</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-blue-600">3,240</p>
              <p className="text-xs text-gray-600 font-semibold">总订单</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-purple-600">12.3%</p>
              <p className="text-xs text-gray-600 font-semibold">平均增长</p>
            </div>
          </div>
        </div>

        {/* 设备分布 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <h3 className="text-2xl font-black text-gray-900 mb-2">设备使用分布</h3>
          <p className="text-sm text-gray-600 mb-8 font-semibold">用户访问设备详细统计</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-4 mt-6">
            {deviceData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full shadow-sm`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{item.value}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{item.users.toLocaleString()}</p>
                    <p className="text-gray-500">用户数</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{item.sessions.toLocaleString()}</p>
                    <p className="text-gray-500">会话数</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{item.bounceRate}%</p>
                    <p className="text-gray-500">跳出率</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 实时数据与性能指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 实时用户活动 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">实时用户活动</h3>
              <p className="text-sm text-gray-600 mt-2 font-semibold">24小时用户行为与收入监控</p>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-emerald-700">实时更新</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={realtimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontWeight="600" />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} fontWeight="600" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="users" 
                stroke="#6366F1" 
                fill="url(#colorUsers)" 
                strokeWidth={3}
                name="用户数"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                name="收入"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* 实时数据摘要 */}
          <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-xl font-black text-blue-600">2,847</p>
              <p className="text-xs text-gray-600 font-semibold">当前在线</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-xl font-black text-green-600">¥42K</p>
              <p className="text-xs text-gray-600 font-semibold">今日收入</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <p className="text-xl font-black text-purple-600">3.8%</p>
              <p className="text-xs text-gray-600 font-semibold">转化率</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <p className="text-xl font-black text-orange-600">8.9K</p>
              <p className="text-xs text-gray-600 font-semibold">页面浏览</p>
            </div>
          </div>
        </div>

        {/* 性能指标 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">系统性能指标</h3>
              <p className="text-sm text-gray-600 mt-2 font-semibold">关键性能指标实时监控</p>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">系统健康</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={performanceData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {performanceData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-4 h-4 rounded-full shadow-sm`} style={{ backgroundColor: item.fill }}></div>
                  <span className="text-xs font-bold text-gray-500">{item.trend}</span>
                </div>
                <p className="text-xs font-bold text-gray-700 mb-1">{item.name}</p>
                <p className="text-lg font-black text-gray-900">{item.value}%</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 分类销售分析 */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900">产品分类销售分析</h3>
            <p className="text-sm text-gray-600 mt-2 font-semibold">各产品类别销售表现与利润率对比</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">销售额</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">利润率</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" stroke="#64748b" fontSize={12} fontWeight="600" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={12} fontWeight="600" />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} fontWeight="600" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }} 
            />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#3B82F6" radius={[6, 6, 0, 0]} name="销售额 (¥)" />
            <Bar yAxisId="left" dataKey="profit" fill="#10B981" radius={[6, 6, 0, 0]} name="利润 (¥)" />
            <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#F59E0B" strokeWidth={3} name="利润率 (%)" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* 分类数据摘要 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8 pt-6 border-t border-gray-100">
          {categoryData.map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50/70 rounded-xl hover:bg-gray-100/70 transition-colors duration-300">
              <p className="text-xs font-bold text-gray-600 mb-2">{item.category}</p>
              <p className="text-lg font-black text-gray-900">¥{(item.sales/1000).toFixed(0)}K</p>
              <p className="text-xs text-green-600 font-semibold">{item.margin}% 利润率</p>
              <p className="text-xs text-gray-500 mt-1">{item.orders} 订单</p>
            </div>
          ))}
        </div>
      </div>

      {/* 24小时订单分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">24小时订单分析</h3>
              <p className="text-sm text-gray-600 mt-2 font-semibold">每小时订单量与收入趋势</p>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-700">实时监控</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} fontWeight="600" />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} fontWeight="600" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" fill="#6366F1" radius={[4, 4, 0, 0]} name="订单数" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="收入 (¥)" dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* 峰值时段分析 */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-lg font-black text-blue-600">12:00</p>
              <p className="text-xs text-gray-600 font-semibold">订单峰值</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-lg font-black text-green-600">¥7.8K</p>
              <p className="text-xs text-gray-600 font-semibold">最高收入</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <p className="text-lg font-black text-purple-600">520</p>
              <p className="text-xs text-gray-600 font-semibold">峰值用户</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <p className="text-lg font-black text-orange-600">3-5时</p>
              <p className="text-xs text-gray-600 font-semibold">低谷时段</p>
            </div>
          </div>
        </div>

        {/* 地区销售排行 */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">地区销售排行</h3>
              <p className="text-sm text-gray-600 mt-2 font-semibold">各城市销售表现排名</p>
            </div>
            <Globe className="w-6 h-6 text-indigo-500" />
          </div>
          
          <div className="space-y-4">
            {regionData.sort((a, b) => b.sales - a.sales).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.region}</p>
                    <p className="text-xs text-gray-500">{item.users.toLocaleString()} 用户</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">¥{(item.sales/1000).toFixed(0)}K</p>
                  <p className={`text-xs font-semibold ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 地区统计摘要 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-xl font-black text-blue-600">8</p>
                <p className="text-xs text-gray-600 font-semibold">覆盖城市</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-xl font-black text-green-600">15.8%</p>
                <p className="text-xs text-gray-600 font-semibold">平均增长</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 地区散点图分析 */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900">地区销售与满意度关系分析</h3>
            <p className="text-sm text-gray-600 mt-2 font-semibold">各地区销售表现与用户满意度散点分布图</p>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-indigo-500" />
            <span className="text-sm font-bold text-gray-600">全国数据</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <ScatterChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="x" name="销售指数" stroke="#64748b" fontSize={12} fontWeight="600" />
            <YAxis dataKey="y" name="用户满意度" stroke="#64748b" fontSize={12} fontWeight="600" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0 && payload[0]?.payload) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/95 backdrop-blur-xl p-6 border border-gray-200 rounded-2xl shadow-lg">
                      <p className="font-black text-gray-900 text-xl mb-4">{data.region}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">销售额:</span>
                          <span className="font-bold text-gray-900">¥{data.sales.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">用户数:</span>
                          <span className="font-bold text-gray-900">{data.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">销售指数:</span>
                          <span className="font-bold text-gray-900">{data.x}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">满意度:</span>
                          <span className="font-bold text-gray-900">{data.y}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">增长率:</span>
                          <span className={`font-bold ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.growth > 0 ? '+' : ''}{data.growth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">市场份额:</span>
                          <span className="font-bold text-blue-600">{data.marketShare}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter dataKey="sales" fill="#6366F1" />
            <ReferenceLine x={80} stroke="#EF4444" strokeDasharray="5 5" />
            <ReferenceLine y={85} stroke="#EF4444" strokeDasharray="5 5" />
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* 象限分析 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-lg font-black text-green-600">明星区域</p>
            <p className="text-xs text-gray-600 font-semibold">高销售·高满意度</p>
            <p className="text-sm font-bold text-gray-900 mt-2">深圳、北京</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-lg font-black text-blue-600">潜力区域</p>
            <p className="text-xs text-gray-600 font-semibold">低销售·高满意度</p>
            <p className="text-sm font-bold text-gray-900 mt-2">广州</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <p className="text-lg font-black text-yellow-600">现金牛</p>
            <p className="text-xs text-gray-600 font-semibold">高销售·低满意度</p>
            <p className="text-sm font-bold text-gray-900 mt-2">上海</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-lg font-black text-red-600">问题区域</p>
            <p className="text-xs text-gray-600 font-semibold">低销售·低满意度</p>
            <p className="text-sm font-bold text-gray-900 mt-2">成都、武汉</p>
          </div>
        </div>
      </div>

      {/* 多维度趋势分析 - 增强版 */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900">多维度趋势分析</h3>
            <p className="text-sm text-gray-600 mt-2 font-semibold">收入、用户、转化率与客单价综合分析</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">收入</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">用户数</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">转化率</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">客单价</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight="600" />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={12} fontWeight="600" />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} fontWeight="600" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }} 
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="收入 (¥)" />
            <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={3} name="用户数" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#10B981" strokeWidth={3} name="转化率 (%)" dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="avgOrderValue" stroke="#F59E0B" strokeWidth={3} name="客单价 (¥)" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* 趋势数据摘要 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-gray-100">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-xl font-black text-blue-600">¥487K</p>
            <p className="text-xs text-gray-600 font-semibold mb-1">平均月收入</p>
            <p className="text-xs text-green-600 font-bold">+18.5%</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-xl font-black text-purple-600">1,609</p>
            <p className="text-xs text-gray-600 font-semibold mb-1">平均月用户</p>
            <p className="text-xs text-green-600 font-bold">+22.3%</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-xl font-black text-green-600">3.9%</p>
            <p className="text-xs text-gray-600 font-semibold mb-1">平均转化率</p>
            <p className="text-xs text-green-600 font-bold">+0.8%</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <p className="text-xl font-black text-orange-600">¥142</p>
            <p className="text-xs text-gray-600 font-semibold mb-1">平均客单价</p>
            <p className="text-xs text-green-600 font-bold">+12.7%</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-xl font-black text-red-600">384</p>
            <p className="text-xs text-gray-600 font-semibold mb-1">平均月订单</p>
            <p className="text-xs text-green-600 font-bold">+15.2%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
            
