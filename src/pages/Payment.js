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
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import Titlebar from '../components/TitleBar';
import { Link } from 'react-router-dom';
import Fields from '../components/Fields';



const Payment = () => {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [state, setState] = React.useState({
        name: '',
        description: '',
        amount: ''
    })
    const [fields, setFields] = React.useState([])
    const [selectedFields, setSelectedFields] = React.useState([])
    const [details, setDetails] = React.useState([])

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        console.log('ready')
    };

  


    const handleChanges = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const generateField = () => {
      
    
        const newField = fields.concat([ <div key={fields.length}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <input placeholder='Field Name' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <input placeholder='required' me='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                </Grid>
                <Grid item xs={6}>
                    <input placeholder='Options' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                </Grid>
            </Grid>
        </div>])
        setFields(newField)
    }

    // const Fields = () => {
    //     return (
    //         <div>
    //             <Grid container spacing={2}>
    //                 <Grid item xs={6}>
    //                     <input placeholder='Field Name' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
    //                 </Grid>
    //                 <Grid item xs={6}>
    //                     <input placeholder='Field Type' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
    //                 </Grid>
    //                 <Grid item xs={6}>
    //                     <input placeholder='required' me='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
    //                 </Grid>
    //                 <Grid item xs={6}>
    //                     <input placeholder='Options' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
    //                 </Grid>
    //             </Grid>
    //         </div>
    //     )
    // }
    // console.log(fields)
    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Create Payment Links</h2>
                    <div>
                        <Link to="/dashboard/payment">
                            <button className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                        </Link>
                    </div>
                </Titlebar>
                <div className='min-h-screen'>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                                <div className='w-[85%] py-8 px-5 mx-auto border-dotted border-[#234243] border-2 bg-gray-50'>
                                    <form className='w-full space-y-4'>
                                        <div className='py-4'>
                                            <h3 className='main text-3xl py-3'>Payment Link Details</h3>
                                        </div>

                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Name</label>
                                            <h2 className='py-2 text-xl font-bold'>{state.name}</h2>
                                            {/* <input placeholder='Name' className="py-2 px-4 w-full  bg-gray-200 rounded-md outline-none" /> */}
                                        </div>
                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Amount</label>
                                            <h2 className='py-2 text-xl font-bold'>{state.amount.toLocaleString()}</h2>
                                            {/* <input placeholder='Amount' type="number" className="py-2  w-full  px-4 bg-gray-200 rounded-md outline-none" /> */}
                                        </div>
                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Description</label>
                                            <h2 className='py-2 text-xl font-bold'>{state.description}</h2>
                                            {/* <input placeholder='Description' className="py-2 px-4   w-full  bg-gray-200 rounded-md outline-none" /> */}
                                        </div>
                                        <div className='flex flex-col space-y-3'>
                                            <label>Field</label>
                                            <h2 className='py-2 text-xl font-bold'></h2>
                                            {/* <input placeholder='Field' className="py-2 px-4  w-full   bg-gray-200 rounded-md outline-none" /> */}
                                        </div>
                                        <div className='py-4'>
                                            {/* <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                                <div className='w-[80%] mx-auto p-6 bg-gray-100 border-b-2 border-[#234243]'>
                                    <form className='w-full space-y-4'>
                                        <h3 className='text-center main text-xl'>Create Payment Link</h3>
                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Name</label>
                                            <input placeholder='Name' name='name' onChange={handleChanges} className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                                        </div>
                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Amount</label>
                                            <input placeholder='Amount' name='amount' onChange={handleChanges} type="number" className="py-2  w-full  px-4 bg-white rounded-md outline-none" />
                                        </div>
                                        <div className='flex flex-col space-y-3 '>
                                            <label className=''>Description</label>
                                            <input placeholder='Description' name='description' onChange={handleChanges} className="py-2 px-4   w-full  bg-white rounded-md outline-none" />
                                        </div>
                                        {fields}
                                        <div className='flex flex-col space-y-3'>
                                            <span className='bg-[#0d1510] cursor-pointer py-3 px-4 w-2/5  rounded-md text-white' onClick={generateField}>Generate Fields</span>
                                        </div>
                                        <div className='py-4'>
                                            <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </Grid>

                    </Grid>


                </div>
            </DashboardLayout>

        </>
    )
}

export default Payment