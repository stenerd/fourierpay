import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import StatusBadge from './atom/web/StatusBadge';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function TransactionModal({ open, setOpen, handleOpen, handleClose, transactions, recentTransaction }) {
    console.log(recentTransaction)
    let recentPayment = 'paid'
    return (
        <div>
            {/* <Button onClick={handleOpened}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <div>
                            <h2 className='text-center font-bold text-xl'>Transaction Receipt</h2>
                        </div>
                        <div className='py-3 divide-y-2'>

                            {/* <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1> */}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                <StatusBadge status={recentTransaction?.status} />
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Reference</h2>
                                <p className='font-bold'>{recentTransaction?.reference}</p>
                            </div>
                            {recentTransaction?.in_entity_id?.form?.map((tx, index) => (
                                <div className='flex justify-between items-center py-3'>
                                    <h2 className='text-gray-400 capitalize'>{tx?.field_name}</h2>
                                    <p className='font-bold text-sm'>{tx?.answer}</p>
                                </div>
                            ))}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Date</h2>
                                <p className='font-bold text-sm'>{moment(recentTransaction?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.amount}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Payment Method</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.type}</p>
                            </div>

                            {/* <h2>Amount :</h2> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}