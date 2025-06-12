import React, { useState, useEffect } from 'react'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, ScatterChart, Scatter,
  RadialBarChart, RadialBar, FunnelChart, Funnel, LabelList
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Eye, Users, Target, Clock, Globe, Smartphone,
  Monitor, Tablet, ArrowUp, ArrowDown, Activity, Zap, Heart, MessageSquare,
  Share2, MousePointer, BarChart3, PieChart as PieChartIcon, Filter, Download,
  Calendar, RefreshCw, Star, ThumbsUp, ShoppingCart, CreditCard
} from 'lucide-react'

// 分析数据
const trafficData = [
  { date: '2024-01', organic: 45000, paid: 23000, social: 12000, direct: 18000, email: 8000, referral: 5000 },
  { date: '2024-02', organic: 52000, paid: 28000, social: 15000, direct: 21000, email: 9500, referral: 6200 },
  { date: '2024-03', organic: 48000, paid: 25000, social: 13500, direct: 19000, email: 8800, referral: 5800 },
  { date: '2024-04', organic: 61000, paid: 32000, social: 18000, direct: 25000, email: 11000, referral: 7500 },
  { date: '2024-05', organic: 55000, paid: 29000, social: 16000, direct: 22000, email: 10200, referral: 6800 },
  { date: '2024-06', organic: 67000, paid: 35000, social: 20000, direct: 28000, email: 12500, referral: 8200 },
  { date: '2024-07', organic: 59000, paid: 31000, social: 17500, direct: 24000, email: 11200, referral: 7200 },
  { date: '2024-08', organic: 72000, paid: 38000, social: 22000, direct: 32000, email: 14000, referral: 9500 },
]

const deviceData = [
  { name: '移动端', value: 45, users: 12450, sessions: 18600, color: '#6366F1', growth: 15.2 },
  { name: '桌面端', value: 35, users: 9680, sessions: 14200, color: '#8B5CF6', growth: -2.8 },
  { name: '平板端', value: 20, users: 5540, sessions: 8100, color: '#06B6D4', growth: 8.5 },
]

const userBehaviorData = [
  { page: '首页', views: 45230, time: 245, bounce: 23.4, conversion: 4.2 },
  { page: '产品页', views: 32100, time: 380, bounce: 18.7, conversion: 8.9 },
  { page: '关于我们', views: 18900, time: 156, bounce: 45.2, conversion: 1.2 },
  { page: '联系我们', views: 12400, time: 89, bounce: 52.1, conversion: 12.5 },
  { page: '博客', views: 28700, time: 420, bounce: 28.9, conversion: 2.8 },
  { page: '服务', views: 21500, time: 298, bounce: 31.2, conversion: 6.7 },
]

const conversionFunnelData = [
  { name: '访问者', value: 100000, fill: '#3B82F6' },
  { name: '浏览产品', value: 65000, fill: '#6366F1' },
  { name: '添加购物车', value: 25000, fill: '#8B5CF6' },
  { name: '开始结账', value: 12000, fill: '#A855F7' },
  { name: '完成购买', value: 8500, fill: '#C084FC' },
]

const geographicData = [
  { region: '北京', users: 15420, sessions: 23100, revenue: 125000, x: 85, y: 92 },
  { region: '上海', users: 18650, sessions: 28900, revenue: 158000, x: 78, y: 88 },
  { region: '广州', users: 12340, sessions: 19200, revenue: 98000, x: 82, y: 85 },
  { region: '深圳', users: 16780, sessions: 25400, revenue: 142000, x: 88, y: 95 },
  { region: '杭州', users: 9850, sessions: 15600, revenue: 78000, x: 75, y: 82 },
  { region: '成都', users: 8920, sessions: 14100, revenue: 68000, x: 72, y: 78 },
  { region: '南京', users: 7650, sessions: 12300, revenue: 62000, x: 70, y: 80 },
  { region: '武汉', users: 6890, sessions: 11200, revenue: 55000, x: 68, y: 75 },
]

