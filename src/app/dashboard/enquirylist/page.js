import React from 'react';
import Link from 'next/link';
import {BiTrash} from 'react-icons/bi';
import {HiOutlineMail} from 'react-icons/hi';

export default function EnquiryList() {
  return (
    <div>
      <section className='relative w-full flex flex-col shadow-lg mb-2'>
      <div className='p-3 flex justify-between items-center w-auto'>
        <form className='flex border border-solid'>
            <input type='search' placeholder='Search...' className='py-2 px-3'/>
            <button type='submit' className='py-2 px-3 bg-amber-600 text-white font-bold'>GO</button>
        </form>
        <div className='float-right'>
          <button className='bg-amber-600 py-2 px-3 text-white font-bold'>CREATE</button>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>ENQUIRY PERSON</th>
              <th className='p-3'>ENQUIRY SUB</th>
              <th className='p-3'>ENQUIRY DATE</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-3'>Web Design</td>
              <td className='p-3'>Deepak Singh</td>
              <td className='p-3'>27/07/2022</td>
              <td className='p-3 grid grid-cols-2 gap-6 text-xl cursor-pointer'>
                <Link href='/dashboard/enquirymsg'><HiOutlineMail/></Link>
                <BiTrash/>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
