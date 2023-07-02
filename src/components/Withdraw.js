import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Modal from '@mui/material/Modal';
import { DashBoardContext } from '../context/Dashboard';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected, { BASE_URL } from '../utils/axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function WithdrawalModal({ open2, setOpen2, handleOpen2, handleClose2, bankList, FetchBeneficiary }) {
    const [bank, setBank] = React.useState('');
    const [bank_name, setBankName] = React.useState('')
    const [bank_code, setBankCode] = React.useState('')
    const [account_no, setAccountNo] = React.useState('')
    const [account_name, setAcoountName] = React.useState('')
    // const { bankList } = React.useContext(DashBoardContext)
    // const [beneficiaries,setBeneficiary] = useState()

    const token = window.localStorage.getItem('bearer_token')

    // console.log(token)


    // console.log(bankList) 
    const { state, dispatch } = React.useContext(DashBoardContext)

    const [loading, setLoading] = React.useState(false)

    const createBenefiary = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {
            const response = await Protected.post(`${BASE_URL}/api/beneficiary/create`, { account_number: account_no, bank_name, bank_code })
            console.log(response.data)
            console.log({ account_name, account_no, bank_code })
            setLoading(false)
            toast.success('Beneficiary Created', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            FetchBeneficiary()
            setAcoountName('')
            setAccountNo('')
            setBankName('')
            setTimeout(() => {
                handleClose2()
            }, 1000)


        } catch (error) {
            console.log(error.response)
            toast.error('An Error occurred', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setAcoountName('')
            setAccountNo('')
            setBankName('')
        }
    }

    const VerifyBank = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/api/paystack/resolve-account-number?account_number=${account_no}&bank_code=${bank_code}`)
            console.log(response.data.data.account_name)
            setAcoountName(response.data.data.account_name)
            setLoading(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setLoading(false)

            // handleClose2()
        }
    }
    // setLoading(false)
    return (
        <div>
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={account_name ? createBenefiary : VerifyBank}>
                        <h2 className='text-center text-xl'>Create beneficiary</h2>
                        <div className='py-4 px-2'>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Account No</label>
                                <input placeholder='Account No' onChange={(e) => setAccountNo(e.target.value)} required name='Account No' type="number" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            {bankList && (
                                <div className='py-4'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={bank}
                                            label="Bank"
                                            onChange={(e) => setBank(e.target.value)}
                                        >
                                            {bankList?.map((bank) => (
                                                <MenuItem onClick={() => {
                                                    setBankCode(bank.code)
                                                    setBankName(bank.name)
                                                    console.log(bank)
                                                }} key={bank.name} value={bank.name}>{bank.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            {account_name.length === 0 ? (
                                <>
                                </>
                            ) : (
                                <div>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>Account Name</label>
                                    <input placeholder='Account Name' value={account_name} onChange={(e) => setAcoountName(e.target.value)} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                </div>
                            )}
                            <div className='py-4'>
                                {account_name.length === 0 ? (
                                    <button className='c-primary-button'>
                                        {loading ? 'Loading....' : 'Verify'}
                                    </button>
                                ) : <button className='c-primary-button'>
                                    {loading ? 'Loading....' : 'Create'}
                                </button>}

                            </div>

                        </div>
                    </form>
                </Box>
            </Modal>

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
    );
}