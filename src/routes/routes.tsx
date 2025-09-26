import { useContext } from 'react'
import { Navigate, Outlet, type RouteObject } from 'react-router'
import PATH from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import CartLayout from '~/layouts/CartLayout'
import LoginLayout from '~/layouts/LoginLayout/LoginLayout'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Cart from '~/pages/Cart'
import Login from '~/pages/Login'
import ProductDetail from '~/pages/ProductDetail/ProductDetail'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const routes: RouteObject[] = [
  {
    path: PATH.home,
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    )
  },
  {
    path: PATH.productDetail,
    element: (
      <MainLayout>
        <ProductDetail />
      </MainLayout>
    )
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: PATH.profile,
        element: (
          <MainLayout>
            <Profile />
          </MainLayout>
        )
      },
      {
        path: PATH.cart,
        element: (
          <CartLayout>
            <Cart />
          </CartLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: PATH.login,
        element: (
          <LoginLayout>
            <Login />
          </LoginLayout>
        )
      },
      {
        path: PATH.register,
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
