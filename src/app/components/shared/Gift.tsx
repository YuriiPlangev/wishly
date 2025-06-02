import React from 'react'
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
interface Props {
    gifts: {
        id: number;
        title: {
        en: string;
        uk: string;
      };
        link: string;
        img:string;
        price:number;
    }
}




const Gift = ({gifts}:Props,) => {

 const { i18n } = useTranslation();
const lang = i18n.language.startsWith("uk") ? "uk" : "en";
  

console.log("LANG", i18n.language);
console.log("USED LANG", lang);
console.log("TITLE", gifts.title);
console.log("SELECTED TITLE", gifts.title[lang]);


  return (
    <article className='border-2 border-[#F9F6F0] rounded-2xl'>
        {gifts.img && (
  <div className="relative   w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 flex items-center justify-center">
    <Image src={gifts.img} alt={gifts.title[lang]} fill className="object-contain max-w-[200px] mx-auto" />

  </div>
)}
        <div className={`bg-background p-4 rounded-b-2xl`}>
            <h3 className='font-medium text-[18px]'>
                {gifts.title[lang]}
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