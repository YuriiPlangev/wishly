"use client"

import { useState, useEffect, use } from "react"
import { Search, UserPlus } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { db } from "../../../firestore/firebase"
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { useUserStore } from "../../store/useUserStore"
import { toast } from 'sonner'


interface AddFriendModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UserData {
  id: string
  name: string
  email: string
  image?: string
}

export function AddFriendModal({ open, onOpenChange }: AddFriendModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<UserData[]>([])
  const { user } = useUserStore()
  const currentUserId = user?.uid

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"))
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[]
      setUsers(usersData)
    }
    if (open) fetchUsers()
  }, [open])

  const filteredUsers = users.filter(
    u =>
      u.id !== currentUserId &&
      u.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sendFriendRequest = async (targetUserId: string) => {
    if (!currentUserId || !targetUserId) return

    const currentRef = doc(db, "users", currentUserId)
    const targetRef = doc(db, "users", targetUserId)

    await updateDoc(currentRef, {
      outgoingRequests: arrayUnion(targetUserId),
    })

    await updateDoc(targetRef, {
      incomingRequests: arrayUnion(currentUserId),
    })

    toast('Invitation to friend successfully sent!')
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] min-h-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Friends</DialogTitle>
          <DialogDescription>Find friends to connect and share wishlists with.</DialogDescription>
        </DialogHeader>

        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or email"
            className="pl-10 rounded-xl border-[#E9D9C8]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-medium">{user.name}</h4>
              </div>
              <Button
                size="sm"
                className="rounded-lg bg-[#D4B499] hover:bg-[#C9A88D] text-black"
                onClick={() => sendFriendRequest(user.id)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E9D9C8]">
          <h3 className="font-medium mb-2">Invite via Email</h3>
          <div className="flex gap-2">
            <Input placeholder="Enter email address" className="rounded-xl border-[#E9D9C8]" />
            <Button className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black whitespace-nowrap">
              Send Invite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
