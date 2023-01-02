import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
                    <div className='w-4/5 mx-auto'>
                        {/* <div className='py-4'>
                            <input placeholder='Search' className='px-3 py-2 rounded-md bg-[#252728] text-white outline-none' />
                        </div> */}
                        {/* <div className="py-2">
                            <p className='text-white text-sm'>Overview</p>
                        </div> */}
                        <div className='py-4 space-y-2'>
                            <Link to="/">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 rounded-md">
                                    <IconButton>
                                        <HomeIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='text-white'>Home</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 rounded-md">
                                    <IconButton>
                                        <DashboardIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='text-white'>Dashboard</h2>
                                </div>
                            </Link>
                            <Link to="/dashboard/paymentlinks">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 rounded-md">
                                    <IconButton>
                                        <LinkIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='text-white'>Payment Links</h2>
                                </div>
                            </Link>

                            <Link to="/dashboard/transaction">
                                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 rounded-md">
                                    <IconButton>
                                        <AccountBalanceWalletIcon className="text-white" />
                                    </IconButton>
                                    <h2 className='text-white'>Transactions</h2>
                                </div>
                            </Link>
                            <div className="flex items-center space-x-3 cursor-pointer hover:bg-[#3E554C] py-2 rounded-md">
                                <IconButton>
                                    <VolunteerActivismIcon className="text-white" />
                                </IconButton>
                                <h2 className='text-white'>Refunds</h2>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer rounded-md py-6">
                            <IconButton>
                                <LogoutIcon className="text-white" />
                            </IconButton>
                            <h2 className='text-white'>Logout</h2>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;