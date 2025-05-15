import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firestore/firebase";

export async function unreserveGift(userId: string, gift: any) {
  // 1. Удалить подарок из массива reserved текущего пользователя
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    reserved: arrayRemove(gift),
  });

  // 2. Найти друга и обновить его вишлист
  const friendRef = doc(db, "users", gift.friendId);
  const friendSnap = await getDoc(friendRef);

  if (!friendSnap.exists()) return;

  const friendData = friendSnap.data();
  const updatedWishlists = (friendData.wishlists || []).map((wishlist: any) => {
    if (wishlist.id === gift.wishlistId) {
      wishlist.gifts = (wishlist.gifts || []).map((g: any) => {
        if (g.id === gift.id) {
          return { ...g, reserved: false };
        }
        return g;
      });
    }
    return wishlist;
  });

  await updateDoc(friendRef, {
    wishlists: updatedWishlists,
  });
}
