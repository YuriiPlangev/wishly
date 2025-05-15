import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const ReservedCard = ({ reserved, onUnreserve }) => {
  const formattedDate = reserved.reservedAt
    ? new Date(reserved.reservedAt).toLocaleDateString()
    : 'Unknown date'

    console.log("Reserved проп:", reserved);


  return (
    <article className="bg-card rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-32 h-32">
          <Image
            src={reserved.imgUrl || "/svg/placeholder.svg"}
            alt={reserved.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold">{reserved.title}</h3>
            <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100 border-none">
              Reserved on {formattedDate}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            For: <span className="font-medium">{reserved.friendName}</span>'s "{reserved.wishlistName}" Wishlist
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
            <span className="font-medium">${reserved.price}</span>
            <div className="flex gap-2">
              {reserved.link && (
                <Button variant="outline" size="sm" className="rounded-lg border-[#E9D9C8]" asChild>
                  <Link href={reserved.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Product
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={onUnreserve}
              >
                Unreserve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ReservedCard
