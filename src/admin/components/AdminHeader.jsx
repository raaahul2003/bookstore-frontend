import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../../context/RouterGuard'

function AdminHeader() {
  const navigate = useNavigate()

  const { setAuthorizedUser } = useContext(routerContext)


  const logout = () => {
    sessionStorage.clear()
    setAuthorizedUser(false)

    navigate('/login')
  }
  return (
    <>
      <header className='border-b border-slate-200 bg-white shadow-sm'>
      <div className='mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6'>
        <div className='flex min-w-0 items-center'>
          <img className='h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12' src="https://bookstore-wine-nu.vercel.app/logo.png" alt="" />
          <h1 className='ms-2 truncate font-display text-xl font-bold tracking-tight text-slate-950 sm:ms-3 sm:text-2xl md:text-3xl'>BOOKSTORE</h1>
        </div>

        <div className='shrink-0'>
          <button onClick={logout} className='rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:px-4'> <FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
        </div>
      </div>
      <nav className='w-full bg-slate-950 px-2 py-3 text-sm text-slate-200 sm:px-3 sm:text-base'>
        <marquee behavior="" direction="">
          Welcome,  Admin! You're all set to manage and monitor the system. Let’s get to work!
        </marquee>
      </nav>
      </header>
    </>
  )
}

export default AdminHeader
