import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import WishlistCard from './WishlistCard'
import { TabsContent } from '@radix-ui/react-tabs'
import Link from 'next/link'




const UserWishlists = ({ wishlists, loading}) => {
  console.log('Wishlists:', wishlists);

  return (
    <TabsContent value="wishlists" className='w-full'>
      <section>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold'>My Wishlist</h2>
          <Link href="/create-wishlist" className="flex items-center">
            <Button className="rounded-xl bg-[#D4B499] hover:bg-[#C9A88D] text-black cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Create New Wishlist
            </Button>
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          
          {loading ? (
            <p className="text-lg text-gray-500">Загрузка вишлистов...</p>
          ) : wishlists.length === 0 ? (
            <p className="text-2xl font-bold">No wishlists yet</p>
          ) : (
            wishlists.map((wishlist) => (
              <WishlistCard
                key={wishlist?.id}
                wishlist={wishlist}
                link={`/Wishlist/${wishlist?.id}`}
                isOwner={true}
              />
            ))
          )}
        </div>
      </section>
    </TabsContent>
  );
};


export default UserWishlists