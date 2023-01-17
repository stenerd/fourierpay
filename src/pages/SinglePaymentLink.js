import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import NearMeIcon from '@mui/icons-material/NearMe';
import { LinearProgress } from '@mui/material'
import PaymentTable from '../components/PaymentTable'
import Protected from '../utils/axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import LinkIcon from '@mui/icons-material/Link';
import PaymentsIcon from '@mui/icons-material/Payments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const SinglePaymentLink = () => {
    const topRef = useRef()
    let { code } = useParams();

    const [data, setData] = useState({})

    const [isCopied, setIsCopied] = useState(false)

    const [paymentLink, setPaymentLink] = useState("")

    const FetchLinks = async () => {
        // setLoading(true)
        try {
            const response = await Protected.get(`http://localhost:4000/api/payment/${code}`)
            console.log(response.data.data)
            setData(response.data.data)
            setPaymentLink(response?.data?.data.paymentLink.link)
        } catch (error) {
            console.log(error.response)
        }
    }


    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 25,
        borderRadius: 10,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 0,
            backgroundColor: theme.palette.mode === 'light' ? '#234243' : '#234243',
        },
    }));

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(paymentLink)
            setIsCopied(true)
            toast.success('Copied To Clipboard', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        topRef.current.scrollIntoView({ behaviour: "smoooth" })
        FetchLinks()
    }, [])


    return (
        <>
            <DashboardLayout>
                <div ref={topRef}>
                    <Titlebar  >
                        <h2 className='text-xl'>{`Payment Links - ${data.paymentLink && data.paymentLink.name}`}</h2>
                        <p className='text-xl text-[#00bf00] status-pill'>{data.paymentLink && data.paymentLink.status} {data.paymentLink && data.paymentLink.expires_at && '- 24th March 2023'}</p>
                    </Titlebar>
                    {
                        data.paymentLink ? (
                            <div className='w-[90%] mx-auto py-6' >
                                <Grid container className='mb-8'>
                                    <Grid item xs={12} md={5}>
                                        <div>
                                            <div className='font-bold'>Description:</div>
                                            <div className='pl-16 italic text-gray-500'>{data.paymentLink.description}</div>
                                        </div>
                                        <div className='flex space-x-2 items-center mt-4'>
                                            <IconButton onClick={copyText}>
                                                <ContentPasteIcon />
                                            </IconButton>
                                            <h2 className='break-all text-[13px] text-[#234243] font-bold'>{data.paymentLink.link}</h2>
                                        </div>
                                        <div>
                                            {
                                                data.paymentLink.expected_number_of_payments ? (
                                                    <div className='pb-2 w-[90%] rounded-lg'>
                                                        <BorderLinearProgress variant="determinate" value={((9000 / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100) > 100 ? 100 : ((9000 / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100)} />
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <div className='create-payment-details p-8'>
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                    <div className='bg-white py-2 rounded-md dashboard-matrix'>
                                                        <div className='overlay'></div>
                                                        <div className="p-2 w-[90%] mx-auto">
                                                            <div className='space-y-3 flex flex-col items-start justify-start'>
                                                                {/* <IconButton> */}
                                                                <div className='content'>
                                                                    <AttachMoneyIcon className='text-[#234243]' />
                                                                </div>
                                                                {/* </IconButton> */}
                                                                <div className='pt-8'>
                                                                    <h2 className='text-sm text-gray-400 font-bold'>Expected Amount</h2>
                                                                    <h1 className='font-bold fourier'>${data.paymentLink.amount * data.paymentLink.expected_number_of_payments}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='bg-white py-2 rounded-md dashboard-matrix'>
                                                        <div className='overlay'></div>
                                                        <div className="p-2 w-[90%] mx-auto">
                                                            <div className='space-y-3 flex flex-col items-start justify-start'>
                                                                <div className='content'>
                                                                    <LinkIcon className='text-[#234243]' />
                                                                </div>
                                                                <div className='pt-8'>
                                                                    <h2 className='text-sm text-gray-400 font-bold'>Amount Per Payment</h2>
                                                                    <h1 className='font-bold fourier'>${data.paymentLink.amount}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='bg-white py-2 rounded-md dashboard-matrix'>
                                                        <div className='overlay'></div>
                                                        <div className="p-2 w-[90%] mx-auto">
                                                            <div className='space-y-3 flex flex-col items-start justify-start'>
                                                                <div className='content'>
                                                                    <PaidIcon className='text-[#234243]' />
                                                                </div>
                                                                <div className='pt-8'>
                                                                    <h2 className='text-sm text-gray-400 font-bold'>Recieved Payment</h2>
                                                                    <h1 className='font-bold fourier'>${9000}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='bg-white py-2 rounded-md dashboard-matrix'>
                                                        <div className='overlay'></div>
                                                        <div className="p-2 w-[90%] mx-auto">
                                                            <div className='space-y-3 flex flex-col items-start justify-start'>
                                                                <div className='content'>
                                                                    <PaymentsIcon className='text-[#234243]' />
                                                                </div>
                                                                <div className='pt-8'>
                                                                    <h2 className='text-sm text-gray-400 font-bold'>Number Of Recipient</h2>
                                                                    <h1 className='font-bold fourier'>{42}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>

                                {/* <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <div className='bg-[#f8faf7] h-full cursor-pointer border-dotted border-2 rounded-lg py-3 px-3'>
                                            <div className='p-4'>
                                                <div className='cursor-pointer'>
                                                    <div className='flex justify-between'>
                                                        <h2 className='fourier text-2xl text-[#234243] font-bold'>{data.paymentLink && data.paymentLink.name}</h2>
                                                        <small className='text-sm text-[#00bf00] status-pill'>{data.paymentLink && data.paymentLink.status} {data.paymentLink && data.paymentLink.expires_at && '- 24th March 2023'}</small>
                                                    </div>
                                                    <div className='py-3'>
                                                        <div className="flex items-center space-x-6">
                                                            {data.paymentLink.expected_number_of_payments ?
                                                                (
                                                                    <div>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Expected</h2>
                                                                        <h1 className='text-2xl font-bold '>${data.paymentLink.amount * data.paymentLink.expected_number_of_payments}</h1>
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
                                                                <h1 className='text-2xl font-bold'>${data.paymentLink.amount}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3">
                                                        <div className='bg-gray-100 pt-2 px-2 c-border-gray'>
                                                            <div className='flex space-x-2 items-center'>
                                                                <IconButton>
                                                                    <ContentPasteIcon />
                                                                </IconButton>
                                                                <h2 className='break-all text-[13px]'>{data.paymentLink.link}</h2>
                                                            </div>
                                                        </div>
                                                        {
                                                            data.paymentLink.expected_number_of_payments ? (
                                                                <div className='pb-2'>
                                                                    <BorderLinearProgress variant="determinate" value={((90000 / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100) > 100 ? 100 : ((90000 / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100)} />
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
                                </Grid> */}

                                {data.payments.length === 0 ? (
                                    <>
                                        <div className='flex justify-center items-center h-[30vh]'>
                                            <h2 className='text-center text-2xl'>No  Payments made yet</h2>
                                        </div>
                                    </>
                                ) : (<div className='py-6'>
                                    <PaymentTable data={data} />
                                </div>)}

                            </div>
                        ) : ''
                    }
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />

                </div>

            </DashboardLayout>
        </>
    )
}

export default SinglePaymentLink