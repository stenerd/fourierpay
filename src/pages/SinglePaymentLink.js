import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import NearMeIcon from '@mui/icons-material/NearMe';
import { LinearProgress } from '@mui/material'
import TransactionTable from '../components/TransactionsTable'
const SinglePaymentLink = () => {
    const topRef = useRef()
    const { singleLink: link } = useSelector((state) => state.dashboard)
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

    useEffect(() => {
        topRef.current.scrollIntoView({ behaviour: "smoooth" })
    })


    return (
        <>
            <DashboardLayout>
                <div ref={topRef}>
                    <Titlebar  >
                        <h2 className='text-xl'>{`Payment Links - ${link.name}`}</h2>
                        <p className='text-xl text-[#00bf00] status-pill'>{link.status} {link.expires_at && '- 24th March 2023'}</p>
                    </Titlebar>
                    <div className='w-[90%] mx-auto py-6' >
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <div className='bg-[#f8faf7] h-full cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                    <div className='p-4'>
                                        <div className='cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <h2 className='fourier text-2xl text-[#234243] font-bold'>{link.name}</h2>
                                                <small className='text-sm text-[#00bf00] status-pill'>{link.status} {link.expires_at && '- 24th March 2023'}</small>
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
                        </Grid>
                        <div className='py-6'>
                            <TransactionTable />
                        </div>
                    </div>

                </div>

            </DashboardLayout>
        </>
    )
}

export default SinglePaymentLink