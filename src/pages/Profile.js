import { Divider, Grid, IconButton, LinearProgress, List, Skeleton, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import ProfileModal from '../components/Profile';
import WithdrawalModal from '../components/Withdraw';
import { DashBoardContext } from '../context/Dashboard';
import BenificiaryModal from '../components/Beneficiary';
import RecentWithDrawalModal from '../components/RecentWithdrawal';
import Protected from '../utils/axios';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BENEFICIARY, ADD_PROFILE } from '../redux/DashboardSlice';
import WithdrawalPopup from '../components/WIthdrawalPopup';
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

    const {open,setOpen,handleOpen,handleClose} = useContext(DashBoardContext)

    const [open5, setOpen5] = React.useState(false);
    const handleOpen5 = () => setOpen5(true);
    const handleClose5 = () => setOpen5(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    const [open4, setOpen4] = React.useState(false);
    const handleOpen4 = () => setOpen4(true);
    const handleClose4 = () => setOpen4(false);
    const [data, setData] = useState('')
    const [bankList, setBankList] = useState('')
    // const { beneficiaries } = useContext(DashBoardContext)


    // const [beneficiary, setbenificiary] = useState(beneficiaries)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { beneficiaries: beneficiary, profile: Profile } = useSelector((state) => state.dashboard)
    const [profile, setProfile] = useState(Profile)
    const [beneficiaries, setBeneficiaries] = useState(beneficiary)
    const dispatch = useDispatch()
    console.log(beneficiary)
    console.log(Profile)

    const Retrieve = (data) => {
        setData(data)
        handleOpen3()
    }
    const FetchBeneficiary = async () => {
        try {
            const response = await Protected.get(`http://localhost:4000/api/beneficiary/view`)
            console.log(response.data.data)
            setBeneficiaries(response.data.data)
            dispatch(ADD_BENEFICIARY(response.data.data))

        } catch (error) {
            console.log(error)
        }

    }
    const fetchProfile = async () => {
        const token = window.localStorage.getItem('bearer_token')
        if (token) {
            try {
                setLoading(true)
                const response = await Protected.get(`http://localhost:4000/api/user/profile`)
                console.log(response?.data?.data)
                dispatch(ADD_PROFILE(response?.data?.data))
                setProfile(response?.data?.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response)
            }

        } else {
            return;
        }
    }

    const fetchBanks = async () => {
        const response = await axios.get(`http://localhost:4000/api/paystack/bank-list`)
        console.log(response?.data?.data)
        setBankList(response.data.data)
    }

    useEffect(() => {
        fetchBanks()
        fetchProfile()
        FetchBeneficiary()
    }, [])

    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <div className=''>
                        {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : (
                            <div className='flex items-center space-x-5'>
                                <h2 className='fourier profile font-bold'>{profile?.firstname} {profile?.lastname}
                                    {/* <IconButton onClick={() => handleOpen()}> */}
                                    {/* </IconButton> */}

                                </h2>
                                <AutoFixHighIcon className="mx-2 mb-2 text-gray-500 fourier-profile-icon cursor-pointer" onClick={() => handleOpen5()} />
                            </div>
                        )}
                        {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<small className='font-bold text-gray-500'>{profile?.email}  {profile?.phonenumber}</small>)}


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
                                                    <IconButton onClick={()=>handleOpen()}>
                                                        <NearMeIcon className='text-[#234243]' />
                                                    </IconButton>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="px-0 pt-2">
                                        <div className='flex justify-between'>
                                            <h2 className='font-bold fourier text-xl'>Beneficiaries</h2>
                                            <small className='font-bold text-lg c-primary-link-color' data-tooltip-target='tooltip-default'>
                                                <IconButton onClick={() => handleOpen2()}>
                                                    <AddIcon className='cursor-pointer font-bold text-lg c-primary-link-color' />
                                                </IconButton>
                                            </small>
                                            <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                Tooltip content
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>

                                        <div className='py-2 dashboard-payment-link'>
                                            {beneficiaries && (
                                                <List>
                                                    {beneficiaries.map((beneficiary) => (
                                                        <ListItem key={beneficiary._id} disablePadding alignItems="flex-center" onClick={() => Retrieve(beneficiary)}>
                                                            <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden'>
                                                                <span className='profile-beneficiary-overlay'></span>
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12}>
                                                                        <div>
                                                                            <h2 className='font-bold'>{beneficiary.account_name}</h2>
                                                                            <div className='mt-4'>
                                                                                <p className='text-sm text-gray-400 font-bold'>{beneficiary.account_number}</p>
                                                                                <p className='c-primary-color font-bold'>{beneficiary.bank_name}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            )}
                                        </div>

                                    </div>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className="px-3 pt-0">
                                    <div className='flex justify-between items-center'>
                                        <h2 className='font-bold fourier text-xl'>Recent Withdrawals</h2>
                                        <Link to="/dashboard/withdrawal">
                                            <p className='text-sm c-primary-color cursor-pointer font-bold'>View All</p>
                                        </Link>

                                    </div>

                                    <div className='py-2 dashboard-payment-link'>
                                        <List>
                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4()}>
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
                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4()}>
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

                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4()}>
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

                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4()}>
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
                                        <div className='flex justify-between items-center'>
                                            <h2 className='font-bold fourier text-xl'>Recent Transactions</h2>
                                            <Link to="/dashboard/transaction">
                                                <p className='text-sm c-primary-color cursor-pointer font-bold'>View All</p>
                                            </Link>
                                        </div>
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
            <ProfileModal open5={open5} setOpen5={setOpen5} handleOpen5={handleOpen5} handleClose5={handleClose5} profile={profile} setProfile={setProfile} fetchProfile={fetchProfile} />
            <WithdrawalModal open2={open2} handleOpen2={handleOpen2} handleClose2={handleClose2} setOpen2={setOpen2} bankList={bankList} FetchBeneficiary={FetchBeneficiary} />
            <BenificiaryModal open3={open3} setOpen3={setOpen3} handleOpen3={handleOpen3} handleClose3={handleClose3} data={data} beneficiaries={beneficiaries} setBeneficiaries={setBeneficiaries} />
            <RecentWithDrawalModal open4={open4} setOpen4={setOpen4} handleOpen4={handleOpen4} handleClose4={handleClose4} />
            <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose}/>
        </>
    )
}
export default Profile;