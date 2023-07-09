import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { IconButton, Grid } from '@mui/material';
import { gsap, Power3, Ease, SteppedEase } from 'gsap'
import styled from "styled-components";
import '../styles/about.css'
import Footer from '../components/Footer';
const About = () => {
    const containerRef = useRef(null)

    // useEffect(()=>{
    //     const t1 = gsap.timeline()

    //     t1.fromTo(containerRef.current,{
    //         x:'-100',
    //         repeat:-1
    //     },{x:0})
    // })
    return (
        <>
            <div className="bg-[#1f332b] min-h-screen md:min-h-[90vh] max-w-[100vw]">
                <div className='w-[90%] md:w-4/5 mx-auto'>
                    <div className='py-5'>
                        <div className='flex justify-between items-center'>
                            {/* <h2 className='text-2xl hero font-bold text-white'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                            <Link to='/'>
                                <div className='w-[7rem]  md:w-[10rem]'>
                                    <img src="/images/two.svg" />
                                </div>
                            </Link>
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
                </div>
                <div className='min-h-[70vh]  flex justify-center flex-col items-center'>
                    <h2 className='text-center text-[65px] text-white font-bold'>Why You should use <br />Fourier Pay ?</h2>
                    <div className='py-5 w-[50%] mx-auto'>
                        <p className='text-white text-center text-lg'> Fourierpay enables businesses to automate payment-related tasks, such as generating invoices, sending payment links/QR-codes, and setting up recurring payments. This automation helps save time and reduces manual effort in managing payment processes.</p>
                    </div>
                    <Container className='py-5' ref={containerRef}>
                        <div className='flex space-x-6'>
                            <div className='py-4 px-16 cursor-pointer bg-white rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Manage Funds</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Automate Payments</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Integration and Compatibility</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Efficient Payment Collection</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Transparency and Accountability</h2>
                                </div>
                            </div>
                        </div>
                    </Container>
                    <SecondContainer>
                        <div className='flex space-x-6'>
                            <div className='py-4 px-16 cursor-pointer bg-white rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Automatic Reciepts</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Get paid with different Methods</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Manage Customers</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Create Payment Links</h2>
                                </div>
                            </div>
                            <div className='py-4 px-16 bg-white cursor-pointer rounded-3xl shadow-md'>
                                <div className='flex items-center space-x-3'>
                                    {/* <IconButton>
                                    <ManageHistoryIcon className='' />
                                </IconButton> */}
                                    <h2>Create QR-Codes</h2>
                                </div>
                            </div>
                        </div>
                    </SecondContainer>
                </div>

            </div>
            <div className='py-6'>
                <div className='w-[90%] mx-auto md:w-4/5 mx-auto'>
                    <div className='py-2'>
                        <h1 className='text-[65px] font-bold capitalize'>FourierPay was built for <br /> <span className='text-[#97f675]'>Businesses like yours</span> </h1>
                        <p className='text-2xl'>Efficiently manage your payments, simplify your financial processes, and enhance your overall financial management. Here are some of the tools that FourierPay offers to support you:</p>
                    </div>
                    <div className='py-2'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='h-[500px] background_pink rounded-xl cursor-pointer'>
                                <div className='py-2 px-8'>
                                    <div className='w-[90%] mx-auto'>
                                        <img src='/images/money.webp' />
                                        <div className='py-4'>
                                            <h2 className='text-3xl font-bold capitalize'>Automate Collection of Payment</h2>
                                            <div className='py-2'>
                                                <p className='text-xl'>Fourierpay enables businesses to generate payment links that can be easily shared with customers. These payment links direct customers to a secure payment page where they can enter their payment details and complete the transaction. This automated process eliminates the need for manual invoicing and allows customers to make payments with just a few clicks.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[500px] background_pink rounded-xl cursor-pointer'>
                                <div className='py-2 px-8'>
                                    {/* <div className='py-2 px-8'> */}
                                    <div className='w-[90%] mx-auto'>
                                        <img src='/images/efficient.webp' />
                                        <div className='py-4'>
                                            <h2 className='text-3xl font-bold capitalize'>Reporting and Analytics</h2>
                                            <div className='py-2'>
                                                <p className='text-xl'>FourierPay offers comprehensive reporting and analytics tools that provide insights into your payment data. You can generate detailed reports on transaction volumes, revenue trends, and customer behavior, allowing you to make data-driven decisions and optimize your financial strategies.</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}

                                </div>
                            </div>
                            <div className='h-[500px] cursor-pointer'>
                                <div className='py-2 px-4 background_pink rounded-md'>
                                    <div className='py-2 px-8'>
                                        <div className='w-[90%] mx-auto'>
                                            <img src='/images/visible.webp' />
                                            <div className='py-4'>
                                                <h2 className='text-3xl font-bold capitalize'>Improve Transparency</h2>
                                                <div className='py-2'>
                                                    <p className='text-xl'>Fourierpay maintains detailed records of payment transactions, including timestamps, amounts, and payment statuses. This enables businesses and customers to access a clear audit trail and review the history of their payments. Transparent payment records help ensure accuracy, accountability, and dispute resolution if needed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[500px] cursor-pointer'>
                                <div className='py-2 px-4 background_pink rounded-md'>
                                    <div className='py-2 px-8'>
                                        <div className='w-[90%] mx-auto'>
                                            <img src='/images/standout.webp' />
                                            <div className='py-4'>
                                                <h2 className='text-3xl font-bold capitalize'>Payment Management Dashboard</h2>
                                                <div className='py-2'>
                                                    <p className='text-xl'> FourierPay provides a user-friendly dashboard that allows you to easily view and manage all your payment transactions in one centralized location. You can track incoming payments, monitor payment statuses, and access detailed payment reports for better financial visibility.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-8'>
                        <div>
                            {/* <h2 className='text-[70px] font-bold'>Fourierpay was built for <br/> <span className='text-[#97f675]'>businesses like yours</span></h2> */}
                            <div className='mt-3 py-4'>
                                <div>
                                    <img src='/images/FourierPay-35.jpg' />
                                </div>
                            </div>
                        </div>
                        <div className='py-4 mt-3'>
                            <div className='bg-[#1f332b] rounded-3xl py-10'>
                                <div className='py-10 w-4/5 mx-auto'>
                                    <h1 className='text-[65px] text-white font-bold'>Ready to Automate your Payment?</h1>
                                    <div className='py-8'>
                                        <p className='text-2xl leading-2 text-white'>Create an account and instantly start accepting payments,automating payments , and seamlessly track transactions .</p>
                                    </div>
                                    <div className='py-5'>
                                        <Link to='/signup'>
                                            <button className='bg-[#97f675] rounded-md py-4 px-12 font-bold'>Get Started</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

const Container = styled.div`
    animation: animate 30s linear infinite;

    @keyframes animate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%)
      }
      
    }
`
const SecondContainer = styled.div`
    animation: animated 30s linear infinite;

    @keyframes animated {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%)
      }
      
    }
`

export default About;

