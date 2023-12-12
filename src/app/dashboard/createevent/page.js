"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateEvent() {

    const router = useRouter();
    const schema = yup.object({
        eventTitle:yup.string().required('Event title can not be empty.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        eventCategory:yup.string().required('Please select category.'),
        discPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
        origPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
        contactPerson:yup.string().required('Contact person is required.').matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        contactNumber:yup.string().required('Contact number is required.').matches(/^\d+$/, 'Numbers only.').min(10).max(13),
    });  

    const form = useForm({
        defaultValues:{
            eventTitle:'', eventCategory:'', shortIntro:'', eventDesc:'', contactPerson:'', contactNumber:'', eventDate:'', eventTime:'', origPrice:'', discPrice:'', eventMode:'', eventLocation:''
        },
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = async (data) => {
        data.eventDesc = desc;
        data.eventMode = mode;
        await axios.post('http://localhost:3000/api/Events/AddEvent', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Event created successfully!");
        router.push('/dashboard/eventlist')
        }).catch( err=> console.log(err));
    };

    const [desc, setDesc] = useState('');
    const [mode, setMode] = useState('');
    const [cat, setCat] = useState([]);
    const [content, setContent] = useState('');

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

  return (
    <div>
      <div className='relative w-full flex flex-col p-3 shadow-lg mb-3'>
        <div className='w-full p-4'>            
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
                        initialValue={''}
                        init={{
                        menubar: false,
                        plugins: 'ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
                            <option value='' className='text-center'>--- Choose Category ---</option>
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
                        <select type='select' value={mode} className='form-select' onChange={handleMode}>
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
                        <input type='date' name='eventDate'id='eventDate' {...register('eventDate')} placeholder="with country code e.g. 91" className='form-control'></input>
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
                {/* <div className='form-group mb-3'>
                    <label className='mb-1'>EVENT IMAGE:</label>
                    <input type='file' className='form-control'></input>
                </div> */}
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
