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
          <section className='flex w-full flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl'>
              <div className='flex flex-col items-center'>
                <h1 className='mt-5 text-2xl font-bold sm:text-3xl'>Collections</h1>
                <div className='mt-3 flex w-full max-w-md'>
                  <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='min-w-0 flex-1 border p-1 ps-3' />
                  <button  className='shrink-0 bg-sky-500 p-1 px-5 text-white'>Search</button>
                </div>
              </div>

              {/* <div className='md:flex'> */}
              <div className='mt-5 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[200px_minmax(0,1fr)] lg:gap-8'>
                <div className='md:mt-5'>
                  <h3 className='text-xl font-bold sm:text-2xl'>Filter</h3>
                  <div className='mt-2 flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-0'>

                    {
                      categoryList?.map(cat => (
                        <div  className='md:mt-3'>
                          <input onClick={() => filterBooks(cat)} type="radio" name="category" id="" /> <label htmlFor="">{cat}</label>
                        </div>
                      ))
                    }
                    <div className='md:mt-3'>
                      <input onClick={() => filterBooks('all')} type="radio" name="category" id="" /> <label htmlFor="">No Filter</label>
                    </div>
                  </div>
                </div>

                {/* <div className='md:grid grid-cols-4 mt-3'> */}
                <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6'>
                  {
                    allBooks?.length > 0 ?
                      allBooks?.map(book => (
                        <div hidden={book?.status == 'sold' || book?.status == 'pending'}  className='min-w-0 p-2 sm:p-3'>
                          <div className='flex h-full flex-col items-center justify-center rounded p-3 text-center shadow'>
                            <Link to={`/view/${book?._id}/book`}>
                              <img src={book?.imageUrl} alt="" className='h-64 w-full max-w-48 object-contain' />
                            </Link>
                            <h3 className='max-w-full break-words'>{book.author}</h3>
                            <h3 className='max-w-full break-words'>{book?.title}</h3>
                            <button className='mt-2 w-full bg-blue-700 p-1 text-white'>Buy-${book?.price}</button>
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
