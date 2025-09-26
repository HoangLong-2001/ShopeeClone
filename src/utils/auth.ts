import type { User } from '~/types/user.type'

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const clearFromLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}
export const saveProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
