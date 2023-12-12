"use client";
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function EbookList() {

  const router = useRouter();
  const [ebooks, setEbooks] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:3000/api/Ebooks/GetAllEbooks")
    .then((response) =>{
      setEbooks(response.data);
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
            <Link href='/dashboard/createebook'>
                <button className='bg-amber-600 hover:bg-amber-500 py-2 px-3 text-white font-bold'>CREATE</button>
            </Link>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>EBOOK TITLE</th>
              <th className='p-3'>AUTHOR NAME</th>
              <th className='p-3'>CATEGORY</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              ebooks.map((item) =>(
              <tr key={(item.ebookId)}>
                <td className='p-3'>{item.ebookTitle}</td>
                <td className='p-3'>{item.authorName}</td>
                <td className='p-3'>{item.catName}</td>
                <td className='p-3 grid grid-cols-3 gap-6 text-xl cursor-pointer'>
                  <Link href={`/dashboard/updateebook/${item.ebookId}`}><BiSolidEdit/></Link>
                  <BsViewList/>
                  <Link href="/#" onClick={e=> handleDelete(item.ebookId)}><BiTrash/></Link>
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
        axios.delete('/api/Ebooks/DeleteEbook?Id=' +id)
        .then(res => {
            alert('Ebook deleted successfully!');
            router.push('/dashboard/ebooklist');
    })
    }else{
        router.push('/dashboard/ebooklist');
    }
  };
}
