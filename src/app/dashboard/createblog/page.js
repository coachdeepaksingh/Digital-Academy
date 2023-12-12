"use client";
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import * as yup from 'yup';

export default function CreateBlog() {

    const schema = yup.object({
        blogTitle:yup.string().required('Blog title can not be empty.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        blogCategory:yup.string().required('Please select category.'),
    });

    const form = useForm({
        defaultValues:{
            blogTitle:'', blogCategory:'', shortIntro:'', blogDesc:'', blogWriter:''
        },
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const router = useRouter();

    const onSubmit = async (data) => {
        data.blogDesc = desc;
        await axios.post('http://localhost:3000/api/Blog/AddBlog', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Blog published successfully!");
        router.push('/dashboard/bloglist')
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
                    <label className='mb-1'>BLOG TITLE:</label>
                    <input type='text' name='blogTitle' id='blogTitle' {...register('blogTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.blogTitle?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>SHORT INTRO:</label>
                    <textarea  name='shortIntro' id='shortIntro' {...register('shortIntro')} className='form-control'></textarea>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>BLOG DESCRIPTION:</label>
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
                        name='blogDesc'
                        onEditorChange={(newContent, editor) => handleEditorChange(newContent, editor)}
                        onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
                    />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>BLOG CATEGORY:</label>
                        <select type='select'  name='blogCategory' id='blogCategory' {...register('blogCategory')}  className='form-select'>
                            <option value='' className='text-center'>--- Choose Category ---</option>
                            {
                                cat.map((c) => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={c.catId} key={c.catId} >{c.catName}</option>
                                ))
                            }
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.blogCategory?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>BLOG AUTHOR:</label>
                        <input type='text' name='blogWriter' id='blogWriter' {...register('blogWriter')} className='form-control'></input>
                    </div>
                </div>
                <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
            </form>
        </div>
      </div>
    </div>
  )
}
