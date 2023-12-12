"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';


export default function UpdateProfile({params}) {

    const id = params.ProfileId;
    const router = useRouter();

    const schema = yup.object({
        profileName:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.').required('Profile name is required.'),
        proFession:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        eduCation:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.'),
        fatherName:yup.string().matches(/^[aA-zZ\s]/, 'Not in correct format.').required('Father name is required.'),
        dateofBirth:yup.string().required('DOB is must.')
    });

    const form = useForm({
        defaultValues: async () => {
          const response = await fetch ('http://localhost:3000/api/Profile/GetProfileById?Id=' + id);
          const data = await response.json()  
            return{
              profileName: data.profileName,
              fatherName: data.fatherName,
              dateofBirth: data.dateofBirth,
              shortIntro: data.shortIntro,
              proFession: data.proFession,
              eduCation: data.eduCation,
              aboutMe: data.aboutMe,
              userTypeId: data.userTypeId,
              addRess: data.addRess,
              addProof: data.addProof,
              idProof: data.idProof,
              ProfileImage: data.ProfileImage,
            }
        },
        resolver: yupResolver(schema)
      });

    const {register, handleSubmit, formState} = form
    const {errors} = formState;
    const [types, setTypes] = useState([]);
    const [data, setData] = useState('');

    //getting the list of userTypes...
    useEffect( function ()  {
      axios.get("http://localhost:3000/api/UserTypes/GetAllUserTypes").then((response)=>
           setTypes(response.data)).then((err)=>console.log(err));
     },[]);

     useEffect(() =>{
        axios.get('/api/Profile/GetProfileById?Id=' + id).then(res => setData(res.data)).catch(err =>console.log(err))
       },[id]);

    
    const onSubmit = async (data) => {
        data.aboutMe = desc;
        data.ProfileId = id;
        await axios.put('http://localhost:3000/api/Profile/UpdateProfile', data)
        .then((response) => {
        console.log('Form Submitted', response)
        alert("Profile updated successfully!");
        router.push('/dashboard/profilelist')
        }).catch( err=> console.log(err));
    };
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
       
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
        <form className='font-bold w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
		<div className='grid md:grid-cols-2 gap-6 w-full'>
            <div className='relative bg-light h-[335px] w-full mb-3 border border-solid'>
                <Image alt='profile' src={'/uploads/' + data.profileImage} priority layout='fill' objectFit='contain'/>  
            </div>
            <div className='w-full'>
                <div className='form-group mb-3'>
                    <label className='mb-1'>PROFILE NAME:</label>
                    <input type='text'name='profileName' {...register('profileName')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.profileName?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>FATHER NAME:</label>
                    <input type='text' name='fatherName' {...register('fatherName')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.fatherName?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>DATE OF BIRTH:</label>
                    <input type='date' name='dateofBirth' {...register('dateofBirth')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.dateofBirth?.message}</span>
                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>SHORT INTRO:</label>
                    <textarea type='text'  name='shortIntro' {...register('shortIntro')} className='form-control'></textarea>
                </div>
            </div>
      </div>
            <div className='form-group mb-3'>
                <label className='mb-1'>ABOUT ME:</label>
                <Editor
                        apiKey='f6vdi67pzdou3z6qb7ilstl75q6w2g864dnvtht05urju7zi'
                        initialValue={data.aboutMe}
                        init={{
                        menubar: false,
                        plugins: 'ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={desc}
                        name='aboutMe'
                        onEditorChange={(newContent, editor) => handleEditorChange(newContent, editor)}
                        onInit={(evt, editor) => setContent(editor.getContent({ format: "text" }))}
                    />
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
                <div className='form-group mb-3'>
                    <label className='mb-1'>PROFESSION:</label>
                    <input type='text' name='proFession' {...register('proFession')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.proFession?.message}</span>                </div>
                <div className='form-group mb-3'>
                    <label className='mb-1'>EDUCATION:</label>
                    <input type='text' name='eduCation' {...register('eduCation')} className='form-control'></input>
                    <span className='text-red-500 italic text-sm font-normal'>{errors.eduCation?.message}</span>                </div> 
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='form-group mb-3'>
                    <label htmlFor='addProof' className='mb-1'>ADDRESS PROOF:</label>
                    <div className='flex'>
                        <input type='file'  name='addProof'   onChange={handleFileChange} className='form-control'></input>
                        <button type='button'  name='address' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-    bold'>UPLOAD</button>
                    </div>
                </div>
                <div className='form-group mb-3'>
                      <label htmlFor='ebookPdf' className='mb-1'>ID PROOF:</label>
                      <div className='flex'>
                          <input type='file'  name='idProof'  onChange={handleFileChange} className='form-control'></input>
                          <button type='button'  name='id' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-bold'>UPLOAD</button>
                      </div>
                </div> 
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
                <div className='form-group mb-3'>
                  <label htmlFor='addProof' className='mb-1'>PROFILE ROLE:</label>
                  <select type='select' className='form-select' {...register('userTypeId')} name='userTypeId'>
                      <option value='' className='text-center'>--- Choose Role ---</option>
                        {
                            types.map((u) => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={u.userTypeId} key={u.userTypeId} >{u.userType}</option>
                            ))
                        }
                  </select>
                </div>
                <div className='form-group mb-3'>
                      <label htmlFor='ebookPdf' className='mb-1'>PROFILE IMAGE:</label>
                      <div className='flex'>
                          <input type='file'  name='profileImage'  onChange={handleFileChange} className='form-control'></input>
                          <button type='button'  name='user' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-bold'>UPLOAD</button>
                      </div>
                </div> 
            </div>
            <div className='form-group mb-3'>
                <label className='mb-1'>ADDRESS:</label>
                <textarea  name='addRess' {...register('addRess')} className='form-control rows-6'></textarea>
            </div>
            <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
        </form>
        </div>
      </div>
    </div>
  )
}