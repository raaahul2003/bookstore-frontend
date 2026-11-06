import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import { adminUpdateAPI } from '../../services/allApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function Settings() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({ _id: "", username: "", password: "", cpassword: "" })


  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, _id: user._id, username: user.username })

    }
  }, [])
  console.log(userDetails);

  const checkPasswordMatch = (data) => {
    setUserDetails({ ...userDetails, cpassword: data })

  }

  const resetProfileForm = () => {

    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({ ...userDetails, _id: user._id, username: user.username, password: "", cpassword: "" })

  }

  const updateProfile = async () => {

    const { username, password, cpassword } = userDetails
    if (!username) {
      toast.warning("fill all fields completely")
    }
    else if (Boolean(password) !== Boolean(cpassword)) {
      toast.warning("Enter and confirm your new password")
    }
    else if (password && password !== cpassword) {
      toast.warning("Passwords do not match")
    }
    else {
      const reqbody = { username, password }

      const result = await adminUpdateAPI(userDetails._id, reqbody)
      console.log(result);
      if (result?.status === 200) {
        toast.success("Profile Updated Successfully")
        navigate('/login')
        sessionStorage.clear()
      } else {
        const errorMessage = result?.response?.data
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Failed to update profile. Please try again.")
      }
    }

  }

  return (

    <>
      <AdminHeader />
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      <div className='min-h-screen bg-slate-50 md:grid md:grid-cols-5'>
        <div className='md:col-span-1'>
          <Sidebar />

        </div>
        <div className='min-w-0 md:col-span-4'>
          <div className='p-4 sm:p-6 lg:p-8'><p className='text-sm font-bold uppercase tracking-[0.2em] text-indigo-700'>Account</p>
          <h1 className='mb-6 mt-1 font-display text-3xl font-bold text-slate-950'>Settings</h1>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <p className='break-words text-justify leading-7 text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque non labore quam aspernatur veniam quasi, laudantium dolor rem ab recusandae, amet doloribus expedita temporibus distinctio qui fugiat! Consectetur, temporibus veritatis.
                Modi eius veritatis architecto ea iure repellat ab eos enim suscipit placeat fugiat dolor aut, voluptas exercitationem vitae necessitatibus? Cum nesciunt magni voluptas optio eaque esse adipisci eligendi quibusdam delectus?
              </p>
              <p className='mt-4 break-words text-justify leading-7 text-slate-600'>
                Molestias accusantium adipisci fuga voluptatem aspernatur! Totam accusantium similique illo ipsa architecto, debitis qui ab natus distinctio nobis quod veniam at, neque, vitae impedit illum repellendus odit explicabo id ducimus!
                Atque corporis nulla perferendis modi possimus laboriosam nobis autem eos. Natus possimus quibusdam nisi eaque doloremque. Eius magnam exercitationem consequuntur ipsam obcaecati, dolores, non adipisci molestias tenetur minus aut veniam!</p>
            </div>
            <div className='rounded-2xl bg-slate-950 p-4 shadow-xl sm:p-7'>
              <div className='flex w-full flex-col items-center justify-center'>
                <img className='h-20 w-20 rounded-full border-4 border-amber-300 object-cover sm:h-24 sm:w-24' src="https://bookstore-serverfeb26.onrender.com/uploads/image-1779697250528-dp.png" alt="" height={'100px'} width={'100px'} style={{ borderRadius: '50%' }} />

                <div className='mt-5 flex w-full flex-col items-center justify-center gap-4 sm:gap-5'>
                  <input type="text" placeholder='User Name' className='w-full rounded-lg bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300' value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}/>
                  <input type="password" placeholder='New Password' name="" id="" className='w-full rounded-lg bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}/>
                  <input type="password" placeholder='Confirm Password' name="" id="" className='w-full rounded-lg bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300' value={userDetails.cpassword} onChange={(e) => checkPasswordMatch(e.target.value)}/>
                </div>

                <div className='mt-4 flex w-full items-center justify-center gap-3'>
                  <button className='w-full rounded-lg border border-slate-500 p-3 font-bold text-white transition hover:bg-white/10' onClick={resetProfileForm}>Reset</button>
                  <button className='w-full rounded-lg bg-amber-400 p-3 font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300' onClick={updateProfile}>Update</button>

                </div>

              </div>
            </div>

          </div>


        </div></div>
      </div>
    </>
  )
}

export default Settings
