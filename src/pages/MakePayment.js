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
import { Link, useNavigate } from 'react-router-dom';
import Fields from '../components/Fields';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import Protected from '../utils/axios';





const MakePayment = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
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
        if (!state.name || !state.amount || !state.description ) {
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
            expires_at: new Date(state.expires_at),
            expected_number_of_payments: Number(state.expected_number_of_payment),
            form: selectedFields.map(e => ({
                ...e,
                required: e.required === 'true' ? true : false,
            }))
        }
        try {
            await Protected.post(`http://localhost:4000/api/payment-link/create`, payload)

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
            navigate('/dashboard/paymentlinks')
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
        console.log(state)

    }

    return (
        <>
             <div className='min-h-screen'>
                <div className='px-16 py-16 mx-auto'>
                    <div className='flex mx-auto min-h-[85vh]'>

                    
                        <div className='w-[55%] mx-auto c-make-payment'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-full'>
                                    <form className='w-full'>
                                        <div className='flex justify-between'>
                                            <h3 className='text-xl mb-16 font-bold home c-auth-title'>Pay</h3>
                                            <div>
                                                <small className='text-sm text-[#00bf00] status-pill c-status-border-pill'>Active - 24th March 2023</small>
                                            </div>
                                        </div>
                                        
                                        <p className='font-bold text-gray-700 text-lg'>Departmental Dues</p>
                                        <span className='font-bold text-gray-500 inline-block w-[70%]'>Dues for all members of the department</span>
                                        <p className='font-bold text-gray-700 text-lg mt-4'>$5000</p>
                                        <div className='mt-8 mb-8'>
                                            {stateError && <small className='text-red-600'> {stateError}</small>}
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <div className='flex flex-col space-y-3 mb-8'>
                                                        <label className='text-sm font-bold block mt-0 mb-0 text-gray-700'>Name</label>
                                                        <input placeholder='Name' name='name' onChange={handleChanges} className="py-2 px-4 w-full outline-none c-text-input" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        

                                        
                                        
                                        
                                        
                                        {/* {fields}
                                        <div className='flex flex-col space-y-3'>
                                            <span className='bg-[#0d1510] cursor-pointer py-3 px-4 w-2/5  rounded-md text-white' onClick={generateField}>Generate Fields</span>
                                        </div> */} 
                                        <div className='py-4'>
                                            <button className='c-primary-button' onClick={createLink}>
                                                {loading ? 'Paying...' : 'Make Payment'}
                                            </button>
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