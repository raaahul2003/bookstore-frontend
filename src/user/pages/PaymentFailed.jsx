import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'

function PaymentFailed() {
    return (
        <>
            <UserHeader />
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 px-4 py-10 sm:px-6">
                <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-sm sm:p-8 md:mx-auto">
                    <svg viewBox="0 0 24 24" className="mx-auto my-6 h-14 w-14 text-red-600 sm:h-16 sm:w-16" aria-hidden="true">
                        <path fill="currentColor" d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm4.24 15.17a.75.75 0 1 1-1.06 1.06L12 13.06l-3.18 3.17a.75.75 0 1 1-1.06-1.06L10.94 12 7.76 8.83a.75.75 0 1 1 1.06-1.06L12 10.94l3.18-3.17a.75.75 0 1 1 1.06 1.06L13.06 12l3.18 3.17Z" />
                    </svg>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment Failed</h3>
                        <p className="my-2 text-gray-600">We couldn&apos;t complete your payment. Please try again or choose another payment method.</p>
                        <div className="py-8 text-center sm:py-10">
                            <Link to="/all-books" className="inline-block w-full rounded bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 sm:w-auto sm:px-12">
                                Return to Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentFailed