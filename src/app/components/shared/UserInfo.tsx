"use client"
import { Avatar,  AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { Gift, Mail, MapPin, UserPlus, Edit, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { TabsList, TabsTrigger } from '../ui/tabs'
import EditPage from '../../edit-profile/page'
import { useLogout } from "@/lib/firebase/useLogout"
import ProfilePlaceholder from '../shared/ProfilePlaceholder'

const UserInfo = ({ user}) => {
  const logout = useLogout()
  const [open, setOpen] = useState<boolean>(false)


  return (
    <section className='pt-16'>
        <div className='bg-card rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row  justify-between'>
        <Avatar className='w-24 h-24 rounded-full mr-4 self-center md:self-start'>
          {user.image ? (
            <AvatarImage src={user.image} className='rounded-full' alt="User avatar" />
          ) : (
            <ProfilePlaceholder  />
          )}
        </Avatar>
        <div className=" text-center md:text-left flex-1 ">
          <h1 className="text-2xl font-bold mb-3">{user.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-1" />
              {user.email}
            </div>
            {user.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </div>
            )}
          </div>
          {user.bio && (
            <p className="text-muted-foreground mb-4">
              {user.bio}
            </p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Badge className="bg-[#F3E9DD] text-black border-none py-1">
              <Gift className="h-3 w-3 mr-1" />
              {user.wishlists?.length} Wishlists
            </Badge>
            <Badge className="bg-[#F3E9DD] text-black border-none">
              <UserPlus className="h-3 w-3 mr-1" />
              {user.friends?.length} Friends
            </Badge>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <Button onClick={() => setOpen(true)} className="md:self-start rounded-xl mt-6 md:mt-0 bg-[#D4B499] hover:bg-[#C9A88D] text-black cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={logout} className="rounded-xl mt-6 bg-[#D4B499] hover:bg-[#C9A88D] text-black cursor-pointer">
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
      

      <TabsList className="w-full bg-card rounded-xl mb-6 p-1">
        <TabsTrigger value="wishlists" className="rounded-lg flex-1 data-[state=active]:bg-[#F3E9DD] cursor-pointer">
          My Wishlists
        </TabsTrigger>
        <TabsTrigger value="friends" className="rounded-lg flex-1 data-[state=active]:bg-[#F3E9DD] cursor-pointer">
          Friends
        </TabsTrigger>
        <TabsTrigger value="reserve" className="rounded-lg flex-1 data-[state=active]:bg-[#F3E9DD] cursor-pointer">
          Reserved
        </TabsTrigger>
      </TabsList>

      {open && <EditPage user={user} open={open} setOpen={setOpen} />}
    </section>
  )
}

export default UserInfo
