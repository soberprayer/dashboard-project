import React, { useState, useEffect } from 'react'
import { 
  Settings, User, Bell, Shield, Palette, Globe, Database,
  Monitor, Smartphone, Wifi, HardDrive, Cloud, Key,
  Mail, Phone, MapPin, Building, Users, CreditCard,
  Lock, Eye, EyeOff, Save, RefreshCw, Download, Upload,
  Trash2, Edit, Plus, X, Check, AlertTriangle, Info,
  Sun, Moon, Zap, Activity, BarChart3, PieChart,
  Calendar, Clock, Filter, Search, Tag, Folder,
  Link, Share2, Copy, ExternalLink, FileText, Image,
  Camera, Mic, Video, Volume2, VolumeX, Bluetooth,
  Printer, Headphones, Speaker, Gamepad2,
  Cpu, MemoryStick, Battery, Power, Usb, Router,
  Server, Terminal, Code, Bug, Wrench, 
  Package, Truck, ShoppingCart, DollarSign, Percent,
  Target, Award, Star, Heart, Bookmark, Flag,
  Home, Car, Coffee, Book, Music, Film, Gamepad,
  Briefcase, GraduationCap, Stethoscope, Hammer, Scissors, CheckCircle, XCircle
} from 'lucide-react'

// 模拟设置数据
const mockSettingsData = {
  profile: {
    id: 'USR-001',
    name: '张三',
    email: 'zhangsan@company.com',
    phone: '+86 138 0013 8000',
    avatar: '',
    title: '系统管理员',
    department: '技术部',
    location: '北京市朝阳区',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h'
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    desktop: true,
    orderUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    securityAlerts: true,
    maintenanceNotices: true
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: [],
    deviceTrust: true,
    biometricAuth: false,
    ssoEnabled: true
  },
  appearance: {
    theme: 'light',
    primaryColor: 'blue',
    fontSize: 'medium',
    sidebarCollapsed: false,
    compactMode: false,
    animations: true,
    highContrast: false,
    colorBlind: false
  },
  system: {
    autoBackup: true,
    backupFrequency: 'daily',
    storageLocation: 'cloud',
    cacheSize: '2GB',
    logLevel: 'info',
    debugMode: false,
    maintenanceMode: false,
    apiRateLimit: 1000
  },
  integrations: {
    email: {
      provider: 'smtp',
      host: 'smtp.company.com',
      port: 587,
      username: 'system@company.com',
      ssl: true
    },
    payment: {
      stripe: { enabled: true, publicKey: 'pk_test_***' },
      alipay: { enabled: true, appId: '2021***' },
      wechat: { enabled: false, appId: '' }
    },
    analytics: {
      google: { enabled: true, trackingId: 'GA-***' },
      baidu: { enabled: false, siteId: '' }
    }
  }
}

const settingsSections = [
  { id: 'profile', name: '个人资料', icon: User },
  { id: 'notifications', name: '通知设置', icon: Bell },
  { id: 'security', name: '安全设置', icon: Shield },
  { id: 'appearance', name: '外观设置', icon: Palette },
  { id: 'system', name: '系统设置', icon: Settings },
  { id: 'integrations', name: '集成配置', icon: Link },
  { id: 'backup', name: '备份恢复', icon: Database },
  { id: 'logs', name: '系统日志', icon: FileText }
]

const themes = [
  { id: 'light', name: '浅色主题', preview: 'bg-white' },
  { id: 'dark', name: '深色主题', preview: 'bg-gray-900' },
  { id: 'auto', name: '自动切换', preview: 'bg-gradient-to-r from-white to-gray-900' }
]

const primaryColors = [
  { id: 'blue', name: '蓝色', color: 'bg-blue-500' },
  { id: 'emerald', name: '翠绿', color: 'bg-emerald-500' },
  { id: 'purple', name: '紫色', color: 'bg-purple-500' },
  { id: 'amber', name: '琥珀', color: 'bg-amber-500' },
  { id: 'red', name: '红色', color: 'bg-red-500' },
  { id: 'indigo', name: '靛蓝', color: 'bg-indigo-500' }
]

const timezones = [
  { id: 'Asia/Shanghai', name: '北京时间 (UTC+8)' },
  { id: 'Asia/Tokyo', name: '东京时间 (UTC+9)' },
  { id: 'America/New_York', name: '纽约时间 (UTC-5)' },
  { id: 'Europe/London', name: '伦敦时间 (UTC+0)' },
  { id: 'Australia/Sydney', name: '悉尼时间 (UTC+11)' }
]

