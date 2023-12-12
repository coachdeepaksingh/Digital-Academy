import React from 'react';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div>
      <div className="relative flex min-h-screen text-gray-800 antialiased justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative top-10 py-3 w-[80%] lg:w-[30%] mx-auto text-center">
          <span className="text-2xl font-light">Create a free account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-amber-500 rounded-t-md"></div>
            <form className="px-8 py-6">
              <label className="block font-semibold"> Full Name:</label>
              <input type="text" placeholder="Deepak Singh" className="mb-3 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
              <label className="block font-semibold"> Email Id:</label>
              <input type="text" placeholder="deepaksingh@gmail.com" className="mb-3 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
              <div className='flex gap-1'>
                <div className='w-[50%]'>
                    <label className="block font-semibold"> Phone:</label>
                    <input type="text" placeholder="with country code e.g.+91" className="mb-3 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
                </div>
                <div className='w-[50%]'>
                    <label className="block font-semibold"> Join As:</label>
                    <select className=" mb-3 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md">
                        <option selected className='text-center'>--- Select Role ---</option>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                    </select>
                </div>
              </div>
              <label className="block font-semibold">Create Password: </label>
              <input type="password" placeholder="min 8 alpha-numeric + special char." className="mb-3 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
              <div className="flex justify-between items-baseline">
                <button type="submit" className="mt-2 font-bold bg-gray-200 text-black py-2 px-6 w-full rounded-md">SIGN UP</button>
              </div>
              <div className='flex justify-center mt-4 text-white bg-amber-500 py-2'>
                  <p>Already a member...?</p>
                  <Link className='ml-2' href="/login">Login</Link>
              </div>
            </form>  
          </div>
        </div>
      </div>
    </div>
  )
}
