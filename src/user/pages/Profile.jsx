import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../api/axiosinstance'
import Edit from '../components/Edit'
import { toast, ToastContainer } from 'react-toastify'
import { addBookApi, getAbstractAPI, getUserBooksAPI, getUserBoughtBooksAPI, removeBookAPI } from '../../services/allApi'
import { useParams } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'


function Profile() {
  const [sellbookStatus, setsellbookStatus] = useState(true)
  const [bookStatus, setbookStatus] = useState(false)
  const [purchaseStatus, setpurchaseStatus] = useState(false)
  const [editStatus, seteditStatus] = useState(false)

  const [userDp, setuserDp] = useState('')
  const [userName, setuserName] = useState('')
  const [userBio, setuserBio] = useState('')

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    pages: "",
    imageUrl: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
    uploadImages: [],
  })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [uploadBooks, setUploadBooks] = useState([])
  const [purchaseBooks, setpurchaseBooks] = useState()

  const deBouncedTitleSearch = useDebounce(bookDetails.title ,5000)

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setuserDp(user.picture)
      setuserName(user.username)
      setuserBio(user.bio)
    }
  }, [])

  useEffect(() => {
    if (sellbookStatus) {

      getUserBooks()

    } else if (purchaseStatus) {

      userBoughtBooks()

    }
  }, [sellbookStatus, purchaseStatus])

  useEffect(() => {

    if(deBouncedTitleSearch){

      console.log("gemini api call");
      getAbstractBook()
      
      
    }
    
  }, [deBouncedTitleSearch])

  const getAbstractBook = async () => {

    const res =  await getAbstractAPI(deBouncedTitleSearch)
    console.log(res);
    if(res.status == 200){
      setBookDetails({...bookDetails,abstract:res.data.content})
    }

  }


  const handleFileUpload = (e) => {

    const imgFile = e.target.files[0]
    setBookDetails({ ...bookDetails, uploadImages: [...bookDetails?.uploadImages, imgFile] })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList, url])

  }


  const resetForm = () => {
    setBookDetails({
      title: "",
      author: "",
      pages: "",
      imageUrl: "",
      price: "",
      discountPrice: "",
      abstract: "",
      publisher: "",
      isbn: "",
      language: "",
      category: "",
      uploadImages: [],
    })
    setPreview("")
    setPreviewList([])

  }

  const handleSubmit = async () => {
    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages } = bookDetails
    if (
      title &&
      author &&
      pages &&
      imageUrl &&
      price &&
      discountPrice &&
      abstract &&
      publisher &&
      isbn &&
      language &&
      category &&
      uploadImages.length > 0) {
      const reqbody = new FormData()
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqbody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(file => {
            reqbody.append("uploadImages", file)
          })
        }
      }
      const result = await addBookApi(reqbody)
      // console.log(result);
      if (result.status == 200) {
        toast.success("Book added successfully")
      } else {
        toast.error(result.response)
      }
      resetForm()

    }
    else {
      toast.warning("fill the form completely")


    }
  }

  const getUserBooks = async () => {
    const res = await getUserBooksAPI()
    // console.log("upload books", res);
    if (res.status == 200) {
      setUploadBooks(res.data)
    }

  }

  const removeBook = async (id) => {

    const res = await removeBookAPI(id)
    if (res.status == 200) {
      getUserBooks()
    }

  }

  const userBoughtBooks = async () => {
    const res = await getUserBoughtBooksAPI()
    // console.log(res);
    if (res.status == 200) {
      setpurchaseBooks(res.data)

    }

  }

  

  return (
    <>
      <UserHeader />
      <div className='h-28 bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-800 sm:h-40 md:h-[200px]'>
      </div>
      <div className='ml-4 -mt-16 h-32 w-32 sm:ml-10 sm:-mt-28 sm:h-48 sm:w-48'>
        <img className='h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl ring-2 ring-amber-300 sm:h-40 sm:w-40' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />
      </div>
      <div className='mx-auto my-5 w-full max-w-7xl min-w-0 px-4 sm:px-6 md:px-10'>
        <div className='flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center'>
          <h1 className='max-w-full break-words font-display text-3xl font-bold text-slate-950'>{userName}</h1>
          <div>
            <Edit />
          </div>
          {/* <button className='bg-blue-900 text-white p-2 rounded' onClick={() => seteditStatus(true)}>Edit</button> */}

        </div>
        <p className='break-words py-5 text-justify leading-7 text-slate-600 sm:text-lg'>
          {userBio == "" ? "No Bio" : userBio}
        </p>
        {/* tabs */}
        <div className='flex w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-slate-100 p-2 sm:gap-3'>
          <p onClick={() => {
            setsellbookStatus(true);
            setbookStatus(false);
            setpurchaseStatus(false)
          }} className={sellbookStatus ? 'cursor-pointer rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700 shadow-sm' : 'cursor-pointer rounded-lg px-4 py-2 font-medium text-slate-600 hover:bg-white/70'}>Sell Book</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(true);
            setpurchaseStatus(false)
          }} className={bookStatus ? 'cursor-pointer rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700 shadow-sm' : 'cursor-pointer rounded-lg px-4 py-2 font-medium text-slate-600 hover:bg-white/70'}>Book Status</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(false);
            setpurchaseStatus(true)
          }} className={purchaseStatus ? 'cursor-pointer rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700 shadow-sm' : 'cursor-pointer rounded-lg px-4 py-2 font-medium text-slate-600 hover:bg-white/70'}>Purchase History</p>
        </div>
        {/* contents */}
        {
          sellbookStatus &&
          <div className='w-full min-w-0 py-6 sm:py-8'>
            <div className='w-full min-w-0 rounded-2xl bg-slate-950 p-4 text-center shadow-xl sm:p-7'>
              <h1 className='font-display text-2xl font-bold text-white'>Book Details</h1>
              <form className='grid min-w-0 grid-cols-1 md:grid-cols-2'>
                <div className='min-w-0 p-2 sm:p-4'>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='mt-4 w-full rounded-lg bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300' />

                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='mt-4 w-full rounded-lg bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300' />

                  <input value={bookDetails.pages} onChange={(e) => setBookDetails({ ...bookDetails, pages: e.target.value })} type="text" placeholder='No of Pages' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" placeholder='Image URL' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.discountPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='w-full bg-white p-2 mt-4 rounded' />

                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} type="text" placeholder='Abstract' className='w-full bg-white p-2 mt-4 rounded' rows={4} />

                </div>
                <div className='min-w-0 p-2 sm:p-4'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='w-full bg-white p-2 mt-4 rounded' />

                  <div className='flex items-center justify-center p-4 sm:p-10' >
                    {
                      previewList?.length < 3 &&
                      <input on onChange={(e) => handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                    }
                    <label htmlFor="img">
                      <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="" className='h-20 w-20 cursor-pointer object-cover sm:h-24 sm:w-24' />
                    </label>
                  </div>
                  {/* display uploaded images */}
                  {
                    preview &&
                    <div className='flex flex-wrap items-center justify-center gap-2 p-3 sm:p-5' >
                      {
                        previewList?.map(url => (
                          <img src={url} alt="" className='h-14 w-14 rounded object-cover sm:h-[70px] sm:w-[70px]' />

                        ))
                      }
                      {previewList?.length < 3 &&
                        <label htmlFor="img">
                          <input on onChange={(e) => handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                          <FontAwesomeIcon icon={faPlus} className='ms-2 cursor-pointer text-2xl sm:ms-5' />
                        </label>
                      }

                    </div>
                  }


                  <div className='flex justify-end gap-2'>
                    <button type='button' className='rounded-lg border border-slate-400 px-4 py-3 font-semibold text-white transition hover:bg-white/10' onClick={resetForm}>RESET</button>
                    <button type='button' className='rounded-lg bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300' onClick={handleSubmit}>SUBMIT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        {
          bookStatus &&
          <div className='my-8 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:my-12 sm:p-6 md:my-16 md:p-10'>

            {
              uploadBooks.length > 0 ?
                uploadBooks?.map(book => (
                  <div className='mt-4 min-w-0 rounded-xl bg-slate-50 p-3 sm:p-5'>
                    <div className='grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center lg:grid-cols-[minmax(0,3fr)_minmax(10rem,1fr)]'>
                      <div className='min-w-0 px-2 sm:px-4 text-center'>
                        <h1 className='break-words text-xl sm:text-2xl'>{book.title}</h1>
                        <h3 className='break-words text-lg sm:text-xl'>{book.author}</h3>
                        <h3 className='text-lg text-blue-600 font-bold'>${book.price}</h3>
                        <p className='break-words text-justify'>{book.abstract}</p>
                        <div className='mt-5'>
                          {
                            book?.status == "pending" ?
                              <img src="http://pnggallery.com/wp-content/uploads/pending-stamp-03.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                              :
                              book?.status == "approved" ?
                                <img src="http://pnggallery.com/wp-content/uploads/approved-stamp-05.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                                :
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/021/432/975/small_2x/sold-out-grunge-rubber-stamp-free-png.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                          }
                        </div>

                      </div>
                      <div className='min-w-0'>
                        <img src={book.imageUrl} alt="" className='mx-auto max-h-72 w-32 max-w-full object-contain sm:w-40 md:w-48 lg:w-56' />
                        <div className='mt-3 flex justify-end'>
                          <button onClick={() => removeBook(book?._id)} className='w-full rounded bg-red-800 p-2 text-white hover:border hover:border-red-800 hover:bg-white hover:text-red-800 sm:w-auto'>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p className='text-center text-xl font-bold'>No Books Uploaded</p>
            }
          </div>
        }
        {
          purchaseStatus &&
          <div className='my-8 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:my-12 sm:p-6 md:my-16 md:p-10'>
            {
              purchaseBooks?.length > 0 ?
                purchaseBooks?.map(book => (
                  <div className='mt-4 min-w-0 rounded-xl bg-slate-50 p-3 sm:p-5'>
                    <div className='grid min-w-0 grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]'>
                      <div className='px-2 sm:px-4'>
                        <h1 className='text-2xl'>{book?.title}</h1>
                        <h3 className='text-xl'>B{book?.author}</h3>
                        <h3 className='text-lg text-blue-600 font-bold'>{book?.price}</h3>
                        <div className='mt-5'>
                          <img src="https://th.bing.com/th/id/OIP.AdUlbcljs1Kf7BpLG0fMaAHaHD?w=173&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                        </div>
                      </div>
                      <div className=''>
                        <img src={book?.imageUrl} alt="" className='mx-auto w-40 max-w-full object-contain sm:w-48 md:w-50' />
                      </div>
                    </div>
                  </div>
                ))
                :
                <div>
                  <p>No purchase History</p>
                </div>
            }
          </div>
        }


      </div>



    </>
  )
}

export default Profile
