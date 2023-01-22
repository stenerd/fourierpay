import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/ar-sa';
import Protected from '../utils/axios';

const locales = ['en', 'ru', 'ar-sa'];

const ampmOptions = {
    'undefined': undefined,
    true: true,
    false: false
};

export default function FilterDialog({ loading,opener, setOpener, handleCloser, handleClickOpen,start,setStart,setStatus,status,end,setEnd ,filterData}) {
   
    // const [state, setState] = React.useState({
    //     selection: {
    //         startDate: new Date(),
    //         endDate: null,
    //         key: 'selection'
    //     },
    //     compare: {
    //         startDate: new Date(),
    //         endDate: addDays(new Date(), 3),
    //         key: 'compare'
    //     }
    // });
    // console.log(state)

   

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };
    // console.log(value)


    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
            <Dialog
                fullScreen={fullScreen}
                open={opener}
                onClose={handleCloser}
                fullWidth={true}
                aria-labelledby="responsive-dialog-title"
            >
                <div className='w-4/5 mx-auto py-3'>
                    <h2 className='font-bold text-xl'>Filtering By</h2>
                    <div className='py-3 '>
                        <h2>You are filtering the item currently in the table below</h2>
                    </div>
                    <div className='flex py-2 space-x-4 items-center'>
                        <div>
                            <label>Start Date</label>
                            <input placeholder='Expiry Date' onChange={(e) => setStart(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input placeholder='Expiry Date' onChange={(e) => setEnd(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                        </div>
                    </div>
                    <div className="py-2">
                        <div className='py-2 font-bold'>Status</div>
                        <select className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => setStatus(e.target.value)}>
                            <option value={""}>Select One</option>
                            <option value={"pending"}>pending</option>
                            <option value={"paid"}>paid</option>
                            <option value={"declined"}>declined</option>
                            <option value={"abandoned"}>abandoned</option>
                        </select>
                    </div>
                    <div className='flex justify-end items-end'>
                        <button className='c-primary-button rounded-md' onClick={()=>filterData()}>
                            {loading?'Loading....':'Fliter'}
                        </button>
                    </div>
                </div>


            </Dialog>
        </div>
    );
}