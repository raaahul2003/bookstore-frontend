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
            <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
                <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10 md:mx-auto">

                    <img className="mx-auto my-6 h-14 w-14 text-green-600 sm:h-16 sm:w-16" src="https://static.vecteezy.com/system/resources/previews/010/152/358/original/tick-icon-sign-symbol-design-free-png.png" alt="" />
                    
                    <div className="text-center">
                        <h3 className="font-display text-3xl font-bold text-slate-950">Payment Done!</h3>
                        <p className="my-2 text-slate-600">Thank you for completing your secure online payment.</p>
                        <p> Have a great day!  </p>
                        <div className="py-8 text-center sm:py-10">
                            <Link to={'/all-books'} className="inline-block w-full rounded-lg bg-indigo-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:w-auto sm:px-12">
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
