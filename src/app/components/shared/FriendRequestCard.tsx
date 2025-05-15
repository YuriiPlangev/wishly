import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { on } from 'events'

interface Props {
    request: {
        name: string
        image: string
        id: string
    }
    onAccept: (id: string) => void
    onDecline: (id: string) => void
}

const FriendRequestCard = ({request, onAccept, onDecline}:Props) => {
  return (
    <article className="bg-white rounded-xl p-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={request.image || '/svg/placeholder.svg'} alt="Alex Johnson" />
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{request.name}</h4>
                      
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => onAccept(request.id)} className="rounded-lg bg-[#D4B499] hover:bg-[#C9A88D] text-black">
                        Accept
                      </Button>
                      <Button size="sm" onClick={() => onDecline(request.id)} variant="outline" className="rounded-lg border-[#E9D9C8]">
                        Decline
                      </Button>
                    </div>
                  </article>
  )
}

export default FriendRequestCard