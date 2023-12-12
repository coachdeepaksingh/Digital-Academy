"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function BlogList() {
  
  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/api/Blog/GetAllBlogs")
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
            <Link href='/dashboard/createblog'>
                <button className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>CREATE</button>
            </Link>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>BLOG TITLE</th>
              <th className='p-3'>CATEGORY</th>
              <th className='p-3'>PUBLISH DATE</th>
              <th className='p-3'>AUTHOR</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            { data.map((item) => 
                (
                  <tr key={item.blogId} >
                    <td className='p-3'>{item.blogTitle}</td>
                    <td className='p-3'>{item.catName}</td>
                    <td className='p-3'>{item.blogDate}</td>
                    <td className='p-3'>{item.blogWriter}</td>
                    <td className='p-3 grid grid-cols-3 cursor-pointer text-xl'>
                      <Link href={`/dashboard/updateblog/${item.blogId}`}><BiSolidEdit/></Link>
                      <Link href='/#'><BsViewList/></Link>
                      <Link href="/#" onClick={e=> handleDelete(item.blogId)}><BiTrash/></Link>
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
        axios.delete('/api/Blog/DeleteBlog?Id=' +id)
        .then(res => {
            alert('Blog deleted successfully!');
            router.push('/dashboard/bloglist');
    })
    }else{
        router.push('/dashboard/bloglist');
    }
  };
}
