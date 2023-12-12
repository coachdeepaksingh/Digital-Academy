"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateCourse() {

    const schema = yup.object({
        courseTitle:yup.string().required('Course title is required.'),
        courseCategory:yup.string().required('Please select category.'),
        discPrice:yup.number().nullable().transform((value, original) => (original === "" ? null : value)).typeError('Must be a number.').min(1, 'Invalid value.'),
        origPrice:yup.number().nullable().transform((value, original) => (original === "" ? null : value)).typeError('Must be a number.').min(1, 'Invalid value.'),
    }); 
    const router = useRouter();

    const form = useForm({
        defaultValues:{
            courseTitle:'', courseCategory:'', shortIntro:'', courseDesc:'', courseValid:'', origPrice:'', discPrice:''
        },
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = async (data) => {
        data.courseDesc = desc;
        await axios.post('http://localhost:3000/api/Course/AddCourse', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Course created successfully!");
        router.push(`/dashboard/course/${response.data}/chapter`)
        }).catch( err=> console.log(err));
    };

    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState([]);
    const [content, setContent] = useState('');
    const [validity, setValidity] = useState('');

    const handleValidity = (event) => {
        const value = event.target.value;
        setValidity(value);
        console.log(value);
    }

    //getting the list of categories...
    useEffect(function () {
        axios.get("http://localhost:3000/api/Category/GetAllCategory").then((response)=>
            setCat(response.data)).then((err)=>console.log(err));
      },[]);
       
    const handleEditorChange = (newContent, editor) => {
        setDesc(newContent);
        setContent(editor.getContent({format: "text"}));
    };

  return (
    <div>
      <div className='relative w-full flex flex-col p-3 shadow-lg mb-3'>
        <div className='w-full p-4'>
            <form className='font-bold'onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-group mb-3'>
                    <label className='mb-1'>COURSE TITLE:</label>
                    <input type='text' name='courseTitle' {...register('courseTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.courseTitle?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>SHORT INTRO:</label>
                    <input as='textarea' name='shortIntro' {...register('shortIntro')} className='form-control'></input>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>COURSE DESCRIPTION:</label>
                    <Editor
                        apiKey='f6vdi67pzdou3z6qb7ilstl75q6w2g864dnvtht05urju7zi'
                        initialValue={''}
                        init={{
                        menubar: false,
                        plugins: 'ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={desc}
                        name='courseDesc'
                        onEditorChange={(newContent, editor) => handleEditorChange(newContent, editor)}
                        onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>COURSE CATEGORY:</label>
                        <select type='select' name='courseCategory' {...register('courseCategory')} className='form-select'>
                            <option value='' className='text-center'>---Choose Category---</option>
                            {
                                cat.map((c) => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={c.catId} key={c.catId} >{c.catName}</option>
                                ))
                            }
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.courseCategory?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>COURSE VALIDITY:</label>
                        <select type='select' className='form-select' {...register('courseValid')} name='courseValid' onChange={handleValidity}>
                            <option value='' className='text-center'>---Choose Validity---</option>
                            <option value='lifeTime'>Lifetime</option>
                            <option value='days-360'>Days - 360</option>
                            <option value='days-180'>Days - 180</option>
                        </select>
                    </div> 
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>ORIGINAL PRICE:</label>
                        <input type='text' name='origPrice' {...register('origPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.origPrice?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>DISCOUNTED PRICE:</label>
                        <input type='text' name='discPrice' {...register('discPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.discPrice?.message}</span>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-1 w-full'>
                    <button type='button' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
                    <button type='submit' className='py-2 px-3 hover:bg-gray-100 bg-gray-200 text-black font-bold'>SAVE & NEXT</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
