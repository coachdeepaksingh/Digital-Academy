"use client";
import * as yup from 'yup'; 
import {yupResolver} from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function SettingPage() {

    const schema = yup.object({
        webTitle:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.').required('Web title is required.'),
        webTags:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        curRency:yup.string().required('Please select currency.'),
        metaData:yup.string().max(350)
    });

    const router = useRouter();
    const form = useForm({
        defaultValues:{
            webTitle:'', webTags:'', metaData:'', fevIcon:'', curRency:''
        },
        resolver: yupResolver(schema)
    });

    const [data, setData] = useState([]);
    const {register, handleSubmit, formState} = form
    const {errors} = formState;

  return (
    <div>
      <div className='relative w-full flex shadow-lg mb-2'>
        <div className='w-full'>
            <div className='p-3 bg-light text-center'>
                <h1 className='font-bold text-1xl'>CHANGE SEO/ FEVICON/ CURRENCY</h1>
            </div>
            <hr/>
            <form className='p-4'>
                <div className='p-2 form-group'>
                    <label className='mb-2'>WEB TITLE:</label>
                    <input type='text' name='webTitle'{...register('webTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.webTitle?.message}</span>
                </div>
                <div className='p-2 form-group'>
                    <label className='mb-2'>WEB TAGs:</label>
                    <input type='text' name='webTags' {...register('webTags')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.webTags?.message}</span>
                </div>
                <div className='p-2 form-group'>
                    <label className='mb-2'>META DESCRIPTION:</label>
                    <textarea  name='metaData' placeholder='max 350 char.' {...register('metaData')} className='form-control'></textarea>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.metaData?.message}</span>
                </div>
                <div className='grid grid-cols-2 w-full gap-1 mb-3'>
                    <div className='p-2 form-group'>
                        <label className='mb-2'>FEVICON:</label>
                        <input type='file' name='fevIcon' {...register('fevIcon')} placeholder='jpg/png only' className='form-control'></input>
                    </div>
                    <div className='p-2 form-group'>
                        <label className='mb-2'>CURRENCY:</label>
                        <select type='select' name='curRency' {...register('curRency')} className='form-select'>
                            <option value='' className='text-center'>--- Select Currency ---</option>
                            <option value='USD'>USD - [$]</option>
                            <option  value='INR'>INR - [&#8377;]</option>
                            <option value='GBP'>GBP - [£]</option>
                            <option value='EURO'>EURO - [€]</option>
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.curRency?.message}</span>
                    </div>
                </div>
                <div className='font-bold text-white text-center hover:bg-amber-500 bg-amber-600 p-2'>
                    <button>UPDATE</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
