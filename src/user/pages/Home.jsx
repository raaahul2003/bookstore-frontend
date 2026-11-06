import React, { useContext } from 'react'
import UserHeader from '../components/UserHeader'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homePageBooksAPI } from '../../services/allApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { searchContext } from '../../context/SearchContext'
import { toast, ToastContainer } from 'react-toastify'

function Home() {
  const [homeBooks, setHomeBooks] = useState([])
  console.log(homeBooks);
  const { searchKey, setSearchKey } = useContext(searchContext)
  const navigate = useNavigate()


  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const res = await homePageBooksAPI()
    if (res.status == 200) {
      setHomeBooks(res.data)
    }


  }

  const handleSearch = () => {
    if (!searchKey) {
      toast.warning('please input a book title')
    }
    else if( !sessionStorage.getItem('token')){
      toast.warning('please login!!')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
    else if(searchKey && sessionStorage.getItem('token')){
      navigate('/all-books')

    }
    else{
      toast.error('something went wrong')
    }
  }
  return (
    <>
      <UserHeader />
      <section className='flex min-h-[390px] w-full items-center justify-center bg-[url(/book.jpg)] bg-cover bg-center md:min-h-[560px]'>
        <div className='flex min-h-[390px] w-full flex-col items-center justify-center bg-slate-950/65 px-4 text-center text-white md:min-h-[560px]'>
          <p className='rounded-full border border-amber-300/60 bg-amber-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-200'>A story for every reader</p>
          <h1 className='mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl'>Wonderful gifts</h1>
          <p className='mt-4 max-w-lg text-base text-slate-200 sm:text-lg'>Give your family and friends a book they will treasure.</p>
          <div className='mt-5 relative w-full max-w-lg'>
            <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search Book' className='w-full rounded-full border border-white/30 bg-white px-5 py-3 pr-12 text-slate-900 shadow-xl placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-amber-300/50' />
            <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-700 transition hover:text-indigo-900' />
          </div>
        </div>
      </section>

      <section className='mx-auto my-14 flex max-w-7xl flex-col items-center px-4 sm:px-6'>
        <p className='text-sm font-bold uppercase tracking-[0.18em] text-indigo-700'>Fresh on the shelf</p>
        <h1 className='mt-2 font-display text-3xl font-bold text-slate-950 sm:text-4xl'>New Arrivals</h1>
        <h2 className='mt-3 text-center text-slate-600'>Explore our latest collections</h2>
        <div className='mt-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>

          {/* card */}
          {
            homeBooks?.map(book => (
              <div className='min-w-0'>
                <div className='group h-full rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
                  <div className='overflow-hidden rounded-xl bg-slate-50'><img className='h-[300px] w-full object-contain transition duration-300 group-hover:scale-105' src={book?.imageUrl} alt="book cover" /></div>

                  <h3 className='mt-4 text-sm font-semibold text-indigo-700'>{book?.author}</h3>
                  <h4 className='mt-1 font-bold text-slate-900'>{book?.publisher}</h4>
                  <h4 className='mt-2 text-lg font-bold text-slate-950'>${book?.price}</h4>
                </div>
              </div>
            ))
          }

        </div>
        <div className='text-center my-3'>
          <Link to={"/all-books"} className='inline-flex rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700'>Explore More</Link>
        </div>
      </section >

      <section className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16'>
        <div className='rounded-2xl bg-indigo-50 p-6 sm:p-10'>
          <h2 className='font-display text-3xl font-bold text-slate-950 sm:text-4xl'>Featured Authors</h2>
          <h3 className='mt-3 text-xl font-semibold text-indigo-800'>Captivating with every word</h3>
          <p className='mt-5 text-justify leading-7 text-slate-700'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>

          <p className='mt-4 text-justify leading-7 text-slate-700'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow.</p>
        </div>

        <div className='flex items-center justify-center'>
          <img className='aspect-[4/3] w-full rounded-2xl object-cover shadow-lg' src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg" alt="Featured author" />
        </div>

      </section>

      <section className='mx-auto my-12 flex max-w-4xl flex-col items-center rounded-2xl bg-amber-50 p-6 text-center sm:p-10'>
        <h1 className='font-display text-3xl font-bold text-slate-950'>Testimonials</h1>
        <h2 className='text-lg sm:text-xl mt-4 text-center'>See What Others Are Saying</h2>
        <div className='flex items-center justify-center flex-col mt-5 w-full max-w-3xl'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" alt="Customer testimonial" className='h-[100px] w-[100px] rounded-full object-cover' />
          <h3 className='font-bold text-xl mt-3'>Anna Sttef</h3>
          <p className='mt-5 text-justify text-lg leading-8 text-slate-700'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nostrum molestias quisquam accusantium quis, possimus deserunt rerum praesentium fuga officiis vitae enim incidunt, voluptatum dolorem? Numquam optio quisquam dolor dolores!
          </p>
        </div>
      </section>
      {/* toaser */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Home
