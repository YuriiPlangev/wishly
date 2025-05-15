"use client"

import { useState, useEffect } from "react"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/firestore/firebase"
import Image from "next/image"
import { LinkIcon, DollarSign } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { uploadImage} from "@/lib/cloudinary/uploadImage"
import { useDialogClose } from "@/lib/hooks/useModalClose"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  wishlistId: string
  user: any
}

export function AddGift({ open, setOpen, wishlistId, user }: Props) {

  const [giftTitle, setGiftTitle] = useState<string>("")
  const [giftImgUrl, setGiftImgUrl] = useState<string>("")
  const [giftDescription, setGiftDescription] = useState<string>("")
  const [giftLink, setGiftLink] = useState<string>("")
  const [giftPriority, setGiftPriority] = useState<string>("")
  const [giftPrice, setGiftPrice] = useState<number>(0)
  const [isPrivate, setIsPrivate] = useState<boolean>(false)


  const handleAddGift = async () => {
    const newGift = {
      id: `${user.uid}-${new Date().getTime()}`,
      title: giftTitle,
      imgUrl: giftImgUrl,
      description: giftDescription,
      link: giftLink,
      price: giftPrice,
      priority: giftPriority,
      createdDate: new Date().toISOString(),
      privacy: isPrivate,
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const allWishlists = userData.wishlists || [];
        const updatedWishlists = allWishlists.map(w => {
          if (w.id === wishlistId) {
            return {
              ...w,
              gifts: [...(w.gifts || []), newGift]
            }
          }
          return w
        });
        await updateDoc(userRef, {
          wishlists: updatedWishlists,
        });
      }
      toast('The gift was successfully added')
      setGiftTitle('')
      setGiftImgUrl('')
      setGiftDescription('')
      setGiftLink('')
      setGiftPrice(0)

    } catch (error) {
      console.error('Ошибка при добавлении вишлиста:', error);
      toast("Adding error, please try again.")
    }
  }

  useDialogClose(setOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddGift()
  }

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogContent className="dialog-content sm:max-w-[550px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Gift to Wishlist</DialogTitle>
          <DialogDescription>Add a new gift item to your wishlist.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full h-48 bg-[#F9F6F0] rounded-xl overflow-hidden flex items-center justify-center">
              <Image src={giftImgUrl || "/svg/placeholder.svg"} alt="Gift" fill className="object-cover" />
            </div>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await uploadImage(file, "gifts");
                  if (url) setGiftImgUrl(url);
                }
              }}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-[#E9D9C8]"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Upload Image
            </Button>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="gift-name">Gift Name*</Label>
            <Input
              id="gift-name"
              value={giftTitle}
              onChange={(e) => setGiftTitle(e.target.value)}
              required
              className="rounded-xl border-[#E9D9C8]"
              placeholder="e.g., Wireless Headphones"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="gift-description">Description</Label>
            <Textarea
              id="gift-description"
              value={giftDescription}
              onChange={(e) => setGiftDescription(e.target.value)}
              className="rounded-xl border-[#E9D9C8]"
              placeholder="Describe the gift..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="gift-price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="gift-price" type="number" value={giftPrice} onChange={(e) => setGiftPrice(Number(e.target.value))} className="pl-10 rounded-xl border-[#E9D9C8]" placeholder="0.00" />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="gift-priority">Priority</Label>
              <Select defaultValue="medium" value={giftPriority} onValueChange={setGiftPriority}>
                <SelectTrigger id="gift-priority" className="rounded-xl border-[#E9D9C8]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="dialog-content">
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="gift-link">Link to Product</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="gift-link"
                className="pl-10 rounded-xl border-[#E9D9C8]"
                value={giftLink}
                onChange={(e) => setGiftLink(e.target.value)}
                placeholder="https://example.com/product"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="private-gift">Private Gift</Label>
              <p className="text-xs text-gray-500">Only visible to you</p>
            </div>
            <Switch id="private-gift" checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border-[#E9D9C8]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black">
              Add Gift
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
