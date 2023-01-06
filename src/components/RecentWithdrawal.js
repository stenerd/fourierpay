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
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Reciepient</label>
                        <input value={"Peter Drury"} required name='Account Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Amount</label>
                        <input value={"4000"} required name='Bank Name' type="number" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                        <input value={"Guaranty Trust Bank"} name='Account Number' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                        <input value={"0430775470"} name='Account Number' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}