import { IconButton } from '@mui/material'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
    return (
        <>
            <div className='py-6 bg-[#1f332b]'>
                {/* <div className='py-6 flex justify-between items-start'>
             <div className='w-4/5 mx-auto'>
                <div className='flex justify-between items-center gap-3'>
                    <div className='py-4 space-y-3 text-white flex-1'>
                        <h1 className='text-3xl text-white'>FourierPay</h1>
                        <p>No matter what kind of business model you have—whether it's an online store or something more informal—we will support it!</p>
                    </div>
                    <div className='py-4 flex-1'>
                       <h2 className='text-white text-[30px] text-center'>ABOUT US</h2>
                       <h2 className='text-white text-[30px]  text-center'>CONTACT US</h2>
                       <h2 className='text-white text-[30px]  text-center'>SUPPORT</h2>
                    </div>
                    <div className='py-4 flex-1 self-start justify-self-end'>
                       <h2 className='text-white text-3xl'>Keep In Touch</h2>
                       <div className='flex space-x-4 items-center '>
                           <IconButton>
                              <TwitterIcon className='text-white text-xl'/>
                           </IconButton>
                           <IconButton>
                              <InstagramIcon className='text-white text-xl'/>
                           </IconButton>
                           <IconButton>
                              <LinkedInIcon className='text-white text-xl'/>
                           </IconButton>
                       </div>
                    </div>
                </div>
             </div>
          </div> */}
                <>
                    <div className='py-4'>
                        <h2 className='text-center text-white font-bold'>Fourier Pay</h2>
                    </div>
                </>
            </div>
        </>
    )
}

export default Footer