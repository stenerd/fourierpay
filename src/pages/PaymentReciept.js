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
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Divider } from '@mui/material';
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



const PaymentReciept = () => {
    let { code, reference } = useParams();
    const dispatch = useDispatch()
    const [paymentLink, setPaymentLink] = React.useState({});
    const [payment, setPayment] = React.useState({});

    const FetchPaymentLink = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/payment-link/${code}`)
            console.log('ppp >> ', response.data.data)
            setPaymentLink(response.data.data)
           
        } catch (error) {
            console.log(error)
        }

    }

    const FetchPayment = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/payment/reciept/${reference}`)
            console.log('payment >> ', response.data.data)
            setPayment(response.data.data)
           
        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(()=>{
        FetchPaymentLink()
        FetchPayment()
    },[])

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
             <div className='min-h-screen'>
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
                                        <p className='font-bold text-2xl'>₦ {Intl.NumberFormat('en-US').format(payment.amount || 0)}</p>
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
                                            <h3 className='text-2xl font-bold text-[#234244]'>Fourier<span className='text-[#97f675]'>Pay</span></h3>
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
                                        {/* <p className='font-bold text-gray-700 text-lg mt-4'>₦ {Intl.NumberFormat('en-US').format(paymentLink.amount || 0)}</p> */}

                                        <div className='relative mt-12 mb-8'>
                                            <h1 className='text-gray-700 text-lg font-bold home absolute divider-title bg-[#f8faf7]'>Payment Link Answers</h1>
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

                                        {/* <div className='pb-0 pt-1 px-2 c-reciept-alert mt-8'>
                                            <p className='text-gray-700 text-xs italic'>
                                                <NotificationsIcon className='pb-[0.4rem]' />
                                                <span className='font-semibold pl-1'>Note: </span>Don't panic, It may take few moment for your transaction to be successful</p>
                                        </div> */}
                                        
                                        
                                    </form>
                                </div>

                                <div className='absolute bottom-[3rem]'>
                                    <Link to="/pay/lFfQMp5Ojwa9YXss4l8WBuvLbORreN">
                                        <small className='text-[#0574e2] underline'>localhost:4000/pay/{code}</small>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    
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