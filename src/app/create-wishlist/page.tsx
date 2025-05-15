"use client"
import { useState} from 'react'
import Container from '../components/shared/Container'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {Textarea} from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { db } from '@/firestore/firebase'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { useUserStore } from '../store/useUserStore'
import { toast} from 'sonner'
import { useRouter } from 'next/navigation'
import { uploadImage} from "@/lib/cloudinary/uploadImage"
import ImageWithPlaceholder from '../components/shared/ImageWithPlaceholder'
import Header from '../components/shared/Header'

interface Wishlist {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
  eventDate: string;
  occasion: string;
  createdDate: string;
  privacy: string;
  sharedLink?: string;
}

const CreateWishlist = () => {

  const router = useRouter()
  const {user} = useUserStore((state) => state);
  const [wishlistTitle, setWishlistTitle] = useState<string>('');
  const [wishlistImgUrl, setWishlistImgUrl] = useState<string>('');
  const [wishlistDescription, setWishlistDescription] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('other'); 
  const [privacy, setPrivacy] = useState<string>('public');




  const handleAddWishlist = async () => {

     if (!wishlistTitle.trim()) {
    toast('Wishlist name is required');
    return;
  }
  
  const generatedId = `${user.uid}-${new Date().getTime()}`;
  const sharedLink = privacy === "shared-link"
    ? `/FriendWishlist/${user.uid}/${generatedId}`
    : null;

  const newWishlist : Wishlist = {
    id: generatedId,
    title: wishlistTitle,
    imgUrl: wishlistImgUrl,
    description: wishlistDescription,
    eventDate: eventDate,
    occasion: occasion,
    createdDate: new Date().toISOString().split('T')[0],
    privacy: privacy,
    ...(sharedLink && { sharedLink }),
  }

  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      wishlists: arrayUnion(newWishlist)
    });
    toast('Wishlist successfully added!');
    setWishlistTitle('');
    setWishlistImgUrl('');
    setWishlistDescription('');
    setEventDate('');
    setOccasion('other');
    setPrivacy('public');
    router.push("/profile");

  } catch (error) {
    console.error('Ошибка при добавлении вишлиста:', error);
    toast('Error when adding a Wishlist');
  }
};


  return (
    <Container>
       <Header />

        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Your Wishlist</h1>

          <div className="bg-card rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Wishlist Details</h2>

            <div className="space-y-6">

               <div className="relative w-full h-48 bg-[#F9F6F0] rounded-xl overflow-hidden flex items-center justify-center">
                 <ImageWithPlaceholder src={wishlistImgUrl} alt="logo" />
                  </div>
                  <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await uploadImage(file, "gifts");
                      if (url) setWishlistImgUrl(url);
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

              <div>
                <Label htmlFor="wishlist-name">Wishlist Name</Label>
                <Input
                  id="wishlist-name"
                  value={wishlistTitle}
                  onChange={(e) => setWishlistTitle(e.target.value)}
                  placeholder="e.g., My Birthday Wishlist"
                  className="mt-2 rounded-xl border-[#E9D9C8]"
                />
              </div>

              <div>
                <Label htmlFor="wishlist-description">Description (Optional)</Label>
                <Textarea
                  id="wishlist-description"
                  value={wishlistDescription}
                  onChange={(e) => setWishlistDescription(e.target.value)}
                  placeholder="Tell people what this wishlist is for..."
                  className="mt-2 rounded-xl border-[#E9D9C8]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occasion">Occasion</Label>
                  <Select  value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger id="occasion" className="mt-2 rounded-xl border-[#E9D9C8]">
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

                <div>
                  <Label htmlFor="event-date">Event Date (Optional)</Label>
                  <div className="relative mt-2">
                    <Input id="event-date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} type="date" className="rounded-xl border-[#E9D9C8] block" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="privacy">Privacy Setting</Label>
                <Select value={privacy} onValueChange={setPrivacy}>
                  <SelectTrigger id="privacy" className="mt-2 rounded-xl border-[#E9D9C8]">
                    <SelectValue placeholder="Select privacy setting" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="public">Public (Anyone can view)</SelectItem>
                    <SelectItem value="shared-link">Link Access (Anyone with the link)</SelectItem>
                    <SelectItem value="private">Private (Only you)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button onClick={handleAddWishlist} className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black cursor-pointer">Create Wishlist</Button>
          </div>
        </div>

    </Container>
  )
}

export default CreateWishlist