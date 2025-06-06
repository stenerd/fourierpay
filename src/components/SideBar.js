import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import { Icon, IconButton } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


// import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material';
import LogoutModal from './Logout';
import GenericAlertModal from './GenericAlertModal';
// import axios from 'axios';
const Sidebar = () => {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Logout = async () => {
        window.localStorage.removeItem('bearer_token')
        navigate('/')
    }
    return (
        <>
            <div className="min-h-screen  cm-mobile-make-payments w-[20%] shadow-lg  fixed">
                <div className='p-4'>
                    <div className='py-4'>
                        <Link to="/">
                            {/* <h2 className='text-2xl fourier w-5/6 px-2 mx-auto text-white font-semibold pt-4'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                            <div className='w-5/6 px-2 mx-auto pt-4'>
                                <div className='w-[8rem]'>
                                    <img src="/images/image-two.svg" alt='logo' />
                                </div>
                            </div>

                        </Link>
                    </div>
                    <div className='w-5/6 mx-auto flex flex-co1'>
                        {/* <div className='py-4'>
                            <input placeholder='Search' className='px-3 py-2 rounded-md bg-[#252728] text-white outline-none' />
                        </div> */}
                        {/* <div className="py-2">
                            <p className='text-white text-sm'>Overview</p>
                        </div> */}
                        <div className='py-10 space-y-2 flex-1'>
                            {/* <Link to="/">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <HomeIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Home</h2>
                                </div>
                            </Link> */}
                            <Link to="/dashboard">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <DashboardIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Dashboard</h2>
                                </div>
                            </Link>

                            <Link to="/dashboard/profile">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <Person2Icon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Profile</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard/paymentlinks">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <DatasetLinkedIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Payment Links</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard/transaction">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <AccountBalanceIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Transactions</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard/withdrawal">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <AccountBalanceWalletIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Request Withdrawal</h2>
                                </div>
                            </Link>
                             <Link to="/dashboard/agent">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <SupportAgentIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Fourier Agent</h2>
                                </div>
                            </Link>
                            {/* <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#ffffff26] py-2 px-2 rounded-md mb-4">
                                <IconButton>
                                    <VolunteerActivismIcon className="text-white" />
                                </IconButton>
                                <h2 className='font-bold text-[#f8faf7]'>Refunds</h2>
                            </div> */}

                        </div>
                        <div className="flex flex-1 items-center space-x-3 cursor-pointer rounded-md py-6 px-2 c-logout-button" onClick={() => handleOpen()}>
                            <IconButton>
                                <LogoutIcon className="text-white" />
                            </IconButton>
                            <h2 className='font-bold text-[#f8faf7]'>Logout</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* <LogoutModal open={open} handleOpen={handleOpen} handleClose={handleClose} setOpen={setOpen} /> */}
            <GenericAlertModal opened={open} handleOpened={handleOpen} handleClosed={handleClose} setOpen={setOpen} >
                <div>
                    <h4 className="text-xl font-bold text-[#1d3329]">Are you sure you want to Logout?</h4>
                    <p className="text-gray-700">Are you sure you want to Logout?          
                    </p>
                    <div className="flex justify-end mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => handleClose()}>No</button>
                        <button className="c-secondary-button-2" onClick={() => Logout()}>Yes</button>
                    </div>
                </div>
            </GenericAlertModal>
        </>
    )
}

export default Sidebar;