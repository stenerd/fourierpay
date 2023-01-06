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
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function BenificiaryModal({ data, open3, handleOpen3, setOpen3, handleClose3 }) {


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='text-xl text-center'>Beneficiary</h2>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Name</label>
                        <input value={data.account_name}  required name='Account Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                        <input value={data.bank_name}  required name='Bank Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                    <div>
                        <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                        <input value={data.account_number}  name='Account Number' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}