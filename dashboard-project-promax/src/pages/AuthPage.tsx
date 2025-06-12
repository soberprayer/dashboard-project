import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface AuthPageProps {
  onLoginSuccess: () => void
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setShowWelcome(true)
    }
  }

  const handleWelcomeClose = () => {
    setShowWelcome(false)
    onLoginSuccess()
    navigate(from, { replace: true })
  }

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-2xl px-10 py-8 flex flex-col items-center min-w-[320px]">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">欢迎回来，{email || '用户'}！</h2>
            <p className="text-gray-600 mb-6">很高兴再次见到您，祝您使用愉快！</p>
            <button
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition"
              onClick={handleWelcomeClose}
            >
              进入系统
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-2xl h-[380px] rounded-2xl shadow-2xl overflow-hidden bg-white/90"
        style={{ transform: 'translateY(-7vh)' }}>
        {/* 左侧装饰区域 */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative bg-gradient-to-br from-purple-600 to-blue-500">
          <div className="absolute inset-0 z-0 opacity-80" style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.93) 0%, rgba(59, 130, 246, 0.88) 100%)', borderRadius: 'inherit' }} />
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-white px-6">
            <h1 className="text-2xl font-bold mb-2 text-center">欢迎使用数据平台</h1>
            <p className="text-sm opacity-90 text-center">连接、分析、可视化您的业务数据</p>
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="flex w-full lg:w-1/2 h-full items-center justify-center px-4 md:px-6 bg-white z-10">
          <div className="w-full max-w-xs mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {isLogin ? '欢迎回来' : '创建账号'}
              </h2>
              <p className="text-gray-500 text-sm">
                {isLogin ? '使用您的账号登录系统' : '立即注册开始使用'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  电子邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                {isLogin ? '立即登录' : '注册账号'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-gray-500 text-sm">
                {isLogin ? '没有账号？' : '已有账号？'}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium ml-2 text-sm"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}