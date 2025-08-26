import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import Input from '~/components/Input'
import { schema } from '~/utils/rules'
import type { IFormState, IResponse } from '~/types/common.type'
import { registerAccount } from '~/apis/auth.api'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export default function Register() {
  const {
    register,
    handleSubmit,
    // getValues,
    setError,
    formState: { errors }
  } = useForm<IFormState>({
    resolver: yupResolver(schema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<IFormState, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess(data) {
        console.log('data', data)
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<IResponse<Omit<IFormState, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          console.log('error', error)
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  // const rules = getRules(getValues)
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
                errorMessage={errors.email?.message}
              />

              <Input<IFormState>
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />

              <Input<IFormState>
                className='mt-3'
                type='password'
                placeholder='Confirm Password'
                register={register}
                name='confirm_password'
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
