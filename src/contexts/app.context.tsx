import { createContext, useState } from 'react'
import type { ExtraPurchase } from '~/types/purchase.type'
import type { User } from '~/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

interface IAppContext {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extraPurchase: ExtraPurchase[]
  setExtraPurchase: React.Dispatch<React.SetStateAction<ExtraPurchase[]>>
}
const initialAppContext: IAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated() {
    return null
  },
  setProfile: () => null,
  profile: getProfileFromLS(),
  extraPurchase: [],
  setExtraPurchase: () => null
}
export const AppContext = createContext<IAppContext>(initialAppContext)
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extraPurchase, setExtraPurchase] = useState<ExtraPurchase[]>(initialAppContext.extraPurchase)
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, extraPurchase, setExtraPurchase }}
    >
      {children}
    </AppContext.Provider>
  )
}
