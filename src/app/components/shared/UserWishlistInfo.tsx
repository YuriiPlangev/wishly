import React from 'react'


import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { Edit, Plus } from "lucide-react"

import {EditWishlist} from "../shared/EditWIshlist"
import {AddGift} from "../shared/AddGift"

interface Props {
  wishlist: {
    title: string
    description: string
    eventDate: string
    occasion: string
    id: string
    owner: {
      name: string
      avatar?: string
    }
    itemCount: number
    reservedCount: number
  }
  user: {
    name: string
  }
}

const UserWishlistInfo = ({wishlist, user}:Props) => {

  const [editWishlistModalOpen, setEditWishlistModalOpen] = React.useState<boolean>(false)
  const [addGiftModalOpen, setAddGiftModalOpen] = React.useState<boolean>(false)


  
  return (
    <section className="bg-card rounded-2xl p-6 mb-8">
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <Avatar className="h-20 w-20">
        <AvatarImage src={"/svg/placeholder.svg"} alt={"Yurii"} />
        <AvatarFallback>
          NG
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold">{wishlist.title}</h1>
          <Badge variant="outline" className="bg-[#F3E9DD] text-black border-none">
            {wishlist.occasion}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-2">{wishlist.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Created by {user.name}</span>
          <span className="text-muted-foreground">Event date: {wishlist.eventDate}</span>
        </div>
      </div>

        <Button
          onClick={() => setEditWishlistModalOpen(true)}
          className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Wishlist
        </Button>
    </div>

    <div className="mt-6 pt-6 border-t border-[#F3E9DD]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Wishlist progress</span>
            <span className="text-sm font-medium">
              {wishlist.reservedCount}/{wishlist.itemCount} Items reserved
            </span>
          </div>
          <Progress
            value={(wishlist.reservedCount / wishlist.itemCount) * 100}
            className="h-2 bg-[#F3E9DD]"
          />
        </div>
        
          <Button
            className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black"
            onClick={() => setAddGiftModalOpen(true)}

          >
            <Plus className="h-4 w-4 mr-2" />
            Add Gift
          </Button>
        

      </div>
    </div>


    {
      editWishlistModalOpen && <EditWishlist open={editWishlistModalOpen} setOpen={setEditWishlistModalOpen} userId={user.uid} wishlist={wishlist}   />
    }
    {
      addGiftModalOpen && <AddGift open={addGiftModalOpen} setOpen={setAddGiftModalOpen} wishlistId={wishlist.id} user={user} />
    }

  </section>
  )
}

export default UserWishlistInfo