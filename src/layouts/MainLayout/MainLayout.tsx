import Footer from '~/components/Footer'
import Header from '~/components/Header'

interface IProps {
  children?: React.ReactNode
}
export default function MainLayout({ children }: IProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
