import { useEffect, useState } from "react"
import { fetchUserById } from "@/lib/firebase/fetchUserById"

export function useFriendProfile(id: string | undefined) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof id === 'string') {
      setLoading(true)
      fetchUserById(id)
        .then(setUser)
        .finally(() => setLoading(false))
    }
  }, [id])

  return { user, loading }
}