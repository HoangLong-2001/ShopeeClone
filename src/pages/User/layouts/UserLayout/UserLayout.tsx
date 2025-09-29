import { Outlet } from 'react-router'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='border-b-4 border-b-orange bg-neutral-100 py-6'>
      <div className='container grid grid-cols-1 md:grid-cols-12'>
        <div className='md:col-span-3 lg:col-span-2'>
          <UserSideNav />
        </div>
        <div className='md:col-span-9 lg:col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
