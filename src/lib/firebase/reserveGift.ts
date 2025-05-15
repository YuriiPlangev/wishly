import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firestore/firebase"
export async function reserveGift(friendId: string, wishlistId: string, giftId: string) {
    const friendRef = doc(db, "users", friendId)
    const friendSnap = await getDoc(friendRef)
  
    if (!friendSnap.exists()) throw new Error("Friend not found")
  
    const wishlists = friendSnap.data().wishlists || []
    const updatedWishlists = wishlists.map((wishlist: any) => {
      if (wishlist.id === wishlistId) {
        if (Array.isArray(wishlist.gifts)) {
          wishlist.gifts = wishlist.gifts.map((gift: any) =>
            gift.id === giftId ? { ...gift, reserved: true } : gift
          )
        }
      }
      return wishlist
    })
  
    await updateDoc(friendRef, { wishlists: updatedWishlists })
  }