import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function RecentWithDrawalModal({ open4, setOpen4, handleOpen4, handleClose4, withdraw }) {

    console.log(withdraw)

    let recentPayment = 'paid'
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open4}
                onClose={handleClose4}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='divide-y-2'>
                        <div className='py-4'>
                            <h2 className='text-xl font-bold text-center'>Recent Withdrawal</h2>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <h2 className='text-sm font-bold block my-2 text-gray-700'>Status</h2>
                            <p className={withdraw?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{recentPayment}</p>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Reciepient</label>
                            <h2 required name='Account Name' className='text-sm font-bold'>{withdraw?.name}</h2>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Amount</label>
                            <h2 required name='Amount' className='text-sm font-bold'>{withdraw?.amount}</h2>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                            <h2 required name='Account Name' className='text-sm font-bold'>{withdraw?.bank_name}</h2>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                            <h2 required name='Account Name' className='text-sm font-bold'>{withdraw?.account_number}</h2>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}