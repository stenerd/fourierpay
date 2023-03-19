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
    width: 550,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function SinglePaymentModal({ from, open, setOpen, handleOpen, handleClose, transactions, recentPayment }) {
    console.log(recentPayment)

    // let recentPayment = 'paid'
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
                            {/* <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>{recentPayment?.unique_field}</h2>
                                <p className='font-bold'>{recentPayment?.unique_answer}</p>
                            </div> */}
                            {recentPayment?.form?.map((tx, index) => (
                                <div key={index} className='flex justify-between items-center py-3'>
                                    <h2 className='text-gray-400'>{tx?.field_name}</h2>
                                    <p className='font-bold text-sm'>{tx?.answer}</p>
                                </div>
                            ))}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Date</h2>
                                <p className='font-bold text-sm'>{moment(recentPayment?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold text-sm'>{recentPayment?.amount}</p>
                            </div>
                            {/* <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Payment Method</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.type}</p>
                            </div> */}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                {
                                    (from == 'payer sheet') ?
                                         (
                                            <p className={recentPayment?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid2' : 'py-2 px-2 rounded-lg text-sm status-fail2'}>{recentPayment?.status === 'paid' ? 'PAID' : 'NOT PAID'}</p>
                                        )
                                   :
                                        (
                                            <StatusBadge status={recentPayment?.status} />
                                        )
                                }
                            </div>
                            {/* <h2>Amount :</h2> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}