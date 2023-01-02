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
    return (
        <>
            <DashboardLayout>
                <div className='px-4 py-8'>
                    <div className='flex justify-between items-center w-[90%] mx-auto'>
                        <h2 className='fourier text-xl font-bold'>DashBoard</h2>
                        <button onClick={toggleDrawer("right", true)} className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                    </div>
                    {/* <div className='py-6'>
                        <div className='flex items-center w-[90%] space-x-5 mx-auto'>
                            <div className='bg-[#F8FAF7] py-4 h-[200px] w-[200px] shadow-md'>
                                <div className='w-4/5 mx-auto py-2 space-y-4'>
                                    <IconButton>
                                        <WalletIcon className='text-[#234243]' fontSize='large' />
                                    </IconButton>
                                    <h2 className='font-mono'>Account Balance</h2>
                                    <h2 className='font-bold text-xl sub'>1,500,000</h2>
                                </div>


                            </div>
                            <div className='bg-[#F8FAF7] py-4 h-[200px] shadow-md w-[200px]'>
                                <div className='w-4/5 mx-auto py-2 space-y-4'>
                                    <IconButton>
                                        <LinkIcon className='text-[#234243]' fontSize='large' />
                                    </IconButton>
                                    <h2 className='font-mono'>Created Links</h2>
                                    <h2 className='font-bold text-xl sub'>20</h2>
                                </div>


                            </div>
                            <div className='bg-[#F8FAF7] py-4 h-[200px] shadow-md w-[200px]'>
                                <div className='w-4/5 mx-auto py-2 space-y-4'>
                                    <IconButton>
                                        <CreditCardIcon className='text-[#234243]' fontSize='large' />
                                    </IconButton>
                                    <h2 className='font-mono'>Withdrawal</h2>
                                    <h2 className='font-bold text-xl sub'>5</h2>
                                </div>
                            </div>
                        </div>
                        <div className='py-6'>
                            <div className='w-[90%] mx-auto'>
                                <h2 className='text-lg fourier'>Transactions</h2>
                                <div className='flex justify-between space-between items-center text-center py-4 font-bold font-mono'>
                                    <div><h2 className='text-center flex-1'>Title</h2></div>
                                    <div><h2 className=' flex-1'>Customer</h2></div>
                                    <div><h2 className=' flex-1'>Amount</h2></div>
                                    <div><h2 className=' flex-1'>Date</h2></div>
                                    <div><h2 className=' flex-1'>Status</h2></div>
                                </div>
                                <div className='flex justify-between items-center space-between py-4 text-center font-mono font-bold'>
                                    <div><h2 className=' flex-1'>ELA Dues</h2></div>
                                    <div><h2 className=' flex-1'>Ofuzor Chukwuemeke</h2></div>
                                    <div><h2 className=' flex-1'>1000</h2></div>
                                    <div><h2 className=' flex-1'>12/10/2023</h2></div>
                                    <div>
                                        <button className='rounded-[50px] text-[#234243] bg-[#F8FAF7] py-2 px-4'><span></span> Success</button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center space-between py-4 text-center font-bold font-mono'>
                                    <div><h2 className=' flex-1'>ELA Dues</h2></div>
                                    <div><h2 className=' flex-1'>Ofuzor Chukwuemeke</h2></div>
                                    <div><h2 className=' flex-1'>1000</h2></div>
                                    <div><h2 className=' flex-1'>12/10/2023</h2></div>
                                    <div>
                                        <button className='rounded-[50px] text-[#234243] bg-[#F8FAF7] py-2 font-bold px-4'><span></span> Success</button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center space-between py-4 font-bold text-center font-mono'>
                                    <div><h2 className=' flex-1'>ELA Dues</h2></div>
                                    <div><h2 className=' flex-1'>Ofuzor Chukwuemeke</h2></div>
                                    <div><h2 className=' flex-1'>1000</h2></div>
                                    <div><h2 className=' flex-1'>12/10/2023</h2></div>
                                    <div>
                                        <button className='rounded-[50px] text-[#234243] bg-[#F8FAF7] py-2 px-4'><span></span> Success</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='py-6 px-3 w-[90%] mx-auto'>
                        <Grid container spacing={2} alignItems="">
                            <Grid item xs={12} md={4}>
                                <Stack spacing={4}>
                                    <div className='bg-[#f1f3f0] rounded-md'>
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3'>
                                                <h1 className='fourier font-bold'>1200-0000-0000-****</h1>
                                                <h3 className="py-2 text-gray-400">09/23</h3>
                                            </div>
                                        </div>
                                        <div className='py-2 px-2 bg-[#f8faf7]'>
                                            <div className='w-[90%] mx-auto'>
                                                <div className='spacing-y-3 flex justify-between items-center'>
                                                    <div>
                                                        <h1 className='fourier text-[20px] font-bold'>$240,000</h1>
                                                        <h3 className="py-2 text-gray-400">Total Balance</h3>
                                                    </div>
                                                    <IconButton>
                                                        <NearMeIcon className='text-[#234243]' />
                                                    </IconButton>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='bg-white shadow-md rounded-md'>
                                        <div className='py-2 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3'>
                                                <h1 className='fourier text-xl font-bold'>Spending Limit</h1>
                                                <p className="text-gray-400 text-sm">DAILY TRANSACTION LIMIT</p>
                                            </div>
                                            <div className='py-4'>
                                                <BorderLinearProgress variant="determinate" value={10} />
                                            </div>
                                            <div className='py-2 flex justify-between items-center'>
                                                <p className='text-[#234243] text-sm'>$199 spent out of $2,4000</p>
                                                <p className='text-sm font-bold'>10%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white shadow-md rounded-md'>
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            <div className='spacing-y-3'>
                                                <h1 className='fourier font-bold'>OutCome Statistics</h1>
                                                {/* <p className="py-2 text-sm text-gray-400">DAILY TRANSACTION LIMIT</p> */}
                                            </div>
                                            <div className='py-4'>
                                                <BorderLinearProgress variant="determinate" value={50} />
                                            </div>
                                            <div className='py-2 flex justify-between items-center'>
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
                                            <div className='bg-[#f8faf7] py-2 h-[120px]  rounded-md'>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        {/* <IconButton> */}
                                                        <AttachMoneyIcon className='text-[#234243]' />
                                                        {/* </IconButton> */}
                                                        <h2 className='text-sm text-gray-400'>Income</h2>
                                                        <h1 className='font-bold fourier'>$189,000</h1>

                                                    </div>

                                                </div>

                                            </div>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 h-[120px] rounded-md'>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <PaidIcon className='text-[#234243]' />
                                                        <h2 className='text-sm text-gray-400'>Budget</h2>
                                                        <h1 className='font-bold fourier'>$390,000</h1>

                                                    </div>
                                                </div>

                                            </div>


                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 h-[120px]  rounded-md'>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <PaymentsIcon className='text-[#234243]' />
                                                        <h2 className='text-sm text-gray-400'>Withdrawal</h2>
                                                        <h1 className='font-bold fourier'>$390,000</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='bg-[#f8faf7] py-2 h-[120px]  rounded-md'>
                                                <div className="p-2 w-[90%] mx-auto">
                                                    <div className='space-y-3 flex flex-col items-start justify-start'>
                                                        <LinkIcon className='text-[#234243]' />
                                                        <h2 className='text-sm text-gray-400'>Payment Links</h2>
                                                        <h1 className='font-bold fourier'>50</h1>

                                                    </div>

                                                </div>

                                            </div>


                                        </Grid>

                                    </Grid>
                                </div>
                                <div className='py-4 px-3'>
                                    <Divider />
                                    <div className="py-4">
                                        <h1 className='fourier font-bold text-lg'>Transactions</h1>
                                        <div className='py-2'>
                                            <List>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            <h2 className='text-sm'>ELA dues</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <p className='text-sm text-gray-400 text-center'>****-2098-3367-2900</p>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <h2 className='text-sm text-gray-400 text-center'>$2300</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <button className='py-2 px-2 rounded-lg text-sm bg-[#f8faf7]'>Success</button>
                                                            </div>

                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            <h2 className='text-sm'>ELA dues</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <p className='text-sm text-gray-400 text-center'>****-2098-3367-2900</p>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <h2 className='text-sm text-gray-400 text-center'>$2300</h2>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <button className='py-2 px-2 rounded-lg text-sm bg-[#f8faf7]'>Success</button>
                                                            </div>

                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                               
                                            </List>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-3">
                                    <h2 className='font-bold fourier text-lg'>Payment Links</h2>
                                    <div className='py-2'>
                                        <List>
                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <ListItemText>
                                                        <h2 className='text-sm'>ELA dues</h2>
                                                    </ListItemText>
                                                    <ListItemText>
                                                        <p className='text-sm text-gray-400 text-center'>https://fourierpay.netlify.app/eladues</p>
                                                    </ListItemText>
                                                   
                                                    <ListItemText>
                                                        <div className="text-center">
                                                            <button className='py-2 px-2 rounded-lg text-red-500 text-sm bg-[#f8faf7]'>Expired</button>
                                                        </div>

                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <ListItemText>
                                                        <h2 className='text-sm'>UBT dues</h2>
                                                    </ListItemText>
                                                    <ListItemText>
                                                        <p className='text-sm text-gray-400 text-center px-2'>https://fourierpay.netlify.app/ubitdues</p>
                                                    </ListItemText>
                                                   
                                                    <ListItemText>
                                                        <div className="text-center">
                                                            <button className='py-2 px-2 rounded-lg text-sm bg-[#f8faf7]'>Active</button>
                                                        </div>

                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            
                                        </List>
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