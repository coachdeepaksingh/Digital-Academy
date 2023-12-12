"use client";
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {FaCartShopping} from 'react-icons/fa6';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';

export default function NavBar() {

  const currentRoute = usePathname();
  const [menuIcon, setMenuIcon] = useState(false);
  const handleMenuToggle = ()=>{
    setMenuIcon(!menuIcon);
  }
  return (
    <div>
      <header className='bg-white  w-full fixed top-0 left-0 z-10'>
        <nav className='max-w-[1366px] mx-auto h-[80px] flex justify-between items-center p-4'>
            <div>
                <Link href="/">
                    <span className='font-extrabold text-2xl'>DIGITAL ACADEMY</span>
                </Link>
            </div>
            <ul className='hidden md:flex'>
                <li>
                    <Link className={currentRoute === "/about" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/about'>ABOUT</Link>
                </li>
                <li>
                    <Link className={currentRoute === "/courses" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/courses'>COURSES</Link>
                </li>
                <li>
                    <Link className={currentRoute === "/ebooks" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/ebooks'>EBOOKS</Link>
                </li>
                <li>
                    <Link className={currentRoute === "/events" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/events'>EVENTS</Link>
                </li>
                <li>
                    <Link className={currentRoute === "/blogs" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/blogs'>BLOGS</Link>
                </li>
                <li>
                    <Link className={currentRoute === "/contactus" ? "mr-4 lg:mr-8 font-bold text-amber-500 underline" : "mr-4 lg:mr-8"} href='/contactus'>CONTACT</Link>
                </li>
            </ul>
            <div className='flex items-center gap-4'>
                <Link className='text-2xl' href='/cartitems'><FaCartShopping/></Link>
                <Link href='/login'>
                  <button className='bg-amber-600 py-2 px-3 font-bold text-white rounded-sm'>LOGIN</button>
                </Link>
            </div>
            <div onClick={handleMenuToggle} className='flex md:hidden'>
                {menuIcon ?
                  (<AiOutlineClose className='text-xl cursor-pointer'/>)
                  :
                  (<AiOutlineMenu className='text-xl cursor-pointer'/>)
                }
            </div>
            <div className={menuIcon ?
                'md:hidden absolute top-[80px] right-0 bottom-0 left-0 flex justify-center items-center text-center w-full h-[50vh] bg-black text-white case-in duration-500'
                :
                'md:hidden absolute top-[80px] right-0 bottom-0 left-[-100%] flex justify-center items-center text-center w-full h-[50vh] bg-black text-white case-in duration-500'
              }>
                <div className='w-full'>
                    <ul className='font-bold text-md px-5'>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/about'>ABOUT</Link>
                       </li>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/courses'>COURSES</Link>
                       </li>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/ebooks'>EBOOKS</Link>
                       </li>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/events'>EVENTS</Link>
                       </li>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/blogs'>BLOGS</Link>
                       </li>
                       <li onClick={handleMenuToggle} className='py-2 hover:text-black hover:bg-white cursor-pointer'>
                          <Link href='/contactus'>CONTACT</Link>
                       </li>
                    </ul>
                    {/* <div className='md:hidden flex flex-col justify-center items-center my-2'>
                      <Link href='/login' onClick={handleMenuToggle}>
                          <button className='bg-amber-500 py-2 font-bold rounded-sm'>LOGIN</button>
                      </Link>
                    </div> */}
                </div>
            </div>
        </nav>
      </header>
    </div>
  )
}
