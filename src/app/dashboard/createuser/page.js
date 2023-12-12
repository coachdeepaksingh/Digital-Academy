"use client";
import React from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function CreateUser() {

    const schema = yup.object({
        userName:yup.string().required('User name is required.'),
        userPassword:yup.string().required('Please create password').min(8),
        userTypeId:yup.string().required('Please select role.'),
        userEmail:yup.string().email().required('Email is required.'),
        userPhone:yup.string().required('Phone is required.').min(10).max(15),
    }); 

    const router = useRouter();
    const form = useForm({
        defaultValues:{
            userName:'', userPassword:'', userEmail:'', userPhone:'', userTypeId:''
        },
        resolver: yupResolver(schema)
    });

    const [data, setData] = useState([]);
    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = async (data) => {
        await axios.post('http://localhost:3000/api/User/AddUser', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("User created successfully!");
        router.push('/dashboard/userlist')
        }).catch( err=> console.log(err));
    };

    //getting the list of userTypes...
    useEffect( function ()  {
       axios.get("http://localhost:3000/api/UserTypes/GetAllUserTypes").then((response)=>
            setData(response.data)).then((err)=>console.log(err));
      },[]);

  return (
    <div>
      <div className='relative w-full flex flex-col p-3 shadow-lg mb-3'>
        <div className='w-full p-4'>       
            <form className='font-bold' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group mb-3'>
                    <label className='mb-1'>USER NAME:</label>
                    <input type='text' name='userName' {...register('userName')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.userName?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>CREATE PASSWORD:</label>
                    <input type='password' name='userPassword' {...register('userPassword')} placeholder='min 8 char.' className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.userPassword?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>USER EMAIL:</label>
                    <input type='text' name='userEmail' {...register('userEmail')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.userEmail?.message}</span>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>USER PHONE:</label>
                        <input type='text' name='userPhone' {...register('userPhone')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.userPhone?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>USER ROLE:</label>
                        <select type='select' name='userTypeId' {...register('userTypeId')} className='form-select'>
                            <option value='' className='text-center'>--- Choose Role ---</option>
                            {
                                data.map((type) => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={type.userTypeId} key={type.userTypeId} >{type.userType}</option>
                                ))
                            }
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.userTypeId?.message}</span>
                    </div>
                </div>
                <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
            </form>   
        </div>
      </div>
    </div>
  )
}
