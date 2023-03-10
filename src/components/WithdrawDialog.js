import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Protected, { BASE_URL } from '../utils/axios';
// import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';

import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Protected, { BASE_URL } from '../utils/axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DashBoardContext } from '../context/Dashboard';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@mui/material';

export default function WithdrawDialog({ opener, setOpener, handleClosed, handleClickOpen }) {
    //   const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
    })

    const [current, setCurrent] = React.useState({ account_number: '' })
    const [loading, setLoading] = React.useState(false)
    const { beneficiaries } = useSelector((state) => state.dashboard)
    // console.log(beneficiaries)

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const processWithdrawal = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        setLoading(true)
        // console.log("e => ", e, current)

        const payload = {
            bank_code: current.bank_code,
            account_number: current.account_number,
            bank_name: current.bank_name,
            amount: +state.amount,
            name: current.account_name
        }

        try {
            await Protected.post(`${BASE_URL}/api/wallet/withdraw`, payload)

            console.log('done successfully')
            setLoading(false)
            toast.success('Processing Withdrawal!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                handleClosed()
            }, 1000)

        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            console.log('An error occurred')
            setLoading(false)
        }
    }

    const fetchData = async (data) => {
        const currentData = beneficiaries.find((beneficiary) => beneficiary.account_number === data)
        setCurrent(currentData)
        console.log("dadd >> ", currentData, data)
        // console.log(data)
    }



    return (
        <Dialog
            fullScreen={fullScreen}
            open={opener}
            onClose={handleClosed}
            aria-labelledby="responsive-dialog-title"
        >
            <div className='py-5 px-3 min-h-screen relative'>
                <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClosed()}>
                    <div className='flex items-center space-x-1'>
                        <IconButton>
                            <CancelIcon/>
                        </IconButton>
                        <h2 className='text-red-500 font-bold'>Close</h2>
                    </div>
                </div>
                <div className='flex flex-col justify-center h-[80vh] items-center'>
                    <div className='w-[80%] mx-auto title'>
                        <h2 className='text-2xl font-bold fourier text-left'>Withdraw</h2>
                    </div>
                    <form>
                        <div className='py-4 px-2'>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Amount</label>
                                <input placeholder='Amount' onChange={handleChange} required name='amount' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div className='py-4'>
                                {beneficiaries && (
                                    <select className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => fetchData(e.target.value)} value={current.account_number}>
                                        <option disabled value=''>Select One</option>
                                        {beneficiaries.map((beneficiary) => (
                                            <option onSelect={() => console.log(beneficiary)} value={beneficiary.account_number} onClick={() => console.log(beneficiary)}> {beneficiary.account_name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            {current && (
                                <>
                                    <div className=''>
                                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                                        <input placeholder='Amount' required name='amount' type="text" value={current.account_number} readOnly={true} className='py-2 px-4 w-full outline-none c-text-input' />
                                    </div>
                                    <div className=''>
                                        <label className='text-sm font-bold block my-2 text-gray-700'>Bank</label>
                                        <input placeholder='Amount' required name='amount' type="text" value={current.bank_name} readOnly={true} className='py-2 px-4 w-full outline-none c-text-input' />
                                    </div>
                                </>
                            )}
                            {/* {
                            current && (state.amount >= 1000) ? ( */}
                            <div className='py-4'>
                                <button className='c-primary-button w-full' onClick={(e) => processWithdrawal(e)}>
                                    {loading ? 'Loading....' : 'Withdraw'}
                                </button>
                            </div>
                            {/* ) : '' */}
                            {/* } */}
                        </div>
                    </form>
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
        </Dialog>
    );
}