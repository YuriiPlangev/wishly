"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firestore/firebase'
import { useEffect, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import UserGift from "../../components/shared/UserGift"
import UserWishlistInfo from "@/app/components/shared/UserWishlistInfo"

export default function WishlistDetailPage() {


  const {user} = useUserStore((state) => state);
  const params = useParams();
  const [wishlist, setWishlist] = useState(null);
  const wishlistId = params?.id;


  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !wishlistId) return;

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const allWishlists = userData.wishlists || [];

        const found = allWishlists.find(w => w.id === wishlistId);
        if (found) {
          setWishlist(found);
        } else {
          console.log("Wishlist not found");
        }
      }
    };

    fetchWishlist();
  }, [user, wishlistId, wishlist]);


  if (!wishlist) return <p>Загрузка...</p>; 




  return (
    <div className="min-h-screen  pb-16">
    
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <Link href="/profile" className="flex items-center text-gray-600 hover:text-black">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </Link>
      </header>

        <div className="max-w-4xl mx-auto">
          <UserWishlistInfo
            wishlist={wishlist} user={user}/>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {wishlist.gifts?.map((gift) => (
              <UserGift
                user={user}
                wishlistId={wishlist.id}
                key={gift.id}
                gift={gift}
              />
            ))}
          </section>

        </div>
      </div>
  )
}
