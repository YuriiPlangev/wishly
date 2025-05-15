import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { Share2, Calendar, Gift, Lock } from 'lucide-react'
import { Progress } from '../ui/progress'
import ImageWithPlaceholder from './ImageWithPlaceholder'

interface Props {
  wishlist: {
    title: string
    description: string
    date: string
    occasion: string
    createdDate: string
    imgUrl?: string
    privacy?: string
    sharedLink?: string
    gifts?: any
  }
  link: string
  isOwner?: boolean
} 




const WishlistCard = ({ wishlist, link, isOwner }: Props) => {


  const canView = wishlist.privacy === 'public';

  return (
    <article className="bg-card rounded-xl overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
          {(canView || isOwner) ? (
            <ImageWithPlaceholder
              src={wishlist.imgUrl}
              alt={wishlist.title}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="px-3 py-1 rounded-full flex items-center bg-white/90 text-black">
                <Lock className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">Private</span>
              </div>
            </div>
          )}
        </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">
            {canView || isOwner ? wishlist.title : "Secret Wishlist"}
          </h3>
            {isOwner && wishlist.sharedLink && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer">
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
        </div>

        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Calendar className="h-3 w-3 mr-1" />
          <p className="text-muted-foreground">
            created on {wishlist.createdDate}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>
              <Gift className="h-3 w-3 inline mr-1" />
              {(canView || isOwner) ? wishlist.gifts?.length || 0 : "?"} items
            </span>
            <span>{0} reserved</span>
          </div>
          <Progress value={0} className="h-1.5 bg-[#F3E9DD]" />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-lg border-[#E9D9C8] cursor-pointer"
        >
          {(canView || isOwner) ? (
              <Link href={link}>View Wishlist</Link>
            ) : (
              <span className="text-muted-foreground">Not available</span>
            )}
        </Button>
      </div>
    </article>
  );
};


export default WishlistCard
