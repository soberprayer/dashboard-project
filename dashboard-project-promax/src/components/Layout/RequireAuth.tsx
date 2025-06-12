import { Navigate, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
  isAuthenticated: boolean
}

export default function RequireAuth({ children, isAuthenticated }: RequireAuthProps) {
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}