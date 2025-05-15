import { create } from 'zustand';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore/firebase';

interface Gift {
  id: string;
  title: string;
  description: string;
  link: string;
  img: string;
  imgUrl?: string;
}

interface Wishlist {
  createdDate: string;
  description: string;
  eventDate: string;
  gifts: Gift[];
}

interface UserWishlistState {
  wishlists: Wishlist[];
  fetchUserWishlist: (userId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useUserWishlistStore = create<UserWishlistState>((set) => ({
  wishlists: [],
  loading: false,
  error: null,

  fetchUserWishlist: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const wishlistsArray = userData.wishlists || [];

        const wishlists: Wishlist[] = wishlistsArray.map((wishlist: any) => ({
          createdDate: wishlist.createdDate,
          description: wishlist.description,
          eventDate: wishlist.eventDate,
          gifts: wishlist.gifts || [],
        }));

        set({ wishlists, loading: false });
      } else {
        set({ wishlists: [], loading: false, error: 'Пользователь не найден' });
      }
    } catch (err: any) {
      console.error('Ошибка загрузки вишлистов:', err);
      set({ error: err.message, loading: false });
    }
  },
}));

export default useUserWishlistStore;
