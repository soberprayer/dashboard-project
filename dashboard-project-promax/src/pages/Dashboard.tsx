import { useState, useEffect } from 'react'
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar,
  ScatterChart, Scatter, ComposedChart, Bar, LineChart, Line,
  BarChart, ReferenceLine, Treemap, FunnelChart, Funnel, LabelList,
  Brush, ReferenceArea, ErrorBar
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, 
  Download, Bell, Search, Settings, Menu, X,
  Eye, Globe, Smartphone, Target, Zap, Clock, Award, ArrowUp, ArrowDown,
  CheckCircle, Home, BarChart3, UserCheck, Package, Wallet, Cog,
  Calendar, Filter, RefreshCw, Star, Heart, MessageSquare, Shield,
  Server, Database, Cpu, HardDrive, Wifi, Signal, Monitor, Layers,
  TrendingUpDown, AlertTriangle, Info, ChevronUp, ChevronDown
} from 'lucide-react'

// 增强的模拟数据
const salesData = [
  { 
    month: '1月', sales: 45000, profit: 28000, orders: 340, growth: 12.5, target: 50000, lastYear: 38000,
    newCustomers: 120, returningCustomers: 220, avgOrderValue: 132, conversionRate: 3.2,
    mobileOrders: 153, desktopOrders: 187, refunds: 8, cancellations: 12
  },
  { 
    month: '2月', sales: 52000, profit: 31000, orders: 380, growth: 15.6, target: 48000, lastYear: 41000,
    newCustomers: 145, returningCustomers: 235, avgOrderValue: 137, conversionRate: 3.8,
    mobileOrders: 171, desktopOrders: 209, refunds: 11, cancellations: 9
  },
  { 
    month: '3月', sales: 48000, profit: 29000, orders: 360, growth: 6.7, target: 52000, lastYear: 45000,
    newCustomers: 138, returningCustomers: 222, avgOrderValue: 133, conversionRate: 3.1,
    mobileOrders: 162, desktopOrders: 198, refunds: 14, cancellations: 15
  },
  { 
    month: '4月', sales: 61000, profit: 38000, orders: 420, growth: 27.1, target: 55000, lastYear: 48000,
    newCustomers: 168, returningCustomers: 252, avgOrderValue: 145, conversionRate: 4.2,
    mobileOrders: 189, desktopOrders: 231, refunds: 9, cancellations: 7
  },
  { 
    month: '5月', sales: 55000, profit: 33000, orders: 390, growth: -9.8, target: 60000, lastYear: 61000,
    newCustomers: 152, returningCustomers: 238, avgOrderValue: 141, conversionRate: 3.6,
    mobileOrders: 175, desktopOrders: 215, refunds: 16, cancellations: 18
  },
  { 
    month: '6月', sales: 67000, profit: 42000, orders: 450, growth: 21.8, target: 58000, lastYear: 55000,
    newCustomers: 180, returningCustomers: 270, avgOrderValue: 149, conversionRate: 4.5,
    mobileOrders: 203, desktopOrders: 247, refunds: 12, cancellations: 8
  },
  { 
    month: '7月', sales: 59000, profit: 36000, orders: 410, growth: -11.9, target: 65000, lastYear: 67000,
    newCustomers: 165, returningCustomers: 245, avgOrderValue: 144, conversionRate: 3.9,
    mobileOrders: 184, desktopOrders: 226, refunds: 19, cancellations: 21
  },
  { 
    month: '8月', sales: 72000, profit: 45000, orders: 480, growth: 22.0, target: 62000, lastYear: 59000,
    newCustomers: 192, returningCustomers: 288, avgOrderValue: 150, conversionRate: 4.8,
    mobileOrders: 216, desktopOrders: 264, refunds: 10, cancellations: 6
  },
]

const deviceData = [
  { 
    name: '移动端', value: 45, color: '#6366F1', users: 12450, sessions: 8900, bounceRate: 32.1,
    avgSessionDuration: '4:32', pageViews: 3.2, newUsers: 3850, revenue: 45600,
    ios: 7200, android: 5250, browsers: { chrome: 4500, safari: 2800, firefox: 1100, other: 500 }
  },
  { 
    name: '桌面端', value: 35, color: '#8B5CF6', users: 9680, sessions: 7200, bounceRate: 28.5,
    avgSessionDuration: '6:18', pageViews: 4.8, newUsers: 2890, revenue: 38900,
    windows: 6800, mac: 2880, browsers: { chrome: 5200, edge: 2100, firefox: 1800, safari: 580 }
  },
  { 
    name: '平板端', value: 20, color: '#06B6D4', users: 5540, sessions: 4100, bounceRate: 35.8,
    avgSessionDuration: '3:45', pageViews: 2.9, newUsers: 1680, revenue: 22800,
    ipad: 3200, android: 2340, browsers: { chrome: 2800, safari: 1900, firefox: 400, other: 340 }
  },
]

const realtimeData = [
  { 
    time: '00:00', users: 1200, sessions: 890, pageViews: 3400, revenue: 12000, conversion: 2.1,
    newUsers: 340, returningUsers: 860, bounceRate: 45.2, avgSessionDuration: 285,
    orderValue: 145, checkouts: 28, abandonment: 62.5, mobileUsers: 720, desktopUsers: 480
  },
  { 
    time: '02:00', users: 950, sessions: 720, pageViews: 2800, revenue: 9500, conversion: 1.8,
    newUsers: 280, returningUsers: 670, bounceRate: 48.1, avgSessionDuration: 265,
    orderValue: 138, checkouts: 22, abandonment: 65.8, mobileUsers: 570, desktopUsers: 380
  },
  { 
    time: '04:00', users: 800, sessions: 620, pageViews: 2100, revenue: 7800, conversion: 1.5,
    newUsers: 230, returningUsers: 570, bounceRate: 52.3, avgSessionDuration: 245,
    orderValue: 132, checkouts: 18, abandonment: 68.9, mobileUsers: 480, desktopUsers: 320
  },
  { 
    time: '06:00', users: 1100, sessions: 850, pageViews: 3200, revenue: 11200, conversion: 2.0,
    newUsers: 320, returningUsers: 780, bounceRate: 42.8, avgSessionDuration: 295,
    orderValue: 142, checkouts: 26, abandonment: 59.2, mobileUsers: 660, desktopUsers: 440
  },
  { 
    time: '08:00', users: 2400, sessions: 1800, pageViews: 6200, revenue: 28000, conversion: 3.2,
    newUsers: 720, returningUsers: 1680, bounceRate: 35.6, avgSessionDuration: 345,
    orderValue: 156, checkouts: 58, abandonment: 48.3, mobileUsers: 1440, desktopUsers: 960
  },
  { 
    time: '10:00', users: 3100, sessions: 2300, pageViews: 8100, revenue: 35000, conversion: 3.8,
    newUsers: 930, returningUsers: 2170, bounceRate: 32.1, avgSessionDuration: 385,
    orderValue: 162, checkouts: 75, abandonment: 42.7, mobileUsers: 1860, desktopUsers: 1240
  },
  { 
    time: '12:00', users: 3200, sessions: 2400, pageViews: 8900, revenue: 42000, conversion: 4.1,
    newUsers: 960, returningUsers: 2240, bounceRate: 29.8, avgSessionDuration: 425,
    orderValue: 168, checkouts: 82, abandonment: 38.9, mobileUsers: 1920, desktopUsers: 1280
  },
  { 
    time: '14:00', users: 3000, sessions: 2250, pageViews: 8200, revenue: 38000, conversion: 3.9,
    newUsers: 900, returningUsers: 2100, bounceRate: 31.2, avgSessionDuration: 405,
    orderValue: 165, checkouts: 78, abandonment: 41.2, mobileUsers: 1800, desktopUsers: 1200
  },
  { 
    time: '16:00', users: 2800, sessions: 2100, pageViews: 7600, revenue: 33000, conversion: 3.5,
    newUsers: 840, returningUsers: 1960, bounceRate: 33.8, avgSessionDuration: 375,
    orderValue: 158, checkouts: 68, abandonment: 45.6, mobileUsers: 1680, desktopUsers: 1120
  },
  { 
    time: '18:00', users: 2200, sessions: 1650, pageViews: 6000, revenue: 25000, conversion: 3.0,
    newUsers: 660, returningUsers: 1540, bounceRate: 38.5, avgSessionDuration: 325,
    orderValue: 152, checkouts: 52, abandonment: 52.3, mobileUsers: 1320, desktopUsers: 880
  },
  { 
    time: '20:00', users: 1800, sessions: 1350, pageViews: 4800, revenue: 18000, conversion: 2.5,
    newUsers: 540, returningUsers: 1260, bounceRate: 41.7, avgSessionDuration: 305,
    orderValue: 148, checkouts: 38, abandonment: 58.7, mobileUsers: 1080, desktopUsers: 720
  },
  { 
    time: '22:00', users: 1400, sessions: 1050, pageViews: 3900, revenue: 14000, conversion: 2.2,
    newUsers: 420, returningUsers: 980, bounceRate: 44.3, avgSessionDuration: 285,
    orderValue: 142, checkouts: 32, abandonment: 61.8, mobileUsers: 840, desktopUsers: 560
  },
]

