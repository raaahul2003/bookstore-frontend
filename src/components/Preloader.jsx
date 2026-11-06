import React from 'react'

function Preloader() {
  return (
    <div className='flex min-h-screen bg-black w-full items-center justify-center p-3 sm:p-5'>
      <img src="https://cdn.dribbble.com/userupload/21561219/file/original-9696644fdca9d8f5a1f4f35410d62bf8.gif" alt="" className='h-auto max-h-[80vh] w-full max-w-4xl object-contain'/>
    </div>
  )
}

export default Preloader
