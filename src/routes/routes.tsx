import LoginLayout from '~/layouts/LoginLayout/LoginLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Register from '~/pages/Register'
const routes = [
  {
    path: '/',
    element: <ProductList />
  },
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
export default routes
