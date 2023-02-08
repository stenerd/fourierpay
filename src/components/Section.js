import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
import Footer from './Footer';
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-16'>
                    <div className="w-[90%] md:w-4/5 mx-auto flex-col md:flex-row flex justify-between items-center">
                        <div>
                            <h1 className='text-5xl font-semibold text-center'>250K</h1>
                            <p className='text-center font-bold text-gray-500'>Registared Users</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-5xl font-semibold  text-center'>250M+</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Total</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-5xl font-semibold  text-center'>85%</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Growth</p>
                        </div>
                    </div>
                </div>
                <div className="py-8 divide-y-2 divide-gray-300">
                    <Divider />
                </div>
                <div className='w-[90%] md:w-4/5 pt-4 md:pb-24 pb-18 mx-auto flex-col md:flex-row flex justify-between md:gap-[7rem] gap-[4em]'>
                    <div className='md:w-[55%] w-full'>
                        <h1 className='text-[46px] font-bold text-[4rem] leading-none'>Financial experience built for tomorrow</h1>
                    </div>
                    <div className='py-3 w-full md-w-[45%] space-y-8'>
                        {/* <h1 className='text-[40px] font-bold'>Financial experience built for tomorrow</h1> */}
                        <h2 className='text-xl font-medium text-gray-700'>Fourier Pay was built from scratch to inspire embedded Financial experience. We Provide you products and tools you need to grow your revenue and collect payment instantly with just one link.</h2>
                        <button className='bg-[#1f332b] font-medium text-white py-4 px-6 rounded-sm'>Learn More</button>
                    </div>
                </div>
            </div>


            <div className='pt-16 pb-16 bg-[#ebefe6] mx-auto'>
                <div className='bg-[#ebefe6] w-[90%] md:w-4/5 mx-auto'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2 className='pt-16 text-[46px] font-bold leading-none text-[#1f332b]'>How It Works?</h2>
                            <p className='text-xl font-medium text-gray-700 pt-6'>Fourierpay is a payment platform that gives you the ability to pay for products through a
                                link. It also helps you create payment
                                links that can be accessed by whoever you want payment from thereby enabling mass payments.
                            </p>
                        </Grid>
                    </Grid>
                    <div className='mt-20'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <div className='relative w-full h-full'>
                                    <div className='c-center-absolute w-4/5'>
                                        <div className='relative w-full'>
                                            <div>
                                                <div className='c-how-it-works-icon-cover'>
                                                    <img src="/images/create-link-vector.svg" className='c-center-absolute' alt='create link icon' />
                                                </div>
                                                
                                            </div>
                                            <div className='bg-[#ebefe6]'>
                                                <h2 className='pt-6 text-[30px] font-bold leading-none text-[#1f332b]'>Create Your Own Link</h2>
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{lineHeight: 2.2}}>
                                                    Create your own FourierPay link and share it instantly with anyone - customers,
                                                    friends, family or partners. If you don’t already have a FourierPay account,
                                                    signing up is free and fast. Sign up and start accepting money from anyone in an instant.
                                                </div>
                                            </div>
                                            
                                            <div className='absolute c-home-how-it-works-overlay'></div>
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{zIndex: 2}}>
                                        <img src="/images/create-link.svg" alt='create link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay'></div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='mt-32'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={7}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{zIndex: 2}}>
                                        <img src="/images/copy-link.svg" alt='copy link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay2'></div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <div className='relative w-full h-full'>
                                    <div className='c-center-absolute w-4/5'>
                                        <div className='relative w-full'>
                                            <div>
                                                <div className='c-how-it-works-icon-cover'>
                                                    <img src="/images/copy-link-vector.svg" alt='copy link icon' className='c-center-absolute' />
                                                </div>
                                            </div>
                                            <div className='bg-[#ebefe6]'>
                                                <h2 className='pt-6 text-[30px] font-bold leading-none text-[#1f332b]'>Share Your Link</h2>
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{lineHeight: 2.2}}>
                                                    Paste or embed the link anywhere. Share your link any way you want to. In an email,
                                                    chat, a text message or even a business card. The same payment
                                                    link can be shared with many people and used across various channels.
                                                </div>
                                            </div>
                                            
                                            <div className='absolute c-home-how-it-works-overlay'></div>
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='mt-32'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <div className='relative w-full h-full'>
                                    <div className='c-center-absolute w-4/5'>
                                        <div className='relative w-full'>
                                            <div>
                                                <div className='c-how-it-works-icon-cover'>
                                                    <img src="/images/get-paid-vector.svg" alt='Get paid icon' className='c-center-absolute' />
                                                </div>
                                                {/* <img src="/images/pay-icon.svg" alt='create link icon' /> */}
                                            </div>
                                            <div className='bg-[#ebefe6]'>
                                                <h2 className='pt-6 text-[30px] font-bold leading-none text-[#1f332b]'>Get Paid, Fast</h2>
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{lineHeight: 2.2}}>
                                                    Customers, friends, family etc can follow the link and enter the information
                                                    you require of them. Once they pay, the money is usually in
                                                    your FourierPay wallet in seconds.
                                                </div>
                                            </div>
                                            <div className='absolute c-home-how-it-works-overlay'></div>
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{zIndex: 2}}>
                                        <img src="/images/pay.svg" alt='create link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay'></div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                        
                    
                </div>
            </div>


            <div className='relative h-[43rem]'>
                <div className='absolute c-pricing-icon'>
                    <img src="/images/our-pricing-img.svg" alt='our pricing img' />
                </div>
                <div className='h-full bg-[#ebefe6]'></div>
                <div className='pt-56 pb-40 bg-[#1f332b] c-why-fourier-abs'>
                    <div className='mx-auto mt-24 w-[90%] md:w-4/5 mx-auto'>
                        <h2 className='text-[46px] font-bold leading-none md:leading-normal mb-3 text-white'>
                            Why Fourier<span className='text-[#97f675]'>Pay</span>?
                        </h2>
                        <h4 className='text-[30px] font-bold leading-none md:leading-normal mb-12 text-white'>
                            You can accept, manage and make payments with us fast and easy.
                        </h4>
                        <p className='text-xl leading-9 font-medium text-gray-700 mb-4 text-white'>
                            Fourier<span className='text-[#97f675]'>pay</span> is a payment platform that gives you the ability to pay for products through a link.it also helps you create payment links that can be accessed by whoever you want payment from thereby enabling mass payments.
                        </p>
                        <p className='text-xl leading-9 font-medium text-gray-700 mb-4 text-white'>
                            We have done the core payment integrations and abstractions, so your team can easily access and mange payments with our APIs and access multiple payment functionalities.
                        </p>
                        <p className='text-base leading-9 font-medium text-gray-700 mb-4 text-white'>
                            <ul className='list-inside c-list-bullet' style={{ listStyle: 'inside' }}>
                                <li><span>Easy online payments processing.</span></li>
                                <li><span>Integrated accounting software.</span></li>
                                <li><span>Secure vault for storing sensitive data.</span></li>
                                <li><span>Easy-to-use interface</span></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>

            <div className='py-28 bg-[#ebefe6] mx-auto relative' style={{zIndex: -1}}>
                
                <div className='bg-[#ebefe6] w-[90%] md:w-4/5 mx-auto'>
                    <div className='py-6 w-[70%]'>
                        <p className='text-[46px] font-bold leading-none text-[#1f332b]'>Our Pricing</p>
                        <p className='text-xl font-medium text-gray-700 pt-4'>
                            Fourierpay is a payment platform that gives you the ability to pay for products through a
                            link.it also helps you create payment links that can be accessed by whoever you want
                            payment from thereby enabling mass payments.
                        </p>
                       

                    </div>

                    <div className='w-4/6 mx-auto my-16'>
                        <Grid container spacing={8} justifyContent='space-between'>
                            <Grid item xs={6} >
                                <div className="relative">
                                    <div className='absolute c-pricing-background'></div>
                                    <div className='absolute c-pricing-background-right'></div>
                                    <div className='relative c-pricinig-pre-background' style={{zIndex: 1}}>
                                        
                                        <div className='bg-white p-12' style={{borderRadius: '0.5rem'}}>
                                            <div className='flex justify-center'>
                                                <p className='text-center font-bold text-[#1f332b] text-2xl	'>Free Trial</p>
                                            </div>
                                            {/* <p>Free</p> */}

                                            <ul className='list-inside c-list-bullet mt-32' style={{ listStyle: 'inside' }}>
                                                <li><span>Easy online payments processing.</span></li>
                                                <li><span>Integrated accounting software.</span></li>
                                                <li><span>Secure vault for storing sensitive data.</span></li>
                                                <li><span>Easy-to-use interface</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </Grid>
                            <Grid item xs={6} >
                                <div className="relative">
                                    <div className='absolute c-pricing-background'></div>
                                    <div className='absolute c-pricing-background-right'></div>
                                    <div className='relative c-pricinig-pre-background' style={{zIndex: 1}}>
                                        
                                        <div className='bg-white p-12' style={{borderRadius: '0.5rem'}}>
                                            <div className='flex justify-center'>
                                                <p className='text-center font-bold text-[#1f332b] text-2xl	'>Premium</p>
                                            </div>
                                            {/* <p>Free</p> */}

                                            <ul className='list-inside c-list-bullet mt-32' style={{ listStyle: 'inside' }}>
                                                <li><span>Easy online payments processing.</span></li>
                                                <li><span>Integrated accounting software.</span></li>
                                                <li><span>Secure vault for storing sensitive data.</span></li>
                                                <li><span>Easy-to-use interface</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

            <div className='py-8 bg-[#1f332b]'>
                <div className=''>
                    <div className='py-20 flex justify-center items-center'>
                        <div className='w-4/5 mx-auto'>
                            <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                <Grid item xs={12} md={7}>
                                    <div className='c-comment-bar'></div>
                                    <div className='md:w-4/5 w-[93%]'>
                                        {/* <div className='flex justify-start px-4 items-start'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <h2 className='py-4 text-white font-bold md:text-[30px] text-[25px]' style={{lineHeight:'1.75'}}>" Fourierpay enabled me to create an account with just a few clicks, make payments in minutes, not days or weeks, easily find the most current details about my account and track all of my transactions in one place.</h2>
                                        {/* <div className='flex justify-end px-4 items-end'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <p className='text-right italic text-white'>
                                            _Ochuko Okpako
                                        </p>

                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} >
                                    <div className='py-3'>
                                        <img src="/images/ochuko.png" className='w-full h-[500px] object-cover c-home-section-image' />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-16'>
                <div className='flex items-center w-4/5 mx-auto'>
                    <div className='py-6 w-[55%]'>
                        <p className='text-5xl font-medium leading-normal'>Subscribe to Our NewsLetter</p>
                        <p className='text-xl leading-9 font-medium text-gray-400' style={{lineHeight: '1.7rem'}}>Subscribe for our news letter to get latest news, update and available offers delivered directly in your inbox.</p>
                       

                    </div>
                    <div className='w-[45%] flex justify-between'>
                        <div className='ml-12 py-6 w-[100%]'>
                            <input placeholder='Enter Email' name='confirm_password' required type="text" className='py-2 px-4 w-full h-[3.5rem] outline-none c-text-input' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='c-primary-button'>
                                    Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Section;