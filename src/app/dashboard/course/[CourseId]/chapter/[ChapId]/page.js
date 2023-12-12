"use client";
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import {BiSolidEdit, BiTrash} from 'react-icons/bi';
import { upperCase } from 'lodash';

export default function CreateTopic({params}) {

    const router = useRouter();
    const schema = yup.object({
          topTitle:yup.string().required('Topic name is required.'),
          chapId:yup.string().required('Chapter name is required.'),
      });
  
    const form = useForm({
      defaultValues:{
        topTitle:'',
        urlPath:'',
        topContent:'',
        chapId:''
      },
      resolver:yupResolver(schema)
    });
  
    const {register, handleSubmit, formState} = form
    const {errors} = formState;
    const [chap, setChap] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [top,setTop] = useState([]);

    const handleToggle =(index) => {
      console.log(index);
      if (toggle === index){
        setToggle(!toggle);
      }
      setToggle(index);
    }
  
    const onSubmit = async (data) => {
      await axios.post('http://localhost:3000/api/Topics/AddTopic', data)
      .then((response) => {
        console.log('Form Submitted', response)
        alert("Topic created successfully!");
        router.push('/dashboard/courselist')
      }).catch( err=> console.log(err));
    };

    //getting the list of chapters...
    useEffect(function () {
        axios.get("http://localhost:3000/api/Chapters/GetAllChapters?courseId=" + params.CourseId).then((response)=>
            setChap(response.data)).then((err)=>console.log(err));
      },[params.CourseId]);

    //getting the list of topics...
    useEffect(function () {
      axios.get("http://localhost:3000/api/Topics/GetAllChaptersAndTopics?courseId="+params.CourseId+"&chapId=" + params.ChapId).then((response)=>
          setTop(response.data)).then((err)=>console.log(err));
    },[params.CourseId, params.ChapId]);

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
   
    try {
      await axios.post('/api/upload?id=' + id + '&module='+e.target.name, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        alert("File uploaded successfuly!");
      });     
    } 
    catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <div className='relative w-full flex shadow-lg p-5'>
        <div className='flex flex-col lg:flex-row gap-9 w-full'>
            <form className='min-w-[400px]' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-group font-bold mb-2'>
                    <label>TOPIC NAME:</label>
                    <input type='text' name='topTitle' {...register('topTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.topTitle?.message}</span>
                </div>
                <div className='form-group font-bold mb-2'>
                    <label>VIDEO/AUDIO URL:</label>
                    <input type='text' name='urlPath' {...register('urlPath')} className='form-control'></input>
                </div>
                <div className='form-group font-bold mb-2'>
                    <label>PDF FILE:</label>
                    <div className='flex'>
                      <input type='file' name='topContent' {...register('topContent')} onChange={handleFileChange} className='form-control'></input>
                      <button className='bg-gray-300 hover:bg-gray-100 px-2 py-1 cursor-pointer' name='topic' onClick={handleUpload}>UPLOAD</button>
                    </div>
                </div>
                <div className='form-group font-bold mb-2'>
                    <label>CHOOSE CHAPTER:</label>
                    <select type='select' name='chapId' {...register('chapId')} className='form-select text-center'>
                        <option value='' className='text-center'>--- Choose Chapter ---</option>
                        {
                            chap.map((ch) => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={ch.chapId} key={ch.chapId} >{ch.chapTitle}</option>
                            ))
                        }
                    </select>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.chapId?.message}</span>
                </div>
                <button type='submit' className='py-2 px-3 hover:bg-amber-400 bg-amber-600 text-white font-bold'>FINISH</button>
            </form>
            <div className=' w-full mt-4'>
                <div className='border border-solid bg-gray-300 w-full p-3'>
                       <p className='font-bold text-xl'>COURSE CONTENTS</p>     
                </div>
                {
                  top.map((ch, index) => {
                  return (
                  <>
                    <div className='relative flex p-3 border border-solid' key={index}  onClick={() => handleToggle(index) }>
                      <p  className='font-bold text-lg text-uppercase' >{ch.chapTitle}</p>
                      <span className='absolute top-3  right-4 text-white text-3xl bg-gray-500 rounded-full' style={{transform: toggle == true ? 'rotate(180deg)' : '',  transition:'500ms'}}>  <MdKeyboardArrowDown /></span>
                    </div>
                    {
                      ch.topics.map((tp, idx) =>{
                        return(
                        <div className='border border-solid p-3' key={idx} style={{display: toggle === index? 'block' : 'none'}}>
                          <p >{tp.topTitle}</p>
                        </div>
                        )
                      })
                    }
                  </>
                  )
                })
                }
               </div>
            </div>
         </div>
       </div>
  )
}
// {
//   top.map((tp) =>(
//   <div className='border border-solid p-3' key={tp.topId} style={{display: toggle == true? 'block' : 'none'}}>
//     <p >{tp.topTitle}</p>
//   </div>
//   ))
// }