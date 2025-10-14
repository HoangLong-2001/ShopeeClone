import { Link } from 'react-router'
import PATH from '~/constants/path'

export default function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-orange lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-orange md:text-4xl dark:text-white'>Not Found.</p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            {/* Sorry, we can't find that page. You'll find lots to explore on the home page.{' '} */}
            Không tìm thấy trang
          </p>
          <Link
            to={PATH.home}
            className='hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg bg-orange px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4'
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </section>
  )
}
