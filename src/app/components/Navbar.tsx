
'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DarkTheme from './DarkTheme';
import { RxAvatar } from "react-icons/rx";
import { currentUser } from '@clerk/nextjs/server';
import { UserButton, useUser } from '@clerk/nextjs';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useUser()

  return (
    <nav className=" shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'}>
        <Image
            src={'/Images/logo.png'}
            alt=''
            width={80}
            height={80}
            className='rounded-full'
        />
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <DarkTheme/> 
          {user ? (
            <UserButton />
          ) : (
            <Link href='/sign-in'><RxAvatar size={30} className='cursor-pointer'/></Link>
          )}
                 
          {/* <a href="#services" className="text-gray-300 hover:text-white">Services</a>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a> */}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <a href="#home" className="block  hover:text-white p-2">Home</a>
        <DarkTheme/>
        <a href="#about" className="block text-gray-300 hover:text-white p-2">About</a>
        <a href="#services" className="block text-gray-300 hover:text-white p-2">Services</a>
        <a href="#contact" className="block text-gray-300 hover:text-white p-2">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
