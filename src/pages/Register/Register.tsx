import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import Input from '~/components/Input'
import { getRules } from '~/constants/common'
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
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input<IFormState>
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                rules={rules.email}
                errorMessage={errors.email?.message}
              />

              <Input<IFormState>
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                name='password'
                rules={rules.password}
                autoComplete='on'
                errorMessage={errors.password?.message}
              />

              <Input<IFormState>
                className='mt-3'
                type='password'
                placeholder='Confirm Password'
                register={register}
                name='confirm_password'
                rules={rules.confirm_password}
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
              />
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
