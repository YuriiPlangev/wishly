
import React from 'react'
import Link from 'next/link';
import { Avatar,  AvatarImage } from '../ui/avatar'

interface Props {
    idea: {
        title: string;
        id: number;
        photoUrl: string;
    }
}

const Idea = ( {idea}: Props ) => {
  return (
    <article>
        <Link href={`/GiftIdea/${idea.id}`}>
        <Avatar className="h-24 w-24 border-4 border-[#F3E9DD] p-1">
                  <AvatarImage  alt="Profile" className='object-cover' src={idea.photoUrl}></AvatarImage>
                </Avatar>
            <h3 className='text-center text-[14px] font-medium mt-2'>
                {idea.title}
            </h3>
        </Link>
    </article>
  )
}

export default Idea

