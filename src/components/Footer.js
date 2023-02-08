import { IconButton } from '@mui/material'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
    return (
        <>
            <div className='py-6 bg-[#ebefe6]'>
                <>
                    <div className='py-8 w-4/5 mx-auto'>
                        <div className='flex justify-between items-center flex-col md:flex-row  space-y-6 md:space-y-0'>
                            <div>
                                {/* <h2 className='text-2xl hero font-bold'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                                    <div className='w-[10rem]'>
                                        <img src="/images/five.svg" />
                                    </div>
                            </div>
                            <div>
                                <h2>2023 Fourierpay. All Right Reserved.</h2>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <IconButton>
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton>
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton>
                                    <LinkedInIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default Footer