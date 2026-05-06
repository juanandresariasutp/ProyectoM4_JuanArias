import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AboutPage from '../pages/AboutPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import TasksPage from '../pages/TasksPage'
import ProtectedRoute from './ProtectedRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/acerca-de" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter