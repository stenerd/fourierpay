import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Divider, CircularProgress } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import Titlebar from '../components/TitleBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Fields from '../components/Fields';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import Protected, { BASE_URL } from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import NotificationsIcon from '@mui/icons-material/Notifications';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PDFGenerator from '../components/Reciept';
import { HISTORY, TRANSACTION_HISTORY } from '../redux/DashboardSlice';
import GenericAlertModal from '../components/GenericAlertModal';
import StatusBadge from '../components/atom/web/StatusBadge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const PaymentReciept = () => {
    let { code, reference } = useParams();
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const [paymentLink, setPaymentLink] = React.useState({});
    const [payment, setPayment] = React.useState({});
    const [ref, setRef] = React.useState(reference ? reference : "")
    const [loading, setLoading] = React.useState(false)
    const {transactions} = useSelector((state)=>state.dashboard)

    console.log(transactions)

    const downloadRef = React.useRef(null)

    const downloadFunc = () => {
        console.log(downloadRef)
        // downloadRef.current.click()
        console.log('clicking me')
    }

    const fetchSingleTransaction = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/payment/reciept/${ref}`)
            dispatch(TRANSACTION_HISTORY(response?.data?.data))
            console.log(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const FetchPaymentLink = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/payment-link/${code}`)
            console.log('ppp >> ', response.data.data)
            setPaymentLink(response.data.data)
            dispatch(HISTORY(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    const FetchPayment = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/payment/reciept/${reference}`)
            console.log('payment >> ', response.data.data)
            setPayment(response.data.data)
            dispatch(TRANSACTION_HISTORY(response.data.data))
        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        FetchPaymentLink()
        FetchPayment()
    }, [])

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 180, 150);
                // pdf.output('dataurlnewwindow');
                pdf.save("payment-recipt.pdf");
            })
            ;
    }



    return (
        <>
            {/* <div className='min-h-screen'>
                <div className='px-4 lg:px-16 py-8 lg:py-16 mx-auto'>
                    <div className='flex mx-auto min-h-[85vh]'>

                    
                        <div className='w-[90%] lg:w-[70%] mx-auto c-make-payment flex visible' id='divToPrint'>
                            <div className='w-[35%] c-reciept-topics p-[3rem] relative'>
                                <div className='text-white pb-8'>
                                    <p className='text-lg text-[#d6d8d5] font-medium'>Reciept for</p>
                                    <p className={(payment.in_entity_id && payment.in_entity_id.unique_answer && (payment.in_entity_id.unique_answer.length > 15)) ? 'text-xl font-bold' : 'text-3xl font-bold'}>
                                        {payment.in_entity_id ? payment.in_entity_id.unique_answer : 'Nil'}
                                    </p>
                                </div>
                                <div className='text-white py-7 border-b-[1px] border-[#a3a3a34d] flex'>
                                    <div className='w-[15%] text-[#d6d8d5] flex items-center'>
                                        <AccountBalanceWalletIcon />
                                    </div>
                                    <div className='w-[85%]'>
                                        <p className='text-lg text-[#d6d8d5] font-medium'>Amount</p>
                                        <p className='font-bold text-2xl' style={{color: '#97f675'}}>₦ {Intl.NumberFormat('en-US').format(payment.amount || 0)}</p>
                                        <small className='font-bold'>Charges - ₦ {Intl.NumberFormat('en-US').format(payment.in_entity_id ? payment.in_entity_id.charges : 0)}</small>
                                    </div>
                                   
                                </div>
                                <div className='text-white py-7 border-b-[1px] border-[#a3a3a34d] flex'>
                                    <div className='w-[15%] text-[#d6d8d5] flex items-center'>
                                        <CalendarMonthIcon />
                                    </div>
                                    <div className='w-[85%]'>
                                        <p className='text-lg text-[#d6d8d5] font-medium'>Date</p>
                                        <p className='font-bold text-2xl'>{payment.updatedAt ? moment(payment.updatedAt).format('MMM DD YYYY') : 'Nil'}</p>
                                    </div>
                                   
                                </div>
                                <div className='text-white py-7 border-b-[1px] border-[#a3a3a34d] flex'>
                                    <div className='w-[15%] text-[#d6d8d5] flex items-center'>
                                        <QrCode2Icon />
                                    </div>
                                    <div className='w-[85%]'>
                                        <p className='text-lg text-[#d6d8d5] font-medium'>Reference</p>
                                        <p className='font-bold text-2xl'>{reference}</p>
                                    </div>
                                   
                                </div>
                                <div className='text-white py-7 flex'>
                                    <div className='w-[15%] text-[#d6d8d5] flex items-center'>
                                        <ReceiptIcon />
                                    </div>
                                    <div className='w-[85%]'>
                                        <p className='text-lg text-[#d6d8d5] font-medium'>Status</p>
                                        <p className='font-bold text-2xl uppercase'>{payment.status ? payment.status : 'Nil'}</p>
                                    </div>
                                   
                                </div>

                                <div className='absolute bottom-[3rem] w-[75%]'>
                                    <button className='bg-[#97f675] w-full rounded-md py-4 px-12 font-bold text-xl text-[#234244]' onClick={() => printDocument()}>
                                        <CloudDownloadIcon className='mb-1'/>
                                        <span className='pl-2'>Download Now</span>
                                    </button>
                                </div>
                            </div>
                            <div className='w-[65%] flex flex-col px-[3rem] pt-[4rem] relative'>
                                <div className='w-full'>
                                    <form className='w-full'>
                                        <div className='flex justify-between mb-12'>
                                            <div className='w-[8rem]'>
                                                <img src="/images/five.svg" alt='alt' />
                                            </div>
                                            <div className='flex flex-col items-end justify-end'>
                                                <span className='text-gray-500 font-semibold'>{moment(new Date()).format('ddd MMM DD, YYYY -  hh:mm:ss A')}</span>
                                            </div>
                                        </div>

                                        <div className='px-5 py-5 c-reciept-summary'>
                                            <p className='uppercase font-bold text-gray-700'>{paymentLink.creator_id ? `${paymentLink.creator_id.firstname} ${paymentLink.creator_id.lastname}` : 'Nill'}</p>
                                            <p className='capitalize font-bold text-gray-500'>{paymentLink.name} ({code})</p>
                                        </div>

                                        <div className='relative my-8'>
                                            <h1 className='text-gray-700 text-lg font-bold home absolute divider-title bg-[#f8faf7]'>Description</h1>
                                            <Divider className='creat-payment-divider' />
                                        </div>
                                        <span className='font-bold text-gray-500 inline-block w-full text-sm italic'>{paymentLink.description}</span>
                                        <div className='relative mt-12 mb-8'>
                                            <h1 className='text-gray-700 text-lg font-bold home absolute divider-title bg-[#f8faf7]'>Personal Information</h1>
                                            <Divider className='creat-payment-divider' />
                                        </div>
                                        {
                                            payment.in_entity_id && payment.in_entity_id.form && payment.in_entity_id.form.length ? (
                                                <div className='py-6'>
                                                    <Grid container spacing={2}>
                                                        { payment.in_entity_id.form.map((link, index) => (
                                                            <Grid item xs={12} md={6}  className='' key={index}>
                                                                <small className='font-bold text-gray-500'>{link.field_name}</small>
                                                                <h2 className='text-lg font-bold mt-0'>{link.answer || 'Nil'}</h2>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                   
                                                </div>
                                            ) : ''
                                        }
                                        
                                        
                                    </form>
                                </div>

                                <div className='absolute bottom-[3rem]'>
                                    <Link to={`/pay/${code}`}>
                                        <small className='text-[#0574e2] underline'>app.fourierpay.com/pay/{code}</small>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    
                    </div>
                </div>


            </div> */}

            <div className='min-h-screen hidden md:block bg-[#EAFDE3] c-reciept'>
                <div className='px-24 py-12'>
                    <div className=''>
                        <div className='w-[8rem]'>
                            <img src="/images/image-three.svg" alt='logo' />
                        </div>
                    </div>

                    <div className='flex pt-20 px-4'>
                        <div className='w-3/6 pr-16 flex flex-col justify-center reciept-header'>
                            <div>
                                <h1>Transaction Lookup</h1>
                                <p className='sub-text w-[80%] pt-2'>Enter your transaction reference to check  transaction details  and download your receipt.</p>
                                <div className='pr-12 py-6'>
                                    <input required value={ref} onChange={(e) => setRef(e.target.value)} className="pb-2 px-4 w-full outline-none c-text-input" placeholder='Payment Reference' />
                                </div>

                                <div className='pt-0'>
                                    <button className='bg-[#97f675] font-bold rounded-md py-4 px-12 text-[#234244]' onClick={() => fetchSingleTransaction()}>
                                        <span className='pl-2'>{loading ? (
                                            <CircularProgress color="success" />
                                        ) : "Search"}</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className='w-3/6'>
                            <div className='bg-white card py-6 px-8'>
                                <div className='flex justify-between pb-4'>
                                    <div className='flex flex-col justify-center'>
                                        <div className=''>
                                            <p className='font-semibold pb-8 c-fs-13'>Transaction Details</p>
                                            <p className=''>{transactions?.payment_link?.name}</p>
                                            <p className='text-sm'>{transactions?.payment_link.description}</p>
                                        </div>
                                    </div>
                                    <div className='qr-code'>
                                        <img src="/images/qrcode.png" alt='logo' />
                                    </div>
                                </div>

                                <div className=' py-4'>
                                    <div className='flex justify-between py-2'>
                                        <p>{transactions?.transaction?.in_entity_id?.unique_field}</p>
                                        <p>{transactions?.transaction?.in_entity_id?.unique_answer}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p>Transaction Reference</p>
                                        <p>{transactions?.transaction?.reference}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p>Status</p>
                                        <p>{transactions?.transaction?.status}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p>Date</p>
                                        <p>{moment(transactions?.transaction?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p>Time</p>
                                        <p>{moment(transactions?.transaction?.createdAt).format('hh:mm:ss A')}</p>
                                    </div>
                                    <div className='flex justify-between py-2'>
                                        <p>Amount</p>
                                        <p>{transactions?.transaction?.amount}</p>
                                    </div>
                                    <div className='flex justify-between py-2 w-full' onClick={() => setOpen(true)}>
                                        {/* <p>Amount</p> */}
                                        <p className='text-blue-400 self-end underline cursor-pointer text-right'>See more</p>
                                    </div>

                                    {/* <div className='flex justify-between pt-2 pb-4'>
                                        <p>Payment Method</p>
                                        <p>Credit Card</p>
                                    </div> */}
                                    <GenericAlertModal opened={open} handleOpened={handleOpen} handleClosed={handleClose} setOpen={setOpen}>
                                        <div>
                                            <h2 className='text-center font-bold text-xl'>Transaction Details</h2>
                                        </div>
                                        <div className='py-3 divide-y-2'>
                                            {/* <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1> */}
                                            <div className='flex justify-between items-center py-3'>
                                                <h2 className='text-gray-400'>Status</h2>
                                                <StatusBadge status={payment?.transaction?.status} />
                                            </div>
                                            <div className='flex justify-between items-center py-3'>
                                                <h2 className='text-gray-400'>Reference</h2>
                                                <p className='font-bold'>{reference}</p>
                                            </div>
                                            {payment?.transaction?.in_entity_id?.form.map((tx, index) => (
                                                <div className='flex justify-between items-center py-3' key={index}>
                                                    <h2 className='text-gray-400 capitalize'>{tx?.field_name}</h2>
                                                    <p className='font-bold text-sm'>{tx?.answer}</p>
                                                </div>
                                            ))}
                                            <div className='flex justify-between items-center py-3'>
                                                <h2 className='text-gray-400'>Date</h2>
                                                <p className='font-bold text-sm'>{moment(payment?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                                            </div>
                                            <div className='flex justify-between items-center py-3'>
                                                <h2 className='text-gray-400'>Amount</h2>
                                                <p className='font-bold text-sm'>{paymentLink?.amount}</p>
                                            </div>
                                            {/* <div className='flex justify-between items-center py-3'>
                                                <h2 className='text-gray-400'>Payment Method</h2>
                                                <p className='font-bold text-sm'>{recentTransaction?.type}</p>
                                            </div> */}

                                            {/* <h2>Amount :</h2> */}
                                        </div>
                                    </GenericAlertModal>

                                    <div className='pt-8'>
                                        <div className=''>
                                            {/* <button className='bg-white w-full rounded-md py-2 px-12 font-bold text-xl text-[#464E4D] ' onClick={() => downloadFunc}>
                                                <CloudDownloadIcon className='mb-1' />
                                                <span className='pl-2 text-sm'>Download PDF Receipt</span>
                                            </button> */}
                                            <PDFGenerator downloadRef={downloadRef} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#EAFDE3] block md:hidden min-h-screen'>
                <div className='py-10 px-8'>
                    <div className='w-[8rem]'>
                        <img src="/images/image-three.svg" alt='logo' />
                    </div>
                    <div className='bg-white py-5 mt-10 min-h-[70vh] shadow-lg rounded-3xl'>
                        <div className="py-2 flex flex-col items-center px-3">
                            <div className=''>
                                <img src="/images/qrcode.png" style={{ width: 100, height: 100 }} alt='logo' />
                            </div>
                            <div>
                                <h2 className='text-center text-2xl font-bold'>Transactions Details</h2>
                                <div className='divide-y-2'></div>
                                <div className="py-5">
                                    <div className='flex justify-between py-2'>
                                        <p className='text-gray-400'>Transaction Reference</p>
                                        <p className='font-bold'>{reference}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p className='text-gray-400'>Status</p>
                                        <p className='font-bold'>{payment?.transaction?.status}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p className='text-gray-400'>Amount</p>
                                        <p className='font-bold'>{paymentLink?.amount}</p>
                                    </div>

                                    <div className='flex justify-between py-2'>
                                        <p className='text-gray-400'>Date</p>
                                        <p className='font-bold'>{moment(payment?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                                    </div>

                                    {payment?.transaction?.in_entity_id?.form.map((tx, index) => (
                                        <div className='flex justify-between items-center py-3' key={index}>
                                            <h2 className='text-gray-400 capitalize'>{tx?.field_name}</h2>
                                            <p className='font-bold text-sm'>{tx?.answer}</p>
                                        </div>
                                    ))}

                                    <div className='flex justify-between py-2'>
                                        <p className='text-gray-400'>Time</p>
                                        <p className='font-bold'>{moment(payment?.createdAt).format('hh:mm:ss A')}</p>
                                    </div>

                                    <div className='py-2'>
                                        <Divider />
                                    </div>
                                    <div className='py-2'>
                                        {/* <button className='bg-white  border border-gray-300 w-full rounded-md py-2 px-12 font-bold text-xl text-[#464E4D] ' onClick={() => downloadFunc}>
                                            <CloudDownloadIcon className='mb-1' />
                                            <span className='pl-2 text-sm'>Download PDF Receipt</span>
                                        </button> */}
                                        <PDFGenerator downloadRef={downloadRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-5 mt-2 w-full'>
                        <Link to="/">
                            <button className='bg-[#97F675] w-full py-4 px-4 rounded-md italic'>
                                <div className='space-x-6 flex justify-center  items-center'>
                                    <ArrowBackIcon />
                                    Back to Home
                                </div>
                            </button>
                        </Link>
                    </div>
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

        </>
    )
}
export default PaymentReciept;