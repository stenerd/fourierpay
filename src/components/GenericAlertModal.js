import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';


export default function GenericAlertModal({ opened, handleClosed, width, children }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width || 500,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };


    return (
        <div className='hidden md:block'>
            {/* <Button onClick={handleOpened}>Open modal</Button> */}
            <Modal
                open={opened}
                // onClose={handleCloseed}
                disableEnforceFocus={true}
                disableAutoFocus={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='hidden md:block'
            >
                <Box sx={style}>
                    <>
                        <span></span>
                        <span></span>
                        <div className='py-3 relative'>
                            
                            <span className='c-close-generic-modal'>
                                <CloseIcon onClick={() => handleClosed(!opened)} className="cursor-pointer" />
                            </span>
                            {/* <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1>
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
                                <p className={recentPayment?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{recentPayment?.status}</p>
                            </div> */}
                            {children}
                            {/* <h2>Amount :</h2> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}