const performanceData = [
  { 
    name: '页面加载速度', value: 85, maxValue: 100, fill: '#10B981', description: '平均 2.3s', trend: '+5%',
    details: { fcp: 1.2, lcp: 2.3, fid: 45, cls: 0.08, ttfb: 0.8 }
  },
  { 
    name: '用户体验评分', value: 92, maxValue: 100, fill: '#6366F1', description: '4.6/5.0', trend: '+2%',
    details: { navigation: 4.8, search: 4.5, checkout: 4.4, support: 4.7, overall: 4.6 }
  },
  { 
    name: 'SEO优化得分', value: 78, maxValue: 100, fill: '#F59E0B', description: '78/100', trend: '+12%',
    details: { keywords: 85, content: 82, technical: 75, backlinks: 70, mobile: 88 }
  },
  { 
    name: '安全性评级', value: 96, maxValue: 100, fill: '#EF4444', description: 'A+级别', trend: '+1%',
    details: { ssl: 100, firewall: 98, malware: 95, updates: 92, backup: 98 }
  },
  { 
    name: '移动端适配', value: 88, maxValue: 100, fill: '#8B5CF6', description: '优秀', trend: '+8%',
    details: { responsive: 92, touch: 85, speed: 86, usability: 90, compatibility: 88 }
  },
  { 
    name: '内容质量', value: 91, maxValue: 100, fill: '#06B6D4', description: '高质量', trend: '+3%',
    details: { relevance: 94, freshness: 88, depth: 92, engagement: 89, accuracy: 93 }
  },
]

const regionData = [
  { 
    region: '北京', sales: 25000, users: 3200, x: 85, y: 92, growth: 15.2, marketShare: 18.5,
    orders: 180, avgOrder: 139, satisfaction: 4.6, demographics: { age25_35: 45, age36_45: 30, age18_25: 15, age46_plus: 10 },
    channels: { online: 70, offline: 30 }, categories: { electronics: 40, fashion: 35, home: 25 }
  },
  { 
    region: '上海', sales: 32000, users: 4100, x: 78, y: 88, growth: 22.1, marketShare: 23.7,
    orders: 220, avgOrder: 145, satisfaction: 4.4, demographics: { age25_35: 42, age36_45: 32, age18_25: 18, age46_plus: 8 },
    channels: { online: 75, offline: 25 }, categories: { electronics: 38, fashion: 40, home: 22 }
  },
  { 
    region: '深圳', sales: 35000, users: 4500, x: 88, y: 95, growth: 28.3, marketShare: 25.9,
    orders: 245, avgOrder: 143, satisfaction: 4.8, demographics: { age25_35: 52, age36_45: 25, age18_25: 20, age46_plus: 3 },
    channels: { online: 82, offline: 18 }, categories: { electronics: 50, fashion: 30, home: 20 }
  },
  { 
    region: '杭州', sales: 22000, users: 2800, x: 75, y: 82, growth: 12.4, marketShare: 16.3,
    orders: 158, avgOrder: 139, satisfaction: 4.1, demographics: { age25_35: 46, age36_45: 29, age18_25: 17, age46_plus: 8 },
    channels: { online: 73, offline: 27 }, categories: { electronics: 42, fashion: 33, home: 25 }
  },
  { 
    region: '成都', sales: 18000, users: 2300, x: 72, y: 78, growth: 6.7, marketShare: 13.3,
    orders: 132, avgOrder: 136, satisfaction: 3.9, demographics: { age25_35: 44, age36_45: 31, age18_25: 15, age46_plus: 10 },
    channels: { online: 65, offline: 35 }, categories: { electronics: 38, fashion: 37, home: 25 }
  },
  { 
    region: '南京', sales: 19500, users: 2500, x: 76, y: 80, growth: 9.8, marketShare: 14.4,
    orders: 142, avgOrder: 137, satisfaction: 4.0, demographics: { age25_35: 43, age36_45: 33, age18_25: 16, age46_plus: 8 },
    channels: { online: 69, offline: 31 }, categories: { electronics: 40, fashion: 35, home: 25 }
  },
  { 
    region: '武汉', sales: 16800, users: 2100, x: 70, y: 75, growth: 5.2, marketShare: 12.4,
    orders: 125, avgOrder: 134, satisfaction: 3.8, demographics: { age25_35: 41, age36_45: 34, age18_25: 15, age46_plus: 10 },
    channels: { online: 62, offline: 38 }, categories: { electronics: 36, fashion: 39, home: 25 }
  },
]

const trendData = [
  { 
    month: '1月', revenue: 45000, users: 1200, conversion: 3.2, orders: 340, avgOrderValue: 132,
    cac: 45, ltv: 580, churnRate: 8.5, retention: 78, nps: 42, satisfaction: 4.2,
    organicTraffic: 65, paidTraffic: 35, emailOpen: 28.5, socialEngagement: 15.2
  },
  { 
    month: '2月', revenue: 52000, users: 1450, conversion: 3.8, orders: 380, avgOrderValue: 137,
    cac: 42, ltv: 620, churnRate: 7.8, retention: 82, nps: 45, satisfaction: 4.3,
    organicTraffic: 68, paidTraffic: 32, emailOpen: 30.2, socialEngagement: 16.8
  },
  { 
    month: '3月', revenue: 48000, users: 1380, conversion: 3.1, orders: 360, avgOrderValue: 133,
    cac: 48, ltv: 590, churnRate: 9.2, retention: 76, nps: 38, satisfaction: 4.1,
    organicTraffic: 63, paidTraffic: 37, emailOpen: 27.8, socialEngagement: 14.5
  },
  { 
    month: '4月', revenue: 61000, users: 1680, conversion: 4.2, orders: 420, avgOrderValue: 145,
    cac: 38, ltv: 680, churnRate: 6.9, retention: 85, nps: 52, satisfaction: 4.5,
    organicTraffic: 72, paidTraffic: 28, emailOpen: 32.8, socialEngagement: 18.9
  },
  { 
    month: '5月', revenue: 55000, users: 1520, conversion: 3.6, orders: 390, avgOrderValue: 141,
    cac: 44, ltv: 640, churnRate: 8.1, retention: 80, nps: 46, satisfaction: 4.3,
    organicTraffic: 69, paidTraffic: 31, emailOpen: 29.5, socialEngagement: 16.2
  },
  { 
    month: '6月', revenue: 67000, users: 1890, conversion: 4.5, orders: 450, avgOrderValue: 149,
    cac: 35, ltv: 720, churnRate: 6.2, retention: 88, nps: 58, satisfaction: 4.7,
    organicTraffic: 75, paidTraffic: 25, emailOpen: 35.2, socialEngagement: 20.8
  },
  { 
    month: '7月', revenue: 59000, users: 1650, conversion: 3.9, orders: 410, avgOrderValue: 144,
    cac: 41, ltv: 660, churnRate: 7.5, retention: 82, nps: 48, satisfaction: 4.4,
    organicTraffic: 71, paidTraffic: 29, emailOpen: 31.8, socialEngagement: 17.5
  },
  { 
    month: '8月', revenue: 72000, users: 2100, conversion: 4.8, orders: 480, avgOrderValue: 150,
    cac: 32, ltv: 780, churnRate: 5.8, retention: 92, nps: 62, satisfaction: 4.8,
    organicTraffic: 78, paidTraffic: 22, emailOpen: 38.5, socialEngagement: 23.2
  },
]

// 新增复杂数据
const categoryData = [
  { 
    category: '电子产品', sales: 45000, profit: 12000, margin: 26.7, orders: 280,
    inventory: 1250, turnover: 8.5, returns: 3.2, avgRating: 4.3,
    subcategories: { phones: 18000, laptops: 15000, accessories: 12000 },
    ageGroups: { '18-25': 35, '26-35': 40, '36-45': 20, '46+': 5 },
    seasonality: [120, 95, 110, 135, 105, 125, 115, 140]
  },
  { 
    category: '服装配饰', sales: 38000, profit: 15200, margin: 40.0, orders: 420,
    inventory: 2100, turnover: 12.2, returns: 8.5, avgRating: 4.1,
    subcategories: { clothing: 22000, shoes: 10000, accessories: 6000 },
    ageGroups: { '18-25': 45, '26-35': 35, '36-45': 15, '46+': 5 },
    seasonality: [85, 110, 130, 120, 95, 105, 125, 115]
  },
  { 
    category: '家居用品', sales: 32000, profit: 9600, margin: 30.0, orders: 310,
    inventory: 1800, turnover: 6.8, returns: 4.1, avgRating: 4.4,
    subcategories: { furniture: 15000, decor: 10000, kitchen: 7000 },
    ageGroups: { '18-25': 20, '26-35': 45, '36-45': 30, '46+': 5 },
    seasonality: [105, 90, 115, 125, 110, 95, 100, 120]
  },
  { 
    category: '运动户外', sales: 28000, profit: 8400, margin: 30.0, orders: 190,
    inventory: 950, turnover: 9.8, returns: 2.8, avgRating: 4.5,
    subcategories: { fitness: 12000, outdoor: 10000, sports: 6000 },
    ageGroups: { '18-25': 40, '26-35': 35, '36-45': 20, '46+': 5 },
    seasonality: [80, 85, 110, 125, 140, 135, 130, 105]
  },
  { 
    category: '美妆护肤', sales: 25000, profit: 11250, margin: 45.0, orders: 350,
    inventory: 1650, turnover: 15.2, returns: 6.2, avgRating: 4.2,
    subcategories: { skincare: 12000, makeup: 8000, fragrance: 5000 },
    ageGroups: { '18-25': 50, '26-35': 30, '36-45': 15, '46+': 5 },
    seasonality: [95, 120, 110, 105, 115, 100, 90, 125]
  },
  { 
    category: '图书文具', sales: 18000, profit: 5400, margin: 30.0, orders: 240,
    inventory: 3200, turnover: 4.2, returns: 1.8, avgRating: 4.6,
    subcategories: { books: 10000, stationery: 5000, educational: 3000 },
    ageGroups: { '18-25': 35, '26-35': 25, '36-45': 25, '46+': 15 },
    seasonality: [90, 85, 95, 110, 105, 80, 85, 140]
  },
]

