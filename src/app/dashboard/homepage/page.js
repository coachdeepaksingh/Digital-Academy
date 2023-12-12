import React from 'react';
import {FaUserFriends, FaRegQuestionCircle, FaStreetView} from 'react-icons/fa';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';

export default function HomePage() {
  return (
  <div>
    <section>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 w-[100%] justify-between'>
        <div className='h-[120px] w-full bg-blue-600 shadow-md p-3 rounded-md'>
          <div className=' text-white flex items-center gap-6 divide-x-2 h-full w-full'>
            <div className='w-[50%]'>
              <h2 className='font-bold'>TOTAL</h2>
              <h2 className='font-bold'>SIGN UPS</h2>
              <FaUserFriends className='text-4xl'/>
            </div>
            <div className=' flex h-[80%] w-[50%] items-center sm:px-12'>
              <p>1176</p>
            </div>
          </div>
        </div>
        <div className='h-[120px] w-full bg-yellow-500 shadow-md p-3 rounded-md '>
          <div className=' text-white flex items-center gap-6 divide-x-2 h-full w-full'>
            <div className='w-[50%]'>
              <h2 className='font-bold'>TOTAL</h2>
              <h2 className='font-bold'>REVENUE</h2>
              <RiMoneyDollarCircleLine className='text-4xl'/>
            </div>
            <div className=' flex h-[80%] w-[50%] items-center sm:px-12'>
              <p>INR: 18,478</p>
            </div>
          </div>
        </div>
        <div className='h-[120px] w-full bg-pink-600 shadow-md p-3 rounded-md'>
          <div className=' text-white flex items-center gap-6 divide-x-2 h-full w-full'>
            <div className='w-[50%]'>
              <h2 className='font-bold'>TOTAL</h2>
              <h2 className='font-bold'>ENQUIRIES</h2>
              <FaRegQuestionCircle className='text-4xl'/>
            </div>
            <div className=' flex h-[80%] w-[50%] items-center sm:px-12'>
              <p>241</p>
            </div>
          </div>
        </div>
        <div className='h-[120px] w-full bg-green-600 shadow-md p-3 rounded-md'>
          <div className=' text-white flex items-center gap-6 divide-x-2 h-full w-full'>
            <div className='w-[50%]'>
              <h2 className='font-bold'>TOTAL</h2>
              <h2 className='font-bold'>VISITORS</h2>
              <FaStreetView className='text-4xl'/>
            </div>
            <div className=' flex h-[80%] w-[50%] items-center sm:px-12'>
              <p>743</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}
