import { Grid, IconButton, Skeleton } from '@mui/material'
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
import Protected, { BASE_URL } from '../utils/axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import LinkIcon from '@mui/icons-material/Link';
import PaymentsIcon from '@mui/icons-material/Payments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '../components/Tabs';
import PaymentLinkSettings from '../components/PaymentLinkSettings';
import PayersSheetTable from '../components/PayersSheetTable';




const SinglePaymentLink = () => {
    const topRef = useRef()
    let { code } = useParams();
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [data, setData] = useState({})
    const [payersSheet, setPayersSheet] = useState({})

    const [isCopied, setIsCopied] = useState(false)
    const [search, setSearch] = useState('')
    const [paymentLink, setPaymentLink] = useState("")
    const [loading,setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [loadPayersSheet, setLoadPayersSheet] = useState(false)
    const [linkData, setLinkData] = useState({
        isPublic: true
    })

    const [tabList, setTabList] = useState([
        {
            key: 'payments',
            value: "Payments",
            icon: <>
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
            </>
        },
        {
            key: 'settings',
            value: 'Settings',
            icon: <>
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </>
        },
    ])
    const [tab, setTab] = useState(tabList[tabList.length - 1])

    const checkPayerSheetUpdate = (data) => {
        if (data.paymentLink.state === 'private') {
            setTabList([
                {
                    key: 'payments',
                    value: "Payments",
                    icon: <>
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                    </>
                },
                {
                    key: 'payers_sheet',
                    value: 'Payers Sheet',
                    icon: <>
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                    </>
                },
                {
                    key: 'settings',
                    value: 'Settings',
                    icon: <>
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                    </>
                },
            ])
        }
    }

    const SearchPayment = async () => {
        const res = await Protected.get(`${BASE_URL}/api/payment/${code}?q=${search}`)
        console.log(res?.data?.data?.data)
        setData(res?.data?.data?.data)
        checkPayerSheetUpdate(res?.data?.data?.data)
    }

    const [opener, setOpener] = React.useState(false);

    const handleClickOpen = () => {
      setOpener(true);
    };
  
    const handleCloser = () => {
      setOpener(false);
    };

    const filterLink = (status,start,end)=>{
        let link = `${BASE_URL}/api/payment/${code}?q=${search}`
        if(status!==''&&end!==''&&start!==''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}&startDate=${start}&endDate=${end}`
            return link
        }if(status!==''&&start===''&&end===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}`
            return link
        }if(status!==''&&end!==''&&start===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&status=${status}&endDate=${end}`
            return link
        }if(end!==''&&start===''&&status===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&endDate=${end}`
            return link;
        }if(start!==''&&status===''&&end===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}`
            return link
        }
        if(start!==''&&end!==''&&status===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}&endDate=${end}`
            return link
        }
        if(start!==''&&end===''&&status!==''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}&status=${status}`
            return link
        }
        if(start===''&&end===''&&status===''){
            return link
        }
        if(start!==''&&end===''&&status===''){
            link = `${BASE_URL}/api/payment/${code}?q=${search}&startDate=${start}`
            return link
        }
    }

    const filterData = async()=>{
        setLoading(true)
        try {
            setLoading(true)
            const data = filterLink(status,start,end)
            const response = await Protected.get(data)
            console.log(response.data.data.data)  
            setLoading(false)    
            setData(response.data.data.data)
            checkPayerSheetUpdate(response.data.data.data)
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
    const handleKeyDown =async (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
           const data = filterLink(status,start,end)
           const response = await Protected.get(data)
           setData(response?.data?.data?.data)
           checkPayerSheetUpdate(response?.data?.data?.data)
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
            checkPayerSheetUpdate(response.data.data.data)
            if (response.data.data.data.paymentLink.state === 'private') {
                FetchPayersSheet()
            }
            setLoad(false)
            // setPaymentLink(response?.data?.data.paymentLink.link)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }

    const recallServerData = async () => {
        FetchLinks()
    }

    const FetchPayersSheet = async () => {
        setLoadPayersSheet(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/payment-link/${code}/payers-sheet`)
            console.log("payers sheet >> ", response.data.data)
            setPayersSheet(response.data.data)
            setLoadPayersSheet(false)
        } catch (error) {
            console.log(error)
            setLoadPayersSheet(false)
        }
    }


    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 15,
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




    return (
        <>
            <DashboardLayout>
                <div ref={topRef}>
                    <Titlebar  >
                        {load ?  <h2 className='text-xl'>{`Payment Links -`} <span><Skeleton variant="rectangular" width={210}  height={40} /></span></h2>:  <h2 className='text-xl'>{`Payment Links - ${data.paymentLink && data.paymentLink.name}`}</h2>}
                      
                        
                        <p className='text-xl text-[#00bf00] status-pill capitalize'>{data.paymentLink && data.paymentLink.status} {data.paymentLink && data.paymentLink.expires_at && '- 24th March 2023'}</p>
                    </Titlebar>
                    {
                        data.paymentLink ? (
                            <div className='w-[90%] mx-auto py-6' >
                                <Grid container spacing={2} className='mb-8'>
                                    <Grid item xs={12} md={5}>
                                        <div className='min-h-full c-single-payment-description'>
                                            <div className='pb-8'>
                                                <div className='font-bold'>Description:</div>
                                                <div className='italic text-gray-500'>{data.paymentLink.description}</div>
                                            </div>
                                            <div className='flex space-x-2 items-center mt-4'>
                                                {/* <IconButton>
                                                    <ContentPasteIcon onClick={copyText} />
                                                </IconButton> */}
                                                <ContentPasteIcon onClick={copyText} className="cursor-pointer" />
                                                <h2 className='break-all text-[13px] text-[#1d3329] font-bold'>{data.paymentLink.link}</h2>
                                            </div>
                                            <div className='mt-2'>
                                                {
                                                    data.paymentLink.expected_number_of_payments ? (
                                                        <div className='pb-2 w-[90%] rounded-lg'>
                                                            <BorderLinearProgress variant="determinate" value={((data.recievedAmount / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100) > 100 ? 100 : ((data.recievedAmount / (data.paymentLink.amount * data.paymentLink.expected_number_of_payments)) * 100)} />
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
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
                                                                <div className='content' style={{marginTop: '0'}}>
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

                                <Tabs tabList={tabList} currentTab={tabList[tabList.length - 1]} switcher={(tab) => setTab(tab)} />



                                {
                                    (tab.key === 'payments') ? 
                                    (
                                        !data.payments ?
                                        (<>
                                            <div className='flex justify-center items-center h-[30vh]'>
                                                <h2 className='text-center text-2xl'>No  Payments made yet</h2>
                                            </div>
                                        </>) :
                                        (<div className='py-6'>
                                            <PaymentTable loading={loading} opener={opener} setOpener={setOpener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} data={data} onChange={onChange} handleKeyDown={handleKeyDown}  start={start} end={end} setStart={setStart} setEnd={setEnd} status={status} setStatus={setStatus} filterData={filterData}/>
                                        </div>)
                                        
                                    ) : ''
                                }
                                {
                                    (tab.key === 'payers_sheet') ? 
                                    (
                                        <div className='py-6'>
                                            <PayersSheetTable
                                                loading={loadPayersSheet}
                                                opener={opener}
                                                setOpener={setOpener}
                                                handleClickOpen={handleClickOpen}
                                                handleCloser={handleCloser}
                                                data={data}
                                                payersSheet={payersSheet}
                                                onChange={onChange}
                                                handleKeyDown={handleKeyDown}
                                                start={start}
                                                end={end}
                                                setStart={setStart}
                                                setEnd={setEnd}
                                                status={status}
                                                setStatus={setStatus}
                                                filterData={filterData}
                                            />
                                        </div>
                                    ) : ''
                                }
                                {
                                    (tab.key === 'settings') ? 
                                    (
                                        <PaymentLinkSettings
                                            linkData={linkData}
                                            paymentLink={data.paymentLink}
                                            recallServerData={recallServerData}
                                        />
                                    ): ''
                                }

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