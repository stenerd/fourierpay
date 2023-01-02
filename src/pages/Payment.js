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
import { TextField } from '@mui/material';
const Payment = () => {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const handleChange = (newValue) => {
        setValue(newValue);
        console.log(newValue)
    };
    return (
        <>
            <div className='min-h-screen'>
                <div className='w-full'>
                    <div className="w-2/5 mx-auto">
                         <div className='flex items-center min-h-screen'>
                            <form className='w-full space-y-4'>
                                <h3 className='text-center main text-xl'>Create Payment Link</h3>
                                <div className='flex flex-col space-y-3 w-4/5 mx-auto'>
                                    <label className=''>Title</label>
                                    <input placeholder='Title' className="py-2 px-4  bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3 w-4/5 mx-auto'>
                                    <label className=''>Amount</label>
                                    <input placeholder='Amount' type="number" className="py-2 px-4 bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3 w-4/5 mx-auto'>
                                    <label className=''>Description</label>
                                    <input placeholder='Description' className="py-2 px-4  bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3 w-4/5 mx-auto'>
                                    <label>Field</label>
                                    <input placeholder='Field' className="py-2 px-4  bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='py-4 w-4/5 mx-auto'>
                                    <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button>
                                </div>
                            </form>
                         </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Payment