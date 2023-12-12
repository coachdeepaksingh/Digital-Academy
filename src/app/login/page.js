import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <div>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Login to your account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-amber-500 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <label className="block font-semibold"> Username or Email </label>
              <input type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
              <label className="block mt-3 font-semibold"> Password </label>
              <input type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-amber-500 focus:ring-1 rounded-md"/>
              <div className="flex justify-between items-baseline">
                <button type="submit" className="mt-4 font-bold bg-gray-200 text-black py-2 px-6 rounded-md">LOGIN</button>
                <Link href="/forgetpassword" className="text-sm hover:underline">Forgot Password?</Link>
              </div>
              <div className='flex justify-center mt-4 text-white bg-amber-500 py-2'>
                  <p>Not a member yet...?</p>
                  <Link className='ml-2' href="/signup">Sign Up</Link>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
