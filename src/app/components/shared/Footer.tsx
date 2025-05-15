import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-primary/20 py-4 px-4 rounded-2xl'>
        <Container>
            <div className='flex flex-col items-center mb-8 md:flex-row md:justify-between'>
                <Logo />
                <nav>
                    <ul className='flex flex-col items-center gap-5 mt-4 md:mt-0 sm:flex-row'>
                        
                        <li className='font-medium'>
                            <Link href="/terms">Privacy Policy</Link>
                        </li>
                        <li className='font-medium'>
                            <Link href="/terms">Terms of Serice</Link>
                            </li>
                        
                    </ul>
                </nav>
            </div>
            <div className='border-t-1 border-t-[#D4B499] pt-4 flex flex-col gap-1.5 md:flex-row md:justify-between items-center'>
                <p className='text-center text-muted-foreground text-[14px]'>© 2025 Wishly. All rights reserved.</p>
                <p>This site made by <a className='underline' href="https://github.com/YuriiPlangev">Yurii Plangev</a></p>
                <div className='flex items-center justify-between'> 
                        <a href="mailto:wishly@gmail.com" className='text-muted-foreground' aria-label="Email us at wishly@gmail.com">
                        hello@wishify.com
                        </a>
                    <div className='flex items-center'>
                    <button className='h-8 w-8 flex items-center justify-center' aria-label="Instagram">
                        <Instagram size={16} className='cursor-pointer' />
                        </button>
                        <button className='h-8 w-8 flex items-center justify-center' aria-label="Facebook">
                        <Facebook size={16} className='cursor-pointer' />
                        </button>
                        <button className='h-8 w-8 flex items-center justify-center' aria-label="GitHub">
                        <Github size={16} className='cursor-pointer' />
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    </footer>
  )
}

export default Footer