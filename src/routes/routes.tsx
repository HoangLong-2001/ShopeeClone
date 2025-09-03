import { Navigate, Outlet, type RouteObject } from 'react-router'
import LoginLayout from '~/layouts/LoginLayout/LoginLayout'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'
const isAuthenticated = false
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    )
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/profile',
        element: (
          <MainLayout>
            <Profile />
          </MainLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: '/login',
        element: (
          <LoginLayout>
            <Login />
          </LoginLayout>
        )
      },
      {
        path: '/register',
        element: (
          <RegisterLayout>
            <Register />
          </RegisterLayout>
        )
      }
    ]
  }
]
export default routes
