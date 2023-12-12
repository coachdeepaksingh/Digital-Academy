import React from 'react';
import Image from 'next/image';
import InnerBanner from '../../../public/images/inrbnr.jpg';

export default function Blogs() {
  return (
    <div>
      <section className='relative'>
        <Image 
          alt="about"
          src={InnerBanner} className='w-[100%] h-[398px]'/>
      </section>
    </div>
  )
}
