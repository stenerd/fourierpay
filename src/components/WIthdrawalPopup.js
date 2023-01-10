import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Protected from '../utils/axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DashBoardContext } from '../context/Dashboard';
import { useSelector } from 'react-redux';
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

export default function WithdrawalPopup({ open, handleOpen, handleClose, setOpen }) {
    const [age, setAge] = React.useState('');
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const [current, setCurrent] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const { beneficiaries } = useSelector((state) => state.dashboard)
    console.log(beneficiaries)

    const fetchData = async (data) => {
        const currentData = beneficiaries.find((beneficiary) => beneficiary.account_name === data)
        setCurrent(currentData)
        console.log(currentData)
        // console.log(data)
    }
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='text-center text-xl'>Withdraw</h2>
                    <form>
                        <div className='py-4 px-2'>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Amount</label>
                                <input placeholder='Amount' onChange={handleChange} required name='amount' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div className='py-4'>
                                {beneficiaries && (
                                    <select className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => fetchData(e.target.value)}>
                                        {beneficiaries.map((beneficiary) => (
                                            <option onSelect={() => console.log(beneficiary)} value={beneficiary.account_name} onClick={() => console.log(beneficiary)}> {beneficiary.account_name}</option>
                                        ))}
                                    </select>

                                )}
                            </div>
                            {current && (
                                <>
                                    <div className=''>
                                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                                        <input placeholder='Amount'  required name='amount' type="text" value={current.account_number} className='py-2 px-4 w-full outline-none c-text-input' />
                                    </div>
                                    <div className=''>
                                        <label className='text-sm font-bold block my-2 text-gray-700'>Bank</label>
                                        <input placeholder='Amount'  required name='amount' type="text" value={current.bank_name} className='py-2 px-4 w-full outline-none c-text-input' />
                                    </div>
                                </>

                            )}
                            <div className='py-4'>
                                <button className='c-primary-button'>
                                    {loading ? 'Loading....' : 'Withdraw'}
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>

            </Modal>
        </div >
    );
}