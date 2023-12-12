"use client";
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {BiSolidEdit, BiTrash} from 'react-icons/bi';

export default function CreateChapter({params}) {

    const router = useRouter();
    const schema = yup.object({
          chapTitle:yup.string().required('Chapter name is required.'),
      });
  
    const form = useForm({
      defaultValues:{
        chapTitle:'',
      },
      resolver:yupResolver(schema)
    });
  
    const {register, handleSubmit, formState} = form
    const {errors} = formState;
    const [chap, setChap] = useState([]);

    // const handleSave = async (data) => {
    //   await axios.post('http://localhost:3000/api/Chapters/AddChapter', data)
    //   .then((res) => {
    //     console.log('Form Submitted', res)
    //     alert("Chapter created successfully!");
    //     router.push(`/dashboard/course/${params.CourseId}/chapter`)
    //   }).catch( err=> console.log(err));
    // };
  
    // const onSubmit = async (data, value) => {
    //   console.log(value);
    //   await axios.post('http://localhost:3000/api/Chapters/AddChapter', data)
    //   .then((response) => {
    //     console.log('Form Submitted', response)
    //     alert("Chapter created successfully!");
    //     if(value=="savenext"){
    //       router.push(`/dashboard/course/${params.CourseId}/chapter/${response.chapId}`)
    //     }        
    //   }).catch( err=> console.log(err));
    // };

    const onSubmit = async (data) => {  
      data.courseId =params.CourseId;   
      await axios.post('http://localhost:3000/api/Chapters/AddChapter', data)
      .then((response) => {
        console.log('Form Submitted', response)
        alert("Chapter created successfully!");
        router.push(`/dashboard/course/${params.CourseId}/chapter/${response.data}`)       
      }).catch( err=> console.log(err));
    };

    //getting the list of chapters...
    useEffect(function () {
      axios.get("http://localhost:3000/api/Chapters/GetAllChapters?courseId=" + params.CourseId).then((response)=>
          setChap(response.data)).then((err)=>console.log(err));
    },[params.CourseId]);

  return (
    <div>
      <div className='relative w-full flex shadow-lg p-5'>
        <div className='flex flex-col lg:flex-row gap-9 w-full'>
            <form className='min-w-[300px]' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-group font-bold mb-2'>
                    <label>CHAPTER NAME:</label>
                    <input type='text' name='chapTitle' {...register('chapTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.chapTitle?.message}</span>
                </div>
                <div className='grid grid-cols-2 gap-1 w-full'>
                    <button type='submit' value='save' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
                    <button type='submit' value="savenext" className='py-2 px-3 hover:bg-gray-100 bg-gray-200 text-black font-bold'>SAVE & NEXT</button>
                </div>
            </form>
            <div className='w-full mt-4'>
                <table className='w-full table table-striped border border-solid'>
                    <thead>
                        <tr className='font-bold'>
                            <th className='p-2'>CHAPTER NAME</th>
                            <th className='p-2'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    { chap.map((item) => 
                      (
                        <tr key={item.chapId} >
                          <td className='p-3'>{item.chapTitle}</td>
                          <td className='p-3 grid grid-cols-3 cursor-pointer text-xl'>
                            <Link href={`/dashboard/updatechapter/${item.chapId}`}><BiSolidEdit/></Link>
                            <Link href="/#" onClick={e=> handleDelete(item.chapId)}><BiTrash/></Link>
                          </td>
                        </tr>
                      ))         
                    }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  )
}
