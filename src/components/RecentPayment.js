import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function RecentModal({ opened, setOpened, handleOpened, handleCloseed, recentPayment }) {


    return (
        <div>
            {/* <Button onClick={handleOpened}>Open modal</Button> */}
            <Modal
                open={opened}
                onClose={handleCloseed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <div className='py-3'>
                            <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold'>{recentPayment?.amount}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Description</h2>
                                <p className='font-bold text-sm'>{recentPayment?.payment_link_id.description}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                <StatusBadge status={recentPayment?.status} />
                            </div>
                            {/* <h2>Amount :</h2> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}