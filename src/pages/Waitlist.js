import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
    <div className='bg-black flex justify-center items-center min-h-screen'>
      <div className='py-6 md:w-2/5 w-4/5 mx-auto'>
        <div className=''>
          <div className='mb-[40px]'>
            <img src='/favicon.svg' className='w-[100%] h-20' />
          </div>
          <div className='md:w-4/5 w-full mx-auto'>
            <div className='mb-10'>
              <h2 className='text-[23px] md:text-[50px] text-center leading-none font-bold text-white'>Join our FourierPay waitlist <br />
                <span className='text-[#97F675]'>for early launch update</span></h2>
            </div>

            <div className='md:w-4/5 w-full mx-auto py-6'>
              <form>
                <div className='py-2 relative hover:text-white'>
                  <PersonIcon className={fullName ? 'absolute top-4 left-2 text-white' : 'absolute top-4 left-2'} />
                  <input className='py-3 w-full px-10 bg-[#16141c]  outline-none  text-white' placeholder='Full name...' onChange={handleFullName} />
                </div>
                <div className='py-3 relative hover:text-white'>
                  <EmailIcon className={isEmail ? 'absolute top-6 left-2 text-white' : 'absolute top-6 left-2'} />
                  <input className='py-3 w-full px-10 bg-[#16141c] outline-none text-white ' placeholder='Address email..' onChange={handleEmail} />
                </div>
                <div className='py-5 relative hover:text-white'>
                  {/* <ArrowForwardIcon className={validEmail?'absolute top-8 right-8 text-white':'absolute top-8 right-8'}/> */}
                  <button disabled={validEmail ? false : true} className='bg-[#16141c] py-3 px-5 rounded-md w-full text-white'>Join the waitlist</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Waitlist;