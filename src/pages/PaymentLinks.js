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

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

// import moment from 'moment'

import FolderIcon from '@mui/icons-material/Folder';

const PaymentLinks = () => {
    const [loading, setLoading] = useState(false)
    const { paymentLinks: PaymentLink } = useSelector((state) => state.dashboard)
    const [paymentLinks, setPaymentLinks] = useState(PaymentLink)
    const data = paymentLinks?.map((data) => data.link)
    const [link, setLink] = useState(data)
    const [singleLink, setSingleLink] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
        setValue('links')
    }, [])

    useEffect(() => {
        FetchLinks()
    }, [])

    return (
        <>
            <div className='block lg:hidden min-h-screen'>
                <div classsName='py-8 mt-4 mb-24'>
                    <div className='w-[90%] mx-auto py-5'>
                        <div className='py-3'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-xl font-bold fourier'>Payment Links</h2>
                            </div>
                        </div>
                        <div className='py-2'>

                        </div>
                        <div className='py-3 space-y-2'>
                            {paymentLinks ? paymentLinks.map((each, index) => (
                                <div className='border border-gray-300 px-3 py-4 rounded-[10px]' key={index}>
                                    <div className='flex justify-between items-center'>
                                        <h2 onClick={() => Payments(each)} className='font-bold fourier flex-1 hover:text-[#00832D]'>{each.name}</h2>
                                        <span className='text-[10px] w-3/5 mx-auto py-1 rounded-md text-center flex-[0.4] text-[#00832D] pills-expiry-date'>{moment(each.expires_at).format(('MMM DD, YYYY'))}</span>
                                    </div>
                                    <div className='py-2'>
                                        <div className='bg-gray-200 px-2 py-1 rounded-md flex items-center space-x-1'>
                                            <IconButton onClick={() => {
                                                // setCopied()
                                                findLink(each, index)
                                                // console.log(link, index)
                                            }}>
                                                <ContentPasteIcon fontSize='small' />
                                            </IconButton>
                                            <h1 className='break-all text-[10px]'>{each.link}</h1>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-3'>
                                        {each.expected_number_of_payments && (
                                            <div>
                                                <h2 className='text-[10px] text-gray-400'>Expected Amount</h2>
                                                <p className='font-semibold'>  {Intl.NumberFormat('en-US').format(each.amount * each.expected_number_of_payments)}</p>
                                            </div>
                                        )}
                                        <div>
                                            <h2 className='text-[10px] text-gray-400'>Amount</h2>
                                            <p className='font-semibold'>{each.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                                : (
                                    <div>

                                    </div>
                                )}
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
                    </div>
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dashboard"
                            onClick={() => navigate('/dashboard')}
                            icon={<DashboardIcon />}
                        />
                        <BottomNavigationAction
                            label="Transactions"
                            value="transactions"
                            onClick={() => navigate('/dashboard/transaction')}
                            icon={<ReceiptIcon />}
                        />
                        <BottomNavigationAction
                            label="Links"
                            value="links"
                            icon={<InsertLinkIcon />}
                        // onClick={()=>navigate('/dashboard/paymentlinks')}
                        />
                        {/* <BottomNavigationAction
                            label="Favorites"
                            value="favorites"
                            icon={<FavoriteIcon />}
                        /> */}
                        {/* <BottomNavigationAction
                            label="Nearby"
                            value="nearby"
                            icon={<LocationOnIcon />}
                        /> */}
                        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                    </BottomNavigation>
                </Paper>
            </div>
            <div className='hidden lg:block'>
                <DashboardLayout>
                    <Titlebar>
                        <h2 className='fourier font-bold'>Payment Links</h2>
                        <div>
                            <Link to="/dashboard/payment">
                                <button className='c-bg-primary-light'>Create Payment</button>
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
            </div>


        </>
    )
}

export default PaymentLinks