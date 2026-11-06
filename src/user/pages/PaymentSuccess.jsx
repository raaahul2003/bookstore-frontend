import React from 'react'
import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'
import { verifyPaymentAPI } from '../../services/allApi'
import { useEffect } from 'react'

function PaymentSuccess() {

    useEffect(() => {
      
        verifyPayment()
    },[])
    


    const verifyPayment = async() => {

        const sessionID = new URLSearchParams(window.location.search).get("session_id")
            const res = await verifyPaymentAPI({sessionID})
            console.log(res);
            
    }

    return (
        <>
            <UserHeader />
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 px-4 py-10 sm:px-6">
                <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-sm sm:p-8 md:mx-auto">

                    <img className="mx-auto my-6 h-14 w-14 text-green-600 sm:h-16 sm:w-16" src="https://static.vecteezy.com/system/resources/previews/010/152/358/original/tick-icon-sign-symbol-design-free-png.png" alt="" />
                    
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment Done!</h3>
                        <p className="my-2 text-gray-600">Thank you for completing your secure online payment.</p>
                        <p> Have a great day!  </p>
                        <div className="py-8 text-center sm:py-10">
                            <Link to={'/all-books'} className="inline-block w-full rounded bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 sm:w-auto sm:px-12">
                                Explore More Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentSuccess