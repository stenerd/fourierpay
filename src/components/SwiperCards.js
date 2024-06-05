import React, { useEffect, useState } from 'react'
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import NearMeIcon from '@mui/icons-material/NearMe';
// import required modules
import { EffectCards } from "swiper";
import Protected, { BASE_URL } from '../utils/axios';
import { IconButton, Skeleton } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import moment from 'moment';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const SwiperCards = () => {
    const [wallet, setWallet] = useState({})
    const [matrics, setMatrics] = React.useState({});
    const [pieChartData, setPieChartData] = React.useState([]);
    const fetchWallet = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/wallet`)
            console.log('wallet >> ', response?.data?.data)
            setWallet(response?.data?.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const DashboardMatrics = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/dashboard/matrics`)
            console.log(response.data.data)
            setMatrics(response.data.data)
            setPieChartData([
                { name: 'Available Links', value: response.data.data.availableLinksCount },
                { name: 'Used Links', value: response.data.data.usedLinksCount },
            ])
        } catch (error) {
            console.log(error.response)

        }
    }
    useEffect(() => {
        fetchWallet()
        DashboardMatrics()
    }, [])
    return (
        <>
            {/* <div></div> */}
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='w-[85%] mx-auto py-6' >
                        <div className=''>
                            {
                                wallet.user_id ? (
                                    <h1 className='fourier text-white font-bold' style={{ textTransform: 'uppercase' }}>{wallet.user_id.firstname} {wallet.user_id.lastname}</h1>
                                ) : (
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                )
                            }
                            <h3 className="text-gray-400 font-bold">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                            <div className='spacing-y-3 flex justify-between items-center mt-4'>
                                <div className='pt-3'>
                                    {wallet.amount ? (<h1 className='fourier text-[20px] text-white font-bold'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(wallet.amount || 0)}</h1>) : <h1 className='fourier text-white text-[20px] font-bold'>₦0</h1>}
                                    <h3 className="text-white fourier text-sm uppercase font-bold text-[#98f675]">Total Balance</h3>
                                </div>
                                <div className='h-full pt-3'>
                                    <NearMeIcon style={{fontSize: '250%', color: 'white'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-[85%] mx-auto py-6 h-full relative'>
                        <div className='h-full'>
                            <div className='flex flex-col h-full'>
                                <h1 className='text-3xl font-bold fourier text-white flex-1'>INCOME</h1>
                                {/* <div className='flex justify-between items-center'>
                                    <div>
                                        <IconButton>
                                            <AddCardIcon className='text-white' fontSize='large' />
                                        </IconButton>
                                    </div>
                                    <div className='self-end'>
                                        <h1 className='font-bold fourier text-white text-[40px]'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(matrics.income || 0)}</h1>
                                    </div>
                                </div> */}
                                <div className='spacing-y-3 flex justify-between items-center mt-4'>
                                    <div className='pt-3'>
                                        {wallet.amount ? (<h1 className='fourier text-[20px] text-white font-bold'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(matrics.income || 0)}</h1>) : <h1 className='fourier text-white text-[20px] font-bold'>₦0</h1>}
                                        <h3 className="text-white fourier text-sm uppercase font-bold text-[#fadc8b]">Total Income</h3>
                                    </div>
                                    <div className='h-full pt-3'>
                                        <AddCardIcon style={{fontSize: '250%', color: 'white'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-[85%] mx-auto py-8 h-full relative'>
                        <div className='h-full'>
                            <div className='flex flex-col h-full'>
                                <h1 className='text-3xl font-bold text-white flex-1'>LINKS</h1>
                                {/* <div className='flex justify-between items-center'>
                                    <div>
                                        <IconButton>
                                            <InsertLinkIcon fontSize='large' className='text-white' />
                                        </IconButton>
                                    </div>
                                    <div className='self-end'>
                                        <h1 className='font-bold fourier text-white text-[50px] stroke-black'>{matrics.paymentLinkCount || 0}</h1>
                                    </div>
                                </div> */}
                                <div className='spacing-y-3 flex justify-between items-center mt-4'>
                                    <div className='pt-3'>
                                        {wallet.amount ? (<h1 className='fourier text-[20px] text-white font-bold'>{matrics.paymentLinkCount || 0}</h1>) : <h1 className='fourier text-white text-[20px] font-bold'>0</h1>}
                                        <h3 className="text-white fourier text-sm uppercase font-bold text-[#00ff29]">PAYMENT LINK</h3>
                                    </div>
                                    <div className='h-full pt-3'>
                                        <DatasetLinkedOutlinedIcon style={{fontSize: '250%', color: 'white'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-[85%] mx-auto py-8 h-full relative'>
                        <div className='h-full'>
                            <div className='flex flex-col h-full'>

                                <h1 className='text-3xl font-bold text-white flex-1'>PAYMENTS</h1>
                                {/* <div className='flex justify-between items-center'>
                                    <div>
                                        <IconButton>
                                            <InsertLinkIcon fontSize='large' className='text-white' />
                                        </IconButton>
                                    </div>
                                    <div className='self-end'>
                                        <h1 className='font-bold fourier text-white text-[50px]'>{matrics.paymentCount || 0}</h1>
                                    </div>
                                </div> */}
                                <div className='spacing-y-3 flex justify-between items-center mt-4'>
                                    <div className='pt-3'>
                                        {wallet.amount ? (<h1 className='fourier text-[20px] text-white font-bold'>{matrics.paymentCount || 0}</h1>) : <h1 className='fourier text-white text-[20px] font-bold'>0</h1>}
                                        <h3 className="text-white fourier text-sm uppercase font-bold text-[#ffb100]">PAYMENTS</h3>
                                    </div>
                                    <div className='h-full pt-3'>
                                        <AccountBalanceWalletOutlinedIcon style={{fontSize: '250%', color: 'white'}} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-[85%] mx-auto py-8 h-full relative'>
                        <div className='h-full'>
                            <div className='flex flex-col h-full'>
                                <h1 className='text-3xl font-bold text-white flex-1'>WITHDRAWALS</h1>
                                {/* <div className='flex justify-between items-center'>
                                    <div>
                                        <IconButton>
                                            <AccountBalanceWalletIcon fontSize='large' className='text-white' />
                                        </IconButton>
                                    </div>
                                    <div className='self-end'>
                                        <h1 className='font-bold fourier text-white text-[40px]'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(matrics.withdrawal || 0)}</h1>
                                    </div>
                                </div> */}
                                <div className='spacing-y-3 flex justify-between items-center mt-4'>
                                    <div className='pt-3'>
                                        <h1 className='fourier text-[20px] text-white font-bold'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(matrics.withdrawal || 0)}</h1>
                                        <h3 className="text-white fourier text-sm uppercase font-bold text-[#ffb100]">WITHDRAWALS</h3>
                                    </div>
                                    <div className='h-full pt-3'>
                                        <AccountBalanceWalletIcon style={{fontSize: '250%', color: 'white'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </>
    )
}

export default SwiperCards