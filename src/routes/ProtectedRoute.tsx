import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <p>Cargando sesión...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute