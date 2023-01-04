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
import { Grid, TextField } from '@mui/material';
const Payment = () => {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const handleChange = (newValue) => {
        setValue(newValue);
        console.log(newValue)
    };
    return (
        <>
            <div className='min-h-screen'>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                            <div className='w-[60%] mx-auto'>
                                <form className='w-full space-y-4'>
                                    <h3 className='text-center main text-xl'>Create Payment Link</h3>
                                    <div className='flex flex-col space-y-3 '>
                                        <label className=''>Title</label>
                                        <input placeholder='Title' className="py-2 px-4 w-full  bg-gray-200 rounded-md outline-none" />
                                    </div>
                                    <div className='flex flex-col space-y-3 '>
                                        <label className=''>Amount</label>
                                        <input placeholder='Amount' type="number" className="py-2  w-full  px-4 bg-gray-200 rounded-md outline-none" />
                                    </div>
                                    <div className='flex flex-col space-y-3 '>
                                        <label className=''>Description</label>
                                        <input placeholder='Description' className="py-2 px-4   w-full  bg-gray-200 rounded-md outline-none" />
                                    </div>
                                    <div className='flex flex-col space-y-3'>
                                        <label>Field</label>
                                        <input placeholder='Field' className="py-2 px-4  w-full   bg-gray-200 rounded-md outline-none" />
                                    </div>
                                    <div className='py-4'>
                                        <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                       <img src="/images/paymentt.jpg" className='w-full object-cover h-screen'/>
                    </Grid>
                </Grid>
               

            </div>
        </>
    )
}

export default Payment