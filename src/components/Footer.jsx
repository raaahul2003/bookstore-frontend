import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRightLong, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
      <div className='grid grid-cols-1 gap-3 bg-slate-950 px-4 py-8 text-slate-200 sm:gap-6 sm:px-6 sm:py-10 md:grid-cols-3 md:gap-8 lg:gap-12 lg:px-10'>
        <div className='p-2 sm:p-3 md:p-5'>
          <h4 className='text-sm font-bold tracking-widest text-white sm:text-base'>ABOUT US</h4>
          <p className='mt-4 max-w-prose text-sm leading-7 text-slate-300 sm:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sint possimus iure vero recusandae autem amet eum quos, dolores aspernatur animi quis ipsam labore tempore praesentium deleniti. Natus, non architecto?</p>
        </div>
        <div className='p-2 sm:p-3 md:p-5'>
          <h4 className='text-sm font-bold tracking-widest text-white sm:text-base'>NEWSLETTER</h4>
          <p className='mt-4 text-sm leading-6 text-slate-300 sm:text-base'>stay updated with our latest trends</p>
            <div className='mt-4 flex w-full max-w-sm overflow-hidden rounded-lg ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-yellow-400'>
          <input type="email" placeholder='email id' className='min-w-0 flex-1 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-base' />
          <button className='shrink-0 bg-yellow-400 px-4 py-2 text-gray-950 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'><FontAwesomeIcon icon={faArrowRightLong} style={{ color: "rgb(0, 0, 0)", }} /></button>
          </div>

        </div>
        <div className='p-2 sm:p-3 md:p-5'>
          <h4 className='text-sm font-bold tracking-widest text-white sm:text-base'>FOLLOW US</h4>
          <p className='mt-4 text-sm text-slate-300 sm:text-base'>Let us be social</p>
          <div className='mt-5 flex flex-wrap gap-3'>
            <FontAwesomeIcon icon={faInstagram} className='rounded-full bg-white/10 p-2.5 text-2xl text-white transition hover:bg-white/20 sm:text-3xl'/>
            <FontAwesomeIcon icon={faTwitter} className='rounded-full bg-white/10 p-2.5 text-2xl text-white transition hover:bg-white/20 sm:text-3xl'/>
            <FontAwesomeIcon icon={faFacebook} className='rounded-full bg-white/10 p-2.5 text-2xl text-white transition hover:bg-white/20 sm:text-3xl'/>
            <FontAwesomeIcon icon={faLinkedinIn} className='rounded-full bg-white/10 p-2.5 text-2xl text-white transition hover:bg-white/20 sm:text-3xl'/>
          </div>
          <div className='mt-5 '>
          <Link to={'/'} className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-slate-200 sm:text-base'><FontAwesomeIcon icon={faBackward} /> BOOK STORE</Link>
          </div>
        </div>
      </div>
      <div className='bg-black px-4 py-4 text-center text-xs text-slate-300 sm:px-5 sm:py-5 sm:text-sm'>
        <p className='break-words leading-relaxed'>Copyright &copy;2025 All rights reserved | This website is made with  ❤  by Rahul Raj</p>
      </div>
    </>

  )
}

export default Footer
