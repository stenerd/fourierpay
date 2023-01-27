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
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function RecentWithDrawalModal({ open4, setOpen4, handleOpen4, handleClose4 }) {

    let recentPayment ='paid'
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
                    <h2 className='text-xl text-center'>Recent Withdrawal</h2>
                    <div className='flex justify-between items-center py-3'>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Reciepient</label>
                        <h2 required name='Account Name' className='text-sm'>Peter Drury</h2>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Amount</label>
                        <h2 required name='Amount' className='text-sm'>4000</h2>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                        <h2 required name='Account Name' className='text-sm'>Guaranty Trust Bank</h2>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                        <h2 required name='Account Name' className='text-sm'>0430775470</h2>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                        <h2 className='text-sm font-bold block my-2 text-gray-700'>Status</h2>
                        <p className={recentPayment?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{recentPayment}</p>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}