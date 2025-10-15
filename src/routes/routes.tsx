import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, type RouteObject } from 'react-router'
import PATH from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import CartLayout from '~/layouts/CartLayout'
import LoginLayout from '~/layouts/LoginLayout/LoginLayout'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import UserLayout from '~/pages/User/layouts/UserLayout'
// import NotFound from '~/pages/NotFound'
const NotFound = lazy(() => import('~/pages/NotFound'))
const ChangePassword = lazy(() => import('~/pages/User/pages/ChangePassword'))
const Register = lazy(() => import('~/pages/Register'))
const Profile = lazy(() => import('~/pages/Profile'))
const ProductList = lazy(() => import('~/pages/ProductList'))
const ProductDetail = lazy(() => import('~/pages/ProductDetail'))
const Login = lazy(() => import('~/pages/Login'))
const Cart = lazy(() => import('~/pages/Cart'))
const HistoryPurchase = lazy(() => import('~/pages/User/pages/HistoryPurchase'))
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
        <Suspense>
          <ProductList />
        </Suspense>
      </MainLayout>
    )
  },
  {
    path: PATH.productDetail,
    element: (
      <MainLayout>
        <Suspense>
          <ProductDetail />
        </Suspense>
      </MainLayout>
    )
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: PATH.cart,
        element: (
          <CartLayout>
            <Suspense>
              <Cart />
            </Suspense>
          </CartLayout>
        )
      },
      {
        path: PATH.user,
        element: (
          <MainLayout>
            <UserLayout />
          </MainLayout>
        ),
        children: [
          {
            path: PATH.profile,

            element: (
              <Suspense>
                <Profile />
              </Suspense>
            )
          },
          {
            path: PATH.changePassword,
            element: (
              <Suspense>
                <ChangePassword />
              </Suspense>
            )
          },
          {
            path: PATH.historyPurchase,
            element: (
              <Suspense>
                <HistoryPurchase />
              </Suspense>
            )
          }
        ]
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
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <Suspense>
          <NotFound />
        </Suspense>
      </MainLayout>
    )
  }
]
export default routes
