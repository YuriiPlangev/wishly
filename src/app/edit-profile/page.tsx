"use client"
import { useState, useEffect} from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firestore/firebase'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Upload } from 'lucide-react'
import { toast} from 'sonner'
import { useDialogClose } from '@/lib/hooks/useModalClose'
import { uploadImage} from "@/lib/cloudinary/uploadImage"


interface User {
  uid: string;
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  image?: string;
}
interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    user: User
}

const EditPage = ( {open, setOpen, user }:Props,) => {

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [location, setLocation] = useState(user?.location || "")
  const [image, setImage] = useState(user?.image || "")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!user?.uid) return
    setLoading(true)
    try {
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        name,
        email,
        bio,
        location,
        image
      })
      toast('Profile updated!')
      setOpen(false)
    } catch (error) {

      toast(`Update error ${error}`)
    } finally {
      setLoading(false)
    }
  }

    useDialogClose(setOpen)


    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialog-content sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information and preferences.</DialogDescription>
          </DialogHeader>
  
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-[#F3E9DD]">
                  <AvatarImage src={image || "/svg/placeholder.svg"} alt="Profile" className='object-cover' />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Button
                  type='button'
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#D4B499] hover:bg-[#C9A88D]"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await uploadImage(file, "profile");
                  if (url) setImage(url);
                }
              }}
              className="hidden"
            />
              <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl border-[#E9D9C8]"
              type='button'
              onClick={() => document.getElementById("file-upload")?.click()}>
                Change Profile Picture
              </Button>
            </div>
  
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} className="rounded-xl border-[#E9D9C8]" />
            </div>
  
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="rounded-xl border-[#E9D9C8]" />
            </div>
  
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={30}  className="rounded-xl border-[#E9D9C8]" />
            </div>
  
            <div className="grid gap-3">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="rounded-xl border-[#E9D9C8]"
                rows={3}
                maxLength={256}
              />
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline" type='button' className="rounded-xl border-[#E9D9C8]" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} type='button' className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black" >
              Save Changes
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    )
}

export default EditPage