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
      <section className='min-h-[350px] md:min-h-[500px] bg-[url(/book.jpg)] bg-cover bg-center flex justify-center items-center w-full'>
        <div className='min-h-[350px] md:min-h-[500px] bg-black/50 text-white text-center w-full flex items-center justify-center flex-col px-4'>
          <h1 className='text-4xl sm:text-5xl' style={{ fontFamily: "Dancing Script" }}>Wonderfull Gifts</h1>
          <p className='mt-5'>Give your family and friends a book</p>
          <div className='mt-5 relative w-full max-w-lg'>
            <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search Book' className='bg-white p-2 pr-10 rounded-3xl placeholder-gray-600 w-full text-gray-600' />
            <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='text-gray-600 absolute right-4 top-1/2 -translate-y-1/2' />
          </div>
        </div>
      </section>

      <section className='flex items-center justify-center flex-col my-10'>
        <h1 className='text-2xl sm:text-3xl font-bold'>New Arrivals</h1>
        <h2 className='text-lg sm:text-xl mt-4 text-center px-4'>Explore Our Latest Collections</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 w-full'>

          {/* card */}
          {
            homeBooks?.map(book => (
              <div className='p-3'>
                <div className='shadow p-3 rounded text-center'>
                  <img className='h-[300px] w-full object-contain' src={book?.imageUrl} alt="book cover" />

                  <h3 className='text-blue-800 mt-3'>{book?.author}</h3>
                  <h4 className='font-bold'>{book?.publisher}</h4>
                  <h4>${book?.price}</h4>
                </div>
              </div>
            ))
          }

        </div>
        <div className='text-center my-3'>
          <Link to={"/all-books"} className='bg-blue-500 p-3 text-white'>Explore More</Link>
        </div>
      </section >

      <section className='grid grid-cols-1 md:grid-cols-2'>
        <div className='p-5'>
          <h2 className='text-center text-2xl sm:text-3xl font-bold'>Featured Authors</h2>
          <h3 className='text-center text-xl sm:text-2xl mt-1 font-bold'>Captivates With Every Words</h3>
          <p className='mt-3 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>

          <p className='mt-3 text-justify'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
        </div>

        <div className='p-3 flex justify-center items-center'>
          <img className='w-full h-auto object-cover' src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg" alt="Featured author" />
        </div>

      </section>

      <section className='md:px-30 flex items-center justify-center flex-col my-10 p-5'>
        <h1 className='text-2xl sm:text-3xl font-bold'>TESTIMONALS</h1>
        <h2 className='text-lg sm:text-xl mt-4 text-center'>See What Others Are Saying</h2>
        <div className='flex items-center justify-center flex-col mt-5 w-full max-w-3xl'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" alt="Customer testimonial" className='h-[100px] w-[100px] rounded-full object-cover' />
          <h3 className='font-bold text-xl mt-3'>Anna Sttef</h3>
          <p className='text-justify mt-5 text-lg font-bold'>
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
