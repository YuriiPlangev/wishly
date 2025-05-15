import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firestore/firebase'

export const getReservedGifts = async (userId: string) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    throw new Error('User not found')
  }

  const data = userSnap.data()
  return data.reserved || [] 
}
