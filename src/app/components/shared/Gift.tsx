import React from 'react'
import Image from 'next/image';
interface Props {
    gifts: {
        id: number;
        title: string;
        link: string;
        img:string;
        price:number;
    }
}




const Gift = ({gifts}:Props,) => {

  return (
    <article className='border-2 border-[#F9F6F0] rounded-2xl'>
        {gifts.img && (
  <div className="relative   w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 flex items-center justify-center">
    <Image src={gifts.img} alt={gifts.title} fill className="object-contain max-w-[200px] mx-auto" />

  </div>
)}
        <div className={`bg-background p-4 rounded-b-2xl`}>
            <h3 className='font-medium text-[18px]'>
                {gifts.title}
            </h3>
            <div className='flex justify-between items-center mt-4 '>
            <a href={gifts.link} target='_blank' className='text-[#D4B499] md:hover:underline cursor-pointer'>To the store</a>
            <p className='text-[12px] font-bold cursor-pointer md:hover:underline'>
                Add to list
            </p>
            </div>
        </div>
        
    </article>
  )
}

export default Gift