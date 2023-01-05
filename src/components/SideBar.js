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
// import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material';
// import axios from 'axios';
const Sidebar = () => {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    let LogOut;
    return (
        <>
            <div className="min-h-screen bg-[#0d1510] w-[20%] shadow-lg  fixed">
                <div className='p-4'>
                    <div className='py-4'>
                        <h2 className='text-xl fourier text-center text-white'>Fourier<span className='text-[#688c8d]'>Pay</span></h2>
                    </div>
                    <div className='w-5/6 mx-auto'>
                        {/* <div className='py-4'>
                            <input placeholder='Search' className='px-3 py-2 rounded-md bg-[#252728] text-white outline-none' />
                        </div> */}
                        {/* <div className="py-2">
                            <p className='text-white text-sm'>Overview</p>
                        </div> */}
                        <div className='py-12 space-y-2'>
                            <Link to="/">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <HomeIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Home</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <DashboardIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Dashboard</h2>
                                </div>
                            </Link>

                            <Link to="/dashboard/profile">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <Person2Icon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Profile</h2>
                                </div>
                            </Link>

                            <Link to="/dashboard/paymentlinks">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <LinkIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Payment Links</h2>
                                </div>
                            </Link>
                           

                            <Link to="/dashboard/transaction">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                    <IconButton>
                                        <AccountBalanceWalletIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='font-bold text-[#f8faf7]'>Transactions</h2>
                                </div>
                            </Link>
                            <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 px-2 rounded-md mb-4">
                                <IconButton>
                                    <VolunteerActivismIcon className="text-white" />
                                </IconButton>
                                <h2 className='font-bold text-[#f8faf7]'>Refunds</h2>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer rounded-md py-6 px-2 c-logout-button">
                            <IconButton>
                                <LogoutIcon className="text-white" />
                            </IconButton>
                            <h2 className='font-bold text-[#f8faf7]'>Logout</h2>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;