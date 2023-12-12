"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';


export default function CreateEbook() {

    const router = useRouter();
    const schema = yup.object({
        ebookTitle:yup.string().required('Ebook title is required.'),
        ebookCategory:yup.string().required('Please select category.'),
        discPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
        origPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
    });

    const form = useForm({
        defaultValues:{
            ebookTitle:'', ebookCategory:'', shortIntro:'', ebookDescription:'', authorName:'', origPrice:'', discPrice:''
        },
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = async (data) => {
        data.ebookDescription = desc;
        await axios.post('http://localhost:3000/api/Ebooks/AddEbook', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Ebook created successfully!");
        router.push('/dashboard/ebooklist')
        }).catch( err=> console.log(err));
    };

    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState([]);
    const [content, setContent] = useState('');

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
            <form className='font-bold' onSubmit={handleSubmit(onSubmit)}  noValidate>
                <div className='form-group mb-3'>
                    <label htmlFor='ebookTitle' className='mb-1'>EBOOK TITLE:</label>
                    <input type='text' name='ebookTitle' id='ebookTitle' {...register('ebookTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.ebookTitle?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='shortIntro' className='mb-1'>SHORT INTRO:</label>
                    <input type='text' id='shortIntro' name='shortIntro' {...register('shortIntro')} className='form-control'></input>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='ebookDescription' className='mb-1'>EBOOK DESCRIPTION:</label>
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
                        name='ebookDescription'
                        onEditorChange={(newContent, editor) => handleEditorChange(newContent, editor)}
                        onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label htmlFor='ebookCategory' className='mb-1'>EBOOK CATEGORY:</label>
                        <select type='select' name='ebookCategory' id='ebookCategory' {...register('ebookCategory')} className='form-select'>
                            <option value='' className='text-center'>--- Choose Category ---</option>
                            {
                                cat.map((c) => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={c.catId} key={c.catId} >{c.catName}</option>
                                ))
                            }
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.ebookCategory?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='authorName' className='mb-1'>AUTHOR NAME:</label>
                        <input type='text' id='authorName' {...register('authorName')} className='form-control'></input>
                    </div> 
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label htmlFor='origPrice' className='mb-1'>ORIGINAL PRICE:</label>
                        <input type='text' id='origPrice'{...register('origPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.origPrice?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='discPrice' className='mb-1'>DISCOUNTED PRICE:</label>
                        <input type='text' id='discPrice'{...register('discPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.discPrice?.message}</span>
                    </div>
                </div>
                <div>
                    <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
                </div>
            </form>
            {/* <DevTool control={control}/> */}
        </div>
      </div>
    </div>
  )
}
