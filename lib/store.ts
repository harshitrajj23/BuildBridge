import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "labourer" | "builder" | "client"

interface BuildBridgeStore {
  userRole: UserRole | null
  setUserRole: (role: UserRole) => void
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  userName: string | null
  setUserName: (name: string) => void
  resetStore: () => void
}

export const useBuildBridgeStore = create<BuildBridgeStore>()(
  persist(
    (set) => ({
      userRole: null,
      setUserRole: (role: UserRole) => set({ userRole: role }),
      isLoggedIn: false,
      setIsLoggedIn: (logged: boolean) => set({ isLoggedIn: logged }),
      userName: null,
      setUserName: (name: string) => set({ userName: name }),
      resetStore: () =>
        set({
          userRole: null,
          isLoggedIn: false,
          userName: null,
        }),
    }),
    {
      name: "buildbridge-store",
    },
  ),
)
