import React, { useRef } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';


function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const { name, email, title } = form.current
    
    if (name.value && email.value && title.value) {
      emailjs
        .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            toast.success("FeedBack Send Successfully!!!")
            form.current.reset()

          },
          (error) => {
            console.log('FAILED...', error.text);
            toast.error(error.text)
          },
        );

    } else {
      toast.warning("Enter all fields!!")
    }

  };

  return (
    <>
      <UserHeader />
      <div className='mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 md:px-8 lg:px-10'>
        <h1 className='text-center text-2xl font-bold sm:text-3xl'>
          Contacts
        </h1>
        <div className='p-4 sm:p-6 lg:p-8'>
          <p className='text-justify sm:text-center'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sed natus ut iure unde! Cum in rerum labore aperiam quibusdam hic, quas corporis culpa iste? Doloribus, eveniet porro. Exercitationem, vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque reiciendis tempore molestiae similique natus quisquam fuga. Culpa fugit cum illum explicabo odit eius itaque harum, quod placeat veritatis?
          </p>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 p-3 sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-3'>

          <div className='mt-2 flex min-w-0 items-center gap-2 sm:mt-3'>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='text-2xl bg-gray-100 p-3' />
            <div className='text-justify ms-2'>
              <p>BookStore-123</p>
              <p>Calicut, Near Ksrtc Stand</p>
            </div>
          </div>

          <div className='mt-2 flex min-w-0 items-center gap-2 sm:mt-3'>
            <FontAwesomeIcon icon={faPhone} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='text-2xl bg-gray-100 p-3' />
            <h3 className='ms-2'>+91 7994699455  </h3>


          </div>

          <div className='mt-2 flex min-w-0 items-center gap-2 sm:mt-3'>
            <FontAwesomeIcon icon={faEnvelope} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='text-2xl bg-gray-100 p-3' />
            <p className='ms-2'>bookstore@gmail.com</p>
          </div>

        </div>

        <div className='grid grid-cols-1 gap-4 p-2 sm:p-5 lg:grid-cols-2'>
          <div className='rounded bg-gray-300 p-3 sm:p-5'>
            <div className='flex flex-col items-center justify-center p-2 sm:p-5'>
              <h1 className='text-center text-xl font-bold sm:text-2xl'>Send Me Message</h1>

              <form className='mt-6 flex w-full flex-col gap-2 sm:mt-10'
                ref={form} onSubmit={sendEmail}>

                <input type="text" name="name" placeholder='Name' className='bg-white w-full p-2 rounded' />
                <input type="email" name="email" placeholder='Email' className='bg-white w-full p-2 rounded' />
                <textarea name="title" id="" placeholder='Message' className='bg-white w-full p-2 rounded' rows={8}></textarea>

                <button type='submit' value="Send" className='w-full bg-gray-950 text-white p-2 rounded font-bold'>Send <FontAwesomeIcon icon={faPaperPlane} /></button>

              </form>

            </div>
          </div>
          <div className='p-2 sm:p-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.54684727985!2d75.72841394018309!3d11.255555506919812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x32150641ca32ecab!2sKozhikode%2C%20Keralam!5e0!3m2!1sen!2sin!4v1790765730071!5m2!1sen!2sin" width="600" height="450" allowfllscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" className='aspect-video w-full rounded'></iframe>
          </div>
        </div>
      </div>
      {/* toaser */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Contact
