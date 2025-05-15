// hooks/useLogout.ts
import { signOut } from "firebase/auth"
import { auth } from "@/firestore/firebase"
import { useUserStore } from "@/app/store/useUserStore"
import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await signOut(auth)
      useUserStore.getState().setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Ошибка выхода:", error)
    }
  }

  return logout
}
