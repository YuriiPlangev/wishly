"use client"
import React from 'react'
import { Globe, User } from 'lucide-react'
import Logo from './Logo'
import Link from 'next/link'
import { useUserStore } from "../../store/useUserStore";
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../ui/button'


const Header = () => {
  const user = useUserStore((state) => state.user);
  return (
    <header className='flex justify-between items-center p-4  shadow-md max-w-[1200px] mx-auto rounded-2xl'>
     <Logo />
        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <Button variant={"ghost"} type='button' aria-label='Language' size={"icon"}>
            <Globe size={20}  />
          </Button>
        {
          user ? <Link href="/profile">
          
            <Button variant={"ghost"} type='button' aria-label='Profile' size={"icon"}>
              <User size={20} />
            </Button>
          
          </Link>
          : <Link href="/Auth" aria-labelledby='Login'>
        
          <span >Login</span >
        
        </Link>
        }
      </div>
    </header>
  )
}

export default Header
