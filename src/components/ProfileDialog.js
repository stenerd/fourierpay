import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Protected, { BASE_URL } from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';


export default function ProfileDialog({ open11, handleClickOpen11, handleClose11, setOpen11, profile, setProfile, fetchProfile }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleChanges = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate()

    const [value,setValue] = React.useState(0)

    React.useEffect(()=>{
        setValue('profile')
    })

    const [state, setState] = React.useState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        // email: '',
        phonenumber: profile.phonenumber
    })
    console.log(profile)


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
                handleClose11()
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
            <Dialog
                fullScreen={fullScreen}
                open={open11}
                onClose={handleClose11}
                aria-labelledby="responsive-dialog-title"
            >
                <div className='py-3 mt-5 px-3'>
                    <div className='py-2 relative'>
                        <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClose11()}>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <CancelIcon className='text-red-500 ' />
                                </IconButton>
                                <h2 className='font-bold'>Close</h2>
                            </div>
                        </div>
                        <h2 className='text-center text-xl'>Edit Profile</h2>
                        <form onSubmit={EditProfile}>

                            <div className='py-4 px-2'>
                                <div>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>First Names</label>
                                    <input placeholder='First Name' onChange={handleChange} value={state?.firstname} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                </div>
                                <div>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>Last Name</label>
                                    <input placeholder='Last Name' onChange={handleChange} value={state?.lastname} required name='lastname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                </div>
                                {/* <div>
                                <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                                <input placeholder='Email' onChange={handleChange} required name='email' type="email" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div> */}
                                <div>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>Phone Number</label>
                                    <input placeholder='Phone Number' onChange={handleChange} value={state?.phonenumber} required name='phonenumber' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                </div>
                                <div className='py-4'>
                                    <button className='c-primary-button w-full'>
                                        {loading ? 'Loading....' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChanges}>
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dashboard"
                            onClick={() => navigate('/dashboard')}
                            icon={<DashboardIcon />}
                        />
                        <BottomNavigationAction
                            label="Transactions"
                            value="transactions"
                            onClick={() => navigate('/dashboard/transaction')}
                            icon={<ReceiptIcon />}
                        />
                        <BottomNavigationAction
                            label="Links"
                            value="links"
                            icon={<InsertLinkIcon />}
                            onClick={() => navigate('/dashboard/paymentlinks')}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountCircleIcon />}
                            onClick={() => navigate('/dashboard/profile')}
                        />
                        {/* <BottomNavigationAction
                            label="Favorites"
                            value="favorites"
                            icon={<FavoriteIcon />}
                        /> */}
                        {/* <BottomNavigationAction
                            label="Nearby"
                            value="nearby"
                            icon={<LocationOnIcon />}
                        /> */}
                        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                    </BottomNavigation>
                </Paper>
            </Dialog>
        </div>
    );
}