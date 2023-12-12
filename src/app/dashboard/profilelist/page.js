"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function ProfileList() {

  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/api/Profile/GetAllProfiles")
    .then((response) =>{
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <section className='relative w-full flex flex-col shadow-lg mb-2'>
      <div className='p-3 flex justify-between items-center w-auto'>
        <form className='flex border border-solid'>
            <input type='search' placeholder='Search...' className='py-2 px-3'/>
            <button type='submit' className='py-2 px-3 bg-amber-600 text-white font-bold'>GO</button>
        </form>
        <div className='float-right'>
            <Link href='/dashboard/createprofile'>
                <button className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>CREATE</button>
            </Link>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>PROFILE NAME</th>
              <th className='p-3'>PROFESSION</th>
              <th className='p-3'>PROFILE ROLE</th>
              <th className='p-3'>EDUCATION</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            { data.map((item) => 
                (
                  <tr key={item.profileId} >
                    <td className='p-3'>{item.profileName}</td>
                    <td className='p-3'>{item.proFession}</td>
                    <td className='p-3'>{item.userType}</td>
                    <td className='p-3'>{item.eduCation}</td>
                    <td className='p-3 grid grid-cols-3 cursor-pointer text-xl'>
                      <Link href={`/dashboard/updateprofile/${item.profileId}`}><BiSolidEdit/></Link>
                      <Link href='/#'><BsViewList/></Link>
                      <Link href="/#" onClick={e=> handleDelete(item.profileId)}><BiTrash/></Link>
                    </td>
                  </tr>
                ))         
              }
          </tbody>
        </table>
      </section>
    </div>
  );
  function handleDelete(id){
    const conf = window.confirm("You won't be able to restore. Are you sure to delete?");
    if (conf){
        axios.delete('/api/Profile/DeleteProfile?Id=' +id)
        .then(res => {
            alert('Profile deleted successfully!');
            router.push('/dashboard/profilelist');
    })
    }else{
        router.push('/dashboard/profilelist');
    }
  };
}
