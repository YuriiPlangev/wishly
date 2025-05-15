import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firestore/firebase';
import { toast } from 'sonner';

interface Wishlist {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
  eventDate: string;
  occasion: string;
  createdDate: string;
  privacy: string;
  sharedLink?: string;
}

interface CreateWishlistParams {
  userId: string;
  wishlist: Omit<Wishlist, 'id' | 'createdDate' | 'sharedLink'>;
  privacy: string;
}

export const createWishlist = async (
  { userId, wishlist, privacy }: CreateWishlistParams
): Promise<{ success: boolean; error?: any }> => {
  const generatedId = `${userId}-${Date.now()}`;

  const sharedLink =
    privacy === 'shared-link'
      ? `/FriendWishlist/${userId}/${generatedId}`
      : undefined;

  const newWishlist: Wishlist = {
    ...wishlist,
    id: generatedId,
    createdDate: new Date().toISOString().split('T')[0],
    privacy,
    ...(sharedLink && { sharedLink }),
  };

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      wishlists: arrayUnion(newWishlist),
    });
    return { success: true };
  } catch (error) {
    console.error('Ошибка при добавлении вишлиста:', error);
    return { success: false, error };
  }
};
