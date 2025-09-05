import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { login } from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { AppContext } from '~/contexts/app.context'
import type { IFormState, IResponse } from '~/types/common.type'
import { schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // getValues,
    setError,
    formState: { errors }
  } = useForm<Omit<IFormState, 'confirm_password'>>({
    resolver: yupResolver(schema.omit(['confirm_password']))
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<IFormState, 'confirm_password'>) => login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess(data) {
        toast.success('Đăng nhập thành công')
        if (data.data?.user) setProfile(data.data?.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<IResponse<Omit<IFormState, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
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
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input<Omit<IFormState, 'confirm_password'>>
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                errorMessage={errors.email?.message}
              />

              <Input<Omit<IFormState, 'confirm_password'>>
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full flex items-center justify-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
