"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import React from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import axios from 'axios';

export default function UpdateCategory({params}) {

const id = params.CatId;

const router = useRouter();
const schema = yup.object({
  catName:yup.string().required('Category name is required.'),
});

const form = useForm({
  defaultValues: async () => {
    const response = await fetch ('http://localhost:3000/api/Category/CategoryById?Id=' + id);
    const data = await response.json()
      return{
        catName: data.catName
      }
  },
  resolver:yupResolver(schema)
});

  const {register,  handleSubmit, formState} = form
  const {errors} = formState;
  
  const onSubmit = async (data) => {
    data.CatId = id;
    await axios.put('http://localhost:3000/api/Category/UpdateCategory', data)
    .then((response) => {
      console.log('Form Submitted', response)
      alert("Category updated successfully!");
      router.push('/dashboard/categorylist')
    }).catch( err=> console.log(err));
  };

  return (
    <div>
      <div className='w-full'>
        <div className='shadow-lg w-[75%] mx-auto p-3'>
            <form className='w-auto p-3' onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className='form-group font-bold mb-3'>
                      <label htmlFor='catName' className='mb-2'>CATEGORY NAME:</label>
                      <input type='text' id='catName' {...register('catName')} className='form-control'></input>
                      <span className='text-red-500 italic text-sm font-normal'>{errors.catName?.message}</span>
                  </div>
                  <div className='grid grid-cols-2 w-auto gap-2'>
                    <button type='submit' className='bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-3'>
                        SAVE
                    </button>
                    <Link href='/dashboard/categorylist' className='bg-gray-100 hover:bg-gray-200 text-black text-center font-bold py-2 px-3'>
                        BACK
                    </Link>
                  </div>
              </form>
              {/* <DevTool control={control}/> */}
        </div>
      </div>
    </div>
  )
}
