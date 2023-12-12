"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';
import { data } from 'autoprefixer';

export default function UpdateEvent({params}) {

    const router = useRouter();
    const id = params.EventId;

    const schema = yup.object({
        eventTitle:yup.string().required('Event title can not be empty.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        eventCategory:yup.string().required('Please select category.'),
        discPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
        origPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
        contactPerson:yup.string().required('Contact person is required.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        contactNumber:yup.string().required('Contact number is required.').matches(/^\d+$/, 'Numbers only.').min(10).max(13),
    }); 

    const form = useForm({
        defaultValues: async () => {
          const response = await fetch ('http://localhost:3000/api/Events/GetEventById?Id=' + id);
          const data = await response.json()
          
            return{
              eventTitle: data.eventTitle,
              shortIntro: data.shortIntro,
              eventDesc: data.eventDesc,
              eventCategory: data.eventCategory,
              contactPerson: data.contactPerson,
              contactNumber: data.contactNumber,
              eventBanner: data.eventBanner,
              eventMode: data.eventMode,
              eventTime: data.eventTime,
              eventDate: data.eventDate,
              eventLocation: data.eventLocation,
              origPrice: data.origPrice,
              discPrice: data.discPrice
            }
        },
        resolver: yupResolver(schema)
      });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = async (data) => {
        data.eventDesc = desc;
        data.eventMode = mode;
        data.EventId = id;
        await axios.put('http://localhost:3000/api/Events/UpdateEvent', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Event updated successfully!");
        router.push('/dashboard/eventlist')
        }).catch( err=> console.log(err));
    };

    const [data, setData] = useState('');
    const [desc, setDesc] = useState('');
    const [mode, setMode] = useState('');
    const [cat, setCat] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() =>{
        axios.get('/api/Events/GetEventById?Id=' + id).then(res => setData(res.data)).catch(err =>console.log(err))
       },[id]);

    const handleMode = (event) => {

        const value = event.target.value;
        setMode(value);
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
            <Image  alt={data.eventTitle} src={'/uploads/'+ data.eventBanner} priority width={1180} height={250} />
         </div>            
            <form className='font-bold'onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-group mb-3'>
                    <label className='mb-1'>EVENT TITLE:</label>
                    <input type='text' name='eventTitle' id='eventTitle' {...register('eventTitle')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.eventTitle?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>EVENT INTRO:</label>
                    <textarea type='text'id='shortIntro' name='shortIntro' {...register('shortIntro')} className='form-control'></textarea>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>EVENT DESCRIPTION:</label>
                    <Editor
                        apiKey='f6vdi67pzdou3z6qb7ilstl75q6w2g864dnvtht05urju7zi'
                        initialValue={data.eventDesc}
                        init={{
                        menubar: false,
                        plugins: 'ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents  powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table  | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={desc}
                        name='eventDesc'
                        onEditorChange={(newContent, editor) => handleEditorChange(newContent, editor)}
                        onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>EVENT CATEGORY:</label>
                        <select type='select' name='eventCategory' id='eventCategory' {...register('eventCategory')} className='form-select'>
                        <option className='text-center'>--- Choose Category ---</option>
                            {
                                cat.map((c) => (
                                // eslint-disable-next-line react/jsx-key
                                <option value={c.catId} key={c.catId} >{c.catName}</option>
                                ))
                            }
                        </select>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.eventCategory?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>EVENT MODE:</label>
                        <select type='select' name='eventMode' id='eventMode' {...register('eventMode')} value={mode} className='form-select' onChange={handleMode}>
                            <option value='' className='text-center'>--- Choose Mode ---</option>
                            <option value='Online' >Online</option>
                            <option value='Offline'>Offline</option>
                        </select>
                    </div> 
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>EVENT TIME:</label>
                        <input type='time' name='eventTime' id='eventTime' {...register('eventTime')} className='form-control'></input>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>EVENT DATE:</label>
                        <input type='date'  name='eventDate'id='eventDate' {...register('eventDate')} className='form-control'></input>
                    </div>        
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>CONTACT PERSON:</label>
                        <input type='text' name='contactPerson' id='contactPerson' {...register('contactPerson')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.contactPerson?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>CONTACT NUMBER:</label>
                        <input type='text' name='contactNumber'id='contactNumber' {...register('contactNumber')} placeholder="with country code e.g. 91" className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.contactNumber?.message}</span>
                    </div>        
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>ORIGINAL PRICE:</label>
                        <input type='text' name='origPrice' id='origPrice' {...register('origPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.origPrice?.message}</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='mb-1'>DISCOUNTED PRICE:</label>
                        <input type='text' name='discPrice' id='discPrice' {...register('discPrice')} className='form-control'></input>
                        <span className='text-red-500 italic text-sm font-normal'>{errors.discPrice?.message}</span>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='eventBanner' className='mb-1'>SET BANNER:</label>
                    <div className='flex'>
                        <input type='file'  name='eventBanner' id='eventBanner'   onChange={handleFileChange} className='form-control'></input>
                        <button type='button'  name='event' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-bold'>UPLOAD</button>
                    </div>
              </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>EVENT LOCATION:</label>
                    <textarea type='text' id='contactPerson' {...register('eventLocation')} className='form-control'></textarea>
                </div>
                <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
            </form>
        </div>
      </div>
    </div>
  )
}
