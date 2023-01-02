import { Grid, IconButton } from '@mui/material'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
const PaymentLinks = () => {
    return (
        <>
            <DashboardLayout>
                <div className=' min-h-screen'>
                    <div className="py-6 px-4 w-[90%] mx-auto">
                        <h2 className='text-lg fourier font-bold'>Payment Links</h2>
                        <div className='py-4 mt-4  mx-auto'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3 h-[250px]'>
                                        <div className='p-4'>
                                            <div className='cursor-pointer'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>ELA DUES</h2>
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
                                                <div className="py-3">
                                                    <div className='bg-gray-100 py-2 px-2 rounded-lg'>
                                                        <div className='flex space-x-2 items-center'>
                                                            <IconButton>
                                                                <ContentPasteIcon />
                                                            </IconButton>
                                                            <h2  className='break-all text-[14px]'>https://fourierpay.netlify.app/eladues</h2>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h2 className="py-3 text-gray-400">42 reciepients</h2>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3 h-[250px]'>
                                        <div className='p-4'>
                                            <div className='cursor-pointer'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>UBIT DUES</h2>
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
                                                <div className="py-3">
                                                    <div className='bg-gray-100 py-2 px-2 rounded-lg'>
                                                        <div className='flex space-x-2 items-center'>
                                                            <IconButton>
                                                                <ContentPasteIcon className='text-[#234243]' />
                                                            </IconButton>
                                                            <h2  className='break-all text-[14px]'>https://fourierpay.netlify.app/ubit</h2>
                                                        </div>
                                                                     
                                                    </div>
                                                    <div>
                                                        <h2 className="py-3 text-gray-400">120 reciepients</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3 h-[250px]'>
                                        <div className='p-4'>
                                            <div className='cursor-pointer'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>NAMES DUES</h2>
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
                                                <div className="py-3">
                                                    <div className='bg-gray-100 py-2 px-2 rounded-lg'>
                                                        <div className='flex space-x-2 items-center'>
                                                            <IconButton>
                                                                <ContentPasteIcon className='text-[#234243]' />
                                                            </IconButton>
                                                            <h2  className='break-all text-[14px]'>https://fourierpay.netlify.app/names</h2>
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        <h2 className="py-3 text-gray-400">35 reciepients</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-[#f8faf7] cursor-pointer border-dotted border-2 rounded-lg py-3 px-3 h-[250px]'>
                                        <div className='p-4'>
                                            <div className='cursor-pointer'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>THERMO MATERIAL</h2>
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
                                                <div className="py-3">
                                                    <div className='bg-gray-100 py-2 px-2 rounded-lg'>
                                                        <div className='flex space-x-2 items-center'>
                                                            <IconButton>
                                                                <ContentPasteIcon className='text-[#234243]' />
                                                            </IconButton>
                                                            <h2  className='break-all text-[14px]'>https://fourierpay.netlify.app/thermo</h2>
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        <h2 className="py-3 text-gray-400">429 reciepients</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

            </DashboardLayout>
        </>
    )
}

export default PaymentLinks