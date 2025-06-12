import { useState, useEffect } from 'react'
import { 
  Users, Search, Filter, Plus, Edit, Trash2, 
  Mail, Phone, MapPin, Calendar, UserCheck, UserX,
  Download, Upload, RefreshCw, Eye, Star,
  ChevronLeft, ChevronRight, X, Check,
  Building, Clock, Activity, Crown, Package, Save
} from 'lucide-react'
// 使用 type-only import
import { userAPI } from '../services/userAPI'
import type { User, UserStats } from '../services/userAPI'

const departments = ['技术部', '产品部', '设计部', '运营部', '销售部', '市场部']
const departmentOptions = ['全部', ...departments]
const roles = ['全部', 'admin', 'moderator', 'user']
const statuses = ['全部', 'active', 'inactive', 'pending']

// 表单数据类型
interface UserFormData {
  name: string
  email: string
  phone: string
  department: string
  position: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'pending'
  location: string  // 添加这个字段
}


function UserManagement() {
  // 状态管理
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [userStats, setUserStats] = useState<UserStats>({ total: 0, active: 0, pending: 0, admin: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('全部')
  const [selectedRole, setSelectedRole] = useState('全部')
  const [selectedStatus, setSelectedStatus] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 新增：表单相关状态
  const [showUserForm, setShowUserForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    department: departments[0] || '',
    position: '',
    role: 'user',
    status: 'pending',
    location: ''  // 添加这个字段
  })
  const [formErrors, setFormErrors] = useState<Partial<UserFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 数据加载函数
  const loadUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await userAPI.getUsers({
        page: currentPage,
        limit: usersPerPage,
        search: searchTerm,
        department: selectedDepartment === '全部' ? '' : selectedDepartment,
        role: selectedRole === '全部' ? '' : selectedRole,
        status: selectedStatus === '全部' ? '' : selectedStatus,
        sortBy,
        sortOrder
      })
      
      setUsers(response.users)
      setFilteredUsers(response.users)
      setTotalPages(response.totalPages)
      setTotalRecords(response.total)
    } catch (error) {
      console.error('加载用户失败:', error)
      setError('加载用户数据失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserStats = async () => {
    try {
      const stats = await userAPI.getUserStats()
      setUserStats(stats)
    } catch (error) {
      console.error('加载统计失败:', error)
    }
  }

  // 初始化数据加载
  useEffect(() => {
    loadUsers()
  }, [currentPage, searchTerm, selectedDepartment, selectedRole, selectedStatus, sortBy, sortOrder])

  useEffect(() => {
    loadUserStats()
  }, [])

  // 分页逻辑（现在由后端处理，这里保留用于显示）
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers // 直接使用从API获取的数据

  // 状态样式映射
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'inactive':
        return 'bg-red-100 text-red-700 border border-red-200'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃'
      case 'inactive': return '未激活'
      case 'pending': return '待审核'
      default: return status
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return '管理员'
      case 'moderator': return '协调员'
      case 'user': return '普通用户'
      default: return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50'
      case 'moderator': return 'text-blue-600 bg-blue-50'
      case 'user': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  // 表单验证
  const validateForm = (): boolean => {
    const errors: Partial<UserFormData> = {}

    if (!formData.name.trim()) {
      errors.name = '姓名不能为空'
    }

    if (!formData.email.trim()) {
      errors.email = '邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '邮箱格式不正确'
    }

    if (!formData.phone.trim()) {
      errors.phone = '手机号不能为空'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '手机号格式不正确'
    }

    if (!formData.position.trim()) {
      errors.position = '职位不能为空'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: departments[0] || '',
      position: '',
      role: 'user',
      status: 'pending',
      location: ''  // 添加这个字段
    })
    setFormErrors({})
    setIsEditing(false)
    setEditingUserId(null)
  }

  // 打开添加用户表单
  const handleAddUser = () => {
    resetForm()
    setShowUserForm(true)
  }

  // 打开编辑用户表单
  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      position: user.position,
      role: user.role,
      status: user.status,
      location: ''  // 添加这个字段
    })
    setIsEditing(true)
    setEditingUserId(user.id)
    setShowUserForm(true)
  }

  // 提交表单
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      if (isEditing && editingUserId) {
        // 编辑用户
        await userAPI.updateUser(editingUserId, formData)
        setError(null)
      } else {
        // 创建用户
        await userAPI.createUser(formData)
        setError(null)
      }
      
      // 关闭表单并刷新数据
      setShowUserForm(false)
      resetForm()
      await loadUsers()
      await loadUserStats()
    } catch (error: any) {
      console.error('提交表单失败:', error)
      setError(error.message || '操作失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 处理用户选择
  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentUsers.map(user => user.id))
    }
  }

  // 批量操作
  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) return
    
    setIsLoading(true)
    try {
      await userAPI.batchOperation(action as any, selectedUsers)
      setSelectedUsers([])
      await loadUsers()
      await loadUserStats()
    } catch (error) {
      console.error('批量操作失败:', error)
      setError('批量操作失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 用户操作
  const handleUserAction = async (action: string, user: User) => {
    console.log(`对用户 ${user.name} 执行操作: ${action}`)
    if (action === 'view') {
      setSelectedUser(user)
      setShowUserModal(true)
    } else if (action === 'edit') {
      handleEditUser(user)
    } else if (action === 'delete') {
      if (window.confirm(`确定要删除用户 ${user.name} 吗？`)) {
        setIsLoading(true)
        try {
          await userAPI.deleteUser(user.id)
          await loadUsers()
          await loadUserStats()
        } catch (error) {
          console.error('删除用户失败:', error)
          setError('删除用户失败，请稍后重试')
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  // 处理搜索和筛选的防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1) // 重置到第一页
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="space-y-8">
      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">总用户数</p>
                <p className="text-3xl font-black text-gray-900">{userStats.total}</p>
                <p className="text-xs text-gray-500 mt-1">+12% 本月</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">活跃用户</p>
                <p className="text-3xl font-black text-gray-900">{userStats.active}</p>
                <p className="text-xs text-gray-500 mt-1">+8% 本周</p>
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
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">待审核</p>
                <p className="text-3xl font-black text-gray-900">{userStats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">需要处理</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">管理员</p>
                <p className="text-3xl font-black text-gray-900">{userStats.admin}</p>
                <p className="text-xs text-gray-500 mt-1">系统管理</p>
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
                  placeholder="搜索用户姓名、邮箱或手机号..."
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
              <button 
                onClick={handleAddUser}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
              >
                <Plus className="w-5 h-5 mr-3 inline" />
                添加用户
              </button>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        {showFilters && (
          <div className="border-t border-gray-200/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">部门</label>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">角色</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role === '全部' ? '全部' : getRoleText(role)}</option>
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
                  {statuses.map(status => (
                    <option key={status} value={status}>{status === '全部' ? '全部' : getStatusText(status)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">排序</label>
                <select 
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-')
                    setSortBy(field || 'name')
                    setSortOrder((order as 'asc' | 'desc') || 'asc')
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  <option value="name-asc">姓名 A-Z</option>
                  <option value="name-desc">姓名 Z-A</option>
                  <option value="join_date-desc">加入时间 新-旧</option>
                  <option value="join_date-asc">加入时间 旧-新</option>
                  <option value="last_login-desc">最后登录 新-旧</option>
                  <option value="rating-desc">评分 高-低</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 用户列表 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">用户列表</h3>
            <div className="text-sm text-gray-600 font-semibold">
              显示 {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, totalRecords)} 条，
              共 {totalRecords} 条记录
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
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                  />
                </th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">用户</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">联系方式</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">部门</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">角色</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">状态</th>
                <th className="px-8 py-6 text-left text-sm font-black text-gray-900 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-8 py-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
                    />
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-12 h-12 rounded-2xl border-2 border-white shadow-md"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === 'active' ? 'bg-emerald-500' : 
                          user.status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{user.name}</p>
                        <p className="text-sm text-gray-600 font-semibold">{user.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 font-medium">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 font-medium">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-gray-900">{user.department}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusStyle(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUserAction('view', user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                        title="查看详情"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleUserAction('edit', user)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                        title="编辑用户"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleUserAction('delete', user)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        title="删除用户"
                      >
                        <Trash2 className="w-5 h-5" />
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
              显示 {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, totalRecords)} 条，
              共 {totalRecords} 条记录
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

      {/* 用户表单模态框 */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <h3 className="text-2xl font-black text-gray-900">
                {isEditing ? '编辑用户' : '添加用户'}
              </h3>
              <button
                onClick={() => {
                  setShowUserForm(false)
                  resetForm()
                }}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitForm} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium ${
                      formErrors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="请输入用户姓名"
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{formErrors.name}</p>
                  )}
                </div>

                {/* 邮箱 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium ${
                      formErrors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="请输入邮箱地址"
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{formErrors.email}</p>
                  )}
                </div>

                {/* 手机号 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    手机号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="请输入手机号码"
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{formErrors.phone}</p>
                  )}
                </div>

                {/* 职位 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    职位 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium ${
                      formErrors.position ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="请输入职位名称"
                  />
                  {formErrors.position && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{formErrors.position}</p>
                  )}
                </div>

                {/* 部门 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    部门 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* 角色 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    角色 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'moderator' | 'user' }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  >
                    <option value="user">普通用户</option>
                    <option value="moderator">协调员</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>

                {/* 状态 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    状态 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'pending' }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                  >
                    <option value="pending">待审核</option>
                    <option value="active">活跃</option>
                    <option value="inactive">未激活</option>
                  </select>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200/50">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserForm(false)
                    resetForm()
                  }}
                  className="px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3 inline-block"></div>
                      {isEditing ? '更新中...' : '创建中...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-3 inline" />
                      {isEditing ? '更新用户' : '创建用户'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 用户详情模态框 */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/40">
            <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
              <h3 className="text-2xl font-black text-gray-900">用户详情</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* 用户基本信息 */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name}
                    className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl border-4 border-white shadow-md ${
                    selectedUser.status === 'active' ? 'bg-emerald-500' : 
                    selectedUser.status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-3xl font-black text-gray-900 mb-2">{selectedUser.name}</h4>
                  <p className="text-lg text-gray-600 font-semibold mb-4">{selectedUser.position}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getStatusStyle(selectedUser.status)}`}>
                      {getStatusText(selectedUser.status)}
                    </span>
                    <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${getRoleColor(selectedUser.role)}`}>
                      {getRoleText(selectedUser.role)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <span className="font-bold text-gray-900">{selectedUser.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 联系信息 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">联系信息</h5>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">邮箱地址</p>
                        <p className="font-bold text-gray-900">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">手机号码</p>
                        <p className="font-bold text-gray-900">{selectedUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">所属部门</p>
                        <p className="font-bold text-gray-900">{selectedUser.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">工作地点</p>
                        <p className="font-bold text-gray-900">{selectedUser.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 工作统计 */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
                  <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">工作统计</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="p-3 bg-blue-100 rounded-xl mx-auto w-fit mb-3">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-black text-blue-600">{selectedUser.login_count}</p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">登录次数</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="p-3 bg-emerald-100 rounded-xl mx-auto w-fit mb-3">
                        <Star className="w-6 h-6 text-emerald-600" />
                      </div>
                      <p className="text-2xl font-black text-emerald-600">{selectedUser.rating}</p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">用户评分</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="p-3 bg-purple-100 rounded-xl mx-auto w-fit mb-3">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-black text-purple-600">{selectedUser.projects}</p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">参与项目</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 shadow-sm">
                      <div className="p-3 bg-orange-100 rounded-xl mx-auto w-fit mb-3">
                        <Check className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-2xl font-black text-orange-600">{selectedUser.tasks}</p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">完成任务</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 时间信息 */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                <h5 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-wide">时间信息</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">加入时间</p>
                      <p className="font-bold text-gray-900">{selectedUser.join_date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">最后登录</p>
                      <p className="font-bold text-gray-900">{selectedUser.last_login}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200/50">
                <button className="px-8 py-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold">
                  <Mail className="w-5 h-5 mr-3 inline" />
                  发送消息
                </button>
                <button 
                  onClick={() => {
                    setShowUserModal(false)
                    handleEditUser(selectedUser)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
                >
                  <Edit className="w-5 h-5 mr-3 inline" />
                  编辑用户
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
      {filteredUsers.length === 0 && !isLoading && (
        <div className="bg-white/90 backdrop-blur-lg p-16 rounded-3xl text-center border border-white/40 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">未找到用户</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
            {searchTerm || selectedDepartment !== '全部' || selectedRole !== '全部' || selectedStatus !== '全部'
              ? '没有符合筛选条件的用户，请尝试调整筛选条件'
              : '系统中暂无用户数据，请添加用户'
            }
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedDepartment('全部')
                setSelectedRole('全部')
                setSelectedStatus('全部')
              }}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-3 inline" />
              清除筛选
            </button>
            <button 
              onClick={handleAddUser}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-blue-200 font-bold"
            >
              <Plus className="w-5 h-5 mr-3 inline" />
              添加用户
            </button>
          </div>
        </div>
      )}

      {/* 批量操作提示 */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg shadow-2xl border border-white/40 rounded-3xl p-6 flex items-center space-x-6 z-30">
          <span className="text-sm text-gray-700 font-bold">
            已选择 {selectedUsers.length} 个用户
          </span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleBulkAction('activate')}
              className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl text-sm hover:bg-emerald-200 transition-colors duration-200 font-bold"
            >
              <UserCheck className="w-4 h-4 mr-2 inline" />
              批量激活
            </button>
            <button 
              onClick={() => handleBulkAction('deactivate')}
              className="px-6 py-3 bg-red-100 text-red-700 rounded-2xl text-sm hover:bg-red-200 transition-colors duration-200 font-bold"
            >
              <UserX className="w-4 h-4 mr-2 inline" />
              批量禁用
            </button>
            <button 
              onClick={() => handleBulkAction('export')}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl text-sm hover:bg-blue-200 transition-colors duration-200 font-bold"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              导出数据
            </button>
            <button 
              onClick={() => setSelectedUsers([])}
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
          onClick={handleAddUser}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-blue-200"
          title="添加用户"
        >
          <Plus className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl shadow-2xl hover:from-emerald-700 hover:to-green-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-emerald-200"
          title="导入用户"
        >
          <Upload className="w-8 h-8" />
        </button>
        <button 
          className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-3xl shadow-2xl hover:from-gray-700 hover:to-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-gray-200"
          title="导出数据"
        >
          <Download className="w-8 h-8" />
        </button>
        <button 
          onClick={() => {
            loadUsers()
            loadUserStats()
          }}
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-purple-200"
          title="刷新数据"
        >
          <RefreshCw className="w-8 h-8" />
        </button>
      </div>
      </div>
  )
}

export default UserManagement


