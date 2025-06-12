import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'


import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Users from './pages/Users'
import Orders from './pages/Orders'
import Finance from './pages/Finance'
import Settings from './pages/Settings'
import Layout from './components/Layout/Layout'
import AuthLayout from './components/Layout/AuthLayout'
import AuthPage from './pages/AuthPage'
import RequireAuth from './components/Layout/RequireAuth'

function App() {
  // 实际项目请用 context 或 redux 存储登录状态
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页，单独用 AuthLayout 包裹 */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />
            </AuthLayout>
          }
        />

        {/* 需要登录的主应用路由 */}
        <Route
          path="/"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={<Settings />} />
          {/* 其他嵌套路由 */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App