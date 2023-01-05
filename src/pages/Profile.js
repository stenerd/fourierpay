import { Divider, Grid, IconButton, LinearProgress, List, Stack } from '@mui/material'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import WalletIcon from '@mui/icons-material/Wallet';
import LinkIcon from '@mui/icons-material/Link';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
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
import Titlebar from '../components/TitleBar'
import AddIcon from '@mui/icons-material/Add';
import '../styles/Dashboard.css'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
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
                    <div>
                        <h2 className='fourier profile font-bold relative'>Chinedu Ifediorah 
                            <AutoFixHighIcon className="mx-2 mb-2 text-gray-500 fourier-profile-icon cursor-pointer" />
                        </h2>
                        <small className='font-bold text-gray-500'>peter.drury@gmail.com | 09056567777</small>
                    </div>
                </Titlebar>
                <div className='px-16 py-8'>
                    {/* <div className='flex justify-between items-center w-[90%] mx-auto'>
                        <h2 className='fourier text-xl font-bold'>DashBoard</h2>
                        <button onClick={toggleDrawer("right", true)} className='px-4 py-2 rounded-md text-white bg-[#234243]'>Create Payment</button>
                    </div> */}
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
                                    
                                    
                                    <div className="px-0 pt-2">
                                        <div className='flex justify-between'>
                                            <h2 className='font-bold fourier text-xl'>Beneficiaries</h2>
                                            <small className='font-bold text-lg c-primary-link-color' data-tooltip-target='tooltip-default'><AddIcon className='cursor-pointer font-bold text-lg c-primary-link-color' /></small>
                                            <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                Tooltip content
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                        
                                        <div className='py-2 dashboard-payment-link'>
                                            <List>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden'>
                                                        <span className='profile-beneficiary-overlay'></span>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <h2 className='font-bold'>PETER SIMON DRURY</h2>

                                                                    <div className='mt-4'>
                                                                        <p className='text-sm text-gray-400 font-bold'>6235832242</p>
                                                                        <p className='c-primary-color font-bold'>FIDELITY BANK</p>
                                                                    </div>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                    
                                                </ListItem>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden'>
                                                        <span className='profile-beneficiary-overlay'></span>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <h2 className='font-bold'>PETER SIMON DRURY</h2>

                                                                    <div className='mt-4'>
                                                                        <p className='text-sm text-gray-400 font-bold'>304567789</p>
                                                                        <p className='c-primary-color font-bold'>POLARIS BANK</p>
                                                                    </div>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                    
                                                </ListItem>
                                                <ListItem disablePadding alignItems="flex-center">
                                                    <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden'>
                                                        <span className='profile-beneficiary-overlay'></span>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <h2 className='font-bold'>PETER SIMON DRURY</h2>

                                                                    <div className='mt-4'>
                                                                        <p className='text-sm text-gray-400 font-bold'>2000323211</p>
                                                                        <p className='c-primary-color font-bold'>KUDA BANK</p>
                                                                    </div>
                                                                </div>

                                                            </Grid>
                                                            
                                                            
                                                            
                                                        </Grid>
                                                    </div>
                                                    
                                                </ListItem>
                                            </List>
                                        </div>

                                    </div>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className="px-3 pt-0">
                                    <h2 className='font-bold fourier text-xl'>Recent Withdrawals</h2>
                                    <div className='py-2 dashboard-payment-link'>
                                        <List>
                                            <ListItem disablePadding alignItems="flex-center">
                                                <ListItemButton>
                                                    <div className='py-1 w-full'>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={6}>
                                                                <div>
                                                                    <h2 className='font-bold'>TO: PETER DRURY</h2>
                                                                    <p className='text-sm text-gray-400 font-bold'>TMA9Khbat43aWcg | FIDELITY BANK (6234342211)</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 4000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className="text-center">
                                                                    <p className='py-2 px-2 rounded-lg text-sm status-paid'>paid</p>
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
                                                            <Grid item xs={6}>
                                                                <div>
                                                                    <h2 className='font-bold'>TO: PETER DRURY</h2>
                                                                    <p className='text-sm text-gray-400 font-bold'>TMA9Khbat43aWcg | FIDELITY BANK (6234342211)</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 1000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className="text-center">
                                                                    <p className='py-2 px-2 rounded-lg text-sm status-fail'>abandoned</p>
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
                                                            <Grid item xs={6}>
                                                                <div>
                                                                    <h2 className='font-bold'>TO: PETER DRURY</h2>
                                                                    <p className='text-sm text-gray-400 font-bold'>TMA9Khbat43aWcg | FIDELITY BANK (6234342211)</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 4000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className="text-center">
                                                                    <p className='py-2 px-2 rounded-lg text-sm status-paid'>paid</p>
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
                                                            <Grid item xs={6}>
                                                                <div>
                                                                    <h2 className='font-bold'>TO: PETER DRURY</h2>
                                                                    <p className='text-sm text-gray-400 font-bold'>TMA9Khbat43aWcg | FIDELITY BANK (6234342211)</p>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className='set-item-center'>
                                                                    <h2 className='font-bold'>$ 4000</h2>
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div className="text-center">
                                                                    <p className='py-2 px-2 rounded-lg text-sm status-fail'>abandoned</p>
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
                                        <h1 className='fourier font-bold text-xl'>Recent Transactions</h1>
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
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#00bf00] font-bold'>CREDIT</p>
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
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#f10707] font-bold'>DEBIT</p>
                                                            </div>

                                                        </ListItemText>
                                                        <ListItemText>
                                                            <div className="text-center">
                                                                <p className='py-2 px-2 rounded-lg text-sm status-fail'>abandoned</p>
                                                            </div>

                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
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
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#00bf00] font-bold'>CREDIT</p>
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
                                                                <p className='py-2 px-2 rounded-lg text-sm text-[#f10707] font-bold'>DEBIT</p>
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
export default Profile;