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

export default function ProfileModal({ open, handleOpen, handleClose, setOpen }) {
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const [loading, setLoading] = React.useState(false)
    
    

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='text-center text-xl'>Edit Profile</h2>
                    <div className='py-4 px-2'>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>First Name</label>
                            <input placeholder='First Name' onChange={handleChange} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Last Name</label>
                            <input placeholder='Last Name' onChange={handleChange} required name='lastname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                            <input placeholder='Email' onChange={handleChange} required name='email' type="email" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Phone Number</label>
                            <input placeholder='Phone Number' onChange={handleChange} required name='phonenumber' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div className='py-4'>
                            <button className='c-primary-button'>
                                {loading ? 'Loading....' : 'Submit'}
                            </button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}