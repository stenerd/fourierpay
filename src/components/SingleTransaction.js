import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StatusBadge from './atom/web/StatusBadge';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function SingleTransactionModal({ open7, setOpen7, handleOpen7, handleClose7, transactions, singleTransaction }) {

    console.log(singleTransaction)

    let recentPayment = 'paid'
    return (
        <div>
            {/* <Button onClick={handleOpened}>Open modal</Button> */}
            <Modal
                open={open7}
                onClose={handleClose7}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <div className='py-3'>
                            <h1 className='text-center font-bold'>{singleTransaction?.reference
                            }</h1>
                            {/* <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Description</h2>
                                <p className='font-bold'>{recentTransaction?.Description}</p>
                            </div> */}
                            {/* <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Customer</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.Customer}</p>
                            </div> */}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold text-sm'>{singleTransaction?.amount}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Payment Method</h2>
                                <p className='font-bold text-sm'>{singleTransaction?.type
                                }</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                <StatusBadge status={singleTransaction?.status} />
                            </div>
                            {/* <h2>Amount :</h2> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}