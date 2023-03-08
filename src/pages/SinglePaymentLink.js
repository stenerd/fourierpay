import { Grid, IconButton, Skeleton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Titlebar from '../components/TitleBar'
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import NearMeIcon from '@mui/icons-material/NearMe';
import { LinearProgress } from '@mui/material'
import PaymentTable from '../components/PaymentTable'
import Protected, { BASE_URL } from '../utils/axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import LinkIcon from '@mui/icons-material/Link';
import PaymentsIcon from '@mui/icons-material/Payments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FolderIcon from '@mui/icons-material/Folder';




const SinglePaymentLink = () => {
    const topRef = useRef()
    let { code } = useParams();
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [data, setData] = useState({})

    const [isCopied, setIsCopied] = useState(false)
    const [search, setSearch] = useState('')
    const [paymentLink, setPaymentLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [payments, setPayments] = useState(true)
    const [pending, setPending] = useState(false)
    const [settings, setSettings] = useState(false)

    const navigate = useNavigate()

    const handlePayment = () => {
        setPending(false)
        setSettings(false)
        setPayments(true)
    }

    const handlePending = () => {
        setPending(true)
        setSettings(false)
        setPayments(false)
    }

    const handleSettings = () => {
        setPending(false)
        setSettings(true)
        setPayments(false)
    }


    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const SearchPayment = async () => {
        const res = await Protected.get(`${BASE_URL}/api/payment/${code}?q=${search}`)
        console.log(res?.data?.data?.data)
        setData(res?.data?.data?.data)
    }

    const [opener, setOpener] = React.useState(false);

    const handleClickOpen = () => {
        setOpener(true);
    };

    const handleCloser = () => {
        setOpener(false);
    };

    const filterLink = (status, start, end) => {
        let link = `${BASE_URL}/api/payment/${code}?q=${search}`
        if (status !== '' && end !== '' && start !== '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}&startDate=${start}&endDate=${end}`
            return link
        } if (status !== '' && start === '' && end === '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}`
            return link
        } if (status !== '' && end !== '' && start === '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}&endDate=${end}`
            return link
        } if (end !== '' && start === '' && status == '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&endDate=${end}`
            return link;
        } if (start !== '' && status === '' && end === '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}`
            return link
        }
        if (start !== '' && end !== '' && status === '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}&endDate=${end}`
            return link
        }
        if (start !== '' && end === '' && status !== '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}&status=${status}`
            return link
        }
        if (start === '' && end === '' && status === '') {
            return link
        }
        if (start !== '' && end === '' && status === '') {
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}`
            return link
        }
    }

    const filterData = async () => {
        setLoading(true)
        try {
            setLoading(true)
            const data = filterLink(status, start, end)
            const response = await Protected.get(data)
            console.log(response.data.data.data)
            setLoading(false)
            setData(response.data.data.data)
            console.log(data)
            // setEnd('')
            // setStart('')
            // setStatus('')
            handleCloser()
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            console.log('error')
        }
    }

    const onChange = (e) => {
        setSearch(e.target.value)
        // setTimeout(() => {
        //     SearchPayment()
        // }, 1000)

    }
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            const data = filterLink(status, start, end)
            const response = await Protected.get(data)
            setData(response?.data?.data?.data)
        }

    };



    const FetchLinks = async () => {
        // setLoading(true)
        setLoad(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/payment/${code}`)
            // const res = await Protected.get(`${BASE_URL}/api/payment/${code}?q=${search}`)
            // console.log(res.data.data.data)
            console.log(response.data.data.data)
            setData(response.data.data.data)
            setLoad(false)
            // setPaymentLink(response?.data?.data.paymentLink.link)
        } catch (error) {
            console.log(error)
            setLoad(false)
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
            backgroundColor: theme.palette.mode === 'light' ? '#1d3329' : '#1d3329',
        },
    }));

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(data.paymentLink.link)
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

    useEffect(() => {
        setValue('links')
    }, [])
    return (
        <>
            <div className='block lg:hidden'>
                <div className='py-6'>
                    <div className='w-[90%] mx-auto py-2'>
                        <h2 className='font-bold fourier'>{data?.paymentLink?.name}</h2>
                        <div className='py-4 mt-3'>
                            <div className='border-2  border-gray-300 px-3 py-4 rounded-[10px]'>
                                <div className='py-1 px-1'>
                                    <div className='flex justify-between items-center'>
                                        <h1 className='flex-1'>Description</h1>
                                        <span className='text-[10px] w-3/5 mx-auto py-1 rounded-md text-center flex-[0.4] text-[#00832D] pills-expiry-date'>{moment(data?.paymentLink?.expires_at).format(('MMM DD, YYYY'))}</span>
                                    </div>
                                    <div className='py-2'>
                                        <p className='text-[12px]'>{data?.paymentLink?.name}</p>
                                    </div>
                                    <div className='py-2 mt-2'>
                                        <div className='bg-gray-200 px-2 py-1 rounded-md flex items-center space-x-1'>
                                            <IconButton onClick={() => {
                                                // setCopied()
                                                copyText()
                                                // console.log(link, index)
                                            }}>
                                                <ContentPasteIcon fontSize='small' />
                                            </IconButton>
                                            <h1 className='break-all text-[10px]'>{data?.paymentLink?.link}</h1>
                                        </div>
                                    </div>
                                    <div className='py-2 mt-2'>
                                        <div>
                                            {
                                                data?.paymentLink?.expected_number_of_payments ? (
                                                    <div className='pb-2 w-full rounded-lg'>
                                                        <BorderLinearProgress variant="determinate" value={((data?.recievedAmount / (data.paymentLink?.amount * data?.paymentLink?.expected_number_of_payments)) * 100) > 100 ? 100 : ((data?.recievedAmount / (data?.paymentLink?.amount * data?.paymentLink?.expected_number_of_payments)) * 100)} />
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className='py-3 mt-2'>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <div>
                                            <div className='py-4 px-2 border border-[#FFD469] rounded-[10px]' style={{ background: 'rgba(199, 199, 199, 0.15)' }}>
                                                <div className='overlay'></div>
                                                <h2 className='text-gray-400 text-[12px]'>Expected Amount</h2>
                                                <h6 className='font-bold text-[14px] fourier'>₦ {Intl.NumberFormat('en-US').format(data?.paymentLink?.amount * data?.paymentLink?.expected_number_of_payments || 0)}</h6>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div>
                                            <div className='py-4 px-2 border border-[#0D9823] rounded-[10px]' style={{ background: 'rgba(199, 199, 199, 0.15)' }}>
                                                <div className='overlay'></div>
                                                <h2 className='text-gray-400 text-[12px]'>Amount Per Amount</h2>
                                                <h6 className='font-bold text-[14px] fourier'>₦ {Intl.NumberFormat('en-US').format(data?.paymentLink?.amount || 0)}</h6>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div>
                                            <div className='py-4 px-2 border border-[#F6AE9E] rounded-md' style={{ background: ' rgba(199, 199, 199, 0.15)' }}>
                                                <h2 className='text-gray-400 text-[12px]'>Recieved Payment</h2>
                                                <h6 className='font-bold text-[14px] fourier'>₦ {Intl.NumberFormat('en-US').format(data?.recievedAmount || 0)}</h6>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className='py-2 mt-2'>
                            <div className='px-1 rounded-md flex justify-between items-center py-1' style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
                                <div className='flex-1'>
                                    <button className={payments ? 'bg-white rounded-md transition ease-in-out text-black px-4 py-1 fourier' : 'text-gray-500 transition ease-in-out px-4 text-center'} onClick={() => handlePayment()}>Payments</button>
                                </div>
                                <div className='flex-1 self-center' onClick={() => handlePending()}>
                                    <button className={pending ? 'bg-white rounded-md text-black transition ease-in-out px-4 py-1 fourier' : 'text-gray-500 transition ease-in-out px-4 text-center'}>Pending</button>
                                </div>
                                <div className='flex-1 self-center' onClick={() => handleSettings()}>
                                    <button className={settings ? 'bg-white transition ease-in-out rounded-md text-black px-4 py-1 fourier' : 'text-gray-500 px-4 transition ease-in-out text-center'}>Settings</button>
                                </div>
                            </div>
                        </div>
                        <div className='py-2 mt-2 space-y-2'>
                            {payments && (
                                <>
                                    {data ? data?.payments?.map((row, index) => (
                                        <div className='flex justify-between items-center' key={index}>
                                            <div className=' flex flex-1 flex-col items-start'>
                                                <h2 className='font-semibold fourier text-[12px]'>{row?.unique_answer}</h2>
                                                <small className='text-sm py-2  flex-1  text-gray-300'>{moment(row.createdAt
                                                ).format('MMM DD, YYYY')} | {moment(row.createdAt).format('h:mma')}</small>
                                            </div>
                                            <div className=' flex flex-1 flex-col items-end'>
                                                <h2 className=''>₦{Intl.NumberFormat('en-US').format(row.amount || 0)}</h2>
                                                <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{row.status}</p>
                                            </div>
                                        </div>
                                    )) : ''}
                                </>

                            )}

                            {pending && (
                                <>
                                    <div>
                                        <p>Pending</p>
                                    </div>
                                </>
                            )}
                            {settings && (
                                <>
                                    <div>
                                        <p>settings</p>
                                    </div>
                                </>
                            )}

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
            <div className='hidden lg:block'>
                <DashboardLayout>
                    <div ref={topRef}>
                        <Titlebar  >
                            {load ? <h2 className='text-xl'>{`Payment Links -`} <span><Skeleton variant="rectangular" width={210} height={40} /></span></h2> : <h2 className='text-xl'>{`Payment Links - ${data.paymentLink && data.paymentLink.name}`}</h2>}
                            <p className='text-xl text-[#00bf00] status-pill capitalize'>{data.paymentLink && data.paymentLink.status} {data.paymentLink && data.paymentLink.expires_at && '- 24th March 2023'}</p>
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
                                                <h2 className='break-all text-[13px] text-[#1d3329] font-bold'>{data.paymentLink.link}</h2>
                                            </div>
                                            <div>
                                                {
                                                    data.paymentLink.expected_number_of_payments ? (
                                                        <div className='pb-2 w-[90%] rounded-lg'>
                                                            <BorderLinearProgress variant="determinate" value={((data.recievedAmount / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100) > 100 ? 100 : ((data.recievedAmount / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100)} />
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
                                                                        <AttachMoneyIcon className='text-[#1d3329]' />
                                                                    </div>
                                                                    {/* </IconButton> */}
                                                                    <div className='pt-8'>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Expected Amount</h2>
                                                                        <h1 className='font-bold fourier'>₦ {Intl.NumberFormat('en-US').format(data.paymentLink.amount * data.paymentLink.expected_number_of_payments || 0)}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <div className='bg-white py-2 rounded-md dashboard-matrix'>
                                                            <div className='overlay'></div>
                                                            <div className="p-2 w-[90%] mx-auto relative">
                                                                <div className='space-y-3 flex flex-col items-start justify-start'>
                                                                    <div className='c-charges-matrics'>
                                                                        <p className='font-bold text-red-700 text-sm'>₦ {Intl.NumberFormat('en-US').format(data.paymentLink.charges || 0)}</p>
                                                                        <small className='italic text-right font-medium  text-gray-600'>VAT</small>
                                                                    </div>
                                                                    <div className='content' style={{ marginTop: '0' }}>
                                                                        <LinkIcon className='text-[#1d3329]' />
                                                                    </div>
                                                                    <div className='pt-8'>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Amount Per Payment</h2>
                                                                        <h1 className='font-bold fourier'>₦ {Intl.NumberFormat('en-US').format(data.paymentLink.amount || 0)}</h1>
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
                                                                        <PaidIcon className='text-[#1d3329]' />
                                                                    </div>
                                                                    <div className='pt-8'>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Recieved Payment</h2>
                                                                        <h1 className='font-bold fourier'>₦ {Intl.NumberFormat('en-US').format(data.recievedAmount || 0)}</h1>
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
                                                                        <PaymentsIcon className='text-[#1d3329]' />
                                                                    </div>
                                                                    <div className='pt-8'>
                                                                        <h2 className='text-sm text-gray-400 font-bold'>Number Of Recipient</h2>
                                                                        <h1 className='font-bold fourier'>{data.numberOfRecipient}</h1>
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
                                                        <h2 className='fourier text-2xl text-[#1d3329] font-bold'>{data.paymentLink && data.paymentLink.name}</h2>
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

                                    {!data.payments ? (
                                        <>
                                            <div className='flex justify-center items-center h-[30vh]'>
                                                <h2 className='text-center text-2xl'>No  Payments made yet</h2>
                                            </div>
                                        </>
                                    ) : (<div className='py-6'>
                                        <PaymentTable loading={loading} opener={opener} setOpener={setOpener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} data={data} onChange={onChange} handleKeyDown={handleKeyDown} start={start} end={end} setStart={setStart} setEnd={setEnd} status={status} setStatus={setStatus} filterData={filterData} />
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
            </div>

        </>
    )
}

export default SinglePaymentLink