import { db } from '@/firestore/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface UserData {
  id: string
  name: string
  email: string
  imgUrl?: string
  friends?: string[]
  bio?: string
  incomingRequests?: string[]
  outgoingRequests?: string[]
}
export const fetchUserById = async (id: string): Promise<UserData | null> => {
  try {
    const ref = doc(db, "users", id)
    const snapshot = await getDoc(ref)

    if (!snapshot.exists()) {
      console.warn("User not found:", id)
      return null
    }

    const data = snapshot.data()
    return {
      id: snapshot.id,
      ...data,
    } as UserData
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}
