"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {BsArrowLeftShort, BsBook, BsCalendarEvent, BsQuestionSquare} from 'react-icons/bs';
import {BiCategory} from 'react-icons/bi';
import {AiOutlineHome, AiFillSetting} from 'react-icons/ai';
import {FaChalkboardTeacher, FaBlog, FaUsers, FaUserCircle} from 'react-icons/fa';

export default function DashBoard({children}) {

  const [open, setOpen] = useState(true);
  return (
    <div>
        <div className='flex w-full'>
        <div className={`relative ${open ? 'w-[280px]' : 'w-[75px]'} h-screen case-in duration-500 bg-amber-600 px-3`}>
        <div className='fixed'>
        <BsArrowLeftShort  className={`bg-white text-black text-2xl rounded-full border-1 border-amber-600 cursor-pointer absolute -right-12 top-5 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                <div className={`px-2 py-3 ${!open && "scale-0"}`}>
                     <Image className='rounded-sm' src="/images/logodigital.png" alt="digitalacademy" priority height={30} width={200} />
                </div>
                <hr className='text-white'/>
                <div>
                    <ul className=''>
                        <li className='group flex items-center hover:bg-white duration-300 py-2  cursor-pointer'>
                            <span><AiOutlineHome className='text-white text-3xl mr-2' /></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}><Link href="/dashboard/homepage">HOME</Link></span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><BiCategory className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/categorylist">CATEGORY</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><FaChalkboardTeacher className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/courselist">COURSES</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><BsBook className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/ebooklist">EBOOKS</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><BsCalendarEvent className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/eventlist">EVENTS</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><FaBlog className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/bloglist">BLOGS</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><BsQuestionSquare className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/enquirylist">ENQUIRY</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><FaUsers className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/userlist">USERS</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><FaUserCircle className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/profilelist">PROFILE</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                        <li className='flex items-center hover:bg-white duration-300 py-2 cursor-pointer'>
                            <span><AiFillSetting className='text-3xl text-white mr-2'/></span>
                            <span className={`text-white font-bold ${!open && "scale-0"}`}>
                                <Link href="/dashboard/settings">SETTINGS</Link>
                            </span>
                        </li>
                        <hr className='text-white'/>
                    </ul>
                </div>
            </div>
        </div>
        <div className='w-full'>
            <header className='h-[83px] w-full bg-white shadow'>
                <div className='flex float-right p-4'>
                    <button className='px-3 py-2 bg-amber-600 hover:bg-amber-500 font-bold text-white rounded-sm'>LOGOUT</button>
                </div>
            </header>
            <main className='p-3 w-full overflow-auto h-[640px]'>
                {children} 
            </main>        
        </div>
    </div>
</div>
  )
}
