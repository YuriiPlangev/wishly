import React from 'react'
import Link from 'next/link'
import LogoIcon from './LogoIcon'

const Logo = () => {
  return (
    <Link href='/'>
      <div className='flex items-center gap-2 text-black dark:text-white'>
        <LogoIcon />
        <span className='font-bold text-[20px]'>Wishly</span>
      </div>
    </Link>
  )
}

export default Logo