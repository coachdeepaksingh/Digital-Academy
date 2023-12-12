"use client";
import React from 'react';
import CourseImage from '../../../../../public/uploads/asp.net.jpg';
import Image from 'next/image';
import * as yup from 'yup';
import axios from 'axios';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import errorcolor from '@/errorcolor';
import { TipTap } from '@/components/TipTap/page';

export default function UpdateCourse() {

    const Validations = yup.object({
        courseTitle:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.').required('Event title can not be empty.'),
        courseCategory:yup.string().required('Please select category.'),
        discPrice:yup.number().min(1, 'Negative value not acceptable.'),
        origPrice:yup.number().min(1, 'Negative value not acceptable.'),
    }); 

  return (
    <div>
      <div className='relative w-full flex flex-col p-3 shadow-lg mb-3'>
        <div className='w-full p-4'>
            <Image alt='course' src={CourseImage} className='h-[350px] w-[100%] mb-3'/>
            <Formik
            validationSchema={Validations}
            initialValues={{courseTitle:'', shortIntro:'', courseDesc:'', courseCategory:'', courseVal:'', discPrice:'', origPrice:'', courseImage:''}}
            onSubmit={(values) => {
            console.log(values);
            axios.post("http://localhost:3000/api/Ebooks/AddEbook", values)
            .then((response) => {
            console.log(response);
            alert('Ebook added successfully...!');
            router.push('/dashboard/ebooklist')
            }).catch((error) =>{
            console.log(error);
            alert('Error adding ebook...!');
        }) 
        }}>
                <Form className='font-bold'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>COURSE TITLE:</label>
                        <Field type='text' name='courseTitle' className='form-control'></Field>
                        <ErrorMessage name='courseTitle' component={errorcolor}/>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>SHORT INTRO:</label>
                        <Field as='textarea' name='shortIntro' className='form-control'></Field>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>COURSE DESCRIPTION:</label>
                        <TipTap/>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='form-group mb-3'>
                            <label className='mb-1'>COURSE CATEGORY:</label>
                            <Field as='select' name='courseCategory' className='form-select'>
                                <option className='text-center'>---Choose Category---</option>
                                <option value='Web Development'>Web Development</option>
                                <option value='Web Designing'>Web Designing</option>
                                <option value='App Development'>App Development</option>
                            </Field>
                            <ErrorMessage name='courseCategory' component={errorcolor}/>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='mb-1'>COURSE VALIDITY:</label>
                            <select className='form-select' name='courseVal'>
                                <option selected className='text-center'>---Choose Validity---</option>
                                <option>LifeTime</option>
                                <option>Days - 360</option>
                                <option>Days - 180</option>
                            </select>
                        </div> 
                    </div>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='form-group mb-3'>
                            <label className='mb-1'>ORIGINAL PRICE:</label>
                            <Field type='text' name='origPrice' className='form-control'></Field>
                            <ErrorMessage name='origPrice' component={errorcolor}/>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='mb-1'>DISCOUNTED PRICE:</label>
                            <Field type='text' name='discPrice' className='form-control'></Field>
                            <ErrorMessage name='discPrice' component={errorcolor}/>
                        </div>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>COURSE IMAGE:</label>
                        <input type='file' name='courseImage' className='form-control'></input>
                    </div>
                    <div className='grid grid-cols-2 gap-1 w-full'>
                        <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
                        <button type='submit' className='py-2 px-3 hover:bg-gray-100 bg-gray-200 text-black font-bold'>SAVE & NEXT</button>
                    </div>
                </Form>
            </Formik>
        </div>
      </div>
    </div>
  )
}
