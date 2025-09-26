import CartHeader from '~/components/CartHeader'
import Footer from '~/components/Footer'

interface IProps {
  children?: React.ReactNode
}
export default function CartLayout({ children }: IProps) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
