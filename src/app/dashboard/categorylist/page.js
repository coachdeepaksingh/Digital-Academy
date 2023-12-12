"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function CategoryList() {

  const router = useRouter();
  const [cat, setCat] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:3000/api/Category/GetAllCategory")
    .then((response) =>{
      setCat(response.data);
    });
  }, []);

  return (
    <div>
      <section className='relative w-full flex flex-col shadow-lg'>
        <div className='p-3 flex justify-between items-center w-auto'>
          <form className='flex border border-solid'>
              <input type='search' placeholder='Search...' className='py-2 px-3'/>
              <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>GO</button>
          </form>
          <div className='float-right'>
            <Link href='/dashboard/createcategory'>
                <button className='bg-amber-600 hover:bg-amber-500 py-2 px-3 text-white font-bold'>CREATE</button>
            </Link>
          </div>
        </div>
          <table className='w-auto table table-striped border-top'>
            <thead>
              <tr className='font-bold '>
                <th className='p-3'>CATEGORY NAME</th>
                <th className='p-3'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              { cat.map((item) => 
              (
                <tr key={item.catId} >
                  <td className='p-3'>{item.catName}</td>
                  <td className='p-3 grid grid-cols-3 cursor-pointer text-xl'>
                    <Link href={`/dashboard/updatecategory/${item.catId}`}><BiSolidEdit/></Link>
                    <Link href='/#'><BsViewList/></Link>
                    <Link href="/#" onClick={e=> handleDelete(item.catId)}><BiTrash/></Link>
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
        axios.delete('/api/Category/DeleteCategory?Id=' +id)
        .then(res => {
            alert('Category deleted successfully!');
            router.push('/dashboard/categorylist');
    })
    }else{
        router.push('/dashboard/categorylist');
    }
  }
}
