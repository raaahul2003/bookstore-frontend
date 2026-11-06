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
      <div className='flex h-auto flex-col items-center justify-center border-b border-sky-200 bg-gradient-to-br from-sky-100 via-sky-200 to-cyan-100 px-3 py-5 shadow-sm sm:px-5 sm:py-7 md:h-full md:border-b-0 md:border-r md:px-4 md:py-8'>

        <img className='h-20 w-20 rounded-full border-4 border-white object-cover shadow-md sm:h-28 sm:w-28 lg:h-32 lg:w-32' src={dp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : dp?.startsWith('https://lh3.googleusercontent.com') ? dp : `${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" />

        <h1 className='mt-3 max-w-full break-words text-center text-lg font-bold text-slate-800 sm:mt-4 sm:text-xl'>{ username }</h1>

        <div className='mt-3 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3 md:flex-col md:items-stretch'>
          <Link to={'/admin-dashboard'} className='rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white/70 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-4 sm:text-base md:my-0 md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faHouse} style={{ color: "rgb(0, 0, 0)", }} />Home</Link>
          <Link to={'/admin-resource'} className='rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white/70 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-4 sm:text-base md:my-0 md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faBook} style={{ color: "rgb(0, 0, 0)", }} />All Books</Link>
          <Link to={'/admin-settings'} className='rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white/70 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-4 sm:text-base md:my-0 md:text-lg'><FontAwesomeIcon className='mr-2 w-5' icon={faGear} style={{ color: "rgb(0, 0, 0)", }} />Settings</Link>
        </div>

      </div>
    </>
  )
}

export default Sidebar