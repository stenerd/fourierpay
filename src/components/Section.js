import { Divider, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
import Footer from './Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const Section = () => {
    const containerRef = useRef()
    let firstGrid = useRef()
    let secondGrid = useRef()
    let overlayRef = useRef()
    let secondContainerRef = useRef()
    let leftRef = useRef()
    let rightRef = useRef()
    let shadowRef = useRef()
    let thirdContainerRef = useRef()
    let lefttRef = useRef()
    let righttRef = useRef()
    let shadow2 = useRef()
    let dropDown = useRef()
    let containRef = useRef()

    // useEffect(() => {
      

    //     let mm = gsap.matchMedia()

    //     mm.add("(min-width:850px)", () => {

    //         const scaleDownTween = gsap.timeline({
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: "center center",
    //                 scrub: true,
    //                 pin: true
    //             },

    //         });


    //         scaleDownTween.fromTo(firstGrid.current, { x: '-50%', opacity: 0, scale: .5 }, { x: '0%', opacity: 1, duration: .8, scale: 1 }).to(overlayRef.current, { opacity: 1 })

    //         const secondTween = gsap.timeline({
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: secondContainerRef.current,
    //                 start: 'center center',
    //                 scrub: true,
    //                 // pin: true
    //             }


    //         })
    //         secondTween.fromTo(leftRef.current, { x: '50%', opacity: 0, scale: .5 }, { x: '0%', opacity: 1, scale: 1, duration: .8 }).to(shadowRef.current, { opacity: 1 })

    //         const thirdTween = gsap.timeline({
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: thirdContainerRef.current,
    //                 start: 'center center',
    //                 scrub: true,
    //                 pin: true
    //             }
    //         })
    //         thirdTween.fromTo(righttRef.current, { x: '-50%', opacity: 0, scale: .5 }, { x: '0%', opacity: 1, scale: 1, duration: .8 }).to(shadow2.current, { opacity: 1 })
    //         const fourthTween = gsap.timeline({
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: containRef.current,
    //                 start: 'center center',
    //                 scrub: true,
    //                 pin: true
    //             }
    //         })
    //         fourthTween.fromTo(dropDown.current, { y: '-50%', opacity: 0, scale: .5 }, { y: '0%', opacity: 1, scale: 1, duration: .8 })
    //     })
    // }, [])


    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-16'>
                    <div className="w-[90%] md:w-4/5 mx-auto flex-col md:flex-row flex justify-between items-center">
                        <div>
                            <h1 className='text-5xl font-semibold text-center'>250K</h1>
                            <p className='text-center font-bold text-gray-500'>Registered Users</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-5xl font-semibold  text-center'>250M+</h1>
                            <p className='text-center font-bold text-gray-500'>Total Revenue</p>
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
                <div className='w-[90%] md:w-4/5 pt-4 md:pb-24 pb-18 mx-auto flex-col md:flex-row flex justify-between md:gap-[7rem] gap-[1.5em]'>
                    <div className='md:w-[55%] w-full'>
                        <h1 className='text-[46px] font-bold text-[4rem] leading-none'>Financial experience built for tomorrow</h1>
                    </div>
                    <div className='py-3 w-full md-w-[45%] space-y-8'>
                        {/* <h1 className='text-[40px] font-bold'>Financial experience built for tomorrow</h1> */}
                        <h2 className='text-xl font-medium text-gray-700'>Fourier Pay was built to inspire embedded Financial experience. We Provide you products and tools you need to grow your revenue and collect payment instantly with just one link.</h2>
                        <button className='bg-[#1f332b] font-medium text-white py-4 px-6 rounded-sm mb-24 md:mb-0'>Learn More</button>
                    </div>
                </div>
            </div>


            <div className='pt-16 pb-16 bg-[#ebefe6] mx-auto'>
                <div className='bg-[#ebefe6] w-[90%] md:w-4/5 mx-auto'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2 className='pt-16 text-[46px] text-center md:text-left font-bold leading-none text-[#1f332b]'>How It Works?</h2>
                            <p className='text-xl text-center md:text-left font-medium text-gray-700 pt-6'>Fourierpay is a payment platform that gives you the ability to pay for products through a
                                link. It also helps you create payment
                                links that can be accessed by whoever you want payment from thereby enabling mass payments.
                            </p>
                        </Grid>
                    </Grid>
                    {/* MOBILE SCREENS */}
                    <div className='py-6 mt-8 block md:hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src='/images/groupIcon.png' />
                            <div className='py-2'>
                                <h2 className='text-center text-[20px] font-bold'>Create Your Own link</h2>
                            </div>
                            <div className='text-center w-[90%] mx-auto py-3'>
                                <p className='text-[18px] text-center md:text-left font-medium text-gray-700 '>Create your own FourierPay link and share it instantly with anyone - customers, friends, family or partners.
                                    If you don’t already have a FourierPay account, signing up is free and fast. Sign up and start accepting money from anyone in an instant.</p>
                            </div>
                            <div className='w-[90%]'>
                                <img src='/images/createlink.png' className='object-cover' />
                            </div>
                        </div>
                    </div>
                    <div className='py-6 mt-4 block md:hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src='/images/shareIcon.png' />
                            <div className='py-2'>
                                <h2 className='text-center text-[20px] font-bold'>Share Your Link</h2>
                            </div>
                            <div className='text-center w-[90%] mx-auto py-3'>
                                <p className='text-[18px] text-center md:text-left font-medium text-gray-700 '>Paste or embed the link anywhere. Share your link any way you want to. In an email, chat, a text message or even a business card. The same payment link can be shared with many people and used across various channels.</p>
                            </div>
                            <div className='w-[90%]'>
                                <img src='/images/share.png' className='object-cover' />
                            </div>
                        </div>
                    </div>
                    {/* GET PAID */}
                    <div className='py-6 mt-4 block md:hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src='/images/shareIcon.png' />
                            <div className='py-2'>
                                <h2 className='text-center text-[20px] font-bold'>Get Paid,Fast</h2>
                            </div>
                            <div className='text-center w-[90%] mx-auto py-3'>
                                <p className='text-[18px] text-center md:text-left font-medium text-gray-700 '>Customers, friends, family etc can follow the link and enter the information you require of them. Once they pay, the money is usually in your FourierPay wallet in seconds.</p>
                            </div>
                            <div className='w-[90%]'>
                                <img src='/images/pay.png' className='object-cover' />
                            </div>
                        </div>
                    </div>

                    <div className='mt-20 hidden md:block' ref={containerRef}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} ref={secondGrid}>
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
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{ lineHeight: 2.2 }}>
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
                            <Grid item xs={12} md={7} ref={firstGrid}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{ zIndex: 2 }}>
                                        <img src="/images/create-link.svg" alt='create link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay' ref={overlayRef}></div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='mt-32 hidden md:block' ref={secondContainerRef}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={7} ref={leftRef}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{ zIndex: 2 }}>
                                        <img src="/images/copy-link.svg" alt='copy link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay2' ref={shadowRef}></div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5} ref={rightRef}>
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
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{ lineHeight: 2.2 }}>
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
                    <div className='mt-32 hidden md:block' ref={thirdContainerRef}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} ref={lefttRef}>
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
                                                <div className='pt-4 text-xl font-medium text-gray-700' style={{ lineHeight: 2.2 }}>
                                                    Customers, friends, family etc can follow the link and enter the information
                                                    you require of them. Once they pay, the money is usually in
                                                    your FourierPay wallet in seconds.
                                                </div>
                                            </div>
                                            <div className='absolute c-home-how-it-works-overlay' ></div>
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={7} ref={righttRef}>
                                <div className='relative'>
                                    <div className='w-full relative' style={{ zIndex: 2 }}>
                                        <img src="/images/pay.svg" alt='create link' />
                                    </div>
                                    <div className='absolute c-home-how-it-works-image-overlay' ref={shadow2}></div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>


                </div>
                <div className='skew block md:hidden'>
                    <div className='py-10 w-[90%] mx-auto flex flex-col justify-center'>
                        <h2 className='text-[24px] text-center  mt-10 py-5 font-bold leading-none md:leading-normal mb-3 text-white'>
                            Why Fourier<span className='text-[#97f675]'>Pay</span>?
                        </h2>
                        <h4 className='text-[22px] py-2 font-bold leading-normal text-center md:leading-normal mb-12 text-white'>
                            You can accept, manage and make payments with us fast and easy.
                        </h4>
                        <p className='text-[18px] leading-9 font-medium text-gray-700 mb-4 text-white'>
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
            <div className='relative h-[43rem] hidden md:block' ref={containRef}>
                <div className='absolute c-pricing-icon' ref={dropDown}>
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
            <div className='md:py-28 py-8  bg-[#ebefe6] mx-auto relative' style={{ zIndex: -1 }}>
                <div className='bg-[#ebefe6] w-[90%] md:w-4/5 mx-auto'>
                    <div className='py-6 w-[95%] md:w-[70%]'>
                        <p className='text-[46px] font-bold text-center md:text-left leading-none text-[#1f332b]'>Our Pricing</p>
                        <p className='text-xl text-center  md:text-left font-medium text-gray-700 pt-4'>
                            Fourierpay is a payment platform that gives you the ability to pay for products through a
                            link.it also helps you create payment links that can be accessed by whoever you want
                            payment from thereby enabling mass payments.
                        </p>
                    </div>
                    <div className='w-[95%] md:w-4/6  mx-auto my-16 hidden md:block'>
                        <Grid container spacing={8} justifyContent='space-between'>
                            <Grid item xs={12} md={6} >
                                <div className="relative">
                                    <div className='absolute c-pricing-background'></div>
                                    <div className='absolute c-pricing-background-right'></div>
                                    <div className='relative c-pricinig-pre-background' style={{ zIndex: 1 }}>
                                        <div className='bg-white px-8 py-6' style={{ borderRadius: '0.5rem', boxShadow: '0 0 1rem 0 #ccc' }}>
                                            <div className=''>
                                                <p className='text-center font-medium text-gray-600 text-xl'>BASIC</p>
                                                <h1 className='pt-8 font-bold text-center text-4xl text-[#1f332b]'>Free</h1>
                                                <p className='pt-4 text-center font-medium text-[#13c305] text-sm'>FOREVER</p>
                                                <p className='pt-6 flex justify-center'>
                                                    <img src="/images/basic-plan.svg" style={{ width: '12rem' }} alt='our basic package' />
                                                </p>
                                            </div>
                                            <p className='flex justify-center' style={{ marginTop: '4.75rem' }}>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 mb-12 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <div className='flex justify-center w-full mb-12'>
                                                <button className='bg-[#c7c7c7] text-white py-3 px-16 font-bold'>Current Plan</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="relative">
                                    <div className='absolute c-pricing-background'></div>
                                    <div className='absolute c-pricing-background-right'></div>
                                    <div className='relative c-pricinig-pre-background' style={{ zIndex: 1 }}>
                                        <div className='absolute c-premium-package'>popular</div>
                                        <div className='bg-white px-8 py-6' style={{ borderRadius: '0.5rem', boxShadow: '0 0 1rem 0 #ccc' }}>
                                            <div className=''>
                                                <p className='text-center font-medium text-gray-600 text-xl'>PREMIUM</p>
                                                <h1 className='pt-8 font-bold text-center text-4xl text-[#1f332b]'>5k/ <span className='text-gray-600 text-lg'>month</span></h1>
                                                <p className='pt-4 text-center font-medium text-[#13c305] text-sm'>SAVING 12K A YEAR</p>
                                                <p className='pt-6 flex justify-center'>
                                                    <img src="/images/premium-plan.svg" style={{ width: '12rem' }} alt='our premium package' />
                                                </p>
                                            </div>
                                            <p className='mt-12 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <p className='mt-4 mb-12 flex justify-center'>
                                                <img src="/images/good.svg" alt='good' /> &nbsp; &nbsp; <span className='text-gray-700' style={{ fontSize: '1.1rem' }}>Easy online payments processing.</span>
                                            </p>
                                            <div className='flex justify-center w-full mb-12'>
                                                <button className='bg-[#13c305] text-white py-3 px-16 font-bold'>Coming Soon</button>
                                            </div>
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
                        <div className='md:w-4/5 w-[90%] mx-auto'>
                            <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                <Grid item xs={12} md={7}>
                                    <div className='c-comment-bar'></div>
                                    <div className='md:w-4/5 w-[93%]'>
                                        {/* <div className='flex justify-start px-4 items-start'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <h2 className='py-4 text-white font-bold md:text-[30px] text-[25px]' style={{ lineHeight: '1.75' }}>" Fourierpay enabled me to create an account with just a few clicks, make payments in minutes, not days or weeks, easily find the most current details about my account and track all of my transactions in one place.</h2>
                                        {/* <div className='flex justify-end px-4 items-end'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <p className='text-right italic text-white'>
                                            _Ochuko Okpako
                                        </p>

                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} sx={{ display: { sm: 'none', md: 'block' } }}>
                                    <div className='py-3'>
                                        <img src="/images/ochuko.png" className='w-full h-[500px] object-cover c-home-section-image hidden md:block' />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-16'>
                <div className='flex items-center md:w-4/5 w-[90%] md:flex-row flex-col mx-auto'>
                    <div className='py-6 md:w-[55%] w-[90%] spacing-y-2 md:spacing-y-2'>
                        <p className='md:text-5xl text-3xl font-medium leading-normal'>Subscribe to Our NewsLetter</p>
                        <p className='text-xl leading-9 font-medium text-gray-400' style={{ lineHeight: '1.7rem' }}>Subscribe for our news letter to get latest news, update and available offers delivered directly in your inbox.</p>


                    </div>
                    <div className='md:w-[45%] w-[100%] flex justify-between'>
                        <div className='md:ml-12 ml-3 py-6 w-[100%]'>
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