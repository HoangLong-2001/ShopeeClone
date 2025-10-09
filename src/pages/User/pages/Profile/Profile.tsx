import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm, type Resolver } from 'react-hook-form'
import { getProfile, updateProfile, uploadAvatar } from '~/apis/user.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import type { UserFormState, IResponse } from '~/types/common.type'
import { userSchema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-toastify'
import { saveProfileToLS } from '~/utils/auth'
import DateSelect from '../../components/DateSelect'
import type { User } from '~/types/user.type'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
type FormData = Pick<UserFormState, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & { date_of_birth: string }
const profileSchema = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema) as Resolver<FormData, any, FormData>,
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    }
  })
  const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })
  const updateProfileMutation = useMutation(updateProfile)
  const uploadAvatarMutation = useMutation(uploadAvatar)
  const profile = profileData?.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('phone', profile.phone || '')
      setValue('address', profile.address || '')
      setValue('avatar', profile.avatar || '')
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data as User)
      saveProfileToLS(res.data as User)
      refetch()
      toast.success(res.message, {
        autoClose: 1000
      })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<IResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
        toast.error(error.message, {
          autoClose: 1000
        })
      }
    }
  })
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='name'
                errorMessage={errors.name?.message}
                placeholder='Tên'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='phone'
                errorMessage={errors.phone?.message}
                placeholder='Số điện thoại'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='address'
                errorMessage={errors.address?.message}
                placeholder='Địa chỉ'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => <DateSelect value={field.value} onChange={field.onChange} />}
          />

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={previewImage || avatar} alt='' className='h-full w-full rounded-full object-cover' />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
            <button
              onClick={handleUpload}
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
