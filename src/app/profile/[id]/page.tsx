'use client'
import { Gift, MapPin } from "lucide-react"
import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import WishlistCard from "../../components/shared/WishlistCard"
import { useParams } from 'next/navigation'
import ProfilePlaceholder from "@/app/components/shared/ProfilePlaceholder"
import Header from "@/app/components/shared/Header"
import { useFriendProfile } from "../../../lib/hooks/userFriendProfile"

export default function FriendProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const { user, loading } = useFriendProfile(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Profile loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Профиль не найден.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <div className="max-w-[1200px] mx-auto mt-12">
        <div className="bg-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 ">
              {user.image ? (
                <AvatarImage src={user.image} alt="User avatar" />
              ) : (
                <ProfilePlaceholder />
              )}
            </Avatar>

            <div className="flex-1 text-center md:text-left flex flex-col gap-1 justify-center">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location || "Unknown Location"}
                </div>
              </div>
              <p className="text-muted-foreground">
                {user.bio || `No info about ${user.name}`}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start">
                <Badge className="bg-[#F3E9DD] text-black hover:bg-[#E9D9C8] border-none">
                  <Gift className="h-3 w-3 mr-1" />
                  {user.wishlists?.length || 0} Wishlists
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-8">{user.name}'s Wishlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.wishlists?.map((wishlist: any) => (
            <WishlistCard
              key={wishlist.id}
              wishlist={wishlist}
              isOwner={false}
              link={`/FriendWishlist/${user.id}/${wishlist.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
