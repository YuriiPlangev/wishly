"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import {  UserPlus } from 'lucide-react'
import { Input } from '../ui/input'
import { TabsContent } from '@radix-ui/react-tabs'
import FriendCard from './FriendCard'
import { AddFriendModal } from './AddFriendModal'
import FriendRequestCard from './FriendRequestCard'
import { useUserStore } from '@/app/store/useUserStore'
import { db } from '@/firestore/firebase'
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { toast } from 'sonner'



interface UserData {
  id: string
  name: string
  email: string
  image?: string
  incomingRequests?: string[]
  outgoingRequests?: string[]
  friends?: string[]
}
const UserFriends = () => {

  const [openModal, setOpenModal] = useState<boolean>(false)
  const { user } = useUserStore((state) => state);
  const [allUsers, setAllUsers] = useState<UserData[]>([])
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null)
  const currentUserId = user?.uid

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"))
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[]

      setAllUsers(users)

      const current = users.find(u => u.id === currentUserId)
      setCurrentUserData(current || null)
    }

    if (currentUserId) {
      fetchUsers()
    }
  }, [currentUserId])


  const incomingRequests = allUsers.filter(user =>
    currentUserData.incomingRequests?.includes(user.id)
  )

  const friends = allUsers.filter(user =>
    currentUserData.friends?.includes(user.id)
  )

  const acceptRequest = async (requestUserId: string) => {
    const currentRef = doc(db, "users", currentUserId!)
    const requesterRef = doc(db, "users", requestUserId)

    await updateDoc(currentRef, {
      incomingRequests: arrayRemove(requestUserId),
      friends: arrayUnion(requestUserId),
    })

    await updateDoc(requesterRef, {
      outgoingRequests: arrayRemove(currentUserId),
      friends: arrayUnion(currentUserId),
    })

    toast("Friend request accepted!")

    setCurrentUserData(prev =>
      prev ? {
        ...prev,
        incomingRequests: prev.incomingRequests?.filter(id => id !== requestUserId),
        friends: [...(prev.friends || []), requestUserId],
      } : null
    )
  }

  const declineRequest = async (requestUserId: string) => {
    const currentRef = doc(db, "users", currentUserId!)
    const requesterRef = doc(db, "users", requestUserId)

    await updateDoc(currentRef, {
      incomingRequests: arrayRemove(requestUserId),
    })

    await updateDoc(requesterRef, {
      outgoingRequests: arrayRemove(currentUserId),
    })

    toast("Friend request declined.")
    setCurrentUserData(prev =>
      prev ? {
        ...prev,
        incomingRequests: prev.incomingRequests?.filter(id => id !== requestUserId),
      } : null
    )
  }


  return (
    <TabsContent value="friends" className='w-full'>
        <section className="flex flex-col items-start  justify-between gap-4 pb-8">
          <div className='flex items-center justify-between w-full'>
          <h2 className="text-xl font-semibold">Your Friends</h2>
                <div className="w-full sm:w-auto flex gap-2">
                  <div className="relative flex-1">
                    <Input placeholder="Search friends..." className="rounded-xl border-[#E9D9C8] pr-10" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full aspect-square rounded-r-xl cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </Button>
                  </div>
                  <Button onClick={() => setOpenModal(true)} className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black whitespace-nowrap cursor-pointer">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Friend
                  </Button>
                </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {
              friends?.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))
            }
          </div>
          </section>
          
          
          {
            incomingRequests.length > 0 &&
          <section className="space-y-4 pt-12">
                <h3 className="font-medium">Friend Requests ({incomingRequests.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {
                    incomingRequests.map((request) => (
                      <FriendRequestCard key={request.id} request={request} onAccept={acceptRequest} onDecline={declineRequest} />
                    ))
                  }
                </div>
              </section>
              }
      {
        openModal && <AddFriendModal open={openModal} onOpenChange={setOpenModal} />
      }
    </TabsContent>
  )
}

export default UserFriends