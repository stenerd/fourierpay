import { Grid, IconButton, LinearProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import '../styles/PaymentLink.css'
import { Link } from 'react-router-dom';
import Protected, { BASE_URL } from '../utils/axios'
import { useDispatch, useSelector } from 'react-redux';
import useClipboard from "react-use-clipboard";
import { useNavigate } from 'react-router-dom';
import { ADD_PAYMENTLINKS, SINGLE_PAYMENTLINK } from '../redux/DashboardSlice';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentLinks = () => {
    const [loading, setLoading] = useState(false)
    const { paymentLinks: PaymentLink } = useSelector((state) => state.dashboard)
    const [paymentLinks, setPaymentLinks] = useState(PaymentLink)
    const data = paymentLinks?.map((data) => data.link)
    const [link, setLink] = useState(data)
    const [singleLink, setSingleLink] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 3,
        borderRadius: 0,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 0,
            backgroundColor: theme.palette.mode === 'light' ? '#1d3329' : '#1d3329',
        },
    }));

    const [isCopied, setIsCopied] = useClipboard(singleLink, {
        // `isCopied` will go back to `false` after 1000ms.
        successDuration: 1000,
    });

    const inputRef = useRef()

    // const { paymentLinks } = useContext(DashBoardContext)
    const FetchLinks = async () => {
        // setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/payment-link`)
            // console.log(response.data.data)
            dispatch(ADD_PAYMENTLINKS(response?.data?.data))
            setPaymentLinks(response?.data?.data)

            // console.log({data})
        } catch (error) {
            console.log(error.response)
        }
    }

    const Payments = (link) => {
        dispatch(SINGLE_PAYMENTLINK(link))
        navigate(`/dashboard/payment/${link.code}`)
        console.log(link)
    }

    const findLink = async (link, index) => {
        // setSingleLink(link.link)
        try {
            await navigator.clipboard.writeText(link?.link)
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


        console.log({ link, singleLink: link.link })
    }

    useEffect(() => {
        FetchLinks()
    }, [])

    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Payment Links</h2>
                    <div>
                        <Link to="/dashboard/payment">
                            <button className='px-4 py-2 rounded-sm font-medium text-white bg-[#1d3329]'>Create Payment</button>
                        </Link>
                    </div>
                </Titlebar>
                <div className="px-16 py-8">
                    <div className='py-4 mt-4  mx-auto'>
                        {paymentLinks.length === 0 && (
                            <div className='flex justify-center items-center min-h-[60vh]'>
                                <div>
                                    <h2 className='font-bold text-2xl text-center'>No payment Links</h2>
                                </div>
                            </div>
                        )}
                        {
                            paymentLinks && (
                                <Grid container spacing={5}>
                                    {
                                        paymentLinks.map((link, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <div className='bg-[#f8faf7] h-full border-dotted border-2 rounded-lg py-3 px-3'>
                                                    <div className='p-4'>
                                                        <div className=''>
                                                            <div className='flex justify-between'>
                                                                <h2 className='fourier text-2xl text-[#1d3329] max-w-[60%] font-bold hover:text-blue-500 cursor-pointer' onClick={() => Payments(link)}>{link.name}</h2>
                                                                <small className='text-sm text-[#00bf00] status-pill'>{link.status} {link.expires_at && `- ${moment(link.expires_at).format('MMMM DD, YYYY')}`}</small>
                                                            </div>
                                                            {/* <button onClick={setCopied}>
                                                                Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
                                                            </button> */}
                                                            <div className='py-3'>
                                                                <div className="flex items-center space-x-6" style={{ paddingBottom: '1rem' }}>
                                                                    {link.expected_number_of_payments ?
                                                                        (
                                                                            <div>
                                                                                <h2 className='text-sm text-gray-400 font-bold'>Expected</h2>
                                                                                <h1 className='text-2xl font-bold '>₦ {Intl.NumberFormat('en-US').format(link.amount * link.expected_number_of_payments || 0)}</h1>
                                                                            </div>
                                                                        )
                                                                        : ''
                                                                    }
                                                                    {/* <div>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Total Balance</h2>
                                                                        <h1 className='text-2xl font-bold'>$90000</h1>
                                                                    </div> */}
                                                                    <div>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Amount</h2>
                                                                        <h1 className='text-2xl font-bold'>₦ {Intl.NumberFormat('en-US').format(link.amount || 0)}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="pt-3">
                                                                <div className='bg-gray-100 pt-2 px-2 c-border-gray'>
                                                                    <div className='flex space-x-2 items-center'>
                                                                        <IconButton onClick={() => {
                                                                            // setCopied()
                                                                            findLink(link, index)
                                                                            // console.log(link, index)
                                                                        }}>
                                                                            <ContentPasteIcon />

                                                                        </IconButton>
                                                                        <h2 className='break-all text-[13px]' ref={inputRef}>{link.link}</h2>
                                                                    </div>
                                                                </div>
                                                                {/* {
                                                                    link.expected_number_of_payments ? (
                                                                        <div className='pb-2'>
                                                                            <BorderLinearProgress variant="determinate" value={((90000 / (link.amount * link.expected_number_of_payments)) * 100) > 100 ? 100 : ((90000 / (link.amount * link.expected_number_of_payments)) * 100)} />
                                                                        </div>
                                                                    ) : ''
                                                                }
                                                                <div>
                                                                    <h2 className="pb-3 text-gray-400 font-bold">42 reciepients</h2>
                                                                </div> */}

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

            </DashboardLayout>
        </>
    )
}

export default PaymentLinks