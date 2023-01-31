import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Protected, { BASE_URL } from '../utils/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function ProfileModal({ open5, handleOpen5, handleClose5, setOpen5,profile ,setProfile,fetchProfile}) {
    const [state, setState] = React.useState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        // email: '',
        phonenumber:profile.phonenumber
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const [loading, setLoading] = React.useState(false)
    
    

    const EditProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Protected.put(`${BASE_URL}/api/user/edit`, state)
            console.log(response.data)
            toast.success('Profile Edited successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            setTimeout(() => {
                handleClose5()
            }, 1000);
            fetchProfile()
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            toast.error('An Error Occured', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }



    return (
        <div>

            <Modal
                open={open5}
                onClose={handleClose5}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='text-center text-xl'>Edit Profile</h2>
                    <form onSubmit={EditProfile}>
                        <div className='py-4 px-2'>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>First Name</label>
                                <input placeholder='First Name' onChange={handleChange} value={state.firstname} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Last Name</label>
                                <input placeholder='Last Name' onChange={handleChange} value={state.lastname}  required name='lastname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            {/* <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                                <input placeholder='Email' onChange={handleChange} required name='email' type="email" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div> */}
                            <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Phone Number</label>
                                <input placeholder='Phone Number' onChange={handleChange} value={state.phonenumber}  required name='phonenumber' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div className='py-4'>
                                <button className='c-primary-button'>
                                    {loading ? 'Loading....' : 'Save'}
                                </button>
                            </div>

                        </div>
                    </form>

                </Box>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}