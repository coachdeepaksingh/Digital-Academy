"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';

export default function UpdateBlog({params}) {

    const schema = yup.object({
        blogTitle:yup.string().required('Blog title can not be empty.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        blogCategory:yup.string().required('Please select category.'),
    });

    const form = useForm({
        defaultValues: async () => {
            const response = await fetch ('http://localhost:3000/api/Blog/GetBlogById?Id=' + id);
            const data = await response.json()
              return{
                blogTitle: data.blogTitle,
                shortIntro: data.shortIntro,
                blogDesc: data.blogDesc,
                blogCategory: data.blogCategory,
                blogWriter: data.blogWriter,
                blogBanner: data.blogBanner
              }
          },
          resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const router = useRouter();
    const id = params.BlogId;

    const onSubmit = async (data) => {
      console.log(data);
      console.log(desc);
      data.blogDesc = desc;
      data.BlogId = id;
      await axios.put('/api/Blog/UpdateBlog', data)
      .then(res =>{
        console.log(res);         
        alert("Blog updated successfully!");
        router.push('/dashboard/bloglist');
      }).catch( err=> console.log(err));
    };

    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState([]);
    const [data, setData] = useState({});
    const [content, setContent] = useState('');

    useEffect(() =>{
        axios.get('/api/Blog/GetBlogById?Id=' + id).then(res => setData(res.data)).catch(err =>console.log(err))
       },[id]);

    //getting the list of categories...
    useEffect(function () {
        axios.get("http://localhost:3000/api/Category/GetAllCategory").then((response)=>
            setCat(response.data)).then((err)=>console.log(err));
      },[]);
       
    const handleEditorChange = (newContent, editor) => {
        setDesc(newContent);
        setContent(editor.getContent({format: "text"}));
    };

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
      <div className='relative w-full flex flex-col p-3 shadow-lg mb-3'>
        <div className='w-full p-4'>
            <div className='w-full mb-3 border border-solid'>
                <Image  alt={data.blogTitle} src={'/uploads/'+ data.blogBanner} priority width={1180} height={250} />
            </div> 
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
                        initialValue={data.blogDesc}
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
                            <option className='text-center'>--- Choose Category ---</option>
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
                <div className='form-group mb-3'>
                  <label htmlFor='blogBanner' className='mb-1'>SET BANNER:</label>
                  <div className='flex'>
                      <input type='file'  name='blogBanner' id='blogBanner'  onChange={handleFileChange} className='form-control'></input>
                      <button type='button'  name='blog' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-bold'>UPLOAD</button>
                  </div>
                </div>
                <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
            </form>
        </div>
      </div>
    </div>
  )
}
