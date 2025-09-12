import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { login } from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import PATH from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import type { IFormState, IResponse } from '~/types/common.type'
import { schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
type FormData = Pick<IFormState, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // getValues,
    setError,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
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
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input<Omit<IFormState, 'confirm_password'>>
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                onChange={() => trigger('email')}
                errorMessage={errors.email?.message}
              />

              <Input<Omit<IFormState, 'confirm_password'>>
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                onChange={() => trigger('password')}
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={PATH.register}>
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
