import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import Input from '~/components/Input'
import { schema } from '~/utils/rules'
import type { IFormState, IResponse } from '~/types/common.type'
import { registerAccount } from '~/apis/auth.api'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import PATH from '~/constants/path'

type FormData = Pick<IFormState, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<IFormState, 'confirm_password' | 'name'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess(data) {
        toast.success('Đăng ký thành công', {
          autoClose: 1000
        })
        setIsAuthenticated(true)
        if (data.data?.user) setProfile(data.data?.user)
        navigate('/')
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<IResponse<Omit<IFormState, 'confirm_password' | 'name'>>>(error)) {
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
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                errorMessage={errors.email?.message}
              />

              <Input
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />

              <Input
                className='mt-3'
                type='password'
                placeholder='Confirm Password'
                register={register}
                name='confirm_password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={PATH.login}>
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
