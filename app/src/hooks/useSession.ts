import { AccountService } from '@/services/account'
import { useAuthStore } from '@/stores/auth'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export function useSession() {
  const { isAuth, setIsAuth, setRole } = useAuthStore(
    useShallow((state) => ({
      setRole: state.setRole,
      setIsAuth: state.setIsAuth,
      isAuth: state.isAuth,
    }))
  )
  const [isLoading, setIsLoading] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const user = await AccountService.getCurrentUser()

      if (user) {
        setRole(user.prefs.role)
        setIsAuth(true)
      }

      setIsLoading(false)
    })()
  }, [])

  return { isAuth, isLoading }
}
