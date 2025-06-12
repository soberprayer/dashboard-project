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
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 overflow-auto">
      <div className="h-full flex flex-col space-y-6">
        {/* 快速状态栏 */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">{settings.profile.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{settings.profile.name}</h2>
                    <p className="text-blue-100 font-medium">{settings.profile.title}</p>
                  </div>
                </div>
              </div>
              
              {/* 系统状态指标 */}
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                  <div className="text-lg font-black text-white">128</div>
                  <div className="text-xs text-blue-100 font-medium">授权用户</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                  <div className="text-lg font-black text-white">99.9%</div>
                  <div className="text-xs text-blue-100 font-medium">可用性</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                  <div className="text-lg font-black text-white">2.1GB</div>
                  <div className="text-xs text-blue-100 font-medium">数据使用</div>
                </div>
                
                {/* 操作按钮 */}
                {hasChanges && (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-amber-500/20 backdrop-blur-sm rounded-2xl border border-amber-300/30">
                      <AlertTriangle className="w-4 h-4 text-amber-200" />
                      <span className="text-xs font-bold text-amber-200">有未保存更改</span>
                    </div>
                    <button
                      onClick={() => showConfirm('reset')}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 font-bold text-sm border border-white/30"
                    >
                      <RefreshCw className="w-4 h-4 mr-1 inline" />
                      重置
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      disabled={isLoading}
                      className="px-6 py-2 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg font-bold text-sm disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-1 inline-block" />
                      ) : (
                        <Save className="w-4 h-4 mr-1 inline" />
                      )}
                      保存
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          {/* 设置导航 */}
          <div className="col-span-12 lg:col-span-3">
            <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="relative mb-6">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索设置..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                  />
                </div>
                <nav className="flex-1 space-y-2 overflow-y-auto">
                  {settingsSections.map(({ id, name, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 font-bold ${
                        activeSection === id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:transform hover:scale-105'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* 设置内容 */}
          <div className="col-span-12 lg:col-span-9">
            <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="h-full overflow-y-auto">
                {/* 个人资料 */}
                {activeSection === 'profile' && (
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">个人资料</h2>
                        <p className="text-gray-600 font-medium text-lg">管理您的个人信息和偏好设置</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 头像设置 */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                        <div className="flex items-center space-x-8">
                          <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                              <span className="text-4xl font-black text-white">{settings.profile.name.charAt(0)}</span>
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-3 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                              <Camera className="w-6 h-6 text-gray-600" />
                            </button>
                          </div>
                          <div>
                            <h3 className="font-black text-gray-900 text-2xl mb-2">{settings.profile.name}</h3>
                            <p className="text-gray-600 font-medium text-lg mb-4">{settings.profile.title}</p>
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-bold shadow-lg">
                              <Upload className="w-5 h-5 mr-2 inline" />
                              上传头像
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 基本信息 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { key: 'name', label: '姓名', type: 'text' },
                          { key: 'title', label: '职位', type: 'text' },
                          { key: 'email', label: '邮箱', type: 'email' },
                          { key: 'phone', label: '电话', type: 'tel' },
                          { key: 'department', label: '部门', type: 'text' },
                          { key: 'location', label: '位置', type: 'text' }
                        ].map(({ key, label, type }) => (
                          <div key={key} className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">{label}</label>
                            <input
                              type={type}
                              value={settings.profile[key as keyof typeof settings.profile] as string}
                              onChange={(e) => updateSetting('profile', key, e.target.value)}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg transition-all duration-300"
                            />
                          </div>
                        ))}
                      </div>

                      {/* 地区设置 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">时区</label>
                          <select
                            value={settings.profile.timezone}
                            onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                          >
                            {timezones.map(tz => (
                              <option key={tz.id} value={tz.id}>{tz.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">语言</label>
                          <select
                            value={settings.profile.language}
                            onChange={(e) => updateSetting('profile', 'language', e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                          >
                            {languages.map(lang => (
                              <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
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
                      <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                        <Bell className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">通知设置</h2>
                        <p className="text-gray-600 font-medium text-lg">管理您的通知偏好和提醒方式</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 通知方式 */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">通知方式</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { key: 'email', label: '邮件通知', icon: Mail, description: '通过邮件接收重要通知' },
                            { key: 'push', label: '推送通知', icon: Bell, description: '浏览器推送通知' },
                            { key: 'sms', label: '短信通知', icon: Phone, description: '通过短信接收紧急通知' },
                            { key: 'desktop', label: '桌面通知', icon: Monitor, description: '系统桌面通知' }
                          ].map(({ key, label, icon: Icon, description }) => (
                            <div key={key} className="bg-white p-6 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="p-3 bg-amber-100 rounded-xl">
                                    <Icon className="w-6 h-6 text-amber-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                                    <p className="text-gray-600 font-medium">{description}</p>
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={settings.notifications[key as keyof typeof settings.notifications]}
                                    onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 通知类型 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">通知类型</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'orderUpdates', label: '订单更新', description: '订单状态变更时通知' },
                            { key: 'systemAlerts', label: '系统警报', description: '系统异常和错误通知' },
                            { key: 'marketingEmails', label: '营销邮件', description: '产品推广和活动信息' },
                            { key: 'weeklyReports', label: '周报', description: '每周数据统计报告' },
                            { key: 'securityAlerts', label: '安全警报', description: '账户安全相关通知' },
                            { key: 'maintenanceNotices', label: '维护通知', description: '系统维护和更新通知' }
                          ].map(({ key, label, description }) => (
                            <div key={key} className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg">
                              <div>
                                <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                                <p className="text-gray-600 font-medium">{description}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={settings.notifications[key as keyof typeof settings.notifications]}
                                  onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
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
                      <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">安全设置</h2>
                        <p className="text-gray-600 font-medium text-lg">保护您的账户和数据安全</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 密码设置 */}
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 border border-red-100">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-3 bg-red-100 rounded-xl">
                            <Lock className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-black text-gray-900 text-2xl">密码安全</h3>
                            <p className="text-gray-600 font-medium">管理您的登录密码</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">当前密码</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="输入当前密码"
                                className="w-full px-6 py-4 pr-14 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-lg"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">新密码</label>
                            <input
                              type="password"
                              placeholder="输入新密码"
                              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-lg"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg">
                            <Key className="w-6 h-6 mr-2 inline" />
                            更新密码
                          </button>
                        </div>
                      </div>

                      {/* 双因素认证 */}
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-100">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                              <Shield className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-black text-gray-900 text-2xl">双因素认证</h3>
                              <p className="text-gray-600 font-medium">为您的账户添加额外的安全保护</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.twoFactorAuth}
                              onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                        {settings.security.twoFactorAuth && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-emerald-200 shadow-lg">
                              <Smartphone className="w-8 h-8 text-emerald-600" />
                              <div className="flex-1">
                                <h4 className="font-black text-gray-900 text-lg">身份验证器应用</h4>
                                <p className="text-gray-600 font-medium">使用Google Authenticator或类似应用</p>
                              </div>
                              <button className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl hover:bg-emerald-200 transition-all duration-300 font-bold">
                                配置
                              </button>
                            </div>
                            <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-emerald-200 shadow-lg">
                              <Phone className="w-8 h-8 text-emerald-600" />
                              <div className="flex-1">
                                <h4 className="font-black text-gray-900 text-lg">短信验证</h4>
                                <p className="text-gray-600 font-medium">通过短信接收验证码</p>
                              </div>
                              <button className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl hover:bg-emerald-200 transition-all duration-300 font-bold">
                                设置
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 安全选项 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">安全选项</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">会话超时 (分钟)</label>
                            <select
                              value={settings.security.sessionTimeout}
                              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                            >
                              <option value={15}>15分钟</option>
                              <option value={30}>30分钟</option>
                              <option value={60}>1小时</option>
                              <option value={120}>2小时</option>
                              <option value={480}>8小时</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">密码过期天数</label>
                            <select
                              value={settings.security.passwordExpiry}
                              onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                            >
                              <option value={30}>30天</option>
                              <option value={60}>60天</option>
                              <option value={90}>90天</option>
                              <option value={180}>180天</option>
                              <option value={0}>永不过期</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 登录历史 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">最近登录记录</h3>
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                          <div className="space-y-1">
                            {[
                              { device: 'Chrome on Windows', location: '北京市', time: '2024-06-10 09:15', status: 'success' },
                              { device: 'Safari on iPhone', location: '上海市', time: '2024-06-09 18:30', status: 'success' },
                              { device: 'Firefox on macOS', location: '深圳市', time: '2024-06-08 14:22', status: 'failed' }
                            ].map((login, index) => (
                              <div key={index} className="flex items-center justify-between p-6 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-3 rounded-2xl ${login.status === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                    {login.status === 'success' ? (
                                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    ) : (
                                      <XCircle className="w-6 h-6 text-red-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-lg">{login.device}</h4>
                                    <p className="text-gray-600 font-medium">{login.location} • {login.time}</p>
                                  </div>
                                </div>
                                <span className={`px-4 py-2 text-sm font-black rounded-2xl ${
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
                  </div>
                )}

                {/* 外观设置 */}
                {activeSection === 'appearance' && (
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">外观设置</h2>
                        <p className="text-gray-600 font-medium text-lg">自定义界面外观和主题</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 主题选择 */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">主题模式</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {themes.map(theme => (
                            <div
                              key={theme.id}
                              onClick={() => updateSetting('appearance', 'theme', theme.id)}
                              className={`p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                settings.appearance.theme === theme.id
                                  ? 'border-purple-500 bg-purple-50 shadow-xl'
                                  : 'border-gray-200 hover:border-gray-300 bg-white shadow-lg'
                              }`}
                            >
                              <div className={`w-full h-32 ${theme.preview} rounded-2xl mb-6 border border-gray-200 shadow-inner`}></div>
                              <h4 className="font-black text-gray-900 text-center text-xl">{theme.name}</h4>
                              {settings.appearance.theme === theme.id && (
                                <div className="flex justify-center mt-4">
                                  <Check className="w-6 h-6 text-purple-600" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 主色调 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">主色调</h3>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                          {primaryColors.map(color => (
                            <div
                              key={color.id}
                              onClick={() => updateSetting('appearance', 'primaryColor', color.id)}
                              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                settings.appearance.primaryColor === color.id
                                  ? 'border-gray-400 bg-gray-50 shadow-xl'
                                  : 'border-gray-200 hover:border-gray-300 bg-white shadow-lg'
                              }`}
                            >
                              <div className={`w-16 h-16 ${color.color} rounded-2xl mx-auto mb-4 shadow-lg`}></div>
                              <p className="text-sm font-black text-gray-900 text-center">{color.name}</p>
                              {settings.appearance.primaryColor === color.id && (
                                <div className="flex justify-center mt-3">
                                  <Check className="w-5 h-5 text-gray-600" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 界面选项 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">界面选项</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">字体大小</label>
                            <select
                              value={settings.appearance.fontSize}
                              onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                            >
                              <option value="small">小</option>
                              <option value="medium">中</option>
                              <option value="large">大</option>
                              <option value="extra-large">特大</option>
                            </select>
                          </div>
                          <div className="space-y-6">
                            {[
                              { key: 'sidebarCollapsed', label: '侧边栏默认收起', description: '启动时收起侧边栏' },
                              { key: 'compactMode', label: '紧凑模式', description: '减少界面元素间距' },
                              { key: 'animations', label: '动画效果', description: '启用界面动画和过渡效果' },
                              { key: 'highContrast', label: '高对比度', description: '提高界面对比度' }
                            ].map(({ key, label, description }) => (
                              <div key={key} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <div>
                                  <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                                  <p className="text-gray-600 font-medium">{description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(settings.appearance[key as keyof typeof settings.appearance])}
                                    onChange={(e) => updateSetting('appearance', key, e.target.checked)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
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
                      <div className="p-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl shadow-lg">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">系统设置</h2>
                        <p className="text-gray-600 font-medium text-lg">配置系统运行参数和性能选项</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 系统信息 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: '系统版本', value: 'v2.1.0', icon: Info, color: 'blue' },
                          { label: 'CPU使用率', value: '45%', icon: Cpu, color: 'emerald' },
                          { label: '内存使用', value: '2.1GB / 8GB', icon: MemoryStick, color: 'amber' },
                          { label: '磁盘空间', value: '156GB / 500GB', icon: HardDrive, color: 'purple' }
                        ].map(({ label, value, icon: Icon, color }, index) => (
                          <div key={index} className={`p-6 bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-3xl border border-${color}-200 shadow-lg`}>
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`p-3 bg-${color}-100 rounded-2xl`}>
                                <Icon className={`w-6 h-6 text-${color}-600`} />
                              </div>
                              <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                            </div>
                            <p className={`text-3xl font-black text-${color}-600`}>{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* 系统操作 */}
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-3xl p-8 border border-gray-200">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">系统操作</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <button
                            onClick={() => showConfirm('clearCache')}
                            className="p-8 bg-white border border-amber-200 rounded-3xl hover:bg-amber-50 transition-all duration-300 text-left group shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-4 bg-amber-100 rounded-2xl group-hover:bg-amber-200 transition-colors duration-300">
                                <RefreshCw className="w-8 h-8 text-amber-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-xl">清除缓存</h4>
                            </div>
                            <p className="text-gray-600 font-medium">清除系统缓存和临时文件</p>
                          </button>
                          
                          <button
                            onClick={() => showConfirm('exportData')}
                            className="p-8 bg-white border border-blue-200 rounded-3xl hover:bg-blue-50 transition-all duration-300 text-left group shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                                <Download className="w-8 h-8 text-blue-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-xl">导出数据</h4>
                            </div>
                            <p className="text-gray-600 font-medium">导出系统配置和用户数据</p>
                          </button>
                          
                          <button className="p-8 bg-white border border-emerald-200 rounded-3xl hover:bg-emerald-50 transition-all duration-300 text-left group shadow-lg hover:shadow-xl transform hover:scale-105">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-emerald-200 transition-colors duration-300">
                                <Activity className="w-8 h-8 text-emerald-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-xl">系统检查</h4>
                            </div>
                            <p className="text-gray-600 font-medium">检查系统健康状态和性能</p>
                          </button>
                        </div>
                      </div>

                      {/* 系统配置 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">系统配置</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">备份频率</label>
                            <select
                              value={settings.system.backupFrequency}
                              onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                            >
                              <option value="hourly">每小时</option>
                              <option value="daily">每天</option>
                              <option value="weekly">每周</option>
                              <option value="monthly">每月</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">日志级别</label>
                            <select
                              value={settings.system.logLevel}
                              onChange={(e) => updateSetting('system', 'logLevel', e.target.value)}
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                            >
                              <option value="error">错误</option>
                              <option value="warn">警告</option>
                              <option value="info">信息</option>
                              <option value="debug">调试</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 集成配置 */}
                {activeSection === 'integrations' && (
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                        <Link className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">集成配置</h2>
                        <p className="text-gray-600 font-medium text-lg">管理第三方服务集成</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 支付集成 */}
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">支付服务</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'stripe', label: 'Stripe', description: '国际信用卡支付' },
                            { key: 'alipay', label: '支付宝', description: '支付宝在线支付' },
                            { key: 'wechat', label: '微信支付', description: '微信支付服务' }
                          ].map(({ key, label, description }) => (
                            <div key={key} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-emerald-200 shadow-lg">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                  <CreditCard className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                  <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                                  <p className="text-gray-600 font-medium">{description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 text-sm font-bold rounded-2xl ${
                                  settings.integrations.payment[key as keyof typeof settings.integrations.payment].enabled
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {settings.integrations.payment[key as keyof typeof settings.integrations.payment].enabled ? '已启用' : '已禁用'}
                                </span>
                                <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-2xl hover:bg-emerald-200 transition-all duration-300 font-bold">
                                  配置
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 分析服务 */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">数据分析</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'google', label: 'Google Analytics', description: '网站流量分析' },
                            { key: 'baidu', label: '百度统计', description: '中国地区数据分析' }
                          ].map(({ key, label, description }) => (
                            <div key={key} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-blue-200 shadow-lg">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                  <BarChart3 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-black text-gray-900 text-lg">{label}</h4>
                                  <p className="text-gray-600 font-medium">{description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 text-sm font-bold rounded-2xl ${
                                  settings.integrations.analytics[key as keyof typeof settings.integrations.analytics].enabled
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {settings.integrations.analytics[key as keyof typeof settings.integrations.analytics].enabled ? '已启用' : '已禁用'}
                                </span>
                                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-all duration-300 font-bold">
                                  配置
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 备份恢复 */}
                {activeSection === 'backup' && (
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">备份恢复</h2>
                        <p className="text-gray-600 font-medium text-lg">管理数据备份和恢复</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 备份状态 */}
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">备份状态</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-lg">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-3 bg-emerald-100 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-lg">最后备份</h4>
                            </div>
                            <p className="text-2xl font-black text-emerald-600 mb-2">2024-06-10</p>
                            <p className="text-gray-600 font-medium">14:30:25</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-lg">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-3 bg-blue-100 rounded-xl">
                                <HardDrive className="w-6 h-6 text-blue-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-lg">备份大小</h4>
                            </div>
                            <p className="text-2xl font-black text-blue-600 mb-2">2.3GB</p>
                            <p className="text-gray-600 font-medium">压缩后</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-lg">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-3 bg-purple-100 rounded-xl">
                                <Cloud className="w-6 h-6 text-purple-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-lg">存储位置</h4>
                            </div>
                            <p className="text-2xl font-black text-purple-600 mb-2">云存储</p>
                            <p className="text-gray-600 font-medium">AWS S3</p>
                          </div>
                        </div>
                      </div>

                      {/* 备份操作 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">备份操作</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <button className="p-8 bg-white border border-emerald-200 rounded-3xl hover:bg-emerald-50 transition-all duration-300 text-left group shadow-lg hover:shadow-xl transform hover:scale-105">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-emerald-200 transition-colors duration-300">
                                <Download className="w-8 h-8 text-emerald-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-xl">立即备份</h4>
                            </div>
                            <p className="text-gray-600 font-medium">创建当前系统的完整备份</p>
                          </button>
                          
                          <button className="p-8 bg-white border border-amber-200 rounded-3xl hover:bg-amber-50 transition-all duration-300 text-left group shadow-lg hover:shadow-xl transform hover:scale-105">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-4 bg-amber-100 rounded-2xl group-hover:bg-amber-200 transition-colors duration-300">
                                <Upload className="w-8 h-8 text-amber-600" />
                              </div>
                              <h4 className="font-black text-gray-900 text-xl">恢复数据</h4>
                            </div>
                            <p className="text-gray-600 font-medium">从备份文件恢复系统数据</p>
                          </button>
                        </div>
                      </div>

                      {/* 备份历史 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">备份历史</h3>
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                          <div className="space-y-1">
                            {[
                              { date: '2024-06-10', time: '14:30:25', size: '2.3GB', status: 'success' },
                              { date: '2024-06-09', time: '14:30:12', size: '2.1GB', status: 'success' },
                              { date: '2024-06-08', time: '14:30:08', size: '2.0GB', status: 'success' },
                              { date: '2024-06-07', time: '14:30:15', size: '1.9GB', status: 'failed' }
                            ].map((backup, index) => (
                              <div key={index} className="flex items-center justify-between p-6 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-3 rounded-2xl ${backup.status === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                    {backup.status === 'success' ? (
                                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    ) : (
                                      <XCircle className="w-6 h-6 text-red-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-lg">{backup.date}</h4>
                                    <p className="text-gray-600 font-medium">{backup.time} • {backup.size}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className={`px-4 py-2 text-sm font-black rounded-2xl ${
                                    backup.status === 'success' 
                                      ? 'bg-emerald-100 text-emerald-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {backup.status === 'success' ? '成功' : '失败'}
                                  </span>
                                  {backup.status === 'success' && (
                                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-all duration-300 font-bold">
                                      恢复
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
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
                      <div className="p-4 bg-gradient-to-r from-slate-500 to-gray-600 rounded-2xl shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">系统日志</h2>
                        <p className="text-gray-600 font-medium text-lg">查看系统运行日志和错误记录</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* 日志过滤 */}
                      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-2xl font-black text-gray-900">日志过滤</h3>
                          <button className="px-6 py-3 bg-gradient-to-r from-slate-500 to-gray-600 text-white rounded-2xl hover:from-slate-600 hover:to-gray-700 transition-all duration-300 font-bold shadow-lg">
                            <RefreshCw className="w-5 h-5 mr-2 inline" />
                            刷新日志
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">日志级别</label>
                            <select className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg">
                              <option value="all">全部</option>
                              <option value="error">错误</option>
                              <option value="warn">警告</option>
                              <option value="info">信息</option>
                              <option value="debug">调试</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">时间范围</label>
                            <select className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg">
                              <option value="today">今天</option>
                              <option value="week">本周</option>
                              <option value="month">本月</option>
                              <option value="all">全部</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">模块</label>
                            <select className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg">
                              <option value="all">全部模块</option>
                              <option value="auth">认证</option>
                              <option value="api">API</option>
                              <option value="database">数据库</option>
                              <option value="system">系统</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">搜索</label>
                            <div className="relative">
                              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                placeholder="搜索日志..."
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 日志列表 */}
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">日志记录</h3>
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                          <div className="space-y-1">
                            {[
                              { level: 'error', time: '2024-06-10 14:30:25', module: 'API', message: '数据库连接失败', details: 'Connection timeout after 30 seconds' },
                              { level: 'warn', time: '2024-06-10 14:28:15', module: 'Auth', message: '用户登录失败', details: 'Invalid credentials for user: admin' },
                              { level: 'info', time: '2024-06-10 14:25:10', module: 'System', message: '系统启动完成', details: 'All services initialized successfully' },
                              { level: 'debug', time: '2024-06-10 14:20:05', module: 'Database', message: '查询执行', details: 'SELECT * FROM users WHERE active = 1' }
                            ].map((log, index) => (
                              <div key={index} className="p-6 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-start space-x-4">
                                  <div className={`p-2 rounded-xl mt-1 ${
                                    log.level === 'error' ? 'bg-red-100' :
                                    log.level === 'warn' ? 'bg-amber-100' :
                                    log.level === 'info' ? 'bg-blue-100' :
                                    'bg-gray-100'
                                  }`}>
                                    {log.level === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                                    {log.level === 'warn' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                                    {log.level === 'info' && <Info className="w-5 h-5 text-blue-600" />}
                                    {log.level === 'debug' && <Bug className="w-5 h-5 text-gray-600" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-2">
                                      <span className={`px-3 py-1 text-xs font-black rounded-2xl uppercase ${
                                        log.level === 'error' ? 'bg-red-100 text-red-700' :
                                        log.level === 'warn' ? 'bg-amber-100 text-amber-700' :
                                        log.level === 'info' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                      }`}>
                                        {log.level}
                                      </span>
                                      <span className="text-sm font-bold text-gray-500">{log.time}</span>
                                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold">{log.module}</span>
                                    </div>
                                    <h4 className="font-black text-gray-900 text-lg mb-2">{log.message}</h4>
                                    <p className="text-gray-600 font-mono text-sm bg-gray-50 p-3 rounded-xl">{log.details}</p>
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
        </div>

        {/* 确认对话框 */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100 transform scale-100 transition-all duration-300">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">确认操作</h3>
                <p className="text-gray-600 mb-8 font-medium text-lg">
                  {confirmAction === 'reset' && '确定要重置所有设置吗？此操作将恢复默认配置。'}
                  {confirmAction === 'clearCache' && '确定要清除系统缓存吗？这可能会暂时影响系统性能。'}
                  {confirmAction === 'exportData' && '确定要导出系统数据吗？这可能需要一些时间。'}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1 px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-bold text-lg"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg font-bold text-lg"
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
          <button className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
            <Info className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings


