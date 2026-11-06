import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye } from '@fortawesome/free-regular-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getSingleBookAPI, paymentAPI } from '../../services/allApi'
import axiosInstance from '../../api/axiosinstance'



function ViewBook() {

  const [modalStatus, setModalStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState()

  const { id } = useParams()

  useEffect(() => {
    getBook()

  }, [])


  const getBook = async () => {
    const res = await getSingleBookAPI(id)
    console.log(res);
    if (res.status == 200) {
      setBookDetails(res.data)
    }

  }

  const makePayment = async () => {

    const res = await paymentAPI(id)
    console.log(res);
    if(res.status == 200){
      const {checkoutURL} = res.data
      window.location.href = checkoutURL
    }
    
    
  }

  

  return (
    <>
      <UserHeader />
      <section className='mx-auto my-6 flex max-w-6xl min-w-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-xl sm:my-10 md:flex-row'>
        <div className='min-w-0 bg-slate-50 p-5 sm:p-8 md:w-2/5'>
          <img src={bookDetails?.imageUrl} alt="" className='mx-auto max-h-[32rem] w-full max-w-md rounded-xl object-contain' />
        </div>
        <div className='min-w-0 p-5 sm:p-8 md:flex-1'>
          <div className='flex min-w-0 items-start justify-between gap-3'>
            <h2 className='min-w-0 break-words font-display text-3xl font-bold text-slate-950'>{bookDetails?.title}</h2>

            <FontAwesomeIcon onClick={() => setModalStatus(true)} icon={faEye} className='mt-1 shrink-0 cursor-pointer rounded-lg bg-indigo-50 p-2 text-indigo-700 transition hover:bg-indigo-100' />

          </div>
          <h3 className='mt-4 break-words font-semibold text-indigo-700'>By {bookDetails?.author}</h3>

          <div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>Publisher: {bookDetails?.publisher}</h3>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>Language: {bookDetails?.language}</h3>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>Pages: {bookDetails?.pages}</h3>
          </div>

          <div className='mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>Category: {bookDetails?.category}</h3>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>Price: ₹{bookDetails?.price}</h3>
            <h3 className='rounded-lg bg-slate-50 p-3 break-words text-sm font-semibold text-slate-700'>ISBN: {bookDetails?.isbn}</h3>
          </div>

          <p className='mt-5 break-words text-justify leading-relaxed'>
            {bookDetails?.abstract}
          </p>

          <div className='mt-5 flex flex-wrap justify-end gap-2'>
            <Link to={'/all-books'} className='flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100'><FontAwesomeIcon icon={faBackward} />Back</Link>
            <button className='rounded-lg bg-indigo-700 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700' onClick={makePayment}>Buy Now
              <br />
              @ ${bookDetails?.discountPrice}
            </button>
          </div>
        </div>

      </section>

      {/* modal */}
      {
        modalStatus &&
        <div className='relative z-10'>
          <div className='bg-gray-500/75 inset-0 fixed'>
            <div className='flex min-h-screen items-center justify-center p-3 sm:p-6'>
              <div className='flex h-[min(500px,calc(100dvh-1.5rem))] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl sm:h-[min(500px,calc(100dvh-3rem))]'>

                {/* modal header */}

                <div className='flex shrink-0 items-center justify-between bg-slate-950 p-4 text-white'>
                  <h3>Book Images</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} className='cursor-pointer' />

                </div>
                {/* modal body */}
                <div className='min-h-0 flex-1 overflow-y-auto bg-white p-3'>
                  <p className='break-words text-blue-700'><FontAwesomeIcon icon={faCamera} />Camera click of the book in the hand of seller</p>

                  <div className='m-2 flex flex-col flex-wrap items-center justify-center gap-3 sm:m-5 sm:flex-row sm:gap-5' >
                    {
                      bookDetails?.uploadImages?.map(book => (
                        <img src={`${axiosInstance.defaults.baseURL}/uploads/${book}`} alt="" height={'300px'} width={'250px'} className='h-auto max-h-72 w-full max-w-[250px] rounded object-contain' />

                      ))
                    }
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      }
    </>
  )
}

export default ViewBook
