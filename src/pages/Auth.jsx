import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routerContext } from '../context/RouterGuard'


function Auth({ register }) {
    const {setAuthorizedUser , setRole} = useContext(routerContext)
    const navigate = useNavigate()
    const [togglePasswordType, setTogglePasswordType] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: 'username',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3, "Must be atleast three characters").required("Required"),
            email: Yup.string().email("Inavalid email").required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (register) {
                handleRegister(values)
            }
            else {
                console.log("login api")
                handleLogin(values)

            }
            resetForm()

        }
    })

    const handleRegister = async (userData) => {

        //import API call
        const result = await registerAPI(userData)
        // console.log(result);

        if (result.status == 200) {

            toast.success("Registration sucessfull.. Please Login")

        } else if (result.status == 400) {

            toast.error(result.response)

        }
        navigate('/login')
    }

    const handleLogin = async (userData) => {

        const result = await loginAPI(userData)
        console.log(result);
        if (result.status == 200) {
            toast.success("Login Sucessfull")
            sessionStorage.setItem("user", JSON.stringify(result.data.user))
            sessionStorage.setItem("token", result.data.token)
            setAuthorizedUser(true)
            if (result.data.user.role == "admin") {
                navigate('/admin-dashboard')
                setRole('admin')

            } else {
                navigate('/')
                setRole('user')

            }
        } else {
            toast.error(result.response)
        }

    }

    const handleGoogleLogin = async(credentialResponse)=>{
        console.log("inside google login");

        const {name,email,picture} = jwtDecode(credentialResponse.credential)
        console.log(name,email,picture);
        
        const res = await googleLoginAPI({username:name,email,password:"googlepassword",picture})
        console.log(res);
        if(res.status === 200){
            toast.success('Login Sucessful')
            sessionStorage.setItem("user",JSON.stringify(res.data.user))
            sessionStorage.setItem("token",res.data.token)
            setAuthorizedUser(true)
            setTimeout(() => {
                setRole('user')
                navigate('/')
            }, 2500);
        }

        

        
        
    }


    return (
        <section id='signup' className='flex min-h-screen w-full flex-col items-center justify-center bg-[url(/auth.jpg)] bg-cover bg-center'>
            <div className='flex w-full flex-col items-center justify-center px-3 py-6 sm:px-6 sm:py-10'>
                <div className='flex w-full max-w-lg flex-col items-center justify-center rounded-3xl bg-gray-950/50 p-4 text-white sm:p-6 md:max-w-2xl md:p-8' >
                    <h1 className='p-3 text-2xl font-bold text-white sm:p-4 sm:text-4xl'>BOOK STORE</h1>

                    <FontAwesomeIcon icon={faUser} style={{ borderRadius: '50%' }} className='rounded border p-4 text-5xl text-white sm:p-5 sm:text-6xl' />
                    <form action="" onSubmit={formik.handleSubmit} className='w-full'>
                        {register ?
                            <h3 className='text-white mt-3 text-xl text-center'>Register</h3> :
                            <h3 className='text-white mt-3 text-xl text-center'>Login</h3>
                        }
                        {register &&
                            <div className='mt-5 w-full'>
                                <input onChange={formik.handleChange}
                                    name='username'
                                    value={formik.values.username}
                                    type="text"
                                    className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='User Name' />
                                <div className='text-yellow-400 mt-3'>{formik.errors.username}</div>

                            </div>
                        }
                        <div className='mt-5 w-full'>
                            <input onChange={formik.handleChange}
                                name='email'
                                value={formik.values.email}
                                type="text"
                                className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Email Id' />
                            <div className='text-yellow-400 mt-3'>{formik.errors.email}</div>

                        </div>
                        <div className='mt-5 w-full flex items-center'>
                            <input onChange={formik.handleChange}
                                value={formik.values.password}
                                name="password"
                                type={togglePasswordType ? 'text' : 'password'}
                                className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Password' />


                            {
                                togglePasswordType ?
                                    <FontAwesomeIcon
                                        onClick={() => setTogglePasswordType(false)}
                                        icon={faEyeSlash}
                                        className="text-black"
                                        style={{
                                            marginLeft: "-30px"
                                        }}
                                    />
                                    :
                                    <FontAwesomeIcon
                                        onClick={() => setTogglePasswordType(true)}
                                        icon={faEye}
                                        className="text-black"
                                        style={{
                                            marginLeft: "-30px"

                                        }}
                                    />}
                        </div>
                        <p className='text-yellow-500 mt-2'>*Never share password with others</p>
                        {register ?
                            <button type='submit' className='bg-green-900 text-white p-2 w-full mt-2 rounded'>Signup</button>

                            :
                            <button type='submit' className='bg-green-900 text-white p-2 w-full mt-2 rounded'>Login</button>

                        }
                        {
                            !register &&
                            <div className='my-5 text-center w-full'>
                                <div className='flex items-center justify-center rounded'>
                                    <GoogleLogin 
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                            handleGoogleLogin(credentialResponse)
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        {register ?
                            <p className='text-white mt-2 text-center'>Are you already user? <Link className='text-blue-700 underline' to={'/login'}>Login</Link></p>
                            :
                            <p className='text-white mt-2 text-center'>Are you already user? <Link className='text-blue-700 underline' to={'/signup'}>Signup</Link></p>
                        }
                    </form>
                </div>
            </div>
            {/* toaser */}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </section>
    )
}

export default Auth