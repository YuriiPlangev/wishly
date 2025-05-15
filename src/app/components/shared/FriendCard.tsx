import React from 'react'
import Link from "next/link"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Gift } from "lucide-react"
import ProfilePlaceholder from "../shared/ProfilePlaceholder"

interface Props {
   friend: {
      id: string
      name: string
      image: string
      wishlists: number
   }
}

const FriendCard = ({friend}: Props) => {
  return (
    <article className='bg-card rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-4'>
        <Avatar className="h-14 w-14 ">
                 {friend.image ? (
                    <AvatarImage src={friend.image} alt="User avatar" />
                  ) : (
                    <ProfilePlaceholder />
                  )} 
              </Avatar>
      <div>
        <h3>
          {friend.name}
        </h3>
        <div className="flex items-center">
            <Gift className="h-3 w-3 mr-1" />
            {friend.wishlists?.length} wishlists
          </div>
      </div>
      <Button size="sm" variant="outline" className="rounded-lg border-[#E9D9C8] md:ml-auto md:justify-self-end cursor-pointer">
        <Link href={`/profile/${friend.id}`} className="flex items-center gap-2">
          View Profile
          </Link>
        </Button>
    </article>
  )
}

export default FriendCard