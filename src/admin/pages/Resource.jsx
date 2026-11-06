import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { allUsersAPI, approveAPI, booksAPI } from '../../services/allApi'
import { useEffect } from 'react'
import axiosInstance from '../../api/axiosinstance'

function Resource() {
  const [booklistStatus, setbooklistStatus] = useState(true)
  const [userlistStatus, setuserlistStatus] = useState(false)
  const [books, setBooks] = useState()
  const [users, setUsers] = useState()

  const allBooks = async () => {
    const res = await booksAPI()
    console.log(res);
    setBooks(res.data)
  }

  const allUsers = async () => {
    const res = await allUsersAPI()
    console.log(res);
    setUsers(res.data)
  }

  useEffect(() => {
    if (booklistStatus) {
      allBooks()

    }
    else {
      allUsers()

    }
  }, [booklistStatus,userlistStatus])


  const approveBooks = async (id) => {

    const res = await approveAPI(id)
    console.log(res);
    if (res.status == 200) {
      allBooks()

    }
  }


  return (
    <>
      <AdminHeader />

      <div className='min-h-screen bg-slate-50 md:grid md:grid-cols-5'>
        <div className='md:col-span-1'>
          <Sidebar />

        </div>
        <div className='min-w-0 px-3 py-5 sm:px-6 md:col-span-4 lg:px-8'>

          <h1 className='my-5 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:my-7 sm:text-3xl'>All Resources</h1>

          {/* tabs */}
          <div className='mx-auto mb-6 flex w-fit max-w-full items-center justify-center gap-1 rounded-xl bg-slate-200 p-1 sm:mb-8 sm:gap-2'>
            <p onClick={() => {
              setbooklistStatus(true);
              setuserlistStatus(false);
            }} className={booklistStatus ? 'cursor-pointer rounded-lg border border-white bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm sm:px-6 sm:text-base' : 'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-900 sm:px-6 sm:text-base'}>Book List</p>
            <p onClick={() => {
              setbooklistStatus(false);
              setuserlistStatus(true);
            }} className={userlistStatus ? 'cursor-pointer rounded-lg border border-white bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm sm:px-6 sm:text-base' : 'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-900 sm:px-6 sm:text-base'}>User List</p>
          </div>
          {/* contents */}
          {
            booklistStatus &&
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {/* card */}
              {books?.map(book => (
                <div className='min-w-0 p-1'>
                  <div className='flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4'>
                    <Link className='w-full overflow-hidden rounded-xl bg-slate-100' to={`/view/${book?._id}/book`}>
                      <img className='aspect-[3/4] w-full object-contain transition duration-300 hover:scale-105' src={book?.imageUrl} alt="" />
                    </Link>
                    <h3 className='mt-3 w-full break-words text-base font-bold text-slate-900 sm:text-lg'>{book?.title}</h3>
                    <h3 className='mt-1 w-full break-words text-sm text-slate-600 sm:text-base'>{book?.author}</h3>
                    <h3 className='mt-2 text-lg font-bold text-blue-900'>${book?.price}</h3>
                    {
                      book?.status === 'approved' ? (
                        <span className='mt-auto w-full rounded-lg bg-green-100 px-3 py-2 font-semibold text-green-800'>
                          Approved
                        </span>
                      ) : (
                        <button
                          className='mt-3 w-full rounded-lg bg-blue-700 p-2.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                          onClick={() => approveBooks(book?._id)}
                        >
                          Approve
                        </button>
                      )}
                  </div>
                </div>
              ))
              }
            </div>
          }
          {
            userlistStatus &&
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3'>
              {
                users?.length > 0 ?
                  users?.map(user => (
                    <div className='min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5'>
                      <h4 className='break-all text-xs font-medium text-slate-500 sm:text-sm'>ID: {user?._id}</h4>
                      <div className='mt-4 flex min-w-0 flex-col items-center gap-3 sm:flex-row sm:justify-start'>

                        <img className='h-20 w-20 shrink-0 rounded-full border-2 border-slate-100 object-cover sm:h-24 sm:w-24' src={user.picture == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : user.picture?.startsWith('https://lh3.googleusercontent.com') ? user.picture : `${axiosInstance.defaults.baseURL}/uploads/${user.picture}`} alt="" height={'100px'} width={'100px'} style={{ borderRadius: '50%' }} />

                        <div className='min-w-0 break-words text-center sm:text-left'>
                          <h2 className='font-bold text-slate-900'>{user.username}</h2>
                          <h3 className='mt-1 break-all text-sm text-slate-600 sm:text-base'>{user.email}</h3>
                        </div>
                      </div>
                    </div>
                  ))
                  :
                  <div className='col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center'>
                    <p className='font-medium text-slate-500'>No users Found</p>
                  </div>
              }
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Resource