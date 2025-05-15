"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { toast} from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../../firestore/firebase"
import { ConfirmDialog } from "./Confirm-delete"
import {useRouter} from "next/navigation"

interface Wishlist {
  id: string
  title: string
  description: string
  date: string
  occasion: string
  privacy?: string
}

interface EditWishlistModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  wishlist: Wishlist
  userId: any
}

export function EditWishlist({ open, setOpen, wishlist, userId }: EditWishlistModalProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [wishlistTitle, setWishlistTitle] = useState(wishlist?.title || "")
  const [wishlistDescription, setWishlistDescription] = useState(wishlist?.description || "")
  const [wishlistDate, setWishlistDate] = useState(wishlist?.date || "")
  const [occasion, setOccasion] = useState(wishlist?.occasion || "")
  const [loading, setLoading] = useState(false)
  const [giftImgUrl, setGiftImgUrl] = useState<string>("")
  const [privacy, setPrivacy] = useState<string>(wishlist.privacy || 'public')
  const router = useRouter()


  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default")
    formData.append("folder", "wishlists")
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dptycdwv5/image/upload", { 
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error)
      toast("Image upload failed")
      return null
    }
  }

  useEffect(() => {
    if (open) {
      setWishlistTitle(wishlist?.title || "")
      setWishlistDescription(wishlist?.description || "")
      setWishlistDate(wishlist?.date || "")
      setOccasion(wishlist?.occasion || "")
    }
  }, [open, wishlist])

  const handleSave = async () => {
    setLoading(true)
    try {
      const wishlistRef = doc(db, "users", userId)
      const wishlistSnap = await getDoc(wishlistRef)
  
      if (!wishlistSnap.exists()) {
        throw new Error("Пользователь не найден")
      }
  
      const data = wishlistSnap.data()
      const wishlists = data.wishlists || []
  
      const updatedWishlists = wishlists.map(wishlist => 
        wishlist.id === wishlist.id
          ? {
              ...wishlist,
              title: wishlistTitle,
              description: wishlistDescription,
              eventDate: wishlistDate,
              occasion: occasion,
              privacy: privacy
            }
          : wishlist
      )
  
      await updateDoc(wishlistRef, {
        wishlists: updatedWishlists
      })
      toast('Wishlist updated!')
      setOpen(false)
    } catch (error) {
      console.error("Ошибка при обновлении вишлиста", error)
      toast("Some error, please try again")
    } finally {
      setLoading(false)
    }
  }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSave()
  }

  const handleDeleteWishlist = async () => {
  try {
    const wishlistRef = doc(db, "users", userId)
    const wishlistSnap = await getDoc(wishlistRef)

    if (!wishlistSnap.exists()) {
      throw new Error("Пользователь не найден")
    }

    const data = wishlistSnap.data()
    const wishlists = data.wishlists || []

    const filteredWishlists = wishlists.filter(w => w.id !== wishlist.id)

    await updateDoc(wishlistRef, {
      wishlists: filteredWishlists
    })

    toast("Wishlist deleted")
    setDeleteConfirmOpen(false)
    setOpen(false)

    router.push("/profile")
  } catch (error) {
    console.error("Ошибка при удалении вишлиста:", error)
    toast("Ошибка при удалении. Попробуйте снова.")
  }
}

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialog-content sm:max-w-[550px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Wishlist</DialogTitle>
            <DialogDescription>Update your wishlist details.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
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
                              const url = await uploadImageToCloudinary(file);
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
            <div className="grid gap-3">
              <Label htmlFor="wishlist-name">Wishlist Name*</Label>
              <Input
                id="wishlist-name"
                required
                value={wishlistTitle}
                onChange={(e) => setWishlistTitle(e.target.value)}
                className="rounded-xl border-[#E9D9C8]"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="wishlist-description">Description</Label>
              <Textarea
                id="wishlist-description"
                value={wishlistDescription}
                onChange={(e) => setWishlistDescription(e.target.value)}
                className="rounded-xl border-[#E9D9C8]"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion.toLowerCase()} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion" className="rounded-xl border-[#E9D9C8]">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="christmas">Christmas</SelectItem>
                    <SelectItem value="baby-shower">Baby Shower</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="event-date">Event Date (Optional)</Label>
                <div className="relative">
                  <Input
                    id="event-date"
                    type="date"
                    value={wishlistDate ? new Date(wishlistDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => setWishlistDate(e.target.value)}
                    className="rounded-xl border-[#E9D9C8]"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="privacy">Privacy Setting</Label>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger id="privacy" className="rounded-xl border-[#E9D9C8]">
                  <SelectValue placeholder="Select privacy setting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public (Anyone can view)</SelectItem>
                  <SelectItem value="shared-link">Shared Link (Only people with the link)</SelectItem>
                  <SelectItem value="private">Private (Only you)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="flex justify-between w-full">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Wishlist
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-[#E9D9C8]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Wishlist"
        description="Are you sure you want to delete this wishlist? All items and data will be permanently removed. This action cannot be undone."
        confirmLabel="Delete Wishlist"
        cancelLabel="Cancel"
        onConfirm={handleDeleteWishlist}
        destructive
      />
    </>
  )
}
