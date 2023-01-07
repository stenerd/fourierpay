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
    borderRadius:2,
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
    const [loading, setLoading] = React.useState(false)
    const { beneficiaries } = useSelector((state)=>state.dashboard)
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Account</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            onChange={(e) => setAge(e.target.value)}
                                        >
                                            {beneficiaries.map((beneficiary) => (
                                                <MenuItem value={beneficiary.account_name}>{beneficiary.account_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </div>
                            <div className='py-4'>
                                <button className='c-primary-button'>
                                    {loading ? 'Loading....' : 'Withdraw'}
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>

            </Modal>
        </div>
    );
}