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
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Divider, Tooltip } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import Titlebar from '../components/TitleBar';
import { Link, useNavigate } from 'react-router-dom';
import Fields from '../components/Fields';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import Protected, { BASE_URL } from '../utils/axios';
import { useDispatch } from 'react-redux';
import { ADD_PAYMENTLINKS } from '../redux/DashboardSlice';





const Payment = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const [uniqueSelection, setUniqueSelection] = React.useState(0);
    const [state, setState] = React.useState({
        name: '',
        description: '',
        amount: '',
        expected_number_of_payment: '',
        expires_at: ''
    })
    const [stateError, setStateError] = React.useState('')
    const [selectedFields, setSelectedFields] = React.useState([
        {
            field_name: '',
            field_type: '',
            required: 'false',
            options: []
        }
    ])
    const [selectedFieldsError, setSelectedFieldsError] = React.useState([''])


    const handleChanges = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleFieldChanges = (e, index) => {
        setSelectedFields((prev) => {
            let name = ''
            if (index >= 1) {
                name = e.target.name.replace("" + index, "");
            } else {
                name = e.target.name
            }
            let new_data = [...prev]
            new_data[index] = {
                ...new_data[index],
                [name]: e.target.value
            }
            return new_data;
        })
    }

    const validateInput = () => {
        setStateError('')
        let empty_data = []
        for (let k = 0; k < selectedFields.length; k++) {
            empty_data.push('')
        }
        setSelectedFieldsError(empty_data)
        if (!state.name || !state.amount || !state.description) {
            setStateError('* name, amount and description are required fields.')
            return false
        }
        let check = true

        for (let i = 0; i < selectedFields.length; i++) {
            const each = selectedFields[i];

            if (!each.field_name || !each.field_type) {
                check = false;
                setSelectedFieldsError((prev) => {
                    let data = [...prev]
                    data[i] = '* field name, required and field type are required field'
                    return data
                })
            }

            if (each.field_type === 'select' && !each.options.length) {
                check = false;
                setSelectedFieldsError((prev) => {
                    let data = [...prev]
                    data[i] = '* select field is choosen for field type but no option was selected.'
                    return data
                })
            }

        }
        return check
    }

    const handleRemoveField = (e, index) => {
        const data = [...selectedFields]
        data.splice(index, 1)
        setSelectedFields(data)
    };

    const handleRemoveFieldOption = (e, index1, index2) => {
        const data = [...selectedFields]
        data[index1].options.splice(index2, 1)

        setSelectedFields(data)
    };

    const onKeyDownHandler = (id, index) => {
        const element = document.getElementById(id)
        if (element.value === '') {
            return
        }
        const data = [...selectedFields]
        data[index].options.push(element.value)
        document.getElementById(id).value = ''
        setSelectedFields(data)
    };

    const FetchLinks = async () => {
        setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/payment-link`)
            console.log(response.data.data)
            dispatch(ADD_PAYMENTLINKS(response?.data?.data))

        } catch (error) {
            console.log(error.response)
        }
    }


    const createLink = async (e) => {
        if (e.keyCode === 13) {
            console.log('heddd')
            return
        }
        e.preventDefault()
        console.log('processing....')
        setLoading(true)
        const check = validateInput()
        if (!check) {
            setLoading(false)
            return;
        }
        const payload = {
            ...state,
            amount: Number(state.amount),
            expected_number_of_payments: Number(state.expected_number_of_payment),
            unique_field: selectedFields[uniqueSelection].field_name,
            form: selectedFields.map(e => ({
                ...e,
                required: e.required === 'true' ? true : false,
            }))
        }
        try {
            await Protected.post(`${BASE_URL}/api/payment-link/create`, payload)

            console.log('done successfully')
            setLoading(false)
            toast.success('Link Created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            FetchLinks()
            setTimeout(() => {
                navigate('/dashboard/paymentlinks')
            }, 1000)
            // const data = FetchLinks()

        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
        console.log(state)

    }  


    const generateField = () => {


        const newSelectedField = selectedFields.concat([
            {
                field_name: '',
                field_type: '',
                required: 'false',
                options: []
            }
        ])
        const newSelectedFieldError = selectedFieldsError.concat([''])
        setSelectedFields(newSelectedField)
        setSelectedFieldsError(newSelectedFieldError)
    }

    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Create Payment Links</h2>
                    {/* <div>
                        <Link to="/dashboard/payment">
                            <button className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                        </Link>
                    </div> */}
                </Titlebar>
                <div className='min-h-screen'>
                    <div className='px-16 py-12'>
                        <Grid container spacing={3}>


                            <Grid item xs={12} md={7}>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='w-full'>
                                        <form className='w-full space-y-4'>
                                            <h3 className='text-gray-700 text-lg font-bold home'>New Payment Link</h3>
                                            <div className='mb-8'>
                                                {stateError && <small className='text-red-600'> {stateError}</small>}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <div className='flex flex-col space-y-3 mb-8'>
                                                            <div className='flex items-center space-x-3'>

                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Name</label>
                                                                <span className='text-red-500 text-2xl font-bold'>*</span>

                                                            </div>
                                                            <Tooltip title='Name of Payment'>
                                                                <input placeholder='Name' name='name' onChange={handleChanges} className="py-2 px-4 w-full outline-none c-text-input" />
                                                            </Tooltip>

                                                            {/* <input placeholder='Name' name='name' onChange={handleChanges} className="py-2 px-4 w-full outline-none c-text-input" /> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <div className='flex flex-col space-y-3 mb-8'>
                                                            <div className='flex items-center space-x-3'>

                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Amount</label>
                                                                <span className='text-red-500 text-2xl font-bold'>*</span>

                                                            </div>
                                                            <Tooltip title='Amount for Payment'>
                                                                <input placeholder='Amount' name='amount' onChange={handleChanges} type="number" className="py-2 px-4 w-full outline-none c-text-input" />
                                                            </Tooltip>

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <div className='flex flex-col space-y-3 mb-8'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Expected Number Of Payments</label>
                                                            <input placeholder='Expected Number Of Payment' name='expected_number_of_payment' onChange={handleChanges} type="number" className="py-2 px-4 w-full outline-none c-text-input" />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <div className='flex flex-col space-y-3 mb-8'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Expiry Date</label>
                                                            <Tooltip title='Make your payment link expire at a particulat date'>
                                                                <input placeholder='Expiry Date' name='expires_at' onChange={handleChanges} type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                                                            </Tooltip>

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2} className='mb-8'>
                                                    <Grid item xs={12} md={12}>
                                                        <div className='flex flex-col space-y-3 '>
                                                            <div className='flex items-center space-x-3'>

                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Description</label>
                                                                <span className='text-red-500 text-2xl font-bold'>*</span>

                                                            </div>
                                                            <Tooltip title='Payment Description'>
                                                                <textarea placeholder='Description' name='description' onChange={handleChanges} className="py-2 px-4 w-full outline-none c-text-input"></textarea>
                                                            </Tooltip>

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>


                                            <div className='relative my-8'>
                                                <Tooltip title='Generate a form that users can fill before making payment'>
                                                    <h1 className='text-gray-700 text-lg font-bold home absolute create-payment-divider-title'>Generate Form</h1>

                                                </Tooltip>
                                                <Divider className='creat-payment-divider' />

                                            </div>

                                            <div className='mt-4 pt-8 relative'>
                                                {selectedFieldsError[0] && <small className='text-red-600'> {selectedFieldsError[0]}</small>}
                                                {/* <span className='absolute create-payment-dynamic-form-close'> <CloseIcon /></span> */}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6} className='mb-0'>
                                                        <div className='flex flex-col space-y-3 mb-4'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Field name</label>
                                                            <input placeholder='Field Name' name='field_name' onChange={(e) => handleFieldChanges(e, 0)} className="py-2 px-4 w-full outline-none c-text-input" />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6} className='mb-0'>
                                                        <div className='flex flex-col space-y-3 mb-4'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Field Type</label>
                                                            <select placeholder='Field Type' name='field_type' onChange={(e) => handleFieldChanges(e, 0)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                <option value={''}>Select One </option>
                                                                <option value={'text'}>Text Field </option>
                                                                <option value={'select'}>Select Field </option>
                                                            </select>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className='flex flex-col space-y-3 mb-0'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Required</label>
                                                            <select placeholder='Required' name='required' onChange={(e) => handleFieldChanges(e, 0)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                <option value={''}>Select One </option>
                                                                <option value={true}>True </option>
                                                                <option value={false}>False </option>
                                                            </select>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className='flex flex-col space-y-3 mb-0'>
                                                            <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Options</label>
                                                            <div className='flex'>
                                                                <input placeholder='Options' name='options' id='option0' className="py-2 px-4 w-full outline-none c-text-input" />
                                                                <span className='dynamic-form-option-cta' onClick={(e) => onKeyDownHandler('option0', 0)}>
                                                                    <SendIcon className='text-gray-500' />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {selectedFields[0].options.map((e, index) => (
                                                            <small key={index} className='create-payment-divider-options'>{e} &nbsp; &nbsp; <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' onClick={(e) => handleRemoveFieldOption(e, 0, index)}> x</span></small>
                                                        ))}
                                                    </Grid>

                                                </Grid>
                                            </div>

                                            {/* {fields} */}

                                            {[...selectedFields].slice(1).map((e, i) => (
                                                <div className='mt-8 relative' key={'' + (i + 1)}>
                                                    <span className='absolute create-payment-dynamic-form-close' onClick={(e) => handleRemoveField(e, i + 1)}> <CloseIcon /></span>
                                                    <Divider className='creat-payment-divider' />
                                                    <Grid container spacing={2} className='pt-10'>
                                                        <Grid item xs={12}>
                                                            {selectedFieldsError[i + 1] && <small className='text-red-600'> {selectedFieldsError[i + 1]}</small>}
                                                        </Grid>
                                                        <Grid item xs={6} className='mb-0'>
                                                            <div className='flex flex-col space-y-3 mb-4'>
                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Field name</label>
                                                                <input placeholder='Field Name' name={'field_name' + (i + 1)} onChange={(e) => handleFieldChanges(e, i + 1)} className="py-2 px-4 w-full outline-none c-text-input" />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6} className='mb-0'>
                                                            <div className='flex flex-col space-y-3 mb-4'>
                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Field Type</label>
                                                                <select placeholder='Field Type' name={'field_type' + (i + 1)} onChange={(e) => handleFieldChanges(e, i + 1)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                    <option value={''}>Select One </option>
                                                                    <option value={'text'}>Text Field </option>
                                                                    <option value={'select'}>Select Field </option>
                                                                </select>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div className='flex flex-col space-y-3 mb-8'>
                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Required</label>
                                                                <select placeholder='Required' name={'required' + (i + 1)} onChange={(e) => handleFieldChanges(e, i + 1)} className="py-2 px-4 w-full outline-none c-text-input">
                                                                    <option value={''}>Select One </option>
                                                                    <option value={true}>True </option>
                                                                    <option value={false}>False </option>
                                                                </select>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div className='flex flex-col space-y-3 mb-0'>
                                                                <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Options</label>
                                                                <div className='flex'>
                                                                    <input placeholder='Options' id={'option' + (i + 1)} name={'options' + (i + 1)} className="py-2 px-4 w-full outline-none c-text-input" />
                                                                    <span className='dynamic-form-option-cta' onClick={(e) => onKeyDownHandler('option' + (i + 1), i + 1)}>
                                                                        <SendIcon className='text-gray-500' />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} className='dynamic-form-option-pill'>
                                                            {selectedFields[i + 1].options.map((e, index) => (
                                                                <small key={index} className='create-payment-divider-options'>{e} &nbsp; &nbsp; <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' onClick={(e) => handleRemoveFieldOption(e, i + 1, index)}> x</span></small>
                                                            ))}
                                                        </Grid>

                                                    </Grid>
                                                </div>
                                            ))}


                                            <div className='c-mt-0'>
                                                <small className='cursor-pointer c-primary-link-color font-bold underline' onClick={generateField}>Add More</small>
                                            </div>




                                            {/* {fields}
                                            <div className='flex flex-col space-y-3'>
                                                <span className='bg-[#0d1510] cursor-pointer py-3 px-4 w-2/5  rounded-md text-white' onClick={generateField}>Generate Fields</span>
                                            </div> */}
                                            <div className='py-4'>
                                                <button disabled={loading ? true : false} className='c-primary-button' onClick={createLink}>
                                                    {loading ? 'Creating...' : 'Create Link'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <div className='flex flex-col create-payment-details'>
                                    <div className='w-full px-5'>
                                        <form className='w-full space-y-4'>
                                            <div className='py-4'>
                                                <h3 className='text-gray-700 text-lg font-bold home'>Payment Link Details</h3>
                                            </div>

                                            <div className='flex flex-col'>
                                                <small className='font-bold text-gray-500'>Name</small>
                                                <h2 className='text-lg font-bold mt-0'>{state.name || 'Nill'}</h2>
                                            </div>
                                            <div className='flex flex-col'>
                                                <small className='font-bold text-gray-500'>Amount</small>
                                                <h2 className='text-lg font-bold mt-0'>{state.amount.toLocaleString() || 0}</h2>
                                            </div>
                                            <div className='flex flex-col'>
                                                <small className='font-bold text-gray-500'>Expected Number OF Payments</small>
                                                <h2 className='text-lg font-bold mt-0'>{state.expected_number_of_payment || 'Nil'}</h2>
                                            </div>
                                            <div className='flex flex-col'>
                                                <small className='font-bold text-gray-500'>Expiry Date</small>
                                                <h2 className='text-lg font-bold mt-0'>{state.expires_at || 'Nil'}</h2>
                                            </div>
                                            <div className='flex flex-col'>
                                                <small className='font-bold text-gray-500'>Description</small>
                                                <h2 className='text-lg font-bold mt-0'>{state.description || 'Nil'}</h2>
                                            </div>
                                            <p className='font-bold text-gray-700 text-lg'>Forms</p>
                                            {
                                                selectedFields.map((each, index) => (
                                                    <div className='mt-4' key={index}>
                                                        <Grid container onClick={() => setUniqueSelection(index)} spacing={1} className={uniqueSelection === index ? 'create-payment-details-unique-selection cursor-pointer' : 'cursor-pointer'}>
                                                            <Grid item md={1}>
                                                                <div className='font-bold text-lg text-gray-700'>{index + 1})</div>
                                                            </Grid>
                                                            <Grid item md={11}>
                                                                {
                                                                    uniqueSelection === index ? (
                                                                        <span className='create-payment-details-unique-selection-text'>Unique Field</span>
                                                                    ) : ''
                                                                }
                                                                <div>
                                                                    <div className='mb-4'>
                                                                        <small className='font-bold text-gray-500'>Field Name: </small>
                                                                        <small className='text-md font-bold mt-0'>{each.field_name || 'Nill'}</small>
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        <small className='font-bold text-gray-500'>Field Type: </small>
                                                                        <small className='text-md font-bold mt-0'>{each.field_type || 'Nill'}</small>
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        <small className='font-bold text-gray-500'>Required: </small>
                                                                        <small className='text-md font-bold mt-0'>{each.required || 'Nil'}</small>
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        <small className='font-bold text-gray-500'>Options: </small>
                                                                        <small className='text-md font-bold mt-0'>{each.options.length ? each.options.map((e, i) => (
                                                                            <span key={i}>{e} &nbsp;</span>
                                                                        )) : 'Nil'}</small>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))
                                            }
                                            <div className='py-4'>
                                                {/* <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Grid>






                        </Grid>
                    </div>


                </div>
            </DashboardLayout>
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

export default Payment;