import React, { useContext, useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getBooksAPI } from '../../services/allApi'
import { searchContext } from '../../context/SearchContext'

function AllBooks() {
  const [token, setToken] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const [dummyAllBooks, setDummyAllBooks] = useState()

  const [categoryList, setCategoryList] = useState([])

  const { searchKey, setSearchKey } = useContext(searchContext)
  
  console.log(searchKey);
  
  useEffect(() => {

    if (sessionStorage.getItem('token')) {

      setToken(sessionStorage.getItem('token'))

    }
    getBooks()

  }, [searchKey])

  const getBooks = async () => {

    const res = await getBooksAPI(searchKey)
    console.log(res);
    if (res.status == 200) {
      setAllBooks(res.data)
      setDummyAllBooks(res.data)
      const tempCategoryList = res.data.map(bk => bk.category)
      setCategoryList([...new Set(tempCategoryList)])
    }

  }

  const filterBooks = (category) => {
    console.log(category);
    if(category != 'all'){
      setAllBooks(dummyAllBooks?.filter(book => book.category == category))
    }
    else{
      getBooks()
    }
    
  }

  return (
    <>
      <UserHeader />

      {
        token ?
          <section className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl'>
              <div className='flex flex-col items-center'>
                <p className='text-sm font-bold uppercase tracking-[0.2em] text-indigo-700'>Find your next read</p>
                <h1 className='mt-2 font-display text-3xl font-bold text-slate-950 sm:text-4xl'>Collections</h1>
                <div className='mt-3 flex w-full max-w-md'>
                  <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='min-w-0 flex-1 rounded-l-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600' />
                  <button className='shrink-0 rounded-r-lg bg-indigo-700 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700'>Search</button>
                </div>
              </div>

              {/* <div className='md:flex'> */}
              <div className='mt-5 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[200px_minmax(0,1fr)] lg:gap-8'>
                <aside className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:mt-5'>
                  <h3 className='text-xl font-bold text-slate-900'>Filter</h3>
                  <div className='mt-2 flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-0'>

                    {
                      categoryList?.map(cat => (
                        <div className='md:mt-3'>
                          <input onClick={() => filterBooks(cat)} type="radio" name="category" id="" className='accent-indigo-700' /> <label htmlFor="" className='ml-2 text-slate-700'>{cat}</label>
                        </div>
                      ))
                    }
                    <div className='md:mt-3'>
                      <input onClick={() => filterBooks('all')} type="radio" name="category" id="" className='accent-indigo-700' /> <label htmlFor="" className='ml-2 text-slate-700'>No Filter</label>
                    </div>
                  </div>
                </aside>

                {/* <div className='md:grid grid-cols-4 mt-3'> */}
                <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6'>
                  {
                    allBooks?.length > 0 ?
                      allBooks?.map(book => (
                        <div hidden={book?.status == 'sold' || book?.status == 'pending'} className='min-w-0'>
                          <div className='flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
                            <Link to={`/view/${book?._id}/book`}>
                              <img src={book?.imageUrl} alt="" className='h-64 w-full max-w-48 object-contain transition hover:scale-105' />
                            </Link>
                            <h3 className='mt-3 max-w-full break-words text-sm font-semibold text-indigo-700'>{book.author}</h3>
                            <h3 className='mt-1 max-w-full break-words font-bold text-slate-900'>{book?.title}</h3>
                            <button className='mt-4 w-full rounded-lg bg-slate-950 px-3 py-2.5 font-semibold text-white transition hover:bg-indigo-800'>Buy · ${book?.price}</button>
                          </div>
                        </div>
                      ))
                      :

                      <p className='font-bold text-center my-3'>Loading...</p>

                  }

                </div>

              </div>
            </div>
          </section>
          :
          <div className='min-h-screen flex justify-center items-center flex-col'>
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-50' />
            <p className='mt-5 text-xl font-bold'>
              Please <Link to={'/login'} className='text-blue-500'>Login</Link> to explore books
            </p>

          </div>
      }

    </>
  )
}

export default AllBooks
