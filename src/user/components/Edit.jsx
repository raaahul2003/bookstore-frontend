import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosinstance'
import { userUpdateAPI } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'



function Edit() {
    const [editStatus, seteditStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({ _id: "", username: "", password: "", cpassword: "", picture: "", bio: "" })
    const [existingPicture, setExistingPicture] = useState('')
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({ ...userDetails, _id: user._id, username: user.username, bio: user.bio })
            setExistingPicture(user.picture)
        }
    }, [])
    console.log(userDetails);
    console.log(existingPicture);

    const handleFileUpload = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile.type.startsWith("image/")) {
            setUserDetails({ ...userDetails, picture: e.target.files[0] })
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageFile(true)
        }
        else {
            setImageFile(false)
        }


    }

    const checkPasswordMatch = (data) => {
        setUserDetails({ ...userDetails, cpassword: data })
        userDetails.password == data ? setPasswordMatch(true) : setPasswordMatch(false)

    }

    const resetProfileForm = () => {

        const user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({ ...userDetails, _id: user._id, username: user.username, password: "", cpassword: "", picture: "", bio: user.bio })
        setExistingPicture(user.picture)

        setPreview("")
        setImageFile(false)
        setPasswordMatch(true)

    }

    const updateProfile = async () => {

        const { username,password,cpassword,bio } = userDetails
        if (!username, !bio) {
            toast.warning("fill all fields completely")
        } 
        else if (password&&cpassword) {
            if (passwordMatch) {
                const reqbody = new FormData

                for (let key in userDetails) {
                    if (key != "picture") {

                        reqbody.append(key, userDetails[key])

                    }else{
                        preview?reqbody.append(key,userDetails[key]):reqbody.append(key, existingPicture)
                    }

                }
                const result = await userUpdateAPI(userDetails._id, reqbody)
                console.log(result);
                if(result.status==200){
                    toast.success("Profile Updated Successfully")
                    seteditStatus(false)
                    navigate('/login')
                    sessionStorage.clear()
                }
            }
        }
        else{
            const reqbody = new FormData

                for (let key in userDetails) {
                    if (key != "picture") {

                        reqbody.append(key, userDetails[key])

                    }else{
                        preview?reqbody.append(key,userDetails[key]):reqbody.append(key, existingPicture)
                    }

                }
                const result = await userUpdateAPI(userDetails._id, reqbody)
                console.log(result);
                if(result.status==200){
                    toast.success("Profile Updated Successfully")
                    seteditStatus(false)
                    navigate('/login')
                    sessionStorage.clear()
                }
        }

    }

    return (

        <>

            <button className='rounded bg-blue-900 px-4 py-2 text-white' onClick={() => seteditStatus(true)}>Edit</button>


            {/* modal */}
            {
                editStatus &&
                <div className='relative z-10'>
                    <div className='fixed inset-0 overflow-y-auto bg-gray-500/75'>
                        <div className='flex min-h-dvh items-center justify-center p-3 sm:p-6'>
                            <div className='flex h-[min(500px,calc(100dvh-1.5rem))] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-xl sm:h-[min(500px,calc(100dvh-3rem))]'>

                                {/* modal header */}

                                <div className='flex shrink-0 items-center justify-between bg-black p-3 text-white'>
                                    <h3>Update Profile</h3>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => seteditStatus(false)} />

                                </div>
                                {/* modal body */}
                                <div className='min-h-0 flex-1 overflow-y-auto bg-sky-300 p-4 sm:p-5'>
                                    <div className='flex justify-center items-center'>

                                        <input type="file" className='hidden' id='userPic' onChange={e => handleFileUpload(e)} />
                                        <label htmlFor="userPic">

                                            {
                                                existingPicture == "" ?
                                                    <img className='h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36' src={preview ? preview : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" />
                                                    :
                                                    existingPicture.startsWith('https://lh3.googleusercontent.com') ?
                                                        <img className='h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36' src={preview ? preview : existingPicture} alt="" />
                                                        :
                                                        <img className='h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36' src={preview ? preview : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" />

                                            }

                                        </label>



                                    </div>
                                    {
                                        !imageFile &&
                                        <div className='text-red-400 text-center mt-3'>
                                            *only upload image files
                                        </div>}
                                    <div className='mt-5 flex flex-col gap-4'>

                                        <input value={userDetails.username} type="text" placeholder='Username' className='w-full rounded bg-white p-2' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />

                                        <input value={userDetails.password} type="password" placeholder='New Password' className='w-full rounded bg-white p-2' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                                        <input value={userDetails.cpassword} type="password" placeholder='Confirm Password' className='w-full rounded bg-white p-2' onChange={(e) => checkPasswordMatch(e.target.value)} />
                                        {
                                            !passwordMatch &&
                                            <div className='text-red-400 text-sm'>
                                                *password and confirm password must be same
                                            </div>
                                        }
                                        <textarea value={userDetails.bio} type="text" placeholder='Bio' className='w-full rounded bg-white p-2' onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} />
                                    </div>


                                </div>
                                <div className='flex shrink-0 justify-end gap-2 bg-white p-2 text-white'>
                                    <button className='rounded bg-gray-700 px-3 py-2 sm:px-4' onClick={resetProfileForm}>Reset</button>
                                    <button className='rounded bg-blue-700 px-3 py-2 sm:px-4' onClick={updateProfile}>Update</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }
            {/* toaser */}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>


    )
}

export default Edit