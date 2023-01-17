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
import Protected from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { PaystackButton, PaystackConsumer } from 'react-paystack'
import moment from 'moment'





const MakePayment = () => {
    let { code } = useParams();
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [paymentData, setPaymentData] = React.useState({});
    const [paymentLink, setPaymentLink] = React.useState({});
    const paystackButtonRef = React.useRef(null);

    const FetchPaymentLink = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/payment-link/${code}`)
            console.log('ppp >> ', response.data.data)
            setPaymentLink(response.data.data)
           
        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(()=>{
        FetchPaymentLink()
    },[])

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
            const each = {...paymentLink.form[i]};

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
    const handleSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        try {
            axios.post(`http://localhost:4000/api/payment/verify`, {
                reference: paymentData.reference
            })
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
    };

    // you can call this function anything
    const handleClose = (reference) => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed >> ', paymentData, reference)

        try {
            axios.put(`http://localhost:4000/api/payment/abandon`, {
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
        onClose:(reference) => handleClose(reference)
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
            const initiateTrnx = await axios.post(`http://localhost:4000/api/payment/initialize`, {
                amount: paymentLink.amount,
                payment_link_id: paymentLink._id,
                form: paymentLink.form
            })

            console.log('initiateTrnx >> ', initiateTrnx.data.data)
            
            setPaymentData((prev) => ({...initiateTrnx.data.data}))
            setValue((prev => prev ? 0 : 1))

            setTimeout(() => {
                paystackButtonRef.current.click()
               
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

    return (
        <>
             <div className='min-h-screen'>
                <div className='px-4 lg:px-16 py-8 lg:py-16 mx-auto'>
                    <div className='flex mx-auto min-h-[85vh]'>

                    
                        <div className='w-[90%] lg:w-[55%] mx-auto c-make-payment p-[1.5rem] lg:p-[4rem]'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-full'>
                                    <form className='w-full'>
                                        <div className='flex justify-between'>
                                            <h3 className='text-xl mb-16 font-bold home c-auth-title'>Pay</h3>
                                            <div>
                                                <small className='text-sm text-[#00bf00] status-pill c-status-border-pill capitalize'>{paymentLink.status} {paymentLink.expires_at && ' - ' + moment(paymentLink.expires_at).format('dddd, DD MMMM YYYY')}</small>
                                            </div>
                                        </div>
                                        
                                        <p className='font-bold text-gray-700 text-lg'>{paymentLink.name}</p>
                                        <span className='font-bold text-gray-500 inline-block w-[70%]'>{paymentLink.description}</span>
                                        <p className='font-bold text-gray-700 text-lg mt-4'>₦ {Intl.NumberFormat('en-US').format(paymentLink.amount || 0)}</p>
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
                                        
                                        

                                        
                                        
                                        
                                        
                                        {/* {fields}
                                        <div className='flex flex-col space-y-3'>
                                            <span className='bg-[#0d1510] cursor-pointer py-3 px-4 w-2/5  rounded-md text-white' onClick={generateField}>Generate Fields</span>
                                        </div> */} 
                                        <div className='py-4'>
                                            <button disabled={loading?true:false} className='c-primary-button'  onClick={(e) => makePaymentHandler(e)}>
                                                {loading ? 'Processing.....' : 'Make Payment'}
                                            </button>

                                            <PaystackConsumer 
                                                className='hidden'
                                                onSuccess = {(reference) => handleSuccess(reference)}
                                                onClose = {(reference) => handleClose(reference)}
                                                {...paymentData}
                                            >
                                                {({initializePayment}) => <button className='hidden' disabled={loading?true:false}  ref={paystackButtonRef} onClick={(e) => openPaystack(e, initializePayment)}>
                                                    {loading ? 'Paying...' : 'Make Payment'}
                                                </button>}
                                            </PaystackConsumer>


                                        </div>
                                    </form>
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

export default MakePayment;