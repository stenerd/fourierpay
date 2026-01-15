import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import Protected, { BASE_URL } from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteBenefiaryDialog({ handleClose10, handleClickOpen10, setOpen10, open10, data, beneficiaries, setBeneficiaries }) {
    console.log(data)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = React.useState(false)

    const DeleteBenefiary = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Protected.delete(`${BASE_URL}/api/beneficiary/remove/${data._id}`)
            console.log(response.data)
            setLoading(false)
            const newBeneficiaries = beneficiaries.filter((e) => e._id !== data._id)
            setBeneficiaries(newBeneficiaries)
            toast.success('Beneficiary Deleted!', {
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
                handleClose10()
            }, 1200)
            // window.location.reload()
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
            console.log(error.response)
        }
    }
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open10}
                onClose={handleClose10}
                aria-labelledby="responsive-dialog-title"
            >
                <div className='py-6 px-3 mt-4 relative'>
                    <div className='py-2'>
                        <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClose10()}>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <CancelIcon className='text-red-500 ' />
                                </IconButton>
                                <h2 className='font-bold'>Close</h2>
                            </div>
                        </div>
                    </div>
                    <div className='py-4'>
                        <h2 className='text-xl font-bold text-center'>Beneficiary</h2>
                        <form onSubmit={DeleteBenefiary}>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Account Name</label>
                                <input value={data.account_name} readOnly required name='Account Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                                <input value={data.bank_name} readOnly required name='Bank Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                                <input value={data.account_number} readOnly name='Account Number' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div className='py-4'>
                                <button className='c-secondary-button w-full'>
                                    {loading ? 'Loading....' : 'Delete'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}