const timeSeriesData = [
  { hour: '00:00', users: 1200, pageviews: 3400, sessions: 890, events: 2100 },
  { hour: '01:00', users: 980, pageviews: 2800, sessions: 720, events: 1650 },
  { hour: '02:00', users: 750, pageviews: 2100, sessions: 560, events: 1200 },
  { hour: '03:00', users: 620, pageviews: 1800, sessions: 450, events: 980 },
  { hour: '04:00', users: 800, pageviews: 2200, sessions: 580, events: 1300 },
  { hour: '05:00', users: 1100, pageviews: 3100, sessions: 780, events: 1800 },
  { hour: '06:00', users: 1650, pageviews: 4600, sessions: 1200, events: 2600 },
  { hour: '07:00', users: 2200, pageviews: 6200, sessions: 1650, events: 3500 },
  { hour: '08:00', users: 2800, pageviews: 7800, sessions: 2100, events: 4400 },
  { hour: '09:00', users: 3200, pageviews: 8900, sessions: 2400, events: 5100 },
  { hour: '10:00', users: 3500, pageviews: 9800, sessions: 2650, events: 5600 },
  { hour: '11:00', users: 3800, pageviews: 10600, sessions: 2850, events: 6000 },
  { hour: '12:00', users: 3200, pageviews: 8900, sessions: 2400, events: 5100 },
  { hour: '13:00', users: 2900, pageviews: 8100, sessions: 2200, events: 4600 },
  { hour: '14:00', users: 3100, pageviews: 8700, sessions: 2350, events: 4900 },
  { hour: '15:00', users: 3400, pageviews: 9500, sessions: 2550, events: 5400 },
  { hour: '16:00', users: 3600, pageviews: 10100, sessions: 2700, events: 5700 },
  { hour: '17:00', users: 3300, pageviews: 9200, sessions: 2450, events: 5200 },
  { hour: '18:00', users: 2800, pageviews: 7800, sessions: 2100, events: 4400 },
  { hour: '19:00', users: 2400, pageviews: 6700, sessions: 1800, events: 3800 },
  { hour: '20:00', users: 2000, pageviews: 5600, sessions: 1500, events: 3200 },
  { hour: '21:00', users: 1700, pageviews: 4800, sessions: 1250, events: 2700 },
  { hour: '22:00', users: 1400, pageviews: 3900, sessions: 1050, events: 2200 },
  { hour: '23:00', users: 1200, pageviews: 3400, sessions: 890, events: 1900 },
]

