"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

export default function UpdateEbook({params}) {

  const router = useRouter();
  const schema = yup.object({
      ebookTitle:yup.string().required('Ebook title is required.'),
      ebookCategory:yup.string().required('Please select category.'),
      discPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
      origPrice:yup.number().typeError('Must be a number.').min(1, 'Invalid value.'),
  });

  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState({});

  const [cat, setCat] = useState([]);
  const id = params.EbookId;

  const form = useForm({
    defaultValues: async () => {
      const response = await fetch ('http://localhost:3000/api/Ebooks/GetEbookById?Id=' + id);
      const data = await response.json()
        return{
          ebookTitle: data.ebookTitle,
          shortIntro: data.shortIntro,
          ebookDescription: data.ebookDescription,
          ebookCategory: data.ebookCategory,
          authorName: data.authorName,
          origPrice: data.origPrice,
          discPrice: data.discPrice
        }
    },
    resolver: yupResolver(schema)
  });

  useEffect(() =>{
    axios.get('/api/Ebooks/GetEbookById?Id=' + id).then(res => setData(res.data)).catch(err =>console.log(err))
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

  const {register, handleSubmit, formState} = form
  const {errors} = formState;

  const onSubmit = async (data) => {
      console.log(data);
      console.log(desc);
      data.ebookDescription = desc;
      data.EbookId = id;
      await axios.put('/api/Ebooks/UpdateEbook', data)
      .then(res =>{
        console.log(res);         
        alert("Ebook updated successfully !");
        router.push('/dashboard/ebooklist');
      }).catch( err=> console.log(err));
    }

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
            <Image  alt={data.ebookTitle} src={'/uploads/'+ data.ebookImage} priority width={1180} height={250} />
         </div>       
        <form className='font-bold' onSubmit={handleSubmit(onSubmit)} >
          <div className='form-group mb-3'>
              <label htmlFor='ebookTitle' className='mb-1'>EBOOK TITLE:</label>
              <input type='text' id='ebookTitle' name='ebookTitle'{...register('ebookTitle')}  className='form-control'></input>
              <span className='text-red-500 italic text-sm font-normal'>{errors.ebookTitle?.message}</span>
          </div>
          <div className='form-group mb-3'>
              <label htmlFor='shortIntro' className='mb-1'>SHORT INTRO:</label>
              <input type='textarea' id='shortIntro' name='shortIntro' {...register('shortIntro')} className='form-control'></input>
          </div>
          <div className='form-group mb-3'>
              <label htmlFor='ebookDescription' className='mb-1'>EBOOK DESCRIPTION:</label>
              <Editor
                apiKey='f6vdi67pzdou3z6qb7ilstl75q6w2g864dnvtht05urju7zi'
                initialValue={data.ebookDescription}
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
                  <select type ='select' id='ebookCategory'  name='ebookCategory' {...register('ebookCategory')} className='form-select'>
                      <option className='text-center'>--- Choose Category ---</option>
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
                  <input type='text' id='authorName' name='authorName' {...register('authorName')} className='form-control'></input>
              </div> 
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
              <div className='form-group mb-3'>
                  <label htmlFor='origPrice' className='mb-1'>ORIGINAL PRICE:</label>
                  <input type='text' id='origPrice' name='origPrice' {...register('origPrice')}  className='form-control'></input>
                  <span className='text-red-500 italic text-sm font-normal'>{errors.origPrice?.message}</span>
              </div>
              <div className='form-group mb-3'>
                  <label htmlFor='discPrice' className='mb-1'>DISCOUNTED PRICE:</label>
                  <input type='text' id='discPrice' name='discPrice' {...register('discPrice')} className='form-control'></input>
                  <span className='text-red-500 italic text-sm font-normal'>{errors.discPrice?.message}</span>
              </div>
              <div className='form-group mb-3'>
                  <label htmlFor='ebookImage' className='mb-1'>EBOOK IMAGE:</label>
                  <div className='flex'>
                      <input type='file'  name='ebookImage' id='ebookImage'  onChange={handleFileChange} className='form-control'></input>
                      <button type='button'  name='ebook' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-	bold'>UPLOAD</button>
                  </div>
              </div>
              <div className='form-group mb-3'>
                    <label htmlFor='ebookPdf' className='mb-1'>EBOOK PDF:</label>
                    <div className='flex'>
                        <input type='file'  name='ebookPdf' id='ebookPdf'   onChange={handleFileChange} className='form-control'></input>
                        <button type='button'  name='ebookPdf' onClick={handleUpload} className='py-2 px-3 hover:bg-gray-300 bg-gray-400 text-white font-bold'>UPLOAD</button>
                    </div>
              </div>
          </div>
          <div>
              <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>SAVE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)
}



