import { Grid, IconButton, LinearProgress, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import '../styles/PaymentLink.css'
import { Link } from 'react-router-dom';
import Protected, { BASE_URL } from '../utils/axios'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { ADD_PAYMENTLINKS, SINGLE_PAYMENTLINK } from '../redux/DashboardSlice';
import moment from 'moment'
import useClipboard from "react-use-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import moment from 'moment'

import FolderIcon from '@mui/icons-material/Folder';
import MenuDropDown from '../components/Menu';
import BottomNav from '../components/bottomNav';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RecentLinksSkeleton from '../components/RecentLinksSkeleton';
import StatusBadge from '../components/atom/web/StatusBadge';
import LinkStatusBadge from '../components/atom/web/LinkStatusBadge';


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


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open20 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose20 = () => {
        setAnchorEl(null);
    };
    const { profile } = useSelector((state) => state.dashboard)

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
    const compareDate = () => {
        console.log(moment(Date.now()).format(('MMM DD, YYYY')))
    }

    useEffect(() => {
        setValue('links')
    }, [])

    useEffect(() => {
        FetchLinks()
        compareDate()
    }, [])

    return (
        <>
            <div className='block lg:hidden min-h-screen'>
                <div classsName=' mb-24'>
                    <div className='w-[90%] mx-auto'>
                        <div className='py-6'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-xl font-bold fourier'>Payment Links</h2>
                                <div className=''>
                                    <MenuDropDown open20={open20} handleClose20={handleClose20} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} name={`${profile.firstname} ${profile.lastname}`} />
                                </div>
                            </div>
                        </div>

                        <div className='mb-32 space-y-4'>
                            {paymentLinks ? paymentLinks.map((each, index) => {
                                // return (
                                //     <div className='border border-gray-300 px-3 py-4 rounded-[10px]' key={index}>
                                //         <div className='flex justify-between items-center'>
                                //             <h2 onClick={() => Payments(each)} className='font-bold fourier flex-1 hover:text-[#00832D]'>{each.name}</h2>
                                //             {/* text-[10px] w-3/5 mx-auto py-1 rounded-md text-center flex-[0.4] text-[#00832D] pills-expiry-date */}
                                //             {moment(each.expires_at).format(('MMM DD, YYYY')) > moment(Date.now()).format(('MMM DD, YYYY')) ? (
                                //                 <span className={moment(each.expires_at).format(('MMM DD, YYYY')) > moment(Date.now()).format(('MMM DD, YYYY')) ? 'text-[10px] w-3/5 mx-auto py-1 rounded-md text-center flex-[0.4] text-[#00832D] pills-expiry-date' : 'text-[10px] w-3/5 mx-auto py-1 rounded-md text-center flex-[0.4] text-white bg-red-400'}>{moment(each.expires_at).format(('MMM DD, YYYY'))}</span>
                                //             ) : (
                                //                 <p className='text-red-500 italic text-[10px] font-bold'>Expired</p>
                                //             )}
                                //         </div>
                                //         <div className='py-2'>
                                //             <div className='bg-gray-200 px-2 py-1 rounded-md flex items-center space-x-1'>
                                //                 <IconButton onClick={() => {
                                //                     // setCopied()
                                //                     findLink(each, index)
                                //                     // console.log(link, index)
                                //                 }}>
                                //                     <ContentPasteIcon fontSize='small' />
                                //                 </IconButton>
                                //                 <h1 className='break-all text-[10px]'>{each.link}</h1>
                                //             </div>
                                //         </div>
                                //         <div className='flex items-center space-x-3'>
                                //             {each.expected_number_of_payments && (
                                //                 <div>
                                //                     <h2 className='text-[10px] text-gray-400'>Expected Amount</h2>
                                //                     <p className='font-semibold'>  {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(each.amount * each.expected_number_of_payments)}</p>
                                //                 </div>
                                //             )}
                                //             <div>
                                //                 <h2 className='text-[10px] text-gray-400'>Amount</h2>
                                //                 <p className='font-semibold'>{each.amount}</p>
                                //             </div>
                                //         </div>
                                //     </div>
                                // )


                                if (index % 3 === 0) {
                                    return (
                                        <div className='border border-1 overflow-hidden rounded-[10px]' key={index} onClick={() => navigate(`/dashboard/payment/${each.code}`)}>
                                            <div className='flex justify-center items-center odd_numbers'>
                                                <img src='/images/target1.svg' alt='alt-img' />
                                            </div>
                                            <div className='p-5'>
                                                <div>
                                                    <h2 className='text-xl font-bold'>{each.name} </h2>
                                                </div>
                                                <div className=' flex justify-between items-center'>
                                                    <div className='pt-2'>
                                                        <p className='text-gray-500 font-medium'>Amount</p>
                                                        <h2 className='text-[#01b133] font-bold'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(each.amount || 0)}</h2>
                                                    </div>
                                                    <button className='c-bg-primary-light-mobile'>
                                                        <ContentCopyIcon style={{ color: '#008950', fontSize: '18px', paddingBottom: '3px', paddingRight: '4px'}} />
                                                        Share
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else if (index % 2 === 0) {
                                    return (
                                        <div className='border border-1 overflow-hidden rounded-[10px]' key={index} onClick={() => navigate(`/dashboard/payment/${each.code}`)}>
                                            <div className='flex justify-center items-center three_numbers'>
                                                <img src='/images/target3.svg' alt='alt-img' />
                                            </div>
                                            <div className='p-5'>
                                                <div>
                                                    <h2 className='text-xl font-bold'>{each.name}</h2>
                                                </div>
                                                <div className=' flex justify-between items-center'>
                                                    <div className='pt-2'>
                                                        <p className='text-gray-500 font-medium'>Amount</p>
                                                        <h2 className='text-[#01b133] font-bold'>₦ {Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(each.amount || 0)}</h2>
                                                    </div>
                                                    <button className='c-bg-primary-light-mobile'>
                                                        <ContentCopyIcon style={{ color: '#008950', fontSize: '18px', paddingBottom: '3px', paddingRight: '4px'}} />
                                                        Share
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='border border-1 overflow-hidden rounded-[10px]' key={index} onClick={() => navigate(`/dashboard/payment/${each.code}`)}>
                                            <div className='flex justify-center items-center even_numbers'>
                                                <img src='/images/target2.svg' alt='alt-img' />
                                            </div>
                                            <div className='p-5'>
                                                <div>
                                                    <h2 className='text-xl font-bold'>{each.name}</h2>
                                                </div>
                                                <div className=' flex justify-between items-center'>
                                                    <div className='pt-2'>
                                                        <p className='text-gray-500 font-medium'>Amount</p>
                                                        <h2 className='text-[#01b133] font-bold'>₦ {Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(each.amount || 0)}</h2>
                                                    </div>
                                                    <button className='c-bg-primary-light-mobile'>
                                                        <ContentCopyIcon style={{ color: '#008950', fontSize: '18px', paddingBottom: '3px', paddingRight: '4px'}} />
                                                        Share</button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                            })
                                : (
                                    <div>
                                        <Stack spacing={3}>
                                            <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                            <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                            <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                            <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                            <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                            <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                        </Stack>
                                    </div>
                                )}
                            {paymentLinks?.length === 0 && (
                                <div className=''>
                                    {/* <img src="/images/payments.svg" alt='alt-img' className='w-2/5 mx-auto' />
                                    <p className='text-gray-500 text-center'>No Links Yet!</p> */}
                                    <RecentLinksSkeleton/>
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
                <BottomNav />
            </div>
            <div className='hidden lg:block'>
                <DashboardLayout>
                    <Titlebar>
                            <div className="flex-1">
                            {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : (
                                <div className='flex items-center space-x-5'>
                                    <h2 className='fourier profile font-bold'>Payment Links</h2>
                                </div>)}
                            
                                <div className='flex items-center space-x-5 mt-2'>
                                    {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<p className=' text-gray-600'>View and manage your created Links.</p>)}
                                </div>
                        </div>

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
                                                    <div className='bg-[#f8faf7] h-full  border-2 rounded-lg py-3 px-3 hover:border-gray-400 transition ease-in-out delay-100' onClick={() => Payments(link)}>
                                                        <div className='p-4'>
                                                            <div className=''>
                                                                <div className='flex justify-between'>
                                                                    <h2 className='fourier text-2xl text-[#1d3329] max-w-[60%] font-bold hover:text-blue-500 cursor-pointer capitalize'>{link.name}</h2>
                                                                    {/* {moment(link.expires_at).format(('MMM DD, YYYY')) > moment(Date.now()).format(('MMM DD, YYYY')) ? (
                                                                        <small className='text-sm text-[#00bf00] status-pill'>{link.status} {link.expires_at && `- ${moment(link.expires_at).format('MMMM DD, YYYY')}`}</small>
                                                                    ) : (
                                                                        <small className='text-sm text-red-500 italic font-bold'>expired</small>
                                                                    )} */}
                                                                    <div className="text-left uppercase">
                                                                        <LinkStatusBadge status={link.status}
                                                                            other={(link.status === 'active') && link.expires_at ? `  | UNTIL ${moment(link.expires_at).format(('MMM DD, YYYY'))}` :
                                                                                ((link.status === 'expired') ? `  |  ON ${moment(link.expires_at).format(('MMM DD, YYYY'))}` : '')}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {/* <button onClick={setCopied}>
                                                                Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
                                                            </button> */}
                                                                <div className='py-3'>
                                                                    <div className="flex items-center space-x-6" style={{ paddingBottom: '1rem' }}>
                                                                        {link.expected_number_of_payments ?
                                                                            (
                                                                                <div>
                                                                                    <h2 className='text-sm text-gray-500'>Total Expected Amount</h2>
                                                                                    <h1 className='text-xl font-bold '>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(link.amount * link.expected_number_of_payments || 0)}</h1>
                                                                                </div>
                                                                            )
                                                                            : ''
                                                                        }
                                                                    
                                                                    </div>
                                                                    <div>
                                                                        <h2 className='text-sm text-gray-500 '>Amount Recieved </h2>
                                                                        <h1 className='text-xl font-bold'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(link.amount || 0)}</h1>
                                                                    </div>

                                                                </div>
                                                                <div className="mt-2">
                                                                    <h2 className='text-base text-gray-500 '>Payment Link  </h2>
                                                                    <div className='bg-gray-100 py-1 px-2 c-border-gray'>
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