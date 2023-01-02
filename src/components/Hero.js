import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'
const Hero = () => {
    return (
        <>
            <div className='bg-gray-100 h-[80vh]'>
                <div className='py-6'>
                    <div className='w-4/5 mx-auto flex justify-between items-center'>
                        <h2 className='text-2xl main'>Fourier<span className='text-[#234243]'>Pay</span></h2>
                        <div className='flex items-center space-x-6'>
                            <Link to="/login">
                                <p className='cursor-pointer'>Login</p>
                            </Link>
                            <Link to="/signup">
                                <button className='rounded-[50px] py-2 px-8 bg-[#234243] text-white'>Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-[70%] mx-auto'>
                    <div className='min-h-[60vh] flex flex-col justify-center items-center'>
                        <h2 className='text-[46px] main w-4/5 text-center'>Managing Payments Have Never Been Easier</h2>
                        <div className=''>
                            <h3 className=' mx-auto text-center text-gray-500'>
                                A Reliable , Secure Payment Platform for easy Payments and trasactions
                            </h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Hero