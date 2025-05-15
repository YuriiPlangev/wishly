import { getDoc, doc } from "firebase/firestore"
import { db } from "../../firestore/firebase"

export const fetchUserWishlistById = async (
  userId: string,
  wishlistId: string
) => {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const user = docSnap.data()
      const wishlists = user.wishlists || []

      const wishlist = wishlists.find((w: any) => w.id === wishlistId)

      if (!wishlist) {
        console.warn("Wishlist not found")
        return null
      }

      return {
        ...wishlist,
        id: wishlistId,
        ownerId: userId,
      }
    } else {
      console.warn("User not found")
      return null
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return null
  }
}
