import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import LoginPage from '../pages/auth/LoginPage'
import ProfilePage from '../pages/dashboard/ProfilePage'
import ProductsListPage from '../pages/products/ProductsListPage'
import ProductDetailPage from '../pages/products/ProductDetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
)

export default AppRoutes
