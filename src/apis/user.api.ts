import type { IResponse } from '~/types/common.type'
import type { User } from '~/types/user.type'
import http from '~/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}
export const getProfile = async () => {
  const response = await http.get<IResponse<User>>('me')
  return response.data
}
export const updateProfile = async (body: BodyUpdateProfile) => {
  return (await http.put<IResponse<User>>('user', body)).data
}

export const uploadAvatar = async (body: FormData) => {
  return await http.post<IResponse<string>>('user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