const languages = [
  { id: 'zh-CN', name: '简体中文' },
  { id: 'zh-TW', name: '繁体中文' },
  { id: 'en-US', name: 'English (US)' },
  { id: 'ja-JP', name: '日本語' },
  { id: 'ko-KR', name: '한국어' }
]

function SystemSettings() {
  const [settings, setSettings] = useState(mockSettingsData)
  const [activeSection, setActiveSection] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState<string | null>(null)

  // 保存设置
  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('保存设置:', settings)
      setHasChanges(false)
    } catch (error) {
      console.error('保存设置失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 重置设置
  const handleResetSettings = () => {
    setSettings(mockSettingsData)
    setHasChanges(false)
  }

  // 更新设置
  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  // 确认对话框
  const showConfirm = (action: string) => {
    setConfirmAction(action)
    setShowConfirmDialog(true)
  }

  const handleConfirm = () => {
    if (confirmAction === 'reset') {
      handleResetSettings()
    } else if (confirmAction === 'clearCache') {
      console.log('清除缓存')
    } else if (confirmAction === 'exportData') {
      console.log('导出数据')
    }
    setShowConfirmDialog(false)
    setConfirmAction(null)
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl shadow-md">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-wrap gap-4">
  {/* 授权用户数 */}
  <div className="flex items-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 space-x-2 min-w-[120px]">
    <span className="text-blue-700 font-bold">授权用户</span>
    <span className="font-mono text-blue-900 font-semibold">128</span>
  </div>
  {/* 当前角色 */}
  <div className="flex items-center px-4 py-2 bg-green-50 rounded-xl border border-green-100 space-x-2 min-w-[120px]">
    <span className="text-green-700 font-bold">当前角色</span>
    <span className="font-mono text-green-900 font-semibold">张三</span>
  </div>
  {/* 组织/租户 */}
  <div className="flex items-center px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100 space-x-2 min-w-[120px]">
    <span className="text-indigo-700 font-bold">组织</span>
    <span className="font-mono text-indigo-900 font-semibold">Acme Corp</span>
  </div>
  {/* 登录IP */}
  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 space-x-2 min-w-[160px]">
    <span className="text-gray-700 font-bold">登录IP</span>
    <span className="font-mono text-gray-900 font-semibold">192.168.1.88</span>
  </div>
  {/* 本周活跃用户 */}
  <div className="flex items-center px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-100 space-x-2 min-w-[140px]">
    <span className="text-yellow-700 font-bold">本周活跃</span>
    <span className="font-mono text-yellow-900 font-semibold">57</span>
  </div>
  {/* 剩余存储 */}
  <div className="flex items-center px-4 py-2 bg-pink-50 rounded-xl border border-pink-100 space-x-2 min-w-[140px]">
    <span className="text-pink-700 font-bold">剩余空间</span>
    <span className="font-mono text-pink-900 font-semibold">82GB</span>
  </div>
</div>
            </div>
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-2xl border border-amber-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-bold">有未保存的更改</span>
                  </div>
                  <button
                    onClick={() => showConfirm('reset')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
                  >
                    <RefreshCw className="w-5 h-5 mr-2 inline" />
                    重置
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2 inline-block" />
                    ) : (
                      <Save className="w-5 h-5 mr-2 inline" />
                    )}
                    保存设置
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 设置导航 */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm sticky top-8">
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索设置..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                />
              </div>
              <nav className="space-y-2">
                {settingsSections.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-bold ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* 设置内容 */}
        <div className="lg:col-span-3">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm">
            {/* 个人资料 */}
            {activeSection === 'profile' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">个人资料</h2>
                    <p className="text-gray-600 font-medium">管理您的个人信息和偏好设置</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 头像设置 */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-black text-white">{settings.profile.name.charAt(0)}</span>
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md">
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{settings.profile.name}</h3>
                      <p className="text-gray-600 font-medium">{settings.profile.title}</p>
                      <button className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 font-bold text-sm">
                        <Upload className="w-4 h-4 mr-2 inline" />
                        上传头像
                      </button>
                    </div>
                  </div>

                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">姓名</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">职位</label>
                      <input
                        type="text"
                        value={settings.profile.title}
                        onChange={(e) => updateSetting('profile', 'title', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">邮箱</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">电话</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">部门</label>
                      <input
                        type="text"
                        value={settings.profile.department}
                        onChange={(e) => updateSetting('profile', 'department', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">位置</label>
                      <input
                        type="text"
                        value={settings.profile.location}
                        onChange={(e) => updateSetting('profile', 'location', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                    </div>
                  </div>

                  {/* 地区设置 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">时区</label>
                      <select
                        value={settings.profile.timezone}
                        onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      >
                        {timezones.map(tz => (
                          <option key={tz.id} value={tz.id}>{tz.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">语言</label>
                      <select
                        value={settings.profile.language}
                        onChange={(e) => updateSetting('profile', 'language', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      >
                        {languages.map(lang => (
                          <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">日期格式</label>
                      <select
                        value={settings.profile.dateFormat}
                        onChange={(e) => updateSetting('profile', 'dateFormat', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      >
                        <option value="YYYY-MM-DD">2024-06-10</option>
                        <option value="MM/DD/YYYY">06/10/2024</option>
                        <option value="DD/MM/YYYY">10/06/2024</option>
                        <option value="DD-MM-YYYY">10-06-2024</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">时间格式</label>
                      <select
                        value={settings.profile.timeFormat}
                        onChange={(e) => updateSetting('profile', 'timeFormat', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      >
                        <option value="24h">24小时制</option>
                        <option value="12h">12小时制</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 通知设置 */}
            {activeSection === 'notifications' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <Bell className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">通知设置</h2>
                    <p className="text-gray-600 font-medium">管理您的通知偏好和提醒方式</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 通知方式 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">通知方式</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { key: 'email', label: '邮件通知', icon: Mail, description: '通过邮件接收重要通知' },
                        { key: 'push', label: '推送通知', icon: Bell, description: '浏览器推送通知' },
                        { key: 'sms', label: '短信通知', icon: Phone, description: '通过短信接收紧急通知' },
                        { key: 'desktop', label: '桌面通知', icon: Monitor, description: '系统桌面通知' }
                      ].map(({ key, label, icon: Icon, description }) => (
                        <div key={key} className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-blue-100 rounded-xl">
                                <Icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900">{label}</h4>
                                <p className="text-sm text-gray-600 font-medium">{description}</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.notifications[key as keyof typeof settings.notifications]}
                                onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 通知类型 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">通知类型</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'orderUpdates', label: '订单更新', description: '订单状态变更时通知' },
                        { key: 'systemAlerts', label: '系统警报', description: '系统异常和错误通知' },
                        { key: 'marketingEmails', label: '营销邮件', description: '产品推广和活动信息' },
                        { key: 'weeklyReports', label: '周报', description: '每周数据统计报告' },
                        { key: 'securityAlerts', label: '安全警报', description: '账户安全相关通知' },
                        { key: 'maintenanceNotices', label: '维护通知', description: '系统维护和更新通知' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                          <div>
                            <h4 className="font-bold text-gray-900">{label}</h4>
                            <p className="text-sm text-gray-600 font-medium">{description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[key as keyof typeof settings.notifications]}
                              onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 安全设置 */}
            {activeSection === 'security' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">安全设置</h2>
                    <p className="text-gray-600 font-medium">保护您的账户和数据安全</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 密码设置 */}
                  <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-red-100 rounded-xl">
                        <Lock className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">密码安全</h3>
                        <p className="text-sm text-gray-600 font-medium">管理您的登录密码</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">当前密码</label>
                        <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="输入当前密码"
                            className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">新密码</label>
                        <input
                          type="password"
                          placeholder="输入新密码"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">确认新密码</label>
                        <input
                          type="password"
                          placeholder="再次输入新密码"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 font-bold">
                        <Key className="w-5 h-5 mr-2 inline" />
                        更新密码
                      </button>
                    </div>
                  </div>

                  {/* 双因素认证 */}
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <Shield className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 text-lg">双因素认证</h3>
                          <p className="text-sm text-gray-600 font-medium">为您的账户添加额外的安全保护</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                    {settings.security.twoFactorAuth && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-emerald-200">
                          <Smartphone className="w-6 h-6 text-emerald-600" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">身份验证器应用</h4>
                            <p className="text-sm text-gray-600 font-medium">使用Google Authenticator或类似应用</p>
                          </div>
                          <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors duration-200 font-bold text-sm">
                            配置
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-emerald-200">
                          <Phone className="w-6 h-6 text-emerald-600" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">短信验证</h4>
                            <p className="text-sm text-gray-600 font-medium">通过短信接收验证码</p>
                          </div>
                          <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors duration-200 font-bold text-sm">
                            设置
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 安全选项 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">安全选项</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">会话超时 (分钟)</label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value={15}>15分钟</option>
                          <option value={30}>30分钟</option>
                          <option value={60}>1小时</option>
                          <option value={120}>2小时</option>
                          <option value={480}>8小时</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">密码过期天数</label>
                        <select
                          value={settings.security.passwordExpiry}
                          onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value={30}>30天</option>
                          <option value={60}>60天</option>
                          <option value={90}>90天</option>
                          <option value={180}>180天</option>
                          <option value={0}>永不过期</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">登录失败次数限制</label>
                        <select
                          value={settings.security.loginAttempts}
                          onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value={3}>3次</option>
                          <option value={5}>5次</option>
                          <option value={10}>10次</option>
                          <option value={0}>无限制</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-bold text-gray-900">设备信任</h4>
                          <p className="text-sm text-gray-600 font-medium">记住受信任的设备</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.deviceTrust}
                            onChange={(e) => updateSetting('security', 'deviceTrust', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 登录历史 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">最近登录记录</h3>
                    <div className="space-y-4">
                      {[
                        { device: 'Chrome on Windows', location: '北京市', time: '2024-06-10 09:15', status: 'success' },
                        { device: 'Safari on iPhone', location: '上海市', time: '2024-06-09 18:30', status: 'success' },
                        { device: 'Firefox on macOS', location: '深圳市', time: '2024-06-08 14:22', status: 'failed' }
                      ].map((login, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${login.status === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                              {login.status === 'success' ? (
                                <CheckCircle className={`w-5 h-5 text-emerald-600`} />
                              ) : (
                                <XCircle className={`w-5 h-5 text-red-600`} />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{login.device}</h4>
                              <p className="text-sm text-gray-600 font-medium">{login.location} • {login.time}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            login.status === 'success' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {login.status === 'success' ? '成功' : '失败'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 外观设置 */}
            {activeSection === 'appearance' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">外观设置</h2>
                    <p className="text-gray-600 font-medium">自定义界面外观和主题</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 主题选择 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">主题模式</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {themes.map(theme => (
                        <div
                          key={theme.id}
                          onClick={() => updateSetting('appearance', 'theme', theme.id)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            settings.appearance.theme === theme.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`w-full h-24 ${theme.preview} rounded-xl mb-4 border border-gray-200`}></div>
                          <h4 className="font-black text-gray-900 text-center">{theme.name}</h4>
                          {settings.appearance.theme === theme.id && (
                            <div className="flex justify-center mt-2">
                              <Check className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 主色调 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">主色调</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {primaryColors.map(color => (
                        <div
                          key={color.id}
                          onClick={() => updateSetting('appearance', 'primaryColor', color.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            settings.appearance.primaryColor === color.id
                              ? 'border-gray-400 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`w-12 h-12 ${color.color} rounded-xl mx-auto mb-3`}></div>
                          <p className="text-sm font-bold text-gray-900 text-center">{color.name}</p>
                          {settings.appearance.primaryColor === color.id && (
                            <div className="flex justify-center mt-2">
                              <Check className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 界面选项 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">界面选项</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">字体大小</label>
                        <select
                          value={settings.appearance.fontSize}
                          onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value="small">小</option>
                          <option value="medium">中</option>
                          <option value="large">大</option>
                          <option value="extra-large">特大</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        {[
                          { key: 'sidebarCollapsed', label: '侧边栏默认收起', description: '启动时收起侧边栏' },
                          { key: 'compactMode', label: '紧凑模式', description: '减少界面元素间距' },
                          { key: 'animations', label: '动画效果', description: '启用界面动画和过渡效果' },
                          { key: 'highContrast', label: '高对比度', description: '提高界面对比度' }
                        ].map(({ key, label, description }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h4 className="font-bold text-gray-900">{label}</h4>
                              <p className="text-sm text-gray-600 font-medium">{description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(settings.appearance[key as keyof typeof settings.appearance])}
                                onChange={(e) => updateSetting('appearance', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 系统设置 */}
            {activeSection === 'system' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">系统设置</h2>
                    <p className="text-gray-600 font-medium">配置系统运行参数和性能选项</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 备份设置 */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Database className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">自动备份</h3>
                        <p className="text-sm text-gray-600 font-medium">定期备份系统数据</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200">
                        <div>
                          <h4 className="font-bold text-gray-900">启用自动备份</h4>
                          <p className="text-sm text-gray-600 font-medium">定期备份重要数据</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.system.autoBackup}
                            onChange={(e) => updateSetting('system', 'autoBackup', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">备份频率</label>
                        <select
                          value={settings.system.backupFrequency}
                          onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value="hourly">每小时</option>
                          <option value="daily">每天</option>
                          <option value="weekly">每周</option>
                          <option value="monthly">每月</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">存储位置</label>
                        <select
                          value={settings.system.storageLocation}
                          onChange={(e) => updateSetting('system', 'storageLocation', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value="local">本地存储</option>
                          <option value="cloud">云端存储</option>
                          <option value="both">本地+云端</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 性能设置 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">性能设置</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">缓存大小</label>
                        <select
                          value={settings.system.cacheSize}
                          onChange={(e) => updateSetting('system', 'cacheSize', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value="512MB">512MB</option>
                          <option value="1GB">1GB</option>
                          <option value="2GB">2GB</option>
                          <option value="4GB">4GB</option>
                          <option value="8GB">8GB</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">日志级别</label>
                        <select
                          value={settings.system.logLevel}
                          onChange={(e) => updateSetting('system', 'logLevel', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          <option value="error">错误</option>
                          <option value="warn">警告</option>
                          <option value="info">信息</option>
                          <option value="debug">调试</option>
                          <option value="trace">跟踪</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">API速率限制 (请求/分钟)</label>
                        <input
                          type="number"
                          value={settings.system.apiRateLimit}
                          onChange={(e) => updateSetting('system', 'apiRateLimit', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <div className="space-y-4">
                        {[
                          { key: 'debugMode', label: '调试模式', description: '启用调试模式和详细日志' },
                          { key: 'maintenanceMode', label: '维护模式', description: '启用系统维护模式' }
                        ].map(({ key, label, description }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h4 className="font-bold text-gray-900">{label}</h4>
                              <p className="text-sm text-gray-600 font-medium">{description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(settings.system[key as keyof typeof settings.system])}
                                onChange={(e) => updateSetting('system', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 系统信息 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">系统信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: '系统版本', value: 'v2.1.0', icon: Info },
                        { label: 'CPU使用率', value: '45%', icon: Cpu },
                        { label: '内存使用', value: '2.1GB / 8GB', icon: MemoryStick },
                        { label: '磁盘空间', value: '156GB / 500GB', icon: HardDrive }
                      ].map(({ label, value, icon: Icon }, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <h4 className="font-bold text-gray-900">{label}</h4>
                          </div>
                          <p className="text-2xl font-black text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 系统操作 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">系统操作</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button
                        onClick={() => showConfirm('clearCache')}
                        className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 text-left"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-amber-100 rounded-lg">
                          <RefreshCw className="w-5 h-5 text-amber-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">清除缓存</h4>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">清除系统缓存和临时文件</p>
                      </button>
                      
                      <button
                        onClick={() => showConfirm('exportData')}
                        className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 text-left"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">导出数据</h4>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">导出系统配置和用户数据</p>
                      </button>
                      
                      <button className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl hover:from-emerald-100 hover:to-green-100 transition-all duration-300 text-left">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Activity className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">系统检查</h4>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">检查系统健康状态和性能</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 集成配置 */}
            {activeSection === 'integrations' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Link className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">集成配置</h2>
                    <p className="text-gray-600 font-medium">配置第三方服务和API集成</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 邮件服务 */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">邮件服务</h3>
                        <p className="text-sm text-gray-600 font-medium">配置SMTP邮件发送服务</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">SMTP主机</label>
                        <input
                          type="text"
                          value={settings.integrations.email.host}
                          onChange={(e) => updateSetting('integrations', 'email', {...settings.integrations.email, host: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">端口</label>
                        <input
                          type="number"
                          value={settings.integrations.email.port}
                          onChange={(e) => updateSetting('integrations', 'email', {...settings.integrations.email, port: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">用户名</label>
                        <input
                          type="text"
                          value={settings.integrations.email.username}
                          onChange={(e) => updateSetting('integrations', 'email', {...settings.integrations.email, username: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200">
                        <div>
                          <h4 className="font-bold text-gray-900">启用SSL</h4>
                          <p className="text-sm text-gray-600 font-medium">使用SSL加密连接</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.integrations.email.ssl}
                            onChange={(e) => updateSetting('integrations', 'email', {...settings.integrations.email, ssl: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-4">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-bold">
                        <Mail className="w-5 h-5 mr-2 inline" />
                        测试连接
                      </button>
                      <button className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors duration-300 font-bold">
                        <Save className="w-5 h-5 mr-2 inline" />
                        保存配置
                      </button>
                    </div>
                  </div>

                  {/* 支付服务 */}
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-emerald-100 rounded-xl">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">支付服务</h3>
                        <p className="text-sm text-gray-600 font-medium">配置在线支付接口</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {/* Stripe */}
                      <div className="p-4 bg-white rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-purple-600">S</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Stripe</h4>
                              <p className="text-sm text-gray-600 font-medium">国际信用卡支付</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.integrations.payment.stripe.enabled}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                stripe: {...settings.integrations.payment.stripe, enabled: e.target.checked}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        {settings.integrations.payment.stripe.enabled && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">公钥</label>
                            <input
                              type="text"
                              value={settings.integrations.payment.stripe.publicKey}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                stripe: {...settings.integrations.payment.stripe, publicKey: e.target.value}
                              })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                              placeholder="pk_test_..."
                            />
                          </div>
                        )}
                      </div>

                      {/* 支付宝 */}
                      <div className="p-4 bg-white rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">支</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">支付宝</h4>
                              <p className="text-sm text-gray-600 font-medium">支付宝在线支付</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.integrations.payment.alipay.enabled}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                alipay: {...settings.integrations.payment.alipay, enabled: e.target.checked}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        {settings.integrations.payment.alipay.enabled && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">应用ID</label>
                            <input
                              type="text"
                              value={settings.integrations.payment.alipay.appId}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                alipay: {...settings.integrations.payment.alipay, appId: e.target.value}
                              })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                              placeholder="2021..."
                            />
                          </div>
                        )}
                      </div>

                      {/* 微信支付 */}
                      <div className="p-4 bg-white rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-green-600">微</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">微信支付</h4>
                              <p className="text-sm text-gray-600 font-medium">微信在线支付</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.integrations.payment.wechat.enabled}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                wechat: {...settings.integrations.payment.wechat, enabled: e.target.checked}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        {settings.integrations.payment.wechat.enabled && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">应用ID</label>
                            <input
                              type="text"
                              value={settings.integrations.payment.wechat.appId}
                              onChange={(e) => updateSetting('integrations', 'payment', {
                                ...settings.integrations.payment,
                                wechat: {...settings.integrations.payment.wechat, appId: e.target.value}
                              })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                              placeholder="wx..."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 分析服务 */}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">数据分析</h3>
                        <p className="text-sm text-gray-600 font-medium">配置网站分析和统计服务</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* Google Analytics */}
                      <div className="p-4 bg-white rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-red-600">G</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Google Analytics</h4>
                              <p className="text-sm text-gray-600 font-medium">网站访问统计分析</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.integrations.analytics.google.enabled}
                              onChange={(e) => updateSetting('integrations', 'analytics', {
                                ...settings.integrations.analytics,
                                google: {...settings.integrations.analytics.google, enabled: e.target.checked}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        {settings.integrations.analytics.google.enabled && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">跟踪ID</label>
                            <input
                              type="text"
                              value={settings.integrations.analytics.google.trackingId}
                              onChange={(e) => updateSetting('integrations', 'analytics', {
                                ...settings.integrations.analytics,
                                google: {...settings.integrations.analytics.google, trackingId: e.target.value}
                              })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
                              placeholder="GA-..."
                            />
                          </div>
                        )}
                      </div>

                      {/* 百度统计 */}
                      <div className="p-4 bg-white rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">百</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">百度统计</h4>
                              <p className="text-sm text-gray-600 font-medium">百度网站统计分析</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.integrations.analytics.baidu.enabled}
                              onChange={(e) => updateSetting('integrations', 'analytics', {
                                ...settings.integrations.analytics,
                                baidu: {...settings.integrations.analytics.baidu, enabled: e.target.checked}
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        {settings.integrations.analytics.baidu.enabled && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">站点ID</label>
                            <input
                              type="text"
                              value={settings.integrations.analytics.baidu.siteId}
                              onChange={(e) => updateSetting('integrations', 'analytics', {
                                ...settings.integrations.analytics,
                                baidu: {...settings.integrations.analytics.baidu, siteId: e.target.value}
                              })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
                              placeholder="站点ID"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 备份恢复 */}
            {activeSection === 'backup' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">备份恢复</h2>
                    <p className="text-gray-600 font-medium">管理系统数据备份和恢复</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 备份状态 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-black text-gray-900">最近备份</h3>
                      </div>
                      <p className="text-2xl font-black text-emerald-600 mb-2">2024-06-10</p>
                      <p className="text-sm text-gray-600 font-medium">09:30 AM</p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <HardDrive className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-black text-gray-900">备份大小</h3>
                      </div>
                      <p className="text-2xl font-black text-blue-600 mb-2">2.3 GB</p>
                      <p className="text-sm text-gray-600 font-medium">压缩后</p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Cloud className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-black text-gray-900">存储位置</h3>
                      </div>
                      <p className="text-2xl font-black text-purple-600 mb-2">云端</p>
                      <p className="text-sm text-gray-600 font-medium">自动同步</p>
                    </div>
                  </div>

                  {/* 备份操作 */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                    <h3 className="text-lg font-black text-gray-900 mb-6">备份操作</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button className="p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-left group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                            <Download className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-lg">立即备份</h4>
                            <p className="text-sm text-gray-600 font-medium">创建完整系统备份</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold">
                          <span>开始备份</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </button>

                      <button className="p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-left group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors duration-300">
                            <Upload className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-lg">恢复备份</h4>
                            <p className="text-sm text-gray-600 font-medium">从备份文件恢复系统</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-emerald-600 font-bold">
                          <span>选择备份</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 备份历史 */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-6">备份历史</h3>
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-4 text-left text-sm font-black text-gray-900 uppercase tracking-wider">备份时间</th>
                              <th className="px-6 py-4 text-left text-sm font-black text-gray-900 uppercase tracking-wider">类型</th>
                              <th className="px-6 py-4 text-left text-sm font-black text-gray-900 uppercase tracking-wider">大小</th>
                              <th className="px-6 py-4 text-left text-sm font-black text-gray-900 uppercase tracking-wider">状态</th>
                              <th className="px-6 py-4 text-left text-sm font-black text-gray-900 uppercase tracking-wider">操作</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {[
                              { time: '2024-06-10 09:30', type: '完整备份', size: '2.3 GB', status: 'success' },
                              { time: '2024-06-09 09:30', type: '增量备份', size: '156 MB', status: 'success' },
                              { time: '2024-06-08 09:30', type: '完整备份', size: '2.1 GB', status: 'success' },
                              { time: '2024-06-07 09:30', type: '增量备份', size: '89 MB', status: 'failed' },
                              { time: '2024-06-06 09:30', type: '完整备份', size: '2.0 GB', status: 'success' }
                            ].map((backup, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-bold text-gray-900">{backup.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                    backup.type === '完整备份' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {backup.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {backup.size}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                    backup.status === 'success' 
                                      ? 'bg-emerald-100 text-emerald-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {backup.status === 'success' ? (
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                    ) : (
                                      <X className="w-3 h-3 mr-1" />
                                    )}
                                    {backup.status === 'success' ? '成功' : '失败'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center space-x-3">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold">
                                      <Download className="w-4 h-4" />
                                    </button>
                                    <button className="text-emerald-600 hover:text-emerald-800 font-bold">
                                      <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-bold">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 系统日志 */}
            {activeSection === 'logs' && (
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <FileText className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">系统日志</h2>
                    <p className="text-gray-600 font-medium">查看系统运行日志和错误记录</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 日志筛选 */}
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">日志级别</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
                          <option>全部</option>
                          <option>错误</option>
                          <option>警告</option>
                          <option>信息</option>
                          <option>调试</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">时间范围</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
                          <option>今天</option>
                          <option>最近7天</option>
                          <option>最近30天</option>
                          <option>自定义</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">模块</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
                          <option>全部模块</option>
                          <option>用户管理</option>
                          <option>订单系统</option>
                          <option>支付模块</option>
                          <option>库存管理</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold">
                          <Filter className="w-5 h-5 mr-2 inline" />
                          筛选
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 日志统计 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { label: '错误', count: 12, color: 'red', icon: AlertTriangle },
                      { label: '警告', count: 45, color: 'amber', icon: AlertTriangle },
                      { label: '信息', count: 1234, color: 'blue', icon: Info },
                      { label: '调试', count: 5678, color: 'gray', icon: Bug }
                    ].map(({ label, count, color, icon: Icon }) => (
                      <div key={label} className={`p-6 bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-2xl border border-${color}-200`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 bg-${color}-100 rounded-lg`}>
                            <Icon className={`w-5 h-5 text-${color}-600`} />
                          </div>
                          <h3 className="font-black text-gray-900">{label}</h3>
                        </div>
                        <p className={`text-3xl font-black text-${color}-600`}>{count.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* 日志列表 */}
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900">最新日志</h3>
                        <div className="flex items-center space-x-3">
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-bold text-sm">
                            <RefreshCw className="w-4 h-4 mr-2 inline" />
                            刷新
                          </button>
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 font-bold text-sm">
                            <Download className="w-4 h-4 mr-2 inline" />
                            导出
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      <div className="space-y-1">
                        {[
                          { time: '2024-06-10 14:30:25', level: 'error', module: '支付模块', message: '支付接口连接超时', details: 'Payment gateway timeout after 30 seconds' },
                          { time: '2024-06-10 14:28:15', level: 'warn', module: '库存管理', message: '商品库存不足警告', details: 'Product ID: PRD-001, Current stock: 5' },
                          { time: '2024-06-10 14:25:42', level: 'info', module: '用户管理', message: '用户登录成功', details: 'User: zhangsan@company.com, IP: 192.168.1.100' },
                          { time: '2024-06-10 14:23:18', level: 'info', module: '订单系统', message: '新订单创建', details: 'Order ID: ORD-20240610-001, Amount: ¥299.00' },
                          { time: '2024-06-10 14:20:33', level: 'debug', module: '系统核心', message: '定时任务执行', details: 'Cron job: data_cleanup executed successfully' },
                          { time: '2024-06-10 14:18:07', level: 'error', module: '邮件服务', message: 'SMTP连接失败', details: 'Failed to connect to smtp.company.com:587' },
                          { time: '2024-06-10 14:15:22', level: 'warn', module: '安全模块', message: '异常登录尝试', details: 'Multiple failed login attempts from IP: 203.0.113.1' },
                          { time: '2024-06-10 14:12:45', level: 'info', module: '数据备份', message: '自动备份完成', details: 'Backup size: 2.3GB, Duration: 5m 32s' }
                        ].map((log, index) => (
                          <div key={index} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <span className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full ${
                                  log.level === 'error' ? 'bg-red-100 text-red-700' :
                                  log.level === 'warn' ? 'bg-amber-100 text-amber-700' :
                                  log.level === 'info' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {log.level.toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-1">
                                  <span className="text-sm font-bold text-gray-900">{log.time}</span>
                                  <span className="text-sm font-medium text-gray-600">{log.module}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">{log.message}</p>
                                <p className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">{log.details}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                  <ExternalLink className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 确认对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full border border-white/40">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">确认操作</h3>
              <p className="text-gray-600 mb-8 font-medium">
                {confirmAction === 'reset' && '确定要重置所有设置吗？此操作将恢复默认配置。'}
                {confirmAction === 'clearCache' && '确定要清除系统缓存吗？这可能会暂时影响系统性能。'}
                {confirmAction === 'exportData' && '确定要导出系统数据吗？这可能需要一些时间。'}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 px-6 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md shadow-amber-200 font-bold"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 快捷帮助 */}
      <div className="fixed bottom-8 right-8">
        <button className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-purple-200">
          <Info className="w-8 h-8" />
        </button>
      </div>

      {/* 设置保存成功提示 */}
      {!hasChanges && !isLoading && (
        <div className="fixed top-8 right-8 z-40">
          <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl shadow-lg flex items-center space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">设置已保存</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SystemSettings


