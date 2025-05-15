import React from 'react'
import Image from 'next/image'
import { Button } from "../ui/button"
import { Trash2, ExternalLink} from "lucide-react"
import Link from 'next/link'
import { toast} from 'sonner'
import { db } from '@/firestore/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ConfirmDialog } from "./Confirm-delete"

interface Props {
  gift: {
    id: string
    title: string
    description: string
    link: string
    img: string
    price: number
    priority: string
  }
  user: any
  wishlistId: string
}

const UserGift = ( {gift, user, wishlistId}:Props) => {

  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)


  async function deleteGift({ userId, wishlistId, giftId }: {
    userId: string;
    wishlistId: string;
    giftId: string;
  }) {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const wishlists = userData.wishlists || [];
  
        const updatedWishlists = wishlists.map((wishlist: any) => {
          if (wishlist.id === wishlistId) {
            return {
              ...wishlist,
              gifts: (wishlist.gifts || []).filter((gift: any) => gift.id !== giftId)
            };
          }
          return wishlist;
        });
  
        await updateDoc(userRef, { wishlists: updatedWishlists });
        toast("The gift has been successfully deleted! ")
      } else {
        toast("User not found")
      }
    } catch (error) {
      console.error("Ошибка при удалении подарка:", error);
      toast(`Error when deleting a gift ${error}`)
    }
  }

  return (
    <article className='relative'>
        <Image
          src={gift.imgUrl || '/svg/placeholder.svg'}
          alt="Gift Image"
          width={290}
          height={290}
          className="rounded-t-lg mas-h-[290px] object-cover" />
          <div className='bg-card rounded-bl-2xl rounded-br-2xl  p-6'>
          <div>
            <h3 className='text-[18px] font-bold'>
                {gift.title}
            </h3>
            <p className='text-[14px] text-muted-foreground'>
            {gift.description} 
            </p>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <p>
                {gift.price} $
            </p>
            <div className='flex gap-3'>
            <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-[#E9D9C8]"
                            onClick={() => setDeleteConfirmOpen(true)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Link href={gift.link} target='_blank' rel='noreferrer'>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-[#E9D9C8]"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Link
                            
                          </Button>
                          </Link>
                          
            </div>
          </div>
          </div>
          <div className={`absolute top-2 right-2  rounded-full px-2 ${gift.priority === 'Low' ? 'bg-green-100 text-green-800' : gift.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            <span className='text-[12px] font-semibold'>
                {gift.priority} priority
            </span>
          </div>
          <ConfirmDialog
                  open={deleteConfirmOpen}
                  onOpenChange={setDeleteConfirmOpen}
                  title="Delete Gift"
                  description="Are you sure you want to delete this gift? All items and data will be permanently removed. This action cannot be undone."
                  confirmLabel="Delete gift"
                  cancelLabel="Cancel"
                  onConfirm={() => deleteGift({ userId: user.uid, wishlistId: wishlistId, giftId: gift.id })}
                  destructive
                />
    </article>
    
  )
}

export default UserGift