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
import '../styles/Hero.css'
const PaymentDrawer = ({ state, setState, toggleDrawer }) => {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const handleChange = (newValue) => {
        setValue(newValue);
        console.log(newValue)
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
            className="example"
            
        >
            <div className="py-4 px-4 example">
                <div className="py-8 example">
                    <h2 className="fourier text-center">Create Payment Link</h2>
                    <div className="flex flex-col">
                        <div className='w-4/5 mx-auto py-4 space-y-4'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className='flex flex-col space-y-3'>
                                    <label>Title</label>
                                    <input placeholder='Title' className="py-2 px-4 bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <label>Amount</label>
                                    <input placeholder='Amount' type="number" className="py-2 px-4 bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <label>Description</label>
                                    <input placeholder='Description' className="py-2 px-4 bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <label>Expiration date</label>
                                    <DateTimePicker
                                        label="Date&Time picker"
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <label>Field</label>
                                    <input placeholder='Field' className="py-2 px-4 bg-gray-200 rounded-md outline-none" />
                                </div>
                                <div className='py-4'>
                                    <button className='bg-[#0d1510] py-3 px-4 w-full rounded-md text-white'>Create Link</button>
                                </div>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
export default PaymentDrawer;