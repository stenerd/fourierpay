import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRef } from 'react';
import { gsap, Power3, Ease, SteppedEase } from 'gsap';
import '../styles/Hero.css'
import { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
const Waitlist = () => {
  const [fullName, setFullName] = useState('')
  const [isEmail, setIsEmail] = useState()
  const [validEmail, setValidEmail] = useState(false)

  const handleFullName = (e) => {
    setFullName(e.target.value)
  }
  const handleEmail = (e) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    setIsEmail(e.target.value)
    setValidEmail(regex.test(e.target.value))
  }




  return (
    <div className='max-h-screen'>
      <div className='bg-black'>
        <div className='md:w-[82%] w-[90%] flex justify-between items-center py-4 mx-auto'>
          <div className='w-[7rem]  md:w-[10rem]'>
            <img src="/images/two.svg" />
          </div>
          <div className='flex items-center space-x-3 md:space-x-6'>
            {/* <Link to='/login'>
              <span className='text-white cursor-pointer font-bold'>Login</span>
            </Link> */}
            <Link to='signup'>
              <button className='bg-[#97f675] text-black font-bold rounded-md py-2 px-4 md:py-3 md:px-6'>Waitlist</button>
            </Link>
          </div>
        </div>
        <div className='bg-black flex justify-center items-center min-h-screen'>
          <div className='py-6 md:w-[90%] w-4/5 mx-auto'>
            <div className=''>
              {/* <div className='mb-[40px]'>
            <img src='/favicon.svg' className='w-[100%] h-20' />
          </div> */}
              <div className='md:w-[90%]  flex justify-between items-center w-full mx-auto'>
                <div className='mb-10 flex-1'>
                  <h2 className='text-[23px] mb-6 md:mb-0 md:text-[50px] leading-none font-bold text-white'>Collect All Your Payment with one link with FourierPay <br />
                  </h2>
                  <div className='py-4 mt-0'>
                    <p className='text-white md:text-xl'>Our comprehensive fintech platform is designed to simplify transactions and elevate your financial experience with ease.</p>
                  </div>
                  <div className='md:w-full flex-1 w-full mx-auto'>
                    <form>
                      <div className='flex space-x-3 items-center'>
                        <div className='py-3 flex-1 relative  hover:text-white'>
                          <PersonIcon className={fullName ? 'absolute top-6 left-2 text-white' : 'absolute top-6 left-2'} />
                          <input className='py-3 w-[100%] px-10 bg-[#16141c]  outline-none  text-white' placeholder='Full name...' onChange={handleFullName} />
                        </div>
                        <div className='py-3 flex-1 relative hover:text-white'>
                          <EmailIcon className={isEmail ? 'absolute top-6 left-2 text-white' : 'absolute top-6 left-2'} />
                          <input className='py-3 w-[100%] px-10 bg-[#16141c] outline-none text-white ' placeholder='Address email..' onChange={handleEmail} />
                        </div>
                      </div>
                      <div className='py-5 relative w-full hover:text-white'>
                        {/* <ArrowForwardIcon className={validEmail?'absolute top-8 right-8 text-white':'absolute top-8 right-8'}/> */}
                        <button disabled={validEmail ? false : true} className='bg-[#97f675] py-3 px-5 rounded-md w-[100%] font-bold'>Join the waitlist</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex-1 hidden md:block'>
                  <div className='w-full flex justify-center'>
                    <img src='/images/createlink.png' className='object-cover w-[80%]' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Waitlist;