const hourlyData = [
  { 
    hour: '0时', orders: 12, revenue: 1800, users: 150, conversion: 1.8, avgOrder: 150,
    traffic: { organic: 60, paid: 25, direct: 10, social: 5 }, devices: { mobile: 70, desktop: 20, tablet: 10 },
    demographics: { male: 45, female: 55 }, locations: { domestic: 85, international: 15 }
  },
  { 
    hour: '1时', orders: 8, revenue: 1200, users: 120, conversion: 1.5, avgOrder: 150,
    traffic: { organic: 65, paid: 20, direct: 10, social: 5 }, devices: { mobile: 75, desktop: 15, tablet: 10 },
    demographics: { male: 48, female: 52 }, locations: { domestic: 88, international: 12 }
  },
  { 
    hour: '2时', orders: 5, revenue: 750, users: 90, conversion: 1.2, avgOrder: 150,
    traffic: { organic: 70, paid: 15, direct: 10, social: 5 }, devices: { mobile: 80, desktop: 12, tablet: 8 },
    demographics: { male: 52, female: 48 }, locations: { domestic: 90, international: 10 }
  },
  { 
    hour: '3时', orders: 3, revenue: 450, users: 60, conversion: 1.0, avgOrder: 150,
    traffic: { organic: 75, paid: 10, direct: 10, social: 5 }, devices: { mobile: 82, desktop: 10, tablet: 8 },
    demographics: { male: 55, female: 45 }, locations: { domestic: 92, international: 8 }
  },
  { 
    hour: '4时', orders: 2, revenue: 300, users: 45, conversion: 0.8, avgOrder: 150,
    traffic: { organic: 78, paid: 8, direct: 10, social: 4 }, devices: { mobile: 85, desktop: 8, tablet: 7 },
    demographics: { male: 58, female: 42 }, locations: { domestic: 95, international: 5 }
  },
  { 
    hour: '5时', orders: 4, revenue: 600, users: 70, conversion: 1.2, avgOrder: 150,
    traffic: { organic: 72, paid: 12, direct: 12, social: 4 }, devices: { mobile: 80, desktop: 12, tablet: 8 },
    demographics: { male: 54, female: 46 }, locations: { domestic: 90, international: 10 }
  },
  { 
    hour: '6时', orders: 8, revenue: 1200, users: 110, conversion: 1.6, avgOrder: 150,
    traffic: { organic: 68, paid: 18, direct: 10, social: 4 }, devices: { mobile: 75, desktop: 18, tablet: 7 },
    demographics: { male: 50, female: 50 }, locations: { domestic: 85, international: 15 }
  },
  { 
    hour: '7时', orders: 15, revenue: 2250, users: 180, conversion: 2.2, avgOrder: 150,
    traffic: { organic: 65, paid: 22, direct: 10, social: 3 }, devices: { mobile: 70, desktop: 22, tablet: 8 },
    demographics: { male: 48, female: 52 }, locations: { domestic: 82, international: 18 }
  },
  { 
    hour: '8时', orders: 25, revenue: 3750, users: 280, conversion: 2.8, avgOrder: 150,
    traffic: { organic: 62, paid: 25, direct: 10, social: 3 }, devices: { mobile: 65, desktop: 27, tablet: 8 },
    demographics: { male: 46, female: 54 }, locations: { domestic: 80, international: 20 }
  },
  { 
    hour: '9时', orders: 35, revenue: 5250, users: 380, conversion: 3.2, avgOrder: 150,
    traffic: { organic: 60, paid: 28, direct: 9, social: 3 }, devices: { mobile: 60, desktop: 32, tablet: 8 },
    demographics: { male: 44, female: 56 }, locations: { domestic: 78, international: 22 }
  },
  { 
    hour: '10时', orders: 45, revenue: 6750, users: 450, conversion: 3.8, avgOrder: 150,
    traffic: { organic: 58, paid: 30, direct: 9, social: 3 }, devices: { mobile: 58, desktop: 34, tablet: 8 },
    demographics: { male: 42, female: 58 }, locations: { domestic: 76, international: 24 }
  },
  { 
    hour: '11时', orders: 52, revenue: 7800, users: 520, conversion: 4.2, avgOrder: 150,
    traffic: { organic: 56, paid: 32, direct: 9, social: 3 }, devices: { mobile: 55, desktop: 37, tablet: 8 },
    demographics: { male: 40, female: 60 }, locations: { domestic: 74, international: 26 }
  },
  { 
    hour: '12时', orders: 48, revenue: 7200, users: 480, conversion: 4.0, avgOrder: 150,
    traffic: { organic: 54, paid: 34, direct: 9, social: 3 }, devices: { mobile: 52, desktop: 40, tablet: 8 },
    demographics: { male: 38, female: 62 }, locations: { domestic: 72, international: 28 }
  },
  { 
    hour: '13时', orders: 42, revenue: 6300, users: 420, conversion: 3.6, avgOrder: 150,
    traffic: { organic: 56, paid: 32, direct: 9, social: 3 }, devices: { mobile: 54, desktop: 38, tablet: 8 },
    demographics: { male: 40, female: 60 }, locations: { domestic: 74, international: 26 }
  },
  { 
    hour: '14时', orders: 38, revenue: 5700, users: 380, conversion: 3.4, avgOrder: 150,
    traffic: { organic: 58, paid: 30, direct: 9, social: 3 }, devices: { mobile: 56, desktop: 36, tablet: 8 },
    demographics: { male: 42, female: 58 }, locations: { domestic: 76, international: 24 }
  },
  { 
    hour: '15时', orders: 35, revenue: 5250, users: 350, conversion: 3.2, avgOrder: 150,
    traffic: { organic: 60, paid: 28, direct: 9, social: 3 }, devices: { mobile: 58, desktop: 34, tablet: 8 },
    demographics: { male: 44, female: 56 }, locations: { domestic: 78, international: 22 }
  },
  { 
    hour: '16时', orders: 32, revenue: 4800, users: 320, conversion: 3.0, avgOrder: 150,
    traffic: { organic: 62, paid: 26, direct: 9, social: 3 }, devices: { mobile: 60, desktop: 32, tablet: 8 },
    demographics: { male: 46, female: 54 }, locations: { domestic: 80, international: 20 }
  },
  { 
    hour: '17时', orders: 28, revenue: 4200, users: 280, conversion: 2.8, avgOrder: 150,
    traffic: { organic: 64, paid: 24, direct: 9, social: 3 }, devices: { mobile: 62, desktop: 30, tablet: 8 },
    demographics: { male: 48, female: 52 }, locations: { domestic: 82, international: 18 }
  },
  { 
    hour: '18时', orders: 25, revenue: 3750, users: 250, conversion: 2.6, avgOrder: 150,
    traffic: { organic: 66, paid: 22, direct: 9, social: 3 }, devices: { mobile: 64, desktop: 28, tablet: 8 },
    demographics: { male: 50, female: 50 }, locations: { domestic: 84, international: 16 }
  },
  { 
    hour: '19时', orders: 22, revenue: 3300, users: 220, conversion: 2.4, avgOrder: 150,
    traffic: { organic: 68, paid: 20, direct: 9, social: 3 }, devices: { mobile: 66, desktop: 26, tablet: 8 },
    demographics: { male: 52, female: 48 }, locations: { domestic: 86, international: 14 }
  },
  { 
    hour: '20时', orders: 20, revenue: 3000, users: 200, conversion: 2.2, avgOrder: 150,
    traffic: { organic: 70, paid: 18, direct: 9, social: 3 }, devices: { mobile: 68, desktop: 24, tablet: 8 },
    demographics: { male: 54, female: 46 }, locations: { domestic: 88, international: 12 }
  },
  { 
    hour: '21时', orders: 18, revenue: 2700, users: 180, conversion: 2.0, avgOrder: 150,
    traffic: { organic: 72, paid: 16, direct: 9, social: 3 }, devices: { mobile: 70, desktop: 22, tablet: 8 },
    demographics: { male: 56, female: 44 }, locations: { domestic: 90, international: 10 }
  },
  { 
    hour: '22时', orders: 15, revenue: 2250, users: 150, conversion: 1.8, avgOrder: 150,
    traffic: { organic: 74, paid: 14, direct: 9, social: 3 }, devices: { mobile: 72, desktop: 20, tablet: 8 },
    demographics: { male: 58, female: 42 }, locations: { domestic: 92, international: 8 }
  },
  { 
    hour: '23时', orders: 12, revenue: 1800, users: 120, conversion: 1.6, avgOrder: 150,
    traffic: { organic: 76, paid: 12, direct: 9, social: 3 }, devices: { mobile: 74, desktop: 18, tablet: 8 },
    demographics: { male: 60, female: 40 }, locations: { domestic: 94, international: 6 }
  },
]

