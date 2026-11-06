import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { useEffectEvent } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
import { routerContext } from '../../context/RouterGuard'

function UserHeader() {
  const [listStatus, setListStatus] = useState(false)
  const [token, setToken] = useState('')
  const [userDp, setuserDp] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const [userId, setUserId] = useState('')

  const {setAuthorizedUser} = useContext(routerContext)

  useEffect(() => {

    if (sessionStorage.getItem("user") && sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem('token')
      const user = JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setuserDp(user.picture)
      setUserId(user._id)
    }
  }, [token])

 

  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    setToken("")
    setuserDp("")
    setUserId("")
    setAuthorizedUser(false)
    navigate('/login')

  }

  return (
    <>
      <header className='border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'>
      <div className='mx-auto grid max-w-7xl grid-cols-2 items-center gap-2 px-4 py-3 sm:px-6 md:grid-cols-3'>
        <div className='flex min-w-0 items-center'>
          <img className='h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12' src="https://bookstore-wine-nu.vercel.app/logo.png" alt="" />
          <h1 className='ms-2 truncate font-display text-xl font-bold tracking-tight text-slate-950 sm:ms-3 sm:text-2xl md:hidden'>BOOKSTORE</h1>
        </div>
        <div className='md:flex items-center justify-center hidden'>
          <h1 className='font-display text-3xl font-bold tracking-tight text-slate-950'>BOOKSTORE</h1>
        </div>
        <div className='hidden items-center justify-end gap-3 lg:gap-5 md:flex'>
          <FontAwesomeIcon icon={faInstagram} className='text-lg text-slate-500 transition hover:text-indigo-700 lg:text-xl' />
          <FontAwesomeIcon icon={faTwitter} className='text-lg text-slate-500 transition hover:text-indigo-700 lg:text-xl' />
          <FontAwesomeIcon icon={faFacebook} className='text-lg text-slate-500 transition hover:text-indigo-700 lg:text-xl' />
          {!token ?
            <Link to={'/login'} className='rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded-full p-1 ring-offset-2 transition hover:ring-2 hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700'>
                <img className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl'>

                  <Link to={'/profile/userId'} className='block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100'>Profile</Link>
                  <button className='block w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-red-50 hover:text-red-600' onClick={logout}>Logout</button>

                </div>
              }
            </div>
          }
        </div>
      </div>
      <nav className='bg-slate-950 px-4 py-2 text-sm font-semibold text-white sm:px-6 sm:py-3 md:flex md:items-center md:justify-center'>

        <div className='flex w-full items-center justify-between md:hidden'>
          <button className='rounded-lg p-2 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300' onClick={() => setListStatus(!listStatus)}>
            <FontAwesomeIcon icon={faBars} className='text-2xl' />
          </button>
          {!token ?
            <Link to={'/login'} className='rounded-lg bg-amber-400 px-3 py-2 text-slate-950 shadow-sm'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded-full p-1 focus-visible:outline-2 focus-visible:outline-amber-300'>
                <img className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-xl'>

                  <Link to={'/profile/userId'} className='ms-1 text-black'>Profile</Link>
                  <button type='button' className='p-2 block text-black hover:text-red-500' onClick={logout}>Logout</button>

                </div>
              }
            </div>
          }
        </div>

        <div className={listStatus ? 'my-2 mt-2 flex flex-col gap-3 sm:gap-5 md:my-0 md:mt-0 md:flex-row md:gap-0' : 'hidden md:flex'}>
          <Link to={'/'} className='rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300'>Home</Link>
          <Link to={'/all-books'} className='rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300'>Books</Link>
          <Link to={'/contact'} className='rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300'>Contact</Link>
        </div>
      </nav>
      </header>
    </>
  )
}

export default UserHeader
