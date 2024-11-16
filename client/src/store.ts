import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { UserInfo } from './types'
type Store = {
  count: number
  isLogin: boolean
  user: UserInfo | undefined
  inc: () => void
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: UserInfo) => void
  logout: () => void
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 1,
      isLogin: false,
      user: undefined,
      inc: () => set((state) => ({ count: state.count + 1 })),
      setIsLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user }),
      logout: () => set({ isLogin: false, user: undefined }),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export { useStore, useStore as default }
