import { Grid, IconButton, LinearProgress } from '@mui/material'
import React, { useContext } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import '../styles/PaymentLink.css'
import { Link } from 'react-router-dom';
import { DashBoardContext } from '../context/Dashboard';

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

    const { paymentLinks } = useContext(DashBoardContext)

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
                        {
                            paymentLinks && (
                                <Grid container spacing={5}>
                                    {
                                        paymentLinks.map((link, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <div className='bg-[#f8faf7] h-full cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                                    <div className='p-4'>
                                                        <div className='cursor-pointer'>
                                                            <div className='flex justify-between'>
                                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>{link.name}</h2>
                                                                <small className='text-sm text-[#00bf00] status-pill'>{link.status} { link.expires_at && '- 24th March 2023'}</small>
                                                            </div>
                                                            <div className='py-3'>
                                                                <div className="flex items-center space-x-6">
                                                                    {link.expected_number_of_payments ? 
                                                                        (
                                                                            <div>
                                                                                <h2 className='text-sm text-gray-400 font-bold'>Expected</h2>
                                                                                <h1 className='text-2xl font-bold '>${link.amount * link.expected_number_of_payments}</h1>
                                                                            </div>
                                                                        )
                                                                        : ''
                                                                    }
                                                                    <div>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Total Balance</h2>
                                                                        <h1 className='text-2xl font-bold'>$90000</h1>
                                                                    </div>
                                                                    <div>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Amount</h2>
                                                                        <h1 className='text-2xl font-bold'>${link.amount}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="pt-3">
                                                                <div className='bg-gray-100 pt-2 px-2 c-border-gray'>
                                                                    <div className='flex space-x-2 items-center'>
                                                                        <IconButton>
                                                                            <ContentPasteIcon />
                                                                        </IconButton>
                                                                        <h2 className='break-all text-[13px]'>{link.link}</h2>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    link.expected_number_of_payments ? (
                                                                        <div className='pb-2'>
                                                                            <BorderLinearProgress variant="determinate" value={((90000 / (link.amount * link.expected_number_of_payments)) * 100) > 100 ? 100 : ((90000 / (link.amount * link.expected_number_of_payments)) * 100)} />
                                                                        </div>
                                                                    ) : ''
                                                                }
                                                                <div>
                                                                    <h2 className="pb-3 text-gray-400 font-bold">42 reciepients</h2>
                                                                </div>
                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                
                                            </Grid>
                                        ))
                                    }
                                    
                                </Grid>
                            )
                        }
                       
                    </div>
                </div>

            </DashboardLayout>
        </>
    )
}

export default PaymentLinks