// 新增漏斗数据
const funnelData = [
  { name: '访问者', value: 10000, fill: '#6366F1' },
  { name: '浏览产品', value: 7500, fill: '#8B5CF6' },
  { name: '添加购物车', value: 4200, fill: '#06B6D4' },
  { name: '开始结账', value: 2800, fill: '#10B981' },
  { name: '完成支付', value: 1850, fill: '#F59E0B' },
  { name: '确认订单', value: 1680, fill: '#EF4444' },
]

// 新增树状图数据
const treemapData = [
  {
    name: '电子产品',
    size: 45000,
    children: [
      { name: '手机', size: 18000, profit: 4500 },
      { name: '笔记本', size: 15000, profit: 3750 },
      { name: '配件', size: 12000, profit: 3600 },
    ]
  },
  {
    name: '服装配饰',
    size: 38000,
    children: [
      { name: '服装', size: 22000, profit: 8800 },
      { name: '鞋子', size: 10000, profit: 4000 },
      { name: '配饰', size: 6000, profit: 2400 },
    ]
  },
  {
    name: '家居用品',
    size: 32000,
    children: [
      { name: '家具', size: 15000, profit: 4500 },
      { name: '装饰', size: 10000, profit: 3000 },
      { name: '厨具', size: 7000, profit: 2100 },
    ]
  },
  {
    name: '运动户外',
    size: 28000,
    children: [
      { name: '健身', size: 12000, profit: 3600 },
      { name: '户外', size: 10000, profit: 3000 },
      { name: '运动', size: 6000, profit: 1800 },
    ]
  },
]

