import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { reserveGift } from '@/lib/firebase/reserveGift'
import { addToReservedList } from '@/lib/firebase/addToReservedList'

interface Props {
  gift: {
    id: string
    title: string
    description: string
    price: number
    imgUrl: string
    reserved?: boolean
  }
  currentUserId: string
  friendId: string
  wishlistId: string
  friendName: string
  wishlistName: string
}

const FriendWishlistCard = ({ gift, currentUserId, friendId, wishlistId, friendName, wishlistName }: Props) => {
  const [isReserved, setIsReserved] = useState(gift.reserved || false)

  const handleReserve = async () => {
    try {
      await reserveGift(friendId, wishlistId, gift.id)
await addToReservedList(currentUserId, gift, wishlistId, friendId, friendName, wishlistName)
      setIsReserved(true)
      toast("Gift reserved!")
    } catch (error) {
      console.error("Failed to reserve gift:", error)
      toast("Something went wrong.")
    }
  }

  return (
    <article className=" rounded-2xl overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={gift.imgUrl || "/svg/placeholder.svg"}
          alt={gift.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 bg-card">
        <h3 className="font-semibold text-lg mb-1">{gift.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{gift.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium">${gift.price}</span>
          <Button
            disabled={isReserved}
            onClick={handleReserve}
            className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black"
          >
            {isReserved ? "Reserved" : "Reserve"}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default FriendWishlistCard
