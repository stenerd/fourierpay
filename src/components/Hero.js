import { Avatar, Grid } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'
import { gsap, Power3, Ease, SteppedEase } from 'gsap'
import { duration } from 'moment'
import { TextPlugin } from 'gsap/all'
import Typewriter from "typewriter-effect";

gsap.registerEffect(TextPlugin);
const Hero = () => {

    let firstRef = useRef(null)
    let secondRef = useRef(null)
    let thirdRef = useRef(null)
    const buttonRef = useRef(null)
    const t1 = gsap.timeline()
    const typewriter = useRef(null)

    const topClear = useRef()
    const bottomRef = useRef()
    const bigCircle = useRef()
    const smallCircle = useRef()

    const t3 = gsap.timeline()

    useEffect(() => {
        var t2 = gsap.timeline({
            paused: true
        });
        // letter animation
        t2.from(".anim-typewriter", 8, {
            width: "0",
        }, {
            width: "20.18em", /* same as CSS .line-1 width */
            ease: SteppedEase.config(37)
        }, 0);
        // text cursor animation
        t2.from(".anim-typewriter", 0.5, {
            "border-right-color": "rgba(255,255,255,0.75)"
        }, {
            "border-right-color": "rgba(255,255,255,0)",
            repeat: -1,
            ease: SteppedEase.config(37)
        }, 0);

        t2.play();

        gsap.from(typewriter.current, { text: "All in one platform for accepting payment and embedded fintech experience to fast track your payment", ease: "power1.in", duration: 2, repeat: 10, yoyo: true, repeatDelay: 0.4 })

        t3.fromTo(topClear.current, {
            height: '100%'
        }, { height: '50%', duration: 1.5}).fromTo(bottomRef.current, {
            height: '100%'
        }, { height: '50%', duration: 1.5 }).to(bigCircle.current,{backgroundColor:'#f3f4f3',duration:.9}).to(smallCircle.current,{backgroundColor:'#f3f4f3',duration:.9})

        t1.from(
            [firstRef.current, secondRef.current, thirdRef.current],
            {
                stagger: {
                    amount: .6
                },
                opacity: 0,
                x: 20,
                duration: 1.2
            }).from(buttonRef.current, {
                y: 30,
                opacity: 0,
                duration: .6
            })
        t2.play()
    }, [])
    return (
        <>
            <div className="bg-[#1f332b] min-h-screen md:min-h-[90vh] max-w-[100vw]">
                <div className='w-[90%] md:w-4/5 mx-auto'>
                    <div className='py-5'>
                        <div className='flex justify-between items-center'>
                            {/* <h2 className='text-2xl hero font-bold text-white'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                            <div className='w-[10rem]'>
                                <img src="/images/two.svg" />
                            </div>
                            <div className='flex items-center space-x-3 md:space-x-6'>
                                <Link to='/login'>
                                    <span className='text-white cursor-pointer font-bold'>Login</span>
                                </Link>
                                <Link to='signup'>
                                    <button className='bg-[#354740] text-white font-bold rounded-sm py-2 px-4 md:py-3 md:px-6'>Register</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-[80vh] md:min-h-[75vh] flex justify-center items-center mx-auto'>
                        <div className='flex justify-center items-center'>
                            <Grid container justifyContent={{ xs: 'center' }} alignItems='center' spacing={4} className='w-full' style={{ marginLeft: 0 }}>
                                <Grid item xs={12} md={6} style={{ paddingLeft: '0' }}>
                                    <div className='space-y-8 w-full'>
                                        <h2 className='text-white md:text-left text-center font-bold text-[40px] md:text-[60px] leading-tight md:leading-[5rem]  w-[90%] md:w-4/5 md:mx-0 mx-auto'>
                                            <span ref={firstRef}> Collect All Your</span>
                                            <span ref={secondRef} className='text-[#97f675] text-center md:text-left'> Payments </span> with One <span className='c-home-title-underline' ref={thirdRef}>Link</span>
                                        </h2>
                                        {/* All in one platform for accepting payment and embedded fintech experience to fast track your payment */}
                                        <h4 className='text-white  md:text-left text-center w-[90%] md:w-4/5 md:mx-0 mx-auto' ref={typewriter}>
                                            <Typewriter

                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString("All in one platform for accepting payment and embedded fintech experience to fast track your payment")
                                                        // .pauseFor(1000)
                                                        // .deleteAll()
                                                        // .typeString("Welcomes You")
                                                        .start();
                                                }}
                                            />
                                        </h4>


                                    </div>
                                    <div className='py-5 mt-8 w-[90%] md:w-4/5 flex justify-center md:block md:mx-0 mx-auto'>
                                        <Link to='signup'>
                                            <button ref={buttonRef} className='bg-[#97f675] rounded-md py-4 px-12 font-bold'>Get Started</button>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} className="hidden md:block">
                                    <div className=''>
                                        <div className='z-10 h-full w-[80%] rounded-full border-white border-1'>

                                        </div>
                                        <div className='bg-white rounded-xl h-[500px]  w-[60%] mx-auto relative'>
                                            <div className='c-overlay-content px-4 py-6'>
                                                <p className='font-bold text-gray-700' style={{ lineHeight: '0.7rem' }}>Revenue</p>
                                                <small className='text-gray-400 c-overlay-content-description'>Total revenue since product launch</small>
                                                <p className='c-overlay-content-amount'>
                                                    $ 1,098,450
                                                </p>
                                            </div>
                                            <div className='c-overlay-circle'></div>
                                            <div className='flex flex-col h-full relative overflow-hidden'>
                                                <div className='w-[85%] py-8 mx-auto flex-1'>
                                                    <div className='c-home-card-overlay'>
                                                        <div className='c-top-circle-big' ref={bigCircle}></div>
                                                        <div className='c-top-circle-small'></div>
                                                        <div ref={topClear} className='c-top-clear'></div>
                                                        <div className='c-bottom-circle-big' ref={smallCircle}></div>
                                                        <div className='c-bottom-circle-small'></div>
                                                        <div ref={bottomRef} className='c-bottom-clear'></div>

                                                    </div>
                                                    {/* <h2 className='hero font-bold text-2xl text-[#1f332b]'>Fourier<span style={{ color: '#97f675' }}>Pay</span></h2> */}
                                                    <div className='w-[7rem]'>
                                                        <img src="/images/four.svg" />
                                                    </div>
                                                </div>
                                                <div className="w-[85%] mx-auto py-5">
                                                    {/* <h1 className='font-bold text-[#1f332b] text-2xl'>VISA</h1> */}
                                                </div>
                                                <div className='p-1'>
                                                    <div className='w-full bg-[#1f332b] py-4 rounded-b-xl'>
                                                        <div className='w-[85%] mx-auto flex items-center space-x-3'>
                                                            <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/images/home-img.jpeg" />
                                                            <div className='flex flex-col space-y-0'>
                                                                <h2 className='text-gray-200 font-bold'>OFUZOR EMEKE</h2>
                                                                <p className='text-gray-400 font-bold mt-0'>Department Lead</p>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    {/* <h2>Emeke</h2> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero;