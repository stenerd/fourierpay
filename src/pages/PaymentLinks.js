import { Grid, IconButton, LinearProgress } from '@mui/material'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import '../styles/PaymentLink.css'
import { Link } from 'react-router-dom';

const PaymentLinks = () => {

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 3,
        borderRadius: 0,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 0,
            backgroundColor: theme.palette.mode === 'light' ? '#234243' : '#234243',
        },
    }));

    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Payment Links</h2>
                    <div>
                        <Link to="/dashboard/payment">
                            <button className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                        </Link>
                    </div>
                </Titlebar>
                <div className="px-16 py-8">
                    <div className='py-4 mt-4  mx-auto'>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={6}>
                                <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                    <div className='p-4'>
                                        <div className='cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>ELA DUES</h2>
                                                <small className='text-sm text-[#00bf00] status-pill'>Active - 24th March 2023</small>
                                            </div>
                                            <div className='py-3'>
                                                <div className="flex items-center space-x-6">
                                                    <div>
                                                        <h2 className='text-sm'>Expected</h2>
                                                        <h1 className='text-2xl font-bold '>$10,000</h1>
                                                    </div>
                                                    <div>
                                                        <h2 className='text-sm'>Total Balance</h2>
                                                        <h1 className='text-2xl font-bold'>$9,000</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3">
                                                <div className='bg-gray-100 pt-2 px-2 c-border-gray'>
                                                    <div className='flex space-x-2 items-center'>
                                                        <IconButton>
                                                            <ContentPasteIcon />
                                                        </IconButton>
                                                        <h2 className='break-all text-[14px]'>https://fourierpay.netlify.app/eladues</h2>
                                                    </div>
                                                </div>
                                                <div className='pb-2'>
                                                    <BorderLinearProgress variant="determinate" value={42} />
                                                </div>
                                                <div>
                                                    <h2 className="pb-3 text-gray-400 font-bold">42 reciepients</h2>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                    <div className='p-4'>
                                        <div className='cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>UBIT DUES</h2>
                                                <small className='text-sm text-[#f10707] status-pill'>Expired - 24th May 2022</small>
                                            </div>
                                            <div className='py-3'>
                                                <div className="flex items-center space-x-6">
                                                    <div>
                                                        <h2 className='text-sm'>Expected</h2>
                                                        <h1 className='text-2xl font-bold '>$10,000</h1>
                                                    </div>
                                                    <div>
                                                        <h2 className='text-sm'>Total Balance</h2>
                                                        <h1 className='text-2xl font-bold'>$9,000</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3">
                                                <div className='bg-gray-100 py-2 px-2'>
                                                    <div className='flex space-x-2 items-center'>
                                                        <IconButton>
                                                            <ContentPasteIcon className='text-[#234243]' />
                                                        </IconButton>
                                                        <h2 className='break-all text-[14px]'>https://fourierpay.netlify.app/ubit</h2>
                                                    </div>

                                                </div>
                                                <div className='pb-2'>
                                                    <BorderLinearProgress variant="determinate" value={5} />
                                                </div>
                                                <div>
                                                    <h2 className="pb-3 text-gray-400 font-bold">500 reciepients</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                    <div className='p-4'>
                                        <div className='cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>NAMES DUES</h2>
                                                <small className='text-sm text-[#00bf00] status-pill'>Active - 24th March 2023</small>
                                            </div>
                                            <div className='py-3'>
                                                <div className="flex items-center space-x-6">
                                                    <div>
                                                        <h2 className='text-sm'>Expected</h2>
                                                        <h1 className='text-2xl font-bold '>$10,000</h1>
                                                    </div>
                                                    <div>
                                                        <h2 className='text-sm'>Total Balance</h2>
                                                        <h1 className='text-2xl font-bold'>$9,000</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3">
                                                <div className='bg-gray-100 py-2 px-2'>
                                                    <div className='flex space-x-2 items-center'>
                                                        <IconButton>
                                                            <ContentPasteIcon className='text-[#234243]' />
                                                        </IconButton>
                                                        <h2 className='break-all text-[14px]'>https://fourierpay.netlify.app/names</h2>
                                                    </div>

                                                </div>
                                                <div className='pb-2'>
                                                    <BorderLinearProgress variant="determinate" value={70} />
                                                </div>
                                                <div>
                                                    <h2 className="pb-3 text-gray-400 font-bold">35 reciepients</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                    <div className='p-4'>
                                        <div className='cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>THERMO MATERIAL</h2>
                                                <small className='text-sm text-[#f10707] status-pill'>Expired - 24th May 2022</small>
                                            </div>
                                            <div className='py-3'>
                                                <div className="flex items-center space-x-6">
                                                    <div>
                                                        <h2 className='text-sm'>Expected</h2>
                                                        <h1 className='text-2xl font-bold '>$10,000</h1>
                                                    </div>
                                                    <div>
                                                        <h2 className='text-sm'>Total Balance</h2>
                                                        <h1 className='text-2xl font-bold'>$9,000</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3">
                                                <div className='bg-gray-100 py-2 px-2'>
                                                    <div className='flex space-x-2 items-center'>
                                                        <IconButton>
                                                            <ContentPasteIcon className='text-[#234243]' />
                                                        </IconButton>
                                                        <h2 className='break-all text-[14px]'>https://fourierpay.netlify.app/thermo</h2>
                                                    </div>

                                                </div>
                                                <div className='pb-2'>
                                                    <BorderLinearProgress variant="determinate" value={89} />
                                                </div>
                                                <div>
                                                    <h2 className="pb-3 text-gray-400 font-bold">429 reciepients</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                </div>

            </DashboardLayout>
        </>
    )
}

export default PaymentLinks