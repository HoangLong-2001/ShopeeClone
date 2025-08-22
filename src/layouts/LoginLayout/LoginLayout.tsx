import type React from 'react'
import Footer from '~/components/Footer'
import RegisterHeader from '~/components/RegisterHeader'

interface ILoginLayoutProps {
  children?: React.ReactNode
}
export default function LoginLayout({ children }: ILoginLayoutProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
