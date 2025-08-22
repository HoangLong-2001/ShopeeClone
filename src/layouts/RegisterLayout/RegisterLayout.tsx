import type React from 'react'
import Footer from '~/components/Footer'
import RegisterHeader from '~/components/RegisterHeader'

interface IRegisterLayoutProps {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: IRegisterLayoutProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
