"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import {BsViewList} from 'react-icons/bs';

export default function CourseList() {

  const [data, setData] = useState([]);

  useEffect( ()  =>{
    axios.get("http://localhost:3000/api/Courses/GetAllCourses")
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
          <Link href='/dashboard/createcourse'>
            <button className='bg-amber-600 py-2 px-3 text-white font-bold'>CREATE</button>
          </Link>
        </div>
      </div>
        <table className='w-auto table table-striped border border-solid'>
          <thead>
            <tr className='font-bold'>
              <th className='p-3'>COURSE TITLE</th>
              <th className='p-3'>CATEGORY</th>
              <th className='p-3'>VALIDITY</th>
              <th className='p-3'>INSTRUCTOR</th>
              <th className='p-3'>ACTION</th>
            </tr>
          </thead>
          <tbody>
          { data.map((item) => 
                (
                  <tr key={item.courseId} >
                    <td className='p-3'>{item.courseTitle}</td>
                    <td className='p-3'>{item.catName}</td>
                    <td className='p-3'>{item.courseValid}</td>
                    <td className='p-3'>{item.userName}</td>
                    <td className='p-3 grid grid-cols-3 cursor-pointer text-xl'>
                      <Link href={`/dashboard/updatecourse/${item.courseId}`}><BiSolidEdit/></Link>
                      <Link href='/#'><BsViewList/></Link>
                      <Link href="/#" onClick={e=> handleDelete(item.courseId)}><BiTrash/></Link>
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
        axios.delete('/api/Course/DeleteCourse?Id=' +id)
        .then(res => {
            alert('Course deleted successfully!');
            router.push('/dashboard/courselist');
    })
    }else{
        router.push('/dashboard/courselist');
    }
  };
}
