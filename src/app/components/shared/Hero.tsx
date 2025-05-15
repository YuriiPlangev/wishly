"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useUserStore } from '@/app/store/useUserStore'
import ChatBubble from './ChatBubble'
import { useRouter } from 'next/navigation'
interface Props {
    scrollToGifts: () => void
}
const Hero = ( {scrollToGifts}: Props) => {
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const handleStartClick  = () => user ? router.push('/profile') : router.push('/Auth');

  return (
    <section>
        <h1 className='font-bold text-4xl text-center py-20 md:text-5xl'>
            Create & Share Your Perfect Wishlist
        </h1>

        <div className='flex flex-col p-4 gap-4 items-center justify-center max-w-[400px] mx-auto [perspective:1000px]'>
            <ChatBubble text='What should I give you???' className='animate-fade-in self-start  rounded-[25px_25px_25px_5px] [--base-transform:translateY(0)]'  />
            <ChatBubble text='I dont know...' className='animate-fade-in-delay self-end  rounded-[25px_25px_5px_25px]' />
            <div className='w-full animate-fade-in-delay-long'>
                <p className=' text-[18px] my-6 text-center'>
                    Never be stuck for gift ideas again!
                </p>
                <div className=' flex flex-col gap-2 md:flex-row '>
                    <Button 
                    onClick={handleStartClick }
                    className='w-full flex-1 flex py-4 md:py-6 rounded-full bg-[#D4B497] hover:bg-[#C9A88D] text-black cursor-pointer'>Create Wishlist</Button>
                    <Button onClick={scrollToGifts} variant='outline' className='w-full flex-1 flex py-4 md:py-6 rounded-[9999px] border-orange-300  cursor-pointer'>Browse Gift Ideas</Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero