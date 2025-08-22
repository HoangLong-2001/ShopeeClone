import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { FORM_VALIDATE, getRules } from '~/constants/common'
import type { IFormState } from '~/types/common'

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<IFormState>()
  const onSubmit = handleSubmit((data) => console.log(data))
  const rules = getRules(getValues)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm Password'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
