import React from 'react';

export default function EnquiryMsg() {
  return (
    <div>
      <div className='relative w-full flex p-5 shadow-lg mb-2'>
        <form className='w-full font-bold'>
            <div className='form-group mb-2'>
                <label>NAME:</label>
                <input type='text' className='form-control'></input>
            </div>
            <div className='form-group mb-2'>
                <label>EMAIL:</label>
                <input type='text' className='form-control'></input>
            </div>
            <div className='form-group mb-2'>
                <label>SUB:</label>
                <input type='text' className='form-control'></input>
            </div>
            <div className='form-group mb-2'>
                <label>MESSAGE:</label>
                <textarea type='text' className='form-control' rows='9'></textarea>
            </div>
            <button type='submit' className='py-2 px-3 hover:bg-amber-500 bg-amber-600 text-white font-bold'>REPLY</button>
        </form>
      </div>
    </div>
  )
}
