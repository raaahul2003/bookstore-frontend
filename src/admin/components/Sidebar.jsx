import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBook, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {

  const [username, setUsername] = useState("")
  const [dp, setDp] = useState("")

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user.picture)
      setUsername(user.username)
    }
  }, [])
  return (
    <>
      <div className='flex h-auto flex-col items-center justify-center border-b border-indigo-100 bg-gradient-to-b from-indigo-50 via-white to-amber-50 px-3 py-6 shadow-sm sm:px-5 sm:py-8 md:h-full md:border-b-0 md:border-r md:px-4'>

        <img className='h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg ring-2 ring-indigo-200 sm:h-28 sm:w-28 lg:h-32 lg:w-32' src={dp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : dp?.startsWith('https://lh3.googleusercontent.com') ? dp : `${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" />

        <h1 className='mt-3 max-w-full break-words text-center text-lg font-bold text-slate-800 sm:mt-4 sm:text-xl'>{ username }</h1>

        <div className='mt-3 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3 md:flex-col md:items-stretch'>
          <Link to={'/admin-dashboard'} className='rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:text-base md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faHouse} />Home</Link>
          <Link to={'/admin-resource'} className='rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:text-base md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faBook} />All Books</Link>
          <Link to={'/admin-settings'} className='rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:text-base md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faGear} />Settings</Link>
        </div>

      </div>
    </>
  )
}

export default Sidebar
