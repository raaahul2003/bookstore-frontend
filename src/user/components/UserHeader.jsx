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
      <div className='grid grid-cols-2 items-center gap-2 p-2 sm:p-3 md:grid-cols-3'>
        <div className='flex min-w-0 items-center'>
          <img className='h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12' src="https://bookstore-wine-nu.vercel.app/logo.png" alt="" />
          <h1 className='ms-2 truncate text-lg font-bold sm:ms-3 sm:text-2xl md:hidden'>BOOKSTORE</h1>
        </div>
        <div className='md:flex items-center justify-center hidden'>
          <h1 className='text-2xl font-bold lg:text-3xl'>BOOKSTORE</h1>
        </div>
        <div className='hidden items-center justify-end gap-3 lg:gap-5 md:flex'>
          <FontAwesomeIcon icon={faInstagram} className='text-xl lg:text-2xl' />
          <FontAwesomeIcon icon={faTwitter} className='text-xl lg:text-2xl' />
          <FontAwesomeIcon icon={faFacebook} className='text-xl lg:text-2xl' />
          {!token ?
            <Link to={'/login'} className='border border-black rounded py-2 px-3'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded p-1'>
                <img className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 w-40 rounded bg-white p-2 text-black ring ring-black/40'>

                  <Link to={'/profile/userId'} className='ms-1'>Profile</Link>
                  <button className='p-2 block hover:text-red-500' onClick={logout}>Logout</button>

                </div>
              }
            </div>
          }
        </div>
      </div>
      <nav className='bg-black p-2 font-bold text-white sm:p-3 md:flex md:items-center md:justify-center'>

        <div className='flex w-full items-center justify-between md:hidden'>
          <button className='p-2' onClick={() => setListStatus(!listStatus)}>
            <FontAwesomeIcon icon={faBars} className='text-2xl' />
          </button>
          {!token ?
            <Link to={'/login'} className='border border-black rounded py-2 px-3'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded p-1'>
                <img className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 w-40 rounded bg-white p-2 ring ring-black/40'>

                  <Link to={'/profile/userId'} className='ms-1 text-black'>Profile</Link>
                  <button type='button' className='p-2 block text-black hover:text-red-500' onClick={logout}>Logout</button>

                </div>
              }
            </div>
          }
        </div>

        <div className={listStatus ? 'my-2 mt-2 flex flex-col gap-3 sm:gap-5 md:my-0 md:mt-0 md:flex-row md:gap-0' : 'hidden md:flex'}>
          <Link to={'/'} className='mx-2 py-1 sm:mx-4'>Home</Link>
          <Link to={'/all-books'} className='mx-2 py-1 sm:mx-4'>Books</Link>
          <Link to={'/contact'} className='mx-2 py-1 sm:mx-4'>Contact</Link>
        </div>
      </nav>
    </>
  )
}

export default UserHeader
