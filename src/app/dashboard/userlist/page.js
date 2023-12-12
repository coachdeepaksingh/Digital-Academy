"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function UserList() {

  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/api/User/GetAllUsers")
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
            <Link href='/dashboard/createuser'>
                <button className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>CREATE</button>
            </Link>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>USER NAME</th>
              <th className='p-3'>USER PASSWORD</th>
              <th className='p-3'>USER ROLE</th>
              <th className='p-3'>USER EMAIL</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
          {
            data.map((item) =>(
              <tr key={(item.userId)}>
                <td className='p-3'>{item.userName}</td>
                <td className='p-3'>{item.userPassword}</td>
                <td className='p-3'>{item.userType}</td>
                <td className='p-3'>{item.userEmail}</td>
                <td className='p-3 grid grid-cols-3 gap-6 text-xl cursor-pointer'>
                  <Link href={`/dashboard/updateuser/${item.userId}`}><BiSolidEdit/></Link>
                  <BsViewList/>
                  <Link href="/#" onClick={e=> handleDelete(item.userId)}><BiTrash/></Link>
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
        axios.delete('/api/Users/DeleteUser?Id=' +id)
        .then(res => {
            alert('User deleted successfully!');
            router.push('/dashboard/userlist');
    })
    }else{
        router.push('/dashboard/userlist');
    }
  };
}
