import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firestore/firebase";

export async function addToReservedList(
  userId: string,
  gift: any,
  wishlistId: string,
  friendId: string,
  friendName: string,
  wishlistName: string
) {
  const userRef = doc(db, "users", userId)
  const giftData = {
    id: gift.id,
    title: gift.title,
    price: gift.price,
    imgUrl: gift.imgUrl,
    link: gift.link,
    wishlistId,
    friendId,
    friendName,
    wishlistName,
    reservedAt: new Date().toISOString()
  }

  await updateDoc(userRef, {
    reserved: arrayUnion(giftData)
  })
}

