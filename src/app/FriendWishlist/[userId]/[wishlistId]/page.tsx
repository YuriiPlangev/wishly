
"use client"
import Link from "next/link"
import { ArrowLeft} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Progress } from "../../../components/ui/progress"
import { Badge } from "../../../components/ui/badge"
import FriendWishlistCard from "@/app/components/shared/FriendWishlistCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchUserWishlistById } from "../../../../lib/firebase/fetchWishlistById"
import { db } from "../../../../firestore/firebase"
import { getDoc, doc } from "firebase/firestore"
import { useUserStore } from "../../../store/useUserStore"


interface gifts {
  id: string
  title: string
  description: string
  link: string
  img: string
  imgUrl?: string
  price: number
}

interface user {
  name: string
  image?: string

}

interface wishlist {
  title: string
  description: string
  date: string
  occasion: string
  createdDate: string
  imgUrl?: string
  privacy?: string
  sharedLink?: string
  eventDate?: string
  gifts?: gifts[]
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<wishlist | null>(null)
  const [user, setUser] = useState<user | null>(null)
  const params = useParams()
  const userId = params.userId as string
  const wishlistId = params.wishlistId as string
  const { user: currentUser } = useUserStore()




  useEffect(() => {
    const loadData = async () => {
      const wishlistData = await fetchUserWishlistById(userId, wishlistId)
      setWishlist(wishlistData)
  
      const userSnap = await getDoc(doc(db, "users", userId))
      if (userSnap.exists()) {
        setUser(userSnap.data())
      }
    }
  
    loadData()
  }, [userId, wishlistId])


  if (!wishlist || !user) {
   return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Profile loading...</p>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen  pb-16">

      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <Link href="/profile" className="flex items-center text-muted-foreground hover:text-black">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </Link>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <div className="bg-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || "/svg/placeholder.svg"} alt="User" />
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{user.name}'s {wishlist.title} Wishlist</h1>
                  <Badge variant="outline" className="bg-[#F3E9DD] text-black border-none">
                    {wishlist.occasion}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{wishlist.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Created by {user.name}</span>
                  {
                    wishlist.eventDate && (
                      <span className="text-gray-500">Event date: {wishlist.eventDate}</span>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#F3E9DD]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">Wishlist progress</span>
                    <span className="text-sm font-medium">{wishlist.gifts?.length}/ Items reserved</span>
                  </div>
                  <Progress value={42} className="h-2 bg-[#F3E9DD]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {wishlist.gifts?.map((gift: gifts) => (
              <FriendWishlistCard 
              key={gift.id}
              currentUserId={currentUser?.uid}
              gift={gift} 
              wishlistId={wishlistId}
              friendId={userId}
              friendName={user.name}
              wishlistName={wishlist.title}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
