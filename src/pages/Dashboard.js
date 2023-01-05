import { Divider, Grid, IconButton, LinearProgress, List, Stack } from '@mui/material'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import WalletIcon from '@mui/icons-material/Wallet';
import LinkIcon from '@mui/icons-material/Link';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentDrawer from '../components/PaymentDrawer';
import NearMeIcon from '@mui/icons-material/NearMe';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';
import Titlebar from '../components/TitleBar'
import '../styles/Dashboard.css'
const Dashboard = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#234243' : '#234243',
        },
    }));


    const navigate = useNavigate()
    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>DashBoard</h2>
                    <div>
                        <button onClick={()=>navigate('/dashboard/payment')} className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                    </div>
                </Titlebar>
                <div className='px-16 py-8'>
                    {/* <div className='flex justify-between items-center w-[90%] mx-auto'>
                        <h2 className='fourier text-xl font-bold'>DashBoard</h2>
                        <button onClick={()=>navigate("/dashboard/payment")} className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                    </div> */}
                
                    <div className='py-4'>
                        <Grid container spacing={4} alignItems="">
                            <Grid item xs={12} md={4}>
                                <Stack spacing={4}>
                                    <div className='bg-[#f1f3f0] rounded-md dashboard-wallet'>
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3'>
                                                <h1 className='fourier font-bold'>1200-0000-0000-8889</h1>
                                                <h3 className="text-gray-400 font-bold">Monday 9th May 2022</h3>
                                            </div>
                                        </div>
                                        <div className='py-2 px-2 bg-[#f8faf7]'>
                                            <div className='w-[90%] mx-auto'>
                                                <div className='spacing-y-3 flex justify-between items-center'>
                                                    <div className='py-4'>
                                                        <h1 className='fourier text-[20px] font-bold'>$240,000</h1>
                                                        <h3 className="text-gray-400 font-bold">Total Balance</h3>
                                                    </div>
                                                    <IconButton>
                                                        <NearMeIcon className='text-[#234243]' />
                                                    </IconButton>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='bg-white shadow-md rounded-md dashboard-spending-limit'>
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3 mb-8'>
                                                <h1 className='fourier text-xl font-bold'>Spending Limit</h1>
                                                <p className="text-gray-400 text-sm font-bold">Daily Transaction Limit</p>
                                            </div>
                                            <div className='py-2'>
                                                <BorderLinearProgress variant="determinate" value={10} />
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-sm font-bold'>
                                                    <span className='text-[#f10707]'>$199</span>
                                                    <span className='text-[#9aa3ae]'> spent out of </span>
                                                    <span className='text-[#234243]'>$2,4000</span>
                                                </p>
                                                <p className='text-sm font-bold'>10%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white shadow-md rounded-md dashboard-spending-limit'>
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3 mb-8'>
                                                <h1 className='fourier font-bold'>OutCome Statistics</h1>
                                                {/* <p className="py-2 text-sm text-gray-400">DAILY TRANSACTION LIMIT</p> */}
                                            </div>
                                            <div className='py-2'>
                                                <BorderLinearProgress variant="determinate" value={50} />
                                            </div>
                                            <div className='flex justify-between items-center font-bold'>
                                                <p className='text-[#234243] text-sm'>Withdrawals</p>
                                                <p className='text-sm font-bold'>20</p>
                                            </div>
                                        </div>

                                    </div>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className='px-2'>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 rounded-md dashboard-matrix'>
                                                <div className='overlay'></div>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        {/* <IconButton> */}
                                                        <div className='content'>
                                                            <AttachMoneyIcon className='text-[#234243]' />
                                                        </div>
                                                        {/* </IconButton> */}
                                                        <div className='pt-8'>
                                                            <h2 className='text-sm text-gray-400 font-bold'>Income</h2>
                                                            <h1 className='font-bold fourier'>$189,000</h1>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 rounded-md dashboard-matrix'>
                                                <div className='overlay'></div>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <div className='content'>
                                                            <PaidIcon className='text-[#234243]' />
                                                        </div>
                                                        <div className='pt-8'>
                                                            <h2 className='text-sm text-gray-400 font-bold'>Budget</h2>
                                                            <h1 className='font-bold fourier'>$390,000</h1>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 rounded-md dashboard-matrix'>
                                                <div className='overlay'></div>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <div className='content'>
                                                            <PaymentsIcon className='text-[#234243]' />
                                                        </div>
                                                        <div className='pt-8'>
                                                            <h2 className='text-sm text-gray-400 font-bold'>Withdrawal</h2>
                                                            <h1 className='font-bold fourier'>$390,000</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 rounded-md dashboard-matrix'>
                                                <div className='overlay'></div>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <div className='content'>
                                                            <LinkIcon className='text-[#234243]' />
                                                        </div>
                                                        <div className='pt-8'>
                                                            <h2 className='text-sm text-gray-400 font-bold'>Payment Links</h2>
                                                            <h1 className='font-bold fourier'>50</h1>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                        </Grid>

                                    </Grid>
                                </div>
                                <div className="px-3 pt-8">
                                    <h2 className='font-bold fourier text-xl'>Recent Links</h2>
                                    <div className='py-2 dashboard-payment-link'>
                                        <List>
                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <div className='py-1 w-full'>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={5}>
                                                                <div>
                                                                    <h2 className='font-bold'>ELA DUES</h2>
                                                                    <p className='text-sm text-gray-400'>https://fourierpay.netlify.app/eladues</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 4000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <div className='set-item-center'>
                                                                    <small className='text-sm text-[#f10707] status-pill'>Expired - 24th May 2022</small>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                </ListItemButton>
                                                
                                            </ListItem>
                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <div className='py-1 w-full'>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={5}>
                                                                <div>
                                                                    <h2 className='font-bold'>THERMO MATERIALS</h2>
                                                                    <p className='text-sm text-gray-400'>https://fourierpay.netlify.app/thermo-materials</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 1000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <div className='set-item-center'>
                                                                    <small className='text-sm text-[#00bf00] status-pill'>Active - 24th March 2023</small>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                </ListItemButton>
                                                
                                            </ListItem>

                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <div className='py-1 w-full'>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={5}>
                                                                <div>
                                                                    <h2 className='font-bold'>ELA DUES</h2>
                                                                    <p className='text-sm text-gray-400'>https://fourierpay.netlify.app/eladues</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 4000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <div className='set-item-center'>
                                                                    <small className='text-sm text-[#f10707] status-pill'>Expired - 24th May 2022</small>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                </ListItemButton>
                                                
                                            </ListItem>
                                        </List>
                                    </div>

                                </div>


                                <div className='pt-4 px-3'>
                                    <div className=''>
                                        <h1 className='fourier font-bold text-xl'>Recent Payments</h1>
                                        <div className='py-2'>
                                            <List>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            <h2 className='text-sm font-bold'>LINK PAYMENT</h2>
                                                            <small className='text-sm text-gray-400'>TMA9Khbat43aWcg</small>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <h2 className='text-sm font-bold text-center'>$2300</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#00bf00]'>CREDIT</p>
                                                            </div>

                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <p className='py-2 px-2 rounded-lg text-sm status-paid'>paid</p>
                                                            </div>

                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            <h2 className='text-sm font-bold'>WALLET DEBIT</h2>
                                                            <small className='text-sm text-gray-400'>TMA9Khbat43aWcg</small>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <h2 className='text-sm font-bold text-center'>$2300</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#f10707]'>DEBIT</p>
                                                            </div>

                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <p className='py-2 px-2 rounded-lg text-sm status-fail'>abandoned</p>
                                                            </div>

                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                               
                                            </List>
                                        </div>
                                    </div>
                                </div>

                                
                            </Grid>
                        </Grid>

                    </div>
                </div>
            </DashboardLayout>
            <PaymentDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} />
        </>
    )
}
export default Dashboard;