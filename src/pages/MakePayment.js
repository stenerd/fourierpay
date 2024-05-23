import * as React from 'react';
import dayjs from 'dayjs';
import { FormControl, Grid, Divider, Backdrop, Dialog, DialogActions, IconButton, DialogTitle, DialogContent, Button, CircularProgress } from '@mui/material';


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
import { PaystackButton, PaystackConsumer } from 'react-paystack'
import moment from 'moment'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from '../components/SideBar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { TRANSACTION_HISTORY } from '../redux/DashboardSlice';
// import XIcon from '@mui/icons-material/X';

const MakePayment = () => {
    let { code } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [tab, setTab] = React.useState(1);
    const [tab_lg, setTabLg] = React.useState(1);
    const [paymentData, setPaymentData] = React.useState({});
    const [paymentLink, setPaymentLink] = React.useState({});
    const [result, setResult] = React.useState({});
    const paystackButtonRef = React.useRef(null);
    const [delay, setDelay] = React.useState(false)
    const [removeDownloadButton, setRemoveDownloadButton] = React.useState(false)
    const [unique_object, setUniqueObject] = React.useState()
    const [unique_data, setUniqueData] = React.useState()


    // Modal Code
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const navigateToPageOne = () => {
        navigate('/page-one');
        handleCloseModal();
    };

    const navigateToPageTwo = () => {
        navigate('/page-two');
        handleCloseModal();
    };

    const handleClosed = () => {
        setDelay(false)
    }
    const FetchPaymentLink = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/payment-link/${code}`)
            console.log('ppp >> ', response.data.data)
            setPaymentLink(response.data.data)
            const data = await response?.data?.data?.form.find((form) => response?.data?.data?.unique_field === form.field_name)
            setUniqueObject(data)
        } catch (error) {
            console.log(error)
        }
    }

    const verifyPayment = async () => {
        setLoading(true)
        try {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}/api/payment/verify/${code}/${unique_data}`)

            const response = await axios.get(`${BASE_URL}/api/payment/reciept/${res.data.data.transaction_id.reference}`)
            console.log('payment >> ', response.data.data)
            // setPayment(response.data.data)
            await dispatch(TRANSACTION_HISTORY(response.data.data))

            await navigate(`/reciept/${res.data.data.transaction_id.reference}`)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
            // console.log(error.response.data.message)
        }
    }





    React.useEffect(() => {
        FetchPaymentLink()
        handleOpenModal();
    }, [])

    const downloadMobile = () => {
        setRemoveDownloadButton(true)
        printDocument()
        setRemoveDownloadButton(false)
        setTab(1)
        toast.success('Transaction Receipt Downloading 🚀', {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleFieldChanges = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        setPaymentLink((prev) => {
            let new_data = [...prev.form]
            new_data[index] = {
                ...new_data[index],
                'answer': e.target.value
            }

            if (e.target.value) {
                delete new_data[index].error
            }
            return {
                ...prev,
                form: new_data
            };
        })
    }

    const validateInput = () => {

        let check = true

        const validatedForm = []

        for (let i = 0; i < paymentLink.form.length; i++) {
            const each = { ...paymentLink.form[i] };

            delete each.error;

            if (each.required && !each.answer) {
                each.error = `${each.field_name} is required`
                check = false
            }

            validatedForm.push(each)

        }

        setPaymentLink(prev => ({
            ...prev,
            form: validatedForm
        }))

        return check
    }

    const config = {
        ...paymentData
    };

    // you can call this function anything
    const handleSuccess = async (reference) => {
        setDelay(true)
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        try {
            const result = await axios.post(`${BASE_URL}/api/payment/verify`, {
                reference: paymentData.reference
            })
            setDelay(true)
            console.log('result >> ', result)
            if (tab === 2) {
                setResult(result.data.data)
                console.log(result)
                // setDetails(result.data.data)
                setTab(3)
                setDelay(false)
            } else {
                navigate(`/reciept/${paymentData.reference}`)
            }
            // response_description
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
            if (tab === 2) {
                setTab(3)
            }
        }
    };

    // you can call this function anything
    const handleClose = (reference) => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        // console.log('closed >> ', paymentData, reference)

        try {
            axios.put(`${BASE_URL}/api/payment/abandon`, {
                reference: paymentData.reference
            })
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
    }

    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: (reference) => handleSuccess(reference),
        onClose: (reference) => handleClose(reference)
    };


    const openPaystack = async (e, initializePayment) => {

        e.preventDefault()

        e.stopPropagation()

        console.log("paymentData >> ", paymentData)

        initializePayment(handleSuccess, handleClose)

    }

    const makePaymentHandler = async (e) => {

        e.preventDefault()
        e.stopPropagation()
        setLoading(true)
        const check = validateInput()
        if (!check) {
            setLoading(false)
            return;
        }
        try {
            const initiateTrnx = await axios.post(`${BASE_URL}/api/payment/initialize`, {
                amount: paymentLink.amount,
                payment_link_id: paymentLink._id,
                form: paymentLink.form
            })

            console.log('initiateTrnx >> ', initiateTrnx.data.data)

            setPaymentData((prev) => ({ ...initiateTrnx.data.data }))
            setValue((prev => prev ? 0 : 1))

            setDelay(true)

            setTimeout(() => {
                paystackButtonRef.current.click()
                setDelay(false)
            }, 2000);
            // console.log('done successfully')
            // ref.current.open();
            // setLoading(false)
            // toast.success('Link Created!', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            setLoading(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
    }

    const openVerifyPayment = async () => {
        return
    }

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 180, 280);
                // pdf.output('dataurlnewwindow');
                pdf.save("payment-recipt.pdf");
            })
            ;
        console.log('printed')
    }

    const copyText = async (link) => {
        try {
            await navigator.clipboard.writeText(link)
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
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleDownload = () => {
        console.log('updated as payment')
        setTab(1)
        printDocument()
        console.log('analyzing data....')
        toast.success('Transaction Receipt Downloading 🚀', {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }



    return (
        <>
            {/* <div className='block lg:hidden'>
            
        </div> */}
            <div className='block md:hidden relative'>
                <div className='cm-mobile-make-payment relative' >
                    {delay && (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={delay}
                        // onClick={handleClosed}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                    <div className='relative px-6 py-6 w-full'>
                        <Link to='/'>
                            {/* <img src='/images/logo-header.svg' className='absolute' alt="alt-img" /> */}
                            <img src='/images/image-two.svg' width="110" className='absolute' alt="alt-img" />

                        </Link>
                        {/* <p className='text-center text-white text-2xl font-bold'>Pay</p> */}

                    </div>
                    <div className='relative px-6 pt-6 w-full'>
                        <div className='w-full p-4 flex cm-mobile-make-payment-topic'>
                            <div className='flex items-center justify-center'>
                                <img src='/images/make-payment-icon.svg' alt="alt-img" />
                            </div>
                            <div className='pl-4 w-full'>
                                <p className='font-bold text-white text-lg'>{paymentLink.name}</p>
                                <p className='pt-0 flex justify-between w-full'>
                                    <p className='font-medium text-[#D3D4D4] text-sm c-elipses'>By {paymentLink.creator_id ? `${paymentLink.creator_id.firstname} ${paymentLink.creator_id.lastname}` : 'Nill'}</p>
                                    <p className='font-bold text-[#97F675] text-sm'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.amount || 0)}</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='relative px-6 pt-8 w-full'>
                        <p className='text-[#D3D4D4] font-medium text-sm uppercase'>Description</p>
                        <p className='text-white pt-0 font-medium'>
                            {paymentLink.description}
                        </p>
                    </div>

                    <div className='flex'>
                        <div className='relative px-6 pt-6 w-full flex-1'>
                            <p className='text-[#D3D4D4] font-medium text-sm uppercase'>Status</p>
                            <p className='text-white pt-0 font-medium capitalize'>
                                {paymentLink.status}
                            </p>
                        </div>

                        <div className='relative px-6 pt-6 w-full flex-1'>
                            <p className='text-[#D3D4D4] font-medium text-sm uppercase'>VAT</p>
                            <p className='text-white font-medium pb-0'>
                                ₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges || 0)}
                            </p>
                        </div>
                    </div>

                    <div className='relative px-6 pt-6 w-full'>
                        <p className='text-[#D3D4D4] font-medium text-sm uppercase'>{paymentLink.expires_at && 'Expiry Date'}</p>
                        <p className='text-white pb-4 font-medium cm-mobile-make-payment-divider'>
                            {paymentLink.expires_at && moment(paymentLink.expires_at).format('dddd, DD MMMM YYYY')}
                        </p>
                    </div>

                    <div className='relative px-6 pt-6 w-full'>
                        <p className='text-center pb-2'>
                            <span className='text-white font-medium text-lg'>₦ &nbsp;</span>
                            <span className='text-[#97F675] font-bold text-3xl'>{Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges + paymentLink.amount || 0)}</span>
                        </p>
                    </div>
                    {
                        (tab === 1) ? (
                            <div className='absolute cm-mobile-make-payment-panel'>
                                <div className='pt-3 flex justify-center'>
                                    <span className='controller'></span>
                                </div>
                                <div className='p-6 flex flex-col items-between justify-between' style={{ minHeight: '90%' }}>
                                    <div className='c-bg-primary-light pt-4 mb-3 text-center bounce ' onClick={() => setTab(2)}> Make New Payment </div>
                                    <div className='pt-4 mb-12 top-section' onClick={() => setTab(3)}> Verify Existing Payment </div>
                                    <button className='cm-buttom hidden' onClick={() => setTab(2)}>Pay ₦{Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges + paymentLink.amount || 0)}</button>
                                </div>
                            </div>
                        ) : ''
                    }
                    {
                        (tab === 2) ? (
                            <div className='absolute cm-mobile-make-payment-panel info'>
                                <div className='pt-3 flex justify-center'>
                                    <span className='controller'></span>
                                </div>
                                <div className='p-6 flex flex-col items-between justify-between' style={{ minHeight: '90%' }}>
                                    <div className='pt-0 overflow-y-scroll'>
                                        <span className='cursor-pointer' onClick={() => setTab(1)}>
                                            <KeyboardBackspaceOutlinedIcon style={{ color: '#0067ffe3' }} />
                                            <span className='pl-1 text-[#0067ffe3] font-bold'>Back</span>
                                        </span>

                                        {
                                            paymentLink.form && paymentLink.form.length ? (
                                                <div className='mt-4 mb-8'>
                                                    <Grid container spacing={2}>
                                                        {
                                                            paymentLink.form.map((link, index) => (
                                                                <Grid item xs={12} key={index}>
                                                                    <div className='flex flex-col space-y-3 mb-4'>
                                                                        <label for={'for' + index + 1} className='text-sm font-bold block mt-0 mb-0 text-gray-700'>{link.field_name}</label>
                                                                        {
                                                                            link.field_type === 'text' ? (
                                                                                <input required placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="pb-2 px-4 w-full outline-none c-text-input" />
                                                                            ) : (
                                                                                <select id={'for' + index + 1} placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="pb-2 px-4 w-full outline-none c-text-input">
                                                                                    <option value={''}>Select {link.field_name} </option>
                                                                                    {
                                                                                        link.options.map((option, i) => (
                                                                                            <option key={option + i} value={option}>{option} </option>
                                                                                        ))
                                                                                    }
                                                                                </select>
                                                                            )
                                                                        }
                                                                        {
                                                                            link.error ? (
                                                                                <small className='c-pay-error'>{link.error}</small>
                                                                            ) : ''
                                                                        }
                                                                    </div>
                                                                </Grid>
                                                            ))
                                                        }
                                                    </Grid>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                    <button className='cm-buttom' onClick={(e) => makePaymentHandler(e)}> {delay ? `Loading....` : `Pay ₦ ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges + paymentLink.amount || 0)}`}</button>
                                </div>
                            </div>
                        ) : ''
                    }
                    {
                        (tab === 3) ? (
                            <div className='absolute cm-mobile-make-payment-panel info'>
                                <div className='pt-3 flex justify-center'>
                                    <span className='controller'></span>
                                </div>
                                <div className='p-6 flex flex-col items-between justify-between' style={{ minHeight: '90%' }}>
                                    <div className='pt-0 overflow-y-scroll'>
                                        <span className='cursor-pointer' onClick={() => setTab(1)}>
                                            <KeyboardBackspaceOutlinedIcon style={{ color: '#0067ffe3' }} />
                                            <span className='pl-1 text-[#0067ffe3] font-bold'>Back</span>
                                        </span>
                                        {
                                            unique_object ? (
                                                <div className='mt-4 mb-8'>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>

                                                            <div className='flex flex-col space-y-3 mb-4'>
                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>{unique_object.field_name}</label>
                                                                {
                                                                    unique_object.field_type === 'text' ? (
                                                                        <input required placeholder={unique_object.field_name} name={unique_object.field_name} onChange={(e) => setUniqueData(e.target.value)} className="pb-2 px-4 w-full outline-none c-text-input" />
                                                                    ) : (
                                                                        <select id={'for'} placeholder={unique_object.field_name} name={unique_object.field_name} className="pb-2 px-4 w-full outline-none c-text-input">
                                                                            <option value={''}>Select {unique_object.field_name} </option>
                                                                            {
                                                                                unique_object.options.map((option, i) => (
                                                                                    <option key={option + i} onChange={(e) => setUniqueData(e.target.value)} value={option}>{option} </option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    )
                                                                }
                                                                {
                                                                    unique_object?.error ? (
                                                                        <small className='c-pay-error'>{unique_object?.error}</small>
                                                                    ) : ''
                                                                }
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                   
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                    <button className='cm-buttom' onClick={() => verifyPayment()}>{loading ? "Processing..." : 'Verify Payment'}</button>
                                </div>
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
            </div>
            <div className='hidden md:block'>
                <div className='min-h-screen'>
                    {delay && (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={delay}
                        // onClick={handleClosed}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                    {/* Mobile view  */}
                    <div className='w-[100vw] flex gap-10'>
                        <div className="w-[32%]">
                            {/* <Sidebar /> */}
                            <div className="min-h-screen w-[32%] shadow-lg cm-mobile-make-payments fixed">
                                <div className="py-8 px-12 flex flex-col min-h-screen relative">
                                    { }
                                    <div className=''>
                                        <Link to="/">
                                            {/* <h2 className='text-2xl fourier w-5/6 px-2 mx-auto text-white font-semibold pt-4'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                                            <div className='mx-auto'>
                                                <div className='w-[8rem]'>
                                                    <img src="/images/image-two.svg" alt='logo' />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='pt-12'>
                                        {/* <div className='bg-[#39c531] mt-5 rounded-lg py-7 px-3 cursor-pointer flex space-x-3 items-center'>
                                            <img src="/images/Frame 734.png" alt="img" />
                                            <p className='font-bold break-all text-white text-xl uppercase '>{paymentLink.creator_id ? `${paymentLink.creator_id.firstname}` : 'Nill'}</p>
                                        </div> */}



                                        <div className='w-full p-4 flex cm-mobile-make-payment-topic'>
                                            <div className='flex items-center justify-center'>
                                                <img src='/images/make-payment-icon.svg' alt="alt-img" />
                                            </div>
                                            <div className='pl-4 w-full'>
                                                <p className='font-bold text-white text-lg'>{paymentLink.name}</p>
                                                <p className='pt-0 flex justify-between w-full'>
                                                    <p className='font-medium text-[#D3D4D4] text-sm c-elipses'>By {paymentLink.creator_id ? `${paymentLink.creator_id.firstname} ${paymentLink.creator_id.lastname}` : 'Nill'}</p>
                                                    <p className='font-bold text-[#97F675] text-sm'>₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.amount || 0)}</p>
                                                </p>
                                            </div>
                                        </div>

                                        <div className=''>

                                            <div className='relative pt-8 w-full'>
                                                <p className='text-[#D3D4D4] font-medium text-sm uppercase'>Description</p>
                                                <p className='text-white pt-0 font-medium'>
                                                    {paymentLink.description}
                                                </p>
                                            </div>

                                            <div className='flex'>
                                                <div className='relative pt-6 w-full flex-1'>
                                                    <p className='text-[#D3D4D4] font-medium text-sm uppercase'>Status</p>
                                                    <p className='text-white pt-0 font-medium capitalize'>
                                                        {paymentLink.status}
                                                    </p>
                                                </div>

                                                <div className='relative pt-6 w-full flex-1'>
                                                    <p className='text-[#D3D4D4] font-medium text-sm uppercase'>VAT</p>
                                                    <p className='text-white font-medium pb-0'>
                                                        ₦ {Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges || 0)}
                                                    </p>
                                                </div>
                                            </div>



                                            <div className='relative pt-6 pb-4 w-full'>
                                                <p className='text-[#D3D4D4] font-medium text-sm uppercase'>{paymentLink.expires_at && 'Expiry Date'}</p>
                                                <p className='text-white pb-4 font-medium cm-mobile-make-payment-divider'>
                                                    {paymentLink.expires_at && moment(paymentLink.expires_at).format('dddd, DD MMMM YYYY')}
                                                </p>
                                            </div>

                                            <div className='relative px-6 pt-6 w-full'>
                                                <p className='text-center pb-2'>
                                                    <span className='text-white font-medium text-lg'>₦ &nbsp;</span>
                                                    <span className='text-[#97F675] font-bold text-3xl'>{Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(paymentLink.charges + paymentLink.amount || 0)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <Dialog open={openModal} onClose={handleCloseModal}>
                                            <div className='p-4 hidden md:block'>
                                                <DialogTitle ><span className='font-bold text-xl'> {"Select An Action"} </span></DialogTitle>
                                                <DialogContent>
                                                    <p> Make a new payment or verify a completed payment.</p>
                                                </DialogContent>
                                                <DialogActions>
                                                    <button className='c-bg-primary-light' onClick={() => { setTabLg(1); setOpenModal(false) }} >
                                                        {loading ? 'Processing.....' : 'Make Payment'}
                                                    </button>

                                                    {/* <p className='font-medium text-[#D3D4D4] text-sm c-elipses'>If youve made a payment already , Click to very</p> */}

                                                    <button className='c-bg-secondary' onClick={() => { setTabLg(2); setOpenModal(false) }} >
                                                        {loading ? 'Processing.....' : 'Verify Existing Payment'}
                                                    </button>

                                                </DialogActions>
                                            </div>
                                        </Dialog>
                                    </div>
                                    {/* <div className="py-8 mt-10 px-6 flex-1">
                                        <div>
                                            <h2 className='text-white font-bold'>Share link to your cirle</h2>
                                            <div className="py-4 flex space-x-2 justify-between">
                                               
                                                <div className='flex flex-col space-y-1'>
                                                    <IconButton>
                                                        <FacebookIcon className="text-blue-400" />
                                                    </IconButton>
                                                    <p className="text-white text-[8px]">facebook</p>
                                                </div>
                                                <div className='flex flex-col space-y-1'>
                                                    <IconButton>
                                                        <InstagramIcon className="text-red-400" />
                                                    </IconButton>
                                                    <p className="text-white text-[8px]">Instagram</p>
                                                </div>
                                                <div className='flex flex-col space-y-1'>
                                                    <IconButton>
                                                        <TwitterIcon className='text-blue-400' />
                                                    </IconButton>
                                                    <p className="text-white text-[8px]">Twitter</p>
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <IconButton>
                                                        <WhatsAppIcon className="text-green-400" />
                                                    </IconButton>
                                                    <p className="text-white text-[8px]">Whatsapp</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* 065143 , 065143 */}
                        <main className="w-[68%] mx-auto">
                            <div className='py-10 w-[85%] mx-auto'>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='w-full'>
                                        <form className='w-full'>
                                            <div className='flex justify-end items-end'>
                                                {/* <h3 className='text-xl mb-16 font-bold home c-auth-title'>Pay</h3> */}
                                                <div>
                                                    <small className='text-sm text-[#2A86F2] status-pill c-status-border-pill capitalize'>{paymentLink.status} {paymentLink.expires_at && ' - ' + moment(paymentLink.expires_at).format('dddd, DD MMMM YYYY')}</small>
                                                </div>
                                            </div>
                                            {/* <p className='font-bold text-[#234244] text-xl uppercase c-make-payment-owner'>{paymentLink.creator_id ? `${paymentLink.creator_id.firstname} ${paymentLink.creator_id.lastname}` : 'Nill'}</p>
                                            // <p className='font-bold text-gray-700 text-lg'>{paymentLink.name}</p> */}
                                            {/* <span className='font-bold text-gray-500 inline-block w-full'>{paymentLink.description}</span> */}
                                            <Divider className='creat-payment-divider' />
                                            {/* <p className='font-bold text-gray-700 text-lg mt-8'>Amount: ₦ {Intl.NumberFormat('en-US').format(paymentLink.amount || 0)}</p>
                                            <p className='font-bold text-gray-700 text-sm mt-0'>Charges: ₦ {Intl.NumberFormat('en-US').format(paymentLink.charges || 0)}</p>
                                            <p className='font-bold text-[#39c531] text-xl mt-4'>Total: ₦ {Intl.NumberFormat('en-US').format((paymentLink.amount + paymentLink.charges) || 0)}</p> */}

                                            {
                                                (tab_lg === 1) ? (

                                                    <div className='space-y-2 py-10 mt-15'>
                                                        <h2 className='font-bold text-xl'>Payment Details</h2>
                                                        {/* <span className='font-semibold text-gray-500 text-sm inline-block w-full'>{paymentLink.description}</span> */}
                                                        <div className='py-2'>
                                                            {
                                                                paymentLink.form && paymentLink.form.length ? (
                                                                    <div className='mt-8 mb-8'>
                                                                        <Grid container spacing={2}>
                                                                            {
                                                                                paymentLink.form.map((link, index) => (
                                                                                    <Grid item xs={12} md={6} key={index}>
                                                                                        <div className='flex flex-col space-y-3 mb-8'>
                                                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>{link.field_name}</label>
                                                                                            {
                                                                                                link.field_type === 'text' ? (
                                                                                                    <input required placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="py-2 px-4 w-full outline-none c-text-input" />
                                                                                                ) : (
                                                                                                    <select placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                                                        <option value={''}>Select {link.field_name} </option>
                                                                                                        {
                                                                                                            link.options.map((option, i) => (
                                                                                                                <option key={option + i} value={option}>{option} </option>
                                                                                                            ))
                                                                                                        }
                                                                                                    </select>
                                                                                                )
                                                                                            }
                                                                                            {
                                                                                                link.error ? (
                                                                                                    <small className='c-pay-error'>{link.error}</small>
                                                                                                ) : ''
                                                                                            }
                                                                                        </div>
                                                                                    </Grid>
                                                                                ))
                                                                            }
                                                                        </Grid>
                                                                    </div>
                                                                ) : ''
                                                            }
                                                            <div className="py-2">
                                                                <div className='bg-[#FEF8E8] py-4 px-4 rounded-md warning-border'>
                                                                    <div className="flex items-start space-x-1">
                                                                        <img src="/images/warnings.svg" alt='warnings' />
                                                                        <div>
                                                                            <h2 className='text-[#D29A09] font-bold'>Important Notice: Non-Refundable Transactions</h2>
                                                                            <p className='text-[#889C92] warning-sub-text'>All transactions are non-refundable.  Once payments are processed via the link, our payment providers handle the rest.</p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='py-4'>
                                                                <button disabled={loading || delay ? true : false} className='c-bg-primary-light' onClick={(e) => makePaymentHandler(e)}>
                                                                    {loading ? 'Processing.....' : 'Make Payment'}
                                                                </button>
                                                                <span className=" pl-4 text-sm "> I have paid already,
                                                                    <span className='text-underline  cursor-pointer text-green-700 hover:text-green-900 font-bold '
                                                                        onClick={(e) => handleOpenModal()} >  Verify Payment </span>
                                                                </span>

                                                                <PaystackConsumer
                                                                    className='hidden'
                                                                    onSuccess={(reference) => handleSuccess(reference)}
                                                                    onClose={(reference) => handleClose(reference)}
                                                                    {...paymentData}
                                                                >
                                                                    {({ initializePayment }) => <button className='hidden' disabled={loading ? true : false} ref={paystackButtonRef} onClick={(e) => openPaystack(e, initializePayment)}>
                                                                        {loading ? 'Paying...' : 'Make Payment'}
                                                                    </button>}
                                                                </PaystackConsumer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ''
                                            }
                                            {
                                                (tab_lg === 2) ? (
                                                    <div className='space-y-2 py-10 mt-15'>
                                                        <h2 className='font-bold text-xl'>Payment Details</h2>
                                                        <span className='font-semibold text-gray-500 text-sm inline-block w-full'>Fill the form to search for a completed payment </span>
                                                        <div className='py-2'>
                                                            {
                                                                // paymentLink.form && paymentLink.form.length ? (
                                                                //     <div className='mt-8 mb-8'>
                                                                //         <Grid container spacing={2}>
                                                                //             {
                                                                //                 paymentLink.form.map((link, index) => (
                                                                //                     <Grid item xs={12} md={6} key={index}>
                                                                //                         <div className='flex flex-col space-y-3 mb-8'>
                                                                //                             <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Enter {link.field_name}</label>
                                                                //                             {
                                                                //                                 link.field_type === 'text' ? (
                                                                //                                     <input required placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="py-2 px-4 w-full outline-none c-text-input" />
                                                                //                                 ) : (
                                                                //                                     <select placeholder={link.field_name} name={link.field_name + index} onChange={(e) => handleFieldChanges(e, index)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                //                                         <option value={''}>Select {link.field_name} </option>
                                                                //                                         {
                                                                //                                             link.options.map((option, i) => (
                                                                //                                                 <option key={option + i} value={option}>{option} </option>
                                                                //                                             ))
                                                                //                                         }
                                                                //                                     </select>
                                                                //                                 )
                                                                //                             }
                                                                //                             {
                                                                //                                 link.error ? (
                                                                //                                     <small className='c-pay-error'>{link.error}</small>
                                                                //                                 ) : ''
                                                                //                             }
                                                                //                         </div>
                                                                //                     </Grid>
                                                                //                 ))
                                                                //             }
                                                                //         </Grid>
                                                                //     </div>
                                                                // ) : ''
                                                                unique_object ? (
                                                                    <div className='mt-4 mb-8'>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <div className='flex flex-col space-y-3 mb-4'>
                                                                                    <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>{unique_object.field_name}</label>
                                                                                    {
                                                                                        unique_object.field_type === 'text' ? (
                                                                                            <input required placeholder={unique_object.field_name} name={unique_object.field_name} onChange={(e) => setUniqueData(e.target.value)} className="pb-2 px-4 w-full outline-none c-text-input" />
                                                                                        ) : (
                                                                                            <select id={'for'} placeholder={unique_object.field_name} name={unique_object.field_name} className="pb-2 px-4 w-full outline-none c-text-input">
                                                                                                <option value={''}>Select {unique_object.field_name} </option>
                                                                                                {
                                                                                                    unique_object.options.map((option, i) => (
                                                                                                        <option key={option + i} onChange={(e) => setUniqueData(e.target.value)} value={option}>{option} </option>
                                                                                                    ))
                                                                                                }
                                                                                            </select>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        unique_object?.error ? (
                                                                                            <small className='c-pay-error'>{unique_object?.error}</small>
                                                                                        ) : ''
                                                                                    }
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                ) : ''
                                                            }

                                                            <div>
                                                                <button disabled={loading || delay ? true : false} className='c-bg-primary-light' onClick={() => verifyPayment()}>
                                                                    {loading ? 'Processing.....' : 'Verify Payment'}
                                                                </button>
                                                                <span className=" pl-4 text-sm "> Not paid yet?
                                                                    <span className='text-underline  text-base cursor-pointer text-green-700 hover:text-green-900 font-bold '
                                                                        onClick={(e) => handleOpenModal()} >  Make a New Payment </span>
                                                                </span>

                                                                {/* <PaystackConsumer
                                                                    className='hidden'
                                                                    onSuccess={(reference) => handleSuccess(reference)}
                                                                    onClose={(reference) => handleClose(reference)}
                                                                    {...paymentData}
                                                                >
                                                                    {({ initializePayment }) => <button className='hidden' disabled={loading ? true : false} ref={paystackButtonRef} onClick={(e) => openPaystack(e, initializePayment)}>
                                                                        {loading ? 'Searching...' : 'Verify Payment'}
                                                                    </button>}
                                                                </PaystackConsumer> */}
                                                                {/* <button className='c-bg-secondary' 
                                                                onClick={() => verifyPayment()}> 
                                                                {loading ? "Processing..." : 'Verify Payment'}
                                                                    {loading ? 'Processing.....' : 'Verify Existing Payment'}
                                                                </button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ''

                                            }



                                            {/* <Divider className='creat-payment-divider' /> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
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

{/* {fields}
<div className='flex flex-col space-y-3'>
    <span className='bg-[#0d1510] cursor-pointer py-3 px-4 w-2/5  rounded-md text-white' onClick={generateField}>Generate Fields</span>
</div> */}

export default MakePayment;