function Dashboard() {
  const [activeUsers, setActiveUsers] = useState(12847)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

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
    isPositive = true,
    details = []
  }: {
    title: string
    value: string | number
    change: number
    icon: any
    color: string
    trend?: string
    subtitle?: string
    isPositive?: boolean
    details?: Array<{label: string, value: string}>
  }) => (
    <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 border border-white/30 group overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50/50 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-1 group-hover:w-12 transition-all duration-500"></div>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
              isPositive 
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}>
              {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(change)}%
            </div>
            {trend && <p className="text-xs text-gray-400 mt-2 font-semibold">{trend}</p>}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-gray-600 font-semibold">{subtitle}</p>}
        </div>

        {/* 详细数据 */}
        {details.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-gray-100">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">{detail.label}</span>
                <span className="text-xs font-bold text-gray-700">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* 微型趋势图 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="h-8 flex items-end space-x-1">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t ${color.replace('bg-', 'bg-').replace('600', '200')} opacity-60`}
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const MetricCard = ({ title, value, icon: Icon, color, description, trend, submetrics = [] }: {
    title: string
    value: string
    icon: any
    color: string
    description?: string
    trend?: string
    submetrics?: Array<{label: string, value: string, change?: number}>
  }) => (
    <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl border border-white/40 hover:bg-white/90 hover:shadow-md transition-all duration-500 group">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">{title}</p>
            {trend && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {trend}
              </span>
            )}
          </div>
          <p className="text-xl font-black text-gray-900 mt-1">{value}</p>
          {description && <p className="text-xs text-gray-500 font-medium">{description}</p>}
        </div>
      </div>
      
      {/* 子指标 */}
      {submetrics.length > 0 && (
        <div className="space-y-1 pt-2 border-t border-gray-100">
          {submetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{metric.label}</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-gray-700">{metric.value}</span>
                {metric.change && (
                  <span className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 微型进度条 */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full ${
                i < 3 ? color.replace('bg-', 'bg-').replace('500', '400') : 'bg-gray-200'
              }`}
            ></div>
          ))}
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
      {/* 时间选择器 */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-md border border-white/30">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-black text-gray-900">数据总览</h1>
          
        </div>
        <div className="flex items-center space-x-3">
          {['1h', '24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                selectedTimeRange === range
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
          <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300">
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

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
          details={[
            { label: '今日收入', value: '¥42,580' },
            { label: '昨日收入', value: '¥38,920' },
            { label: '平均日收入', value: '¥41,152' }
          ]}
        />
        <StatCard
          title="活跃用户"
          value={activeUsers.toLocaleString()}
          change={12.5}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          trend="实时数据"
          subtitle="在线用户"
          details={[
            { label: '新用户', value: '1,234' },
            { label: '回访用户', value: '11,613' },
            { label: '会话时长', value: '4:32' }
          ]}
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
          details={[
            { label: '购物车转化', value: '12.8%' },
            { label: '结账转化', value: '68.5%' },
            { label: '支付转化', value: '94.2%' }
          ]}
        />
        <StatCard
          title="系统性能"
          value="99.9%"
          change={0.1}
          icon={Server}
          color="bg-gradient-to-br from-orange-500 to-red-600"
          trend="稳定运行"
          subtitle="可用性"
          details={[
            { label: '响应时间', value: '2.3s' },
            { label: 'CPU使用率', value: '45%' },
            { label: '内存使用率', value: '62%' }
          ]}
        />
      </div>

      {/* 快速指标 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard 
          title="页面浏览" 
          value="45.2K" 
          icon={Eye} 
          color="bg-blue-500" 
          description="+12% 今日"
          trend="+12%"
          submetrics={[
            { label: '首页', value: '18.5K', change: 8 },
            { label: '产品页', value: '15.2K', change: 15 },
            { label: '分类页', value: '11.5K', change: -3 }
          ]}
        />
        <MetricCard 
          title="新用户" 
          value="1,234" 
          icon={Users} 
          color="bg-green-500" 
          description="+8% 今日"
          trend="+8%"
          submetrics={[
            { label: '注册用户', value: '892', change: 12 },
            { label: '游客', value: '342', change: -2 },
            { label: '激活率', value: '72.3%', change: 5 }
          ]}
        />
        <MetricCard 
          title="跳出率" 
          value="23.4%" 
          icon={TrendingDown} 
          color="bg-red-500" 
          description="-2% 今日"
          trend="-2%"
          submetrics={[
            { label: '移动端', value: '28.5%', change: -3 },
            { label: '桌面端', value: '18.2%', change: -1 },
            { label: '平板端', value: '25.8%', change: -4 }
          ]}
        />
        <MetricCard 
          title="会话时长" 
          value="4:32" 
          icon={Clock} 
          color="bg-purple-500" 
          description="+15s 今日"
          trend="+6%"
          submetrics={[
            { label: '平均页面', value: '3.2', change: 8 },
            { label: '深度浏览', value: '68%', change: 5 },
            { label: '互动率', value: '45%', change: 12 }
          ]}
        />
        <MetricCard 
          title="移动端" 
          value="67%" 
          icon={Smartphone} 
          color="bg-indigo-500" 
          description="主要流量"
          trend="+3%"
          submetrics={[
            { label: 'iOS', value: '42%', change: 2 },
            { label: 'Android', value: '58%', change: 4 },
            { label: '响应速度', value: '1.8s', change: -8 }
          ]}
        />
        <MetricCard 
          title="满意度" 
          value="4.8★" 
          icon={Heart} 
          color="bg-pink-500" 
          description="用户评分"
          trend="+0.2"
          submetrics={[
            { label: '5星评价', value: '68%', change: 5 },
            { label: '4星评价', value: '22%', change: 2 },
            { label: 'NPS评分', value: '62', change: 8 }
          ]}
        />
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 销售趋势 - 增强版 */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-2 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-black text-gray-900">销售趋势分析</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">收入、利润、订单与目标对比</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">销售</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">利润</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">目标</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-600">订单</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={salesData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px'
                }} 
              />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#6366F1" radius={[4, 4, 0, 0]} name="销售额" />
              <Bar yAxisId="right" dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="订单数" />
              <Line yAxisId="left" type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="利润" dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="3 3" name="目标" dot={{ fill: '#EF4444', strokeWidth: 2, r: 2 }} />
              <Line yAxisId="left" type="monotone" dataKey="lastYear" stroke="#94A3B8" strokeWidth={2} name="去年同期" dot={{ fill: '#94A3B8', strokeWidth: 2, r: 2 }} />
              <Area yAxisId="left" type="monotone" dataKey="newCustomers" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} name="新客户" />
              <Area yAxisId="left" type="monotone" dataKey="returningCustomers" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} name="回头客" />
              <ReferenceLine yAxisId="left" y={50000} stroke="#EF4444" strokeDasharray="5 5" label="目标线" />
              <Brush dataKey="month" height={25} stroke="#6366F1" />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* 销售数据摘要 - 最紧凑布局 */}
          <div className="grid grid-cols-5 gap-1 mt-1 pt-1 border-t border-gray-100">
            <div className="text-center p-1.5 bg-blue-50 rounded-lg">
              <p className="text-base font-black text-blue-600">¥456K</p>
              <p className="text-xs text-gray-600 font-semibold">本月销售</p>
              <p className="text-xs text-green-600 font-bold">+18.2%</p>
            </div>
            <div className="text-center p-1.5 bg-emerald-50 rounded-lg">
              <p className="text-base font-black text-emerald-600">¥278K</p>
              <p className="text-xs text-gray-600 font-semibold">本月利润</p>
              <p className="text-xs text-green-600 font-bold">+22.1%</p>
            </div>
            <div className="text-center p-1.5 bg-purple-50 rounded-lg">
              <p className="text-base font-black text-purple-600">3,240</p>
              <p className="text-xs text-gray-600 font-semibold">总订单</p>
              <p className="text-xs text-green-600 font-bold">+15.3%</p>
            </div>
            <div className="text-center p-1.5 bg-orange-50 rounded-lg">
              <p className="text-base font-black text-orange-600">¥142</p>
              <p className="text-xs text-gray-600 font-semibold">客单价</p>
              <p className="text-xs text-green-600 font-bold">+8.7%</p>
            </div>
            <div className="text-center p-1.5 bg-red-50 rounded-lg">
              <p className="text-base font-black text-red-600">12.3%</p>
              <p className="text-xs text-gray-600 font-semibold">平均增长</p>
              <p className="text-xs text-blue-600 font-bold">稳定</p>
            </div>
          </div>

          {/* 详细分析区域 - 极致紧凑 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-1">
              <div className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="text-xs font-black text-gray-900 mb-1">收入分析</h4>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">峰值月份:</span>
                    <span className="font-bold text-blue-700">8月 ¥72K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">增长趋势:</span>
                    <span className="font-bold text-green-600">持续上升</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">目标达成:</span>
                    <span className="font-bold text-purple-600">116%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-1.5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <h4 className="text-xs font-black text-gray-900 mb-1">客户分析</h4>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">新客占比:</span>
                    <span className="font-bold text-green-700">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">回头客:</span>
                    <span className="font-bold text-blue-600">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">客户增长:</span>
                    <span className="font-bold text-purple-600">+24%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-1.5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <h4 className="text-xs font-black text-gray-900 mb-1">订单分析</h4>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">移动端:</span>
                    <span className="font-bold text-purple-700">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">桌面端:</span>
                    <span className="font-bold text-blue-600">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">退货率:</span>
                    <span className="font-bold text-green-600">2.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部预测区域 - 紧凑版 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center p-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
                <div className="text-xs font-black text-cyan-700">下月预测</div>
                <div className="text-xs text-gray-600">销售额: ¥520K</div>
                <div className="text-xs text-green-600 font-bold">+14%</div>
              </div>
              <div className="text-center p-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="text-xs font-black text-emerald-700">季度目标</div>
                <div className="text-xs text-gray-600">完成率: 89%</div>
                <div className="text-xs text-blue-600 font-bold">良好</div>
              </div>
              <div className="text-center p-1.5 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <div className="text-xs font-black text-orange-700">库存周转</div>
                <div className="text-xs text-gray-600">周转率: 4.2</div>
                <div className="text-xs text-green-600 font-bold">优秀</div>
              </div>
              <div className="text-center p-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="text-xs font-black text-purple-700">客户满意</div>
                <div className="text-xs text-gray-600">评分: 4.8/5</div>
                <div className="text-xs text-green-600 font-bold">优秀</div>
              </div>
            </div>
          </div>

          {/* 新增最底部关键指标 - 填满剩余空间 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <div className="grid grid-cols-8 gap-1">
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">ROI</div>
                <div className="text-xs text-green-600">285%</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">转化率</div>
                <div className="text-xs text-blue-600">3.2%</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">复购率</div>
                <div className="text-xs text-purple-600">45%</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">毛利率</div>
                <div className="text-xs text-emerald-600">61%</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">流失率</div>
                <div className="text-xs text-red-600">8.5%</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">LTV</div>
                <div className="text-xs text-orange-600">¥890</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">CAC</div>
                <div className="text-xs text-indigo-600">¥156</div>
              </div>
              <div className="text-center p-1 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">ARPU</div>
                <div className="text-xs text-pink-600">¥234</div>
              </div>
            </div>
          </div>

          
        </div>

        

        {/* 设备分布 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
          <h3 className="text-xl font-black text-gray-900 mb-1">设备使用分布</h3>
          <p className="text-xs text-gray-600 mb-4 font-semibold">用户访问设备详细统计与浏览器分析</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={6}
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
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {deviceData.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full shadow-sm`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{item.value}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
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
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-blue-600">{item.avgSessionDuration}</p>
                    <p className="text-gray-500">会话时长</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">¥{(item.revenue/1000).toFixed(0)}K</p>
                    <p className="text-gray-500">收入</p>
                  </div>
                </div>
                {/* 浏览器分布 */}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">主要浏览器:</span>
                    <div className="flex space-x-2">
                      {Object.entries(item.browsers).slice(0, 3).map(([browser, count]) => (
                        <span key={browser} className="text-gray-700 font-medium">
                          {browser}: {((count as number)/1000).toFixed(1)}K
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 转化漏斗与实时数据 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 转化漏斗 */}
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">用户转化漏斗</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">从访问到购买的完整转化路径</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
              <TrendingUpDown className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700">转化分析</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px'
                }}
              />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" fontSize={12} fontWeight="bold" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          
          {/* 转化率详情 */}
          <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
            {funnelData.map((item, index) => {
              const nextItem = funnelData[index + 1];
              const conversionRate = nextItem ? ((nextItem.value / item.value) * 100).toFixed(1) : null;
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.fill }}></div>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{item.value.toLocaleString()}</p>
                    {conversionRate && (
                      <p className="text-xs text-gray-500">转化率: {conversionRate}%</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

                {/* 实时用户活动 - 增强版 */}
                <div className="bg-white/90 backdrop-blur-xl p-2 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-black text-gray-900">实时用户活动</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">24小时用户行为与收入监控</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-700">实时更新</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={realtimeData.slice(-12)} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px'
                }} 
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="users" 
                stroke="#6366F1" 
                fill="url(#colorUsers)" 
                strokeWidth={2}
                name="用户数"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                name="收入"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 2 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="conversion" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="转化率%"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 2 }}
              />
              <Bar 
                yAxisId="left"
                dataKey="bounceRate" 
                fill="#EF4444" 
                fillOpacity={0.3}
                name="跳出率%"
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
          <div className="grid grid-cols-4 gap-1 mt-1 pt-1 border-t border-gray-100">
            <div className="text-center p-1.5 bg-blue-50 rounded-xl">
              <p className="text-base font-black text-blue-600">2,847</p>
              <p className="text-xs text-gray-600 font-semibold">当前在线</p>
              <p className="text-xs text-green-600 font-bold">+12%</p>
            </div>
            <div className="text-center p-1.5 bg-green-50 rounded-xl">
              <p className="text-base font-black text-green-600">¥42K</p>
              <p className="text-xs text-gray-600 font-semibold">今日收入</p>
              <p className="text-xs text-green-600 font-bold">+18%</p>
            </div>
            <div className="text-center p-1.5 bg-purple-50 rounded-xl">
              <p className="text-base font-black text-purple-600">3.8%</p>
              <p className="text-xs text-gray-600 font-semibold">转化率</p>
              <p className="text-xs text-red-600 font-bold">-0.2%</p>
            </div>
            <div className="text-center p-1.5 bg-orange-50 rounded-xl">
              <p className="text-base font-black text-orange-600">28.5%</p>
              <p className="text-xs text-gray-600 font-semibold">跳出率</p>
              <p className="text-xs text-green-600 font-bold">-2.1%</p>
            </div>
          </div>

          {/* 新增用户行为分析 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">用户行为分析</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-xs font-bold text-blue-700 mb-1">设备分布</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">移动端:</span>
                    <span className="font-bold text-blue-700">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">桌面端:</span>
                    <span className="font-bold text-indigo-700">32%</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <p className="text-xs font-bold text-green-700 mb-1">流量来源</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">自然搜索:</span>
                    <span className="font-bold text-green-700">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">付费广告:</span>
                    <span className="font-bold text-emerald-700">28%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 新增实时活动指标 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">实时活动指标</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <p className="text-sm font-black text-purple-600">4,100</p>
                <p className="text-xs text-gray-600 font-semibold">页面浏览</p>
                <p className="text-xs text-green-600 font-bold">+15%</p>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-lg">
                <p className="text-sm font-black text-orange-600">1,540</p>
                <p className="text-xs text-gray-600 font-semibold">会话数</p>
                <p className="text-xs text-blue-600 font-bold">+8%</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-lg">
                <p className="text-sm font-black text-red-600">4:32</p>
                <p className="text-xs text-gray-600 font-semibold">会话时长</p>
                <p className="text-xs text-green-600 font-bold">+12%</p>
              </div>
            </div>
          </div>

          {/* 新增地区分布 */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">地区分布</h4>
            <div className="space-y-1">
              <div className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-700">北京</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                    <div className="w-12 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">680</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-700">上海</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                    <div className="w-10 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">520</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-700">深圳</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                    <div className="w-8 h-1.5 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">420</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-700">其他</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                    <div className="w-14 h-1.5 bg-orange-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">1,227</span>
                </div>
              </div>
            </div>
          </div>

    
        </div>
    
       
      </div>

      {/* 性能指标与产品树状图 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 性能指标 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">系统性能指标</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">关键性能指标实时监控与详细分析</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">系统健康</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={performanceData}>
              <RadialBar dataKey="value" cornerRadius={8} fill="#8884d8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {performanceData.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full shadow-sm`} style={{ backgroundColor: item.fill }}></div>
                  <span className="text-xs font-bold text-gray-500">{item.trend}</span>
                </div>
                <p className="text-xs font-bold text-gray-700 mb-1">{item.name}</p>
                <p className="text-lg font-black text-gray-900">{item.value}%</p>
                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                {/* 详细指标 */}
                <div className="space-y-1">
                  {Object.entries(item.details).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="font-bold text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 产品销售热力图 - 优化版 */}
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">产品销售热力图</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">各产品类别与子类别销售占比分析</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-50 rounded-full border border-purple-200">
              <Layers className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-purple-700">分层分析</span>
            </div>
          </div>

          {/* 热力图替代方案 - 使用条形图 */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={treemapData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight="600" angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#64748b" fontSize={10} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="size" fill="#6366F1" radius={[4, 4, 0, 0]} name="销售额 (¥)" />
            </BarChart>
          </ResponsiveContainer>
          
          {/* 产品类别详细分析 */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-100">
            {treemapData.map((category, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-700">{category.name}</span>
                  <span className="text-sm font-black text-gray-900">¥{(category.size/1000).toFixed(0)}K</span>
                </div>
                <div className="space-y-1.5">
                  {category.children.map((child, childIndex) => (
                    <div key={childIndex} className="flex justify-between text-xs">
                      <span className="text-gray-500">{child.name}:</span>
                      <span className="text-gray-700 font-medium">¥{(child.size/1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 销售占比可视化 */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-3">销售占比分布</h4>
            <div className="space-y-2">
              {treemapData.map((category, index) => {
                const total = treemapData.reduce((sum, item) => sum + item.size, 0);
                const percentage = ((category.size / total) * 100).toFixed(1);
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-gray-700 w-16">{category.name}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-3 ${colors[index]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-12">{percentage}%</span>
                    <span className="text-xs text-gray-600 w-16">¥{(category.size/1000).toFixed(0)}K</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 子类别详细分析 */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-3">子类别表现</h4>
            <div className="grid grid-cols-2 gap-3">
              {treemapData.slice(0, 2).map((category, index) => (
                <div key={index} className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-700 mb-2">{category.name}</p>
                  <div className="space-y-2">
                    {category.children.map((child, childIndex) => {
                      const childPercentage = ((child.size / category.size) * 100).toFixed(0);
                      return (
                        <div key={childIndex} className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">{child.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${childPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-700">{childPercentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          
        </div>
               
            
        
      </div>

      {/* 分类销售分析 - 增强版 */}
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">产品分类销售分析</h3>
            <p className="text-xs text-gray-600 mt-1 font-semibold">各产品类别销售表现、利润率与库存周转率对比</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">销售额</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">利润率</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">周转率</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">退货率</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" stroke="#64748b" fontSize={11} fontWeight="600" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} fontWeight="600" />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} fontWeight="600" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                fontSize: '12px'
              }} 
            />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} name="销售额 (¥)" />
            <Bar yAxisId="left" dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} name="利润 (¥)" />
            <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#F59E0B" strokeWidth={2} name="利润率 (%)" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="turnover" stroke="#8B5CF6" strokeWidth={2} name="周转率" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="returns" stroke="#EF4444" strokeWidth={2} name="退货率 (%)" dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }} />
            <Area yAxisId="left" type="monotone" dataKey="inventory" fill="#06B6D4" fillOpacity={0.2} stroke="#06B6D4" strokeWidth={1} name="库存量" />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* 分类数据摘要 - 增强版 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6 pt-4 border-t border-gray-100">
          {categoryData.map((item, index) => (
            <div key={index} className="text-center p-3 bg-gray-50/70 rounded-xl hover:bg-gray-100/70 transition-colors duration-300">
              <p className="text-xs font-bold text-gray-600 mb-2">{item.category}</p>
              <p className="text-lg font-black text-gray-900">¥{(item.sales/1000).toFixed(0)}K</p>
              <p className="text-xs text-green-600 font-semibold">{item.margin}% 利润率</p>
              <p className="text-xs text-blue-600 font-semibold">{item.turnover} 周转率</p>
              <p className="text-xs text-purple-600 font-semibold">{item.avgRating}★ 评分</p>
              <p className="text-xs text-gray-500 mt-1">{item.orders} 订单</p>
              
              {/* 年龄分布 */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">主要用户群:</p>
                <div className="flex justify-center space-x-1">
                  {Object.entries(item.ageGroups).slice(0, 2).map(([age, percent]) => (
                    <span key={age} className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded">
                      {age}: {percent}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 24小时订单分析与地区分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">24小时订单分析</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">每小时订单量、收入趋势与用户行为分析</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700">实时监控</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={900}>
            <ComposedChart data={hourlyData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={10} fontWeight="600" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} fontWeight="600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px'
                }} 
              />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" fill="#6366F1" radius={[3, 3, 0, 0]} name="订单数" />
              <Bar yAxisId="left" dataKey="users" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="用户数" fillOpacity={0.7} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="收入 (¥)" dot={{ fill: '#10B981', strokeWidth: 2, r: 2 }} />
              <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#F59E0B" strokeWidth={2} name="转化率%" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 2 }} />
              <Area yAxisId="left" type="monotone" dataKey="avgSessionDuration" fill="#06B6D4" fillOpacity={0.2} stroke="#06B6D4" strokeWidth={1} name="会话时长(s)" />
              <ReferenceLine yAxisId="left" y={30} stroke="#EF4444" strokeDasharray="3 3" label="目标订单线" />
              <ReferenceLine yAxisId="right" y={3.0} stroke="#8B5CF6" strokeDasharray="3 3" label="目标转化率" />
              <Brush dataKey="hour" height={25} stroke="#6366F1" />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* 峰值时段分析 */}
          <div className="grid grid-cols-5 gap-2 mt-3 pt-2 border-t border-gray-100">
            <div className="text-center p-2 bg-blue-50 rounded-xl">
              <p className="text-lg font-black text-blue-600">12:00</p>
              <p className="text-xs text-gray-600 font-semibold">订单峰值</p>
              <p className="text-xs text-green-600 font-bold">52单/时</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-xl">
              <p className="text-lg font-black text-green-600">¥7.8K</p>
              <p className="text-xs text-gray-600 font-semibold">最高收入</p>
              <p className="text-xs text-blue-600 font-bold">11时段</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-xl">
              <p className="text-lg font-black text-purple-600">4.2%</p>
              <p className="text-xs text-gray-600 font-semibold">最高转化</p>
              <p className="text-xs text-orange-600 font-bold">11时段</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-xl">
              <p className="text-lg font-black text-orange-600">3-5时</p>
              <p className="text-xs text-gray-600 font-semibold">低谷时段</p>
              <p className="text-xs text-red-600 font-bold">需优化</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-xl">
              <p className="text-lg font-black text-red-600">68%</p>
              <p className="text-xs text-gray-600 font-semibold">移动端占比</p>
              <p className="text-xs text-green-600 font-bold">主流量</p>
            </div>
          </div>

          {/* 流量来源分析 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">流量来源时段分布</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <p className="text-xs font-bold text-blue-700 mb-1">自然流量</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>峰值:</span><span className="font-bold">78% (8-10时)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>低谷:</span><span className="font-bold">54% (12-14时)</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-xl">
                <p className="text-xs font-bold text-green-700 mb-1">付费流量</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>峰值:</span><span className="font-bold">34% (12-14时)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>低谷:</span><span className="font-bold">8% (3-5时)</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded-xl">
                <p className="text-xs font-bold text-purple-700 mb-1">直接访问</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>稳定:</span><span className="font-bold">9-12%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>占比:</span><span className="font-bold">中等稳定</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded-xl">
                <p className="text-xs font-bold text-orange-700 mb-1">社交媒体</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>峰值:</span><span className="font-bold">5% (晚间)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>趋势:</span><span className="font-bold">夜间活跃</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 用户行为分析 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">用户行为分析</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-xs font-bold text-blue-700 mb-1">设备偏好</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">移动端峰值:</span>
                    <span className="font-bold text-blue-700">85% (4-6时)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">桌面端峰值:</span>
                    <span className="font-bold text-indigo-700">40% (10-14时)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">平板端占比:</span>
                    <span className="font-bold text-purple-700">8% 稳定</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <p className="text-xs font-bold text-green-700 mb-1">用户类型</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">新用户活跃:</span>
                    <span className="font-bold text-green-700">20-22时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">老用户活跃:</span>
                    <span className="font-bold text-emerald-700">10-12时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">会话质量:</span>
                    <span className="font-bold text-blue-700">上午更高</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 时段表现排名 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">时段表现排名</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <p className="text-xs font-bold text-yellow-700 mb-1">订单量TOP3</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🥇 12时:</span><span className="font-bold">52单</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥈 11时:</span><span className="font-bold">45单</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥉 10时:</span><span className="font-bold">45单</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <p className="text-xs font-bold text-green-700 mb-1">收入TOP3</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🥇 11时:</span><span className="font-bold">¥7.8K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥈 12时:</span><span className="font-bold">¥7.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥉 10时:</span><span className="font-bold">¥6.8K</span>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-xs font-bold text-purple-700 mb-1">转化率TOP3</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🥇 11时:</span><span className="font-bold">4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥈 12时:</span><span className="font-bold">4.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥉 9时:</span><span className="font-bold">3.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 优化建议 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-black text-gray-900 mb-2">时段优化建议</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                <p className="text-xs font-bold text-red-700 mb-1">低谷时段优化</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• 3-5时推送限时优惠</p>
                  <p>• 夜间专享活动</p>
                  <p>• 自动化营销触发</p>
                </div>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-xs font-bold text-blue-700 mb-1">峰值时段强化</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• 10-12时增加库存</p>
                  <p>• 客服人员配置</p>
                  <p>• 系统性能保障</p>
                </div>
              </div>
            </div>
          </div>

          {/* 底部统计摘要 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="grid grid-cols-6 gap-1">
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">日均订单</div>
                <div className="text-sm font-black text-blue-600">680</div>
              </div>
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">日均收入</div>
                <div className="text-sm font-black text-green-600">¥102K</div>
              </div>
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">平均转化</div>
                <div className="text-sm font-black text-purple-600">2.8%</div>
              </div>
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">活跃时长</div>
                <div className="text-sm font-black text-orange-600">16小时</div>
              </div>
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">峰谷比</div>
                <div className="text-sm font-black text-red-600">26:1</div>
              </div>
              <div className="text-center p-1.5 bg-slate-50 rounded">
                <div className="text-xs font-bold text-slate-700">效率指数</div>
                <div className="text-sm font-black text-indigo-600">8.7</div>
              </div>
            </div>
          </div>
        </div>
        

        {/* 地区销售排行 - 增强版 */}
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">地区销售排行</h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">各城市销售表现与用户画像</p>
            </div>
            <Globe className="w-5 h-5 text-indigo-500" />
          </div>
          
          <div className="space-y-3">
            {regionData.sort((a, b) => b.sales - a.sales).map((item, index) => (
              <div key={index} className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-xs ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.region}</p>
                      <p className="text-xs text-gray-500">{item.users.toLocaleString()} 用户 • {item.satisfaction}★</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">¥{(item.sales/1000).toFixed(0)}K</p>
                    <p className={`text-xs font-semibold ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth > 0 ? '+' : ''}{item.growth}%
                    </p>
                  </div>
                </div>
                
                {/* 详细指标 */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div className="text-center p-1 bg-white/50 rounded">
                    <p className="font-bold text-gray-900">{item.orders}</p>
                    <p className="text-gray-500">订单数</p>
                  </div>
                  <div className="text-center p-1 bg-white/50 rounded">
                    <p className="font-bold text-gray-900">¥{item.avgOrder}</p>
                    <p className="text-gray-500">客单价</p>
                  </div>
                  <div className="text-center p-1 bg-white/50 rounded">
                    <p className="font-bold text-gray-900">{item.marketShare}%</p>
                    <p className="text-gray-500">市场份额</p>
                  </div>
                </div>

                {/* 用户画像 */}
                <div className="space-y-1 pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">主要年龄段:</span>
                    <span className="font-bold text-gray-700">
                      25-35岁 ({item.demographics.age25_35}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">渠道偏好:</span>
                    <span className="font-bold text-gray-700">
                      线上 {item.channels.online}% / 线下 {item.channels.offline}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">热门品类:</span>
                    <span className="font-bold text-gray-700">
                    {Object.entries(item.categories || {}).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[1] || 0}%

                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 地区统计摘要 - 增强版 */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-xl font-black text-blue-600">8</p>
                <p className="text-xs text-gray-600 font-semibold">覆盖城市</p>
                <p className="text-xs text-green-600 font-bold">全国布局</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <p className="text-xl font-black text-green-600">15.8%</p>
                <p className="text-xs text-gray-600 font-semibold">平均增长</p>
                <p className="text-xs text-blue-600 font-bold">稳定上升</p>
              </div>
            </div>
            
            {/* 地区趋势指标 */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-600">增长最快:</span>
                <span className="text-xs font-black text-green-600">深圳 (+28.3%)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-600">满意度最高:</span>
                <span className="text-xs font-black text-blue-600">深圳 (4.8★)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-bold text-gray-600">潜力城市:</span>
                <span className="text-xs font-black text-purple-600">杭州、南京</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* 地区散点图分析 - 增强版 */}
      <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">地区销售与满意度关系分析</h3>
            <p className="text-xs text-gray-600 mt-1 font-semibold">各地区销售表现与用户满意度散点分布图，气泡大小代表市场份额</p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700">象限分析</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart data={regionData} margin={{ top: 15, right: 20, left: 15, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="x" 
              name="销售指数" 
              stroke="#64748b" 
              fontSize={10} 
              fontWeight="600"
              label={{ value: '销售指数', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fontSize: '11px', fontWeight: 'bold' } }}
            />
            <YAxis 
              dataKey="y" 
              name="用户满意度" 
              stroke="#64748b" 
              fontSize={10} 
              fontWeight="600"
              label={{ value: '用户满意度', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '11px', fontWeight: 'bold' } }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0 && payload[0]?.payload) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/95 backdrop-blur-xl p-3 border border-gray-200 rounded-xl shadow-lg">
                      <p className="font-black text-gray-900 text-sm mb-2">{data.region}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">销售:</span>
                            <span className="font-bold text-gray-900">¥{(data.sales/1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">用户:</span>
                            <span className="font-bold text-gray-900">{(data.users/1000).toFixed(1)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">订单:</span>
                            <span className="font-bold text-gray-900">{data.orders}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">满意度:</span>
                            <span className="font-bold text-gray-900">{data.satisfaction}★</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">增长:</span>
                            <span className={`font-bold ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.growth > 0 ? '+' : ''}{data.growth}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">份额:</span>
                            <span className="font-bold text-blue-600">{data.marketShare}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              dataKey="sales" 
              fill="#6366F1"
              r={8}
            />
            <ReferenceLine x={80} stroke="#EF4444" strokeDasharray="5 5" label={{ value: "销售基准线", position: "top", fontSize: 10 }} />
            <ReferenceLine y={85} stroke="#EF4444" strokeDasharray="5 5" label={{ value: "满意度基准线", position: "top", fontSize: 10 }} />
            
            {/* 象限背景 */}
            <ReferenceArea x1={80} x2={100} y1={85} y2={100} fill="#10B981" fillOpacity={0.08} />
            <ReferenceArea x1={60} x2={80} y1={85} y2={100} fill="#3B82F6" fillOpacity={0.08} />
            <ReferenceArea x1={80} x2={100} y1={60} y2={85} fill="#F59E0B" fillOpacity={0.08} />
            <ReferenceArea x1={60} x2={80} y1={60} y2={85} fill="#EF4444" fillOpacity={0.08} />
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* 象限分析 - 紧凑版 */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Award className="w-3 h-3 text-green-600" />
              <p className="text-xs font-black text-green-600">明星区域</p>
            </div>
            <p className="text-xs text-gray-600 font-semibold mb-1">高销售·高满意度</p>
            <p className="text-xs font-bold text-gray-900">深圳、北京</p>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="text-green-600 font-semibold">• 持续投入资源</p>
              <p className="text-green-600 font-semibold">• 扩大市场份额</p>
            </div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <p className="text-xs font-black text-blue-600">潜力区域</p>
            </div>
            <p className="text-xs text-gray-600 font-semibold mb-1">低销售·高满意度</p>
            <p className="text-xs font-bold text-gray-900">杭州、南京</p>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="text-blue-600 font-semibold">• 加大营销投入</p>
              <p className="text-blue-600 font-semibold">• 提升品牌认知</p>
            </div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="w-3 h-3 text-yellow-600" />
              <p className="text-xs font-black text-yellow-600">现金牛</p>
            </div>
            <p className="text-xs text-gray-600 font-semibold mb-1">高销售·低满意度</p>
            <p className="text-xs font-bold text-gray-900">上海</p>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="text-yellow-600 font-semibold">• 改善服务质量</p>
              <p className="text-yellow-600 font-semibold">• 提升用户体验</p>
            </div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <p className="text-xs font-black text-red-600">问题区域</p>
            </div>
            <p className="text-xs text-gray-600 font-semibold mb-1">低销售·低满意度</p>
            <p className="text-xs font-bold text-gray-900">成都、武汉</p>
            <div className="mt-1 space-y-0.5 text-xs">
              <p className="text-red-600 font-semibold">• 全面策略调整</p>
              <p className="text-red-600 font-semibold">• 重点关注改进</p>
            </div>
          </div>
        </div>

        {/* 新增地区表现详情 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <h4 className="text-sm font-black text-gray-900 mb-2">地区表现详情</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              {regionData.slice(0, 4).map((region, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      region.growth > 20 ? 'bg-green-500' : 
                      region.growth > 10 ? 'bg-blue-500' : 
                      region.growth > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-bold text-gray-700">{region.region}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">¥{(region.sales/1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">{region.satisfaction}★</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {regionData.slice(4).map((region, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      region.growth > 20 ? 'bg-green-500' : 
                      region.growth > 10 ? 'bg-blue-500' : 
                      region.growth > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-bold text-gray-700">{region.region}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">¥{(region.sales/1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">{region.satisfaction}★</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 关键指标摘要 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <p className="text-sm font-black text-blue-600">7</p>
              <p className="text-xs text-gray-600 font-semibold">覆盖城市</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-sm font-black text-green-600">15.8%</p>
              <p className="text-xs text-gray-600 font-semibold">平均增长</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <p className="text-sm font-black text-purple-600">4.3★</p>
              <p className="text-xs text-gray-600 font-semibold">平均满意度</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <p className="text-sm font-black text-orange-600">¥140</p>
              <p className="text-xs text-gray-600 font-semibold">平均客单价</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <p className="text-sm font-black text-red-600">19.2%</p>
              <p className="text-xs text-gray-600 font-semibold">平均市场份额</p>
            </div>
          </div>
        </div>
      </div>


      {/* 多维度趋势分析 - 最终增强版 */}
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">多维度趋势分析</h3>
            <p className="text-xs text-gray-600 mt-1 font-semibold">收入、用户、转化率、客单价、CAC、LTV与留存率综合分析</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">收入</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">用户</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">转化率</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">LTV</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">留存率</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight="600" />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} fontWeight="600" />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} fontWeight="600" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                fontSize: '12px'
              }} 
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" radius={[3, 3, 0, 0]} name="收入 (¥)" />
            <Bar yAxisId="left" dataKey="ltv" fill="#06B6D4" radius={[3, 3, 0, 0]} name="LTV (¥)" fillOpacity={0.7} />
            <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} name="用户数" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#10B981" strokeWidth={2} name="转化率 (%)" dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#EF4444" strokeWidth={2} name="留存率 (%)" dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }} />
            <Line yAxisId="left" type="monotone" dataKey="cac" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="CAC (¥)" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 2 }} />
            <Line yAxisId="right" type="monotone" dataKey="nps" stroke="#EC4899" strokeWidth={2} strokeDasharray="3 3" name="NPS评分" dot={{ fill: '#EC4899', strokeWidth: 2, r: 2 }} />
            <Area yAxisId="right" type="monotone" dataKey="organicTraffic" fill="#10B981" fillOpacity={0.1} stroke="#10B981" strokeWidth={1} name="自然流量 (%)" />
            <Area yAxisId="right" type="monotone" dataKey="emailOpen" fill="#6366F1" fillOpacity={0.1} stroke="#6366F1" strokeWidth={1} name="邮件打开率 (%)" />
            
            {/* 参考线 */}
            <ReferenceLine yAxisId="left" y={600} stroke="#10B981" strokeDasharray="3 3" label="LTV目标" />
            <ReferenceLine yAxisId="right" y={4.0} stroke="#F59E0B" strokeDasharray="3 3" label="转化率目标" />
            <ReferenceLine yAxisId="right" y={85} stroke="#EF4444" strokeDasharray="3 3" label="留存率目标" />
            
            {/* 趋势区域 */}
            <ReferenceArea x1="4月" x2="6月" y1={0} y2={100000} fill="#10B981" fillOpacity={0.05} yAxisId="left" />
            <ReferenceArea x1="7月" x2="8月" y1={0} y2={100000} fill="#3B82F6" fillOpacity={0.05} yAxisId="left" />
            
            <Brush dataKey="month" height={30} stroke="#6366F1" />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* 关键指标摘要 - 最终增强版 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-6 pt-4 border-t border-gray-100">
          <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs font-bold text-blue-600 mb-1">平均收入</p>
            <p className="text-lg font-black text-blue-900">¥56.8K</p>
            <p className="text-xs text-green-600 font-semibold">+12.5%</p>
            <div className="mt-2 h-1 bg-blue-200 rounded-full">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-xs font-bold text-purple-600 mb-1">平均用户</p>
            <p className="text-lg font-black text-purple-900">1,609</p>
            <p className="text-xs text-green-600 font-semibold">+18.2%</p>
            <div className="mt-2 h-1 bg-purple-200 rounded-full">
              <div className="h-1 bg-purple-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-xs font-bold text-emerald-600 mb-1">平均转化</p>
            <p className="text-lg font-black text-emerald-900">3.9%</p>
            <p className="text-xs text-green-600 font-semibold">+0.7%</p>
            <div className="mt-2 h-1 bg-emerald-200 rounded-full">
              <div className="h-1 bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-xl border border-orange-200">
            <p className="text-xs font-bold text-orange-600 mb-1">平均LTV</p>
            <p className="text-lg font-black text-orange-900">¥647</p>
            <p className="text-xs text-green-600 font-semibold">+15.8%</p>
            <div className="mt-2 h-1 bg-orange-200 rounded-full">
              <div className="h-1 bg-orange-500 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-xl border border-red-200">
            <p className="text-xs font-bold text-red-600 mb-1">平均留存</p>
            <p className="text-lg font-black text-red-900">82.9%</p>
            <p className="text-xs text-green-600 font-semibold">+4.2%</p>
            <div className="mt-2 h-1 bg-red-200 rounded-full">
              <div className="h-1 bg-red-500 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-xs font-bold text-yellow-600 mb-1">平均CAC</p>
            <p className="text-lg font-black text-yellow-900">¥41</p>
            <p className="text-xs text-red-600 font-semibold">-8.5%</p>
            <div className="mt-2 h-1 bg-yellow-200 rounded-full">
              <div className="h-1 bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded-xl border border-pink-200">
            <p className="text-xs font-bold text-pink-600 mb-1">平均NPS</p>
            <p className="text-lg font-black text-pink-900">48.9</p>
            <p className="text-xs text-green-600 font-semibold">+6.8</p>
            <div className="mt-2 h-1 bg-pink-200 rounded-full">
              <div className="h-1 bg-pink-500 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-xl border border-indigo-200">
            <p className="text-xs font-bold text-indigo-600 mb-1">自然流量</p>
            <p className="text-lg font-black text-indigo-900">70.1%</p>
            <p className="text-xs text-green-600 font-semibold">+5.2%</p>
            <div className="mt-2 h-1 bg-indigo-200 rounded-full">
              <div className="h-1 bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* 趋势洞察 - 最终增强版 */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="text-lg font-black text-gray-900 mb-4">关键趋势洞察</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="text-sm font-black text-green-800">增长亮点</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">收入增长:</span>
                  <span className="font-bold text-green-700">4-6月强劲增长</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">用户增长:</span>
                  <span className="font-bold text-green-700">8月创历史新高</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LTV提升:</span>
                  <span className="font-bold text-green-700">持续上升趋势</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NPS改善:</span>
                  <span className="font-bold text-green-700">用户满意度提升</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-black text-blue-800">优化机会</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">转化率:</span>
                  <span className="font-bold text-blue-700">仍有提升空间</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CAC控制:</span>
                  <span className="font-bold text-blue-700">需要持续优化</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">留存率:</span>
                  <span className="font-bold text-blue-700">接近目标85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">邮件营销:</span>
                  <span className="font-bold text-blue-700">开放率待提升</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="text-sm font-black text-orange-800">关注点</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">季节性:</span>
                  <span className="font-bold text-orange-700">5月、7月有回落</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">流量质量:</span>
                  <span className="font-bold text-orange-700">自然流量占比高</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">用户体验:</span>
                  <span className="font-bold text-orange-700">满意度持续改善</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">成本效率:</span>
                  <span className="font-bold text-orange-700">CAC/LTV比例良好</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部总结与建议 - 最终版 */}
      <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-8 rounded-3xl shadow-xl border border-white/20 text-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">数据洞察总结</h3>
            <p className="text-sm text-blue-200 font-semibold">基于多维度数据分析的战略建议与行动计划</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-white">综合评分</p>
              <p className="text-3xl font-black text-yellow-400">8.7/10</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 核心成就 */}
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h4 className="text-lg font-black text-white">核心成就</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">收入同比增长 <span className="font-bold text-green-400">18.2%</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">用户满意度达到 <span className="font-bold text-blue-400">4.6/5.0</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">系统可用性保持 <span className="font-bold text-purple-400">99.9%</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">LTV/CAC比例优化至 <span className="font-bold text-orange-400">15.8:1</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">自然流量占比提升至 <span className="font-bold text-indigo-400">70%</span></span>
              </div>
            </div>
          </div>

          {/* 改进建议 */}
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h4 className="text-lg font-black text-white">改进建议</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 font-semibold">优化转化漏斗</p>
                  <p className="text-gray-300 text-xs">重点改善购物车到结账的转化率</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 font-semibold">深化地区策略</p>
                  <p className="text-gray-300 text-xs">重点投入深圳、北京等明星区域</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 font-semibold">移动端体验</p>
                  <p className="text-gray-300 text-xs">进一步优化移动端购物体验</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 font-semibold">个性化推荐</p>
                  <p className="text-gray-300 text-xs">基于用户画像优化产品推荐</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 font-semibold">客户服务</p>
                  <p className="text-gray-300 text-xs">提升问题区域的服务质量</p>
                </div>
              </div>
            </div>
          </div>

          {/* 下阶段目标 */}
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-green-400" />
              <h4 className="text-lg font-black text-white">下阶段目标</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-200 font-semibold">月收入目标</span>
                  <span className="text-green-400 font-bold">¥80K</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <p className="text-xs text-gray-300 mt-1">当前: ¥72K (90%)</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-200 font-semibold">转化率目标</span>
                  <span className="text-blue-400 font-bold">5.0%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <p className="text-xs text-gray-300 mt-1">当前: 4.8% (96%)</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-200 font-semibold">用户留存</span>
                  <span className="text-purple-400 font-bold">95%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '97%' }}></div>
                </div>
                <p className="text-xs text-gray-300 mt-1">当前: 92% (97%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部行动计划 */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <h4 className="text-lg font-black text-white mb-4">即时行动计划</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">本周</p>
              <p className="text-xs text-gray-300">优化移动端结账流程</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">本月</p>
              <p className="text-xs text-gray-300">启动深圳市场扩张计划</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">本季度</p>
              <p className="text-xs text-gray-300">实施个性化推荐系统</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">年度目标</p>
              <p className="text-xs text-gray-300">实现收入翻倍增长</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
