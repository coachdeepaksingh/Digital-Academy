import React from 'react';
import BackgroundImage from '../../public/images/bnr.jpg';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <section className='relative'>
         <Image
          src={BackgroundImage}
          alt="digital academy" className='h-screen w-[100%]'/>
      </section>
    </div>
  )
}