const socialMediaData = [
  { platform: 'Facebook', users: 25400, engagement: 4.2, shares: 1200, color: '#1877F2' },
  { platform: 'Instagram', users: 18900, engagement: 6.8, shares: 890, color: '#E4405F' },
  { platform: 'Twitter', users: 15600, engagement: 3.1, shares: 650, color: '#1DA1F2' },
  { platform: 'LinkedIn', users: 12300, engagement: 5.4, shares: 420, color: '#0A66C2' },
  { platform: 'TikTok', users: 22100, engagement: 8.9, shares: 1500, color: '#000000' },
  { platform: 'YouTube', users: 19800, engagement: 7.2, shares: 980, color: '#FF0000' },
]

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)

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

  const ChartContainer = ({ title, children, actions }: { 
    title: string
    children: React.ReactNode
    actions?: React.ReactNode 
  }) => (
    <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-md border border-white/30">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-gray-900">{title}</h3>
        </div>
        {actions && <div className="flex items-center space-x-4">{actions}</div>}
      </div>
      {children}
    </div>
  )

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
        activeTab === id
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  )

  return (
    <div className="space-y-10">
      {/* 顶部控制栏 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        <div className="flex flex-wrap gap-3">
          <TabButton id="overview" label="总览" icon={BarChart3} />
          <TabButton id="traffic" label="流量分析" icon={TrendingUp} />
          <TabButton id="behavior" label="用户行为" icon={Users} />
          <TabButton id="conversion" label="转化分析" icon={Target} />
          <TabButton id="geographic" label="地理分布" icon={Globe} />
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="1y">最近1年</option>
          </select>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md font-bold">
            <Download className="w-5 h-5 mr-2" />
            导出数据
          </button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="总流量"
          value="2.34M"
          change={18.2}
          icon={Eye}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          trend="vs 上月"
          subtitle="页面浏览量"
        />
        <StatCard
          title="独立访客"
          value="456K"
          change={12.5}
          icon={Users}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          trend="vs 上月"
          subtitle="唯一用户"
        />
        <StatCard
          title="转化率"
          value="4.2%"
          change={-2.1}
          icon={Target}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="需要关注"
          subtitle="目标转化"
          isPositive={false}
        />
        <StatCard
          title="用户留存"
          value="68.5%"
          change={5.8}
          icon={Heart}
          color="bg-gradient-to-br from-orange-500 to-red-600"
          trend="vs 上月"
          subtitle="7天留存率"
        />
      </div>

      {/* 主要图表区域 */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartContainer title="流量趋势分析">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} fontWeight="600" />
                <YAxis stroke="#64748b" fontSize={12} fontWeight="600" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Area type="monotone" dataKey="organic" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
                <Area type="monotone" dataKey="paid" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                <Area type="monotone" dataKey="social" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.8} />
                <Area type="monotone" dataKey="direct" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="设备使用分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-5 mt-8">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className={`w-5 h-5 rounded-full shadow-sm`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">{item.value}%</p>
                    <p className="text-xs text-gray-500 font-semibold">{item.users.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      )}

      {activeTab === 'traffic' && (
        <div className="space-y-8">
          <ChartContainer title="24小时流量分布">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} fontWeight="600" />
                <YAxis stroke="#64748b" fontSize={12} fontWeight="600" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="users" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="pageviews" stroke="#10B981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartContainer title="社交媒体表现">
              <div className="space-y-6">
                {socialMediaData.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gray-50/70 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`} style={{ backgroundColor: platform.color }}>
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{platform.platform}</p>
                        <p className="text-sm text-gray-600">{platform.users.toLocaleString()} 用户</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">{platform.engagement}%</p>
                      <p className="text-sm text-gray-600">参与度</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChartContainer>

            <ChartContainer title="流量来源占比">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: '自然搜索', value: 35, color: '#3B82F6' },
                      { name: '付费广告', value: 28, color: '#10B981' },
                      { name: '社交媒体', value: 22, color: '#8B5CF6' },
                      { name: '直接访问', value: 15, color: '#F59E0B' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {[
                      { name: '自然搜索', value: 35, color: '#3B82F6' },
                      { name: '付费广告', value: 28, color: '#10B981' },
                      { name: '社交媒体', value: 22, color: '#8B5CF6' },
                      { name: '直接访问', value: 15, color: '#F59E0B' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      )}

      {activeTab === 'behavior' && (
        <div className="space-y-8">
          <ChartContainer title="页面性能分析">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-bold text-gray-900">页面</th>
                    <th className="text-right py-4 px-6 font-bold text-gray-900">浏览量</th>
                    <th className="text-right py-4 px-6 font-bold text-gray-900">停留时间</th>
                    <th className="text-right py-4 px-6 font-bold text-gray-900">跳出率</th>
                    <th className="text-right py-4 px-6 font-bold text-gray-900">转化率</th>
                  </tr>
                </thead>
                <tbody>
                  {userBehaviorData.map((page, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-4 px-6 font-semibold text-gray-900">{page.page}</td>
                      <td className="py-4 px-6 text-right font-bold text-gray-900">{page.views.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-gray-600">{page.time}s</td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          page.bounce > 40 ? 'bg-red-100 text-red-700' : 
                          page.bounce > 25 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {page.bounce}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          page.conversion > 8 ? 'bg-green-100 text-green-700' : 
                          page.conversion > 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {page.conversion}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartContainer>
        </div>
      )}

      {activeTab === 'conversion' && (
        <div className="space-y-8">
          <ChartContainer title="转化漏斗分析">
            <ResponsiveContainer width="100%" height={500}>
              <FunnelChart>
                <Funnel
                  dataKey="value"
                  data={conversionFunnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </FunnelChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
              {conversionFunnelData.map((step, index) => (
                <div key={index} className="text-center p-6 bg-gray-50/70 rounded-2xl border border-gray-100">
                  <div className={`w-6 h-6 rounded-full mx-auto mb-4 shadow-sm`} style={{ backgroundColor: step.fill }}></div>
                  <p className="text-sm font-bold text-gray-700 mb-2">{step.name}</p>
                  <p className="text-2xl font-black text-gray-900">{step.value.toLocaleString()}</p>
                  {index > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                       {((step.value / (conversionFunnelData[index - 1]?.value || 1)) * 100).toFixed(1)}% 转化
                    </p>
                   )}

                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      )}

      {activeTab === 'geographic' && (
        <div className="space-y-8">
        <ChartContainer title="地理分布热力图">
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart data={geographicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="x" 
                name="用户活跃度" 
                stroke="#64748b" 
                fontSize={12} 
                fontWeight="600"
                domain={[60, 100]}
              />
              <YAxis 
                dataKey="y" 
                name="收入指数" 
                stroke="#64748b" 
                fontSize={12} 
                fontWeight="600"
                domain={[70, 100]}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0 && payload[0]?.payload) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white/95 backdrop-blur-xl p-6 border border-gray-200 rounded-2xl shadow-lg">
                        <p className="font-black text-gray-900 text-xl mb-4">{data.region}</p>
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">用户数: <span className="font-bold text-gray-900">{data.users.toLocaleString()}</span></p>
                          <p className="text-sm text-gray-600">会话数: <span className="font-bold text-gray-900">{data.sessions.toLocaleString()}</span></p>
                          <p className="text-sm text-gray-600">收入: <span className="font-bold text-gray-900">¥{data.revenue.toLocaleString()}</span></p>
                          <p className="text-sm text-gray-600">活跃度: <span className="font-bold text-gray-900">{data.x}</span></p>
                          <p className="text-sm text-gray-600">收入指数: <span className="font-bold text-gray-900">{data.y}</span></p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="revenue" fill="#6366F1" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartContainer title="地区用户排行">
            <div className="space-y-4">
              {geographicData
                .sort((a, b) => b.users - a.users)
                .slice(0, 6)
                .map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-5 bg-gray-50/70 rounded-2xl border border-gray-100 hover:bg-gray-100/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{region.region}</p>
                        <p className="text-sm text-gray-600">{region.sessions.toLocaleString()} 会话</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">{region.users.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">用户</p>
                    </div>
                  </div>
                ))}
            </div>
          </ChartContainer>

          <ChartContainer title="地区收入排行">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={geographicData.sort((a, b) => b.revenue - a.revenue).slice(0, 6)}
                layout="horizontal"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={12} fontWeight="600" />
                <YAxis dataKey="region" type="category" stroke="#64748b" fontSize={12} fontWeight="600" width={60} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: any) => [`¥${value.toLocaleString()}`, '收入']}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    )}

    {/* 实时数据监控 */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ChartContainer title="实时在线用户">
        <div className="text-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <p className="text-3xl font-black text-white">2,847</p>
                <p className="text-sm text-blue-100 font-semibold">在线用户</p>
              </div>
            </div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50/70 rounded-xl">
              <p className="text-2xl font-black text-gray-900">1,234</p>
              <p className="text-sm text-gray-600 font-semibold">新访客</p>
            </div>
            <div className="text-center p-4 bg-gray-50/70 rounded-xl">
              <p className="text-2xl font-black text-gray-900">1,613</p>
              <p className="text-sm text-gray-600 font-semibold">回访用户</p>
            </div>
          </div>
        </div>
      </ChartContainer>

      <ChartContainer title="热门页面">
        <div className="space-y-4">
          {[
            { page: '/products', views: 12450, percentage: 28.5 },
            { page: '/home', views: 9870, percentage: 22.6 },
            { page: '/about', views: 7650, percentage: 17.5 },
            { page: '/contact', views: 5430, percentage: 12.4 },
            { page: '/blog', views: 4320, percentage: 9.9 },
            { page: '/services', views: 3980, percentage: 9.1 },
          ].map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{page.page}</p>
                  <p className="text-sm text-gray-600">{page.views.toLocaleString()} 浏览</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">{page.percentage}%</p>
                <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                    style={{ width: `${page.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      <ChartContainer title="关键事件">
        <div className="space-y-4">
          {[
            { event: '用户注册', count: 234, trend: 'up', color: 'bg-green-500' },
            { event: '商品购买', count: 89, trend: 'up', color: 'bg-blue-500' },
            { event: '文章分享', count: 156, trend: 'down', color: 'bg-purple-500' },
            { event: '视频播放', count: 445, trend: 'up', color: 'bg-orange-500' },
            { event: '表单提交', count: 67, trend: 'up', color: 'bg-indigo-500' },
            { event: '下载文件', count: 123, trend: 'down', color: 'bg-pink-500' },
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/70 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${event.color} rounded-full animate-pulse`}></div>
                <div>
                  <p className="font-bold text-gray-900">{event.event}</p>
                  <p className="text-sm text-gray-600">今日事件</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black text-gray-900">{event.count}</span>
                {event.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>

    {/* 性能指标 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ChartContainer title="网站性能指标">
        <ResponsiveContainer width="100%" height={350}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="85%" data={[
            { name: '页面加载速度', value: 85, fill: '#10B981' },
            { name: '用户体验评分', value: 92, fill: '#6366F1' },
            { name: 'SEO优化程度', value: 78, fill: '#F59E0B' },
            { name: '安全性评级', value: 96, fill: '#EF4444' },
          ]}>
            <RadialBar dataKey="value" cornerRadius={20} fill="#8884d8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-5 mt-8">
          {[
            { name: '页面加载速度', value: 85, fill: '#10B981' },
            { name: '用户体验评分', value: 92, fill: '#6366F1' },
            { name: 'SEO优化程度', value: 78, fill: '#F59E0B' },
            { name: '安全性评级', value: 96, fill: '#EF4444' },
          ].map((item, index) => (
            <div key={index} className="text-center p-5 bg-gray-50/70 rounded-2xl border border-gray-100">
              <div className={`w-6 h-6 rounded-full mx-auto mb-4 shadow-sm`} style={{ backgroundColor: item.fill }}></div>
              <p className="text-sm font-bold text-gray-700">{item.name}</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{item.value}%</p>
            </div>
          ))}
        </div>
      </ChartContainer>

      <ChartContainer title="用户满意度调查">
        <div className="space-y-6">
          <div className="text-center py-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-5xl font-black text-gray-900">4.8</p>
            <p className="text-lg text-gray-600 font-semibold mt-2">平均评分</p>
            <p className="text-sm text-gray-500 mt-1">基于 2,847 条用户反馈</p>
          </div>
          
          <div className="space-y-4">
            {[
              { stars: 5, count: 1823, percentage: 64 },
              { stars: 4, count: 687, percentage: 24 },
              { stars: 3, count: 228, percentage: 8 },
              { stars: 2, count: 71, percentage: 3 },
              { stars: 1, count: 38, percentage: 1 },
            ].map((rating, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-bold text-gray-700">{rating.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-700 w-16 text-right">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </div>

    {/* 底部总结 */}
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-10 rounded-3xl border border-blue-100/50 backdrop-blur-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <p className="text-3xl font-black text-gray-900">99.9%</p>
          <p className="text-sm text-gray-600 font-semibold">系统可用性</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-3xl font-black text-gray-900">1.2s</p>
          <p className="text-sm text-gray-600 font-semibold">平均响应时间</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <ThumbsUp className="w-8 h-8 text-white" />
          </div>
          <p className="text-3xl font-black text-gray-900">96.2%</p>
          <p className="text-sm text-gray-600 font-semibold">用户满意度</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <p className="text-3xl font-black text-gray-900">2,847</p>
          <p className="text-sm text-gray-600 font-semibold">用户反馈</p>
        </div>
      </div>
    </div>
  </div>
)
}

export default Analytics

