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
import Protected, { BASE_URL } from '../utils/axios';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BENEFICIARY, ADD_PROFILE, SINGLE_PAYMENTLINK } from '../redux/DashboardSlice';
import WithdrawalPopup from '../components/WIthdrawalPopup';
import moment from 'moment'
import SingleTransactionModal from '../components/SingleTransaction';
import RecentLinksSkeleton from '../components/RecentLinksSkeleton';
import BeneficiarySkeleton from '../components/BeneficiarySkeleton';
import RecentTransacton from '../components/RecentTransaction';
import useClipboard from "react-use-clipboard";
import { ToastContainer, toast } from 'react-toastify';
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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TransactionDialog from '../components/TraansactionDialog';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            backgroundColor: theme.palette.mode === 'light' ? '#1d3329' : '#1d3329',
        },
    }));

    const { open, setOpen, handleOpen, handleClose } = useContext(DashBoardContext)

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

    const [open7, setOpen7] = React.useState(false);
    const handleOpen7 = () => setOpen7(true);
    const handleClose7 = () => setOpen7(false);
    const [data, setData] = useState('')
    const [bankList, setBankList] = useState('')
    // const { beneficiaries } = useContext(DashBoardContext)


    // const [beneficiary, setbenificiary] = useState(beneficiaries)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { beneficiaries: beneficiary, profile: Profile } = useSelector((state) => state.dashboard)
    const [profile, setProfile] = useState(Profile)
    const [wallet, setWallet] = useState({})
    const [profileTables, setProfileTable] = useState({})
    const [beneficiaries, setBeneficiaries] = useState(beneficiary)
    const [withdrawals, setWithdrawals] = useState([])
    const [singleTransaction, setSingleTransaction] = useState([])
    const [value, setValue] = React.useState(0);
    const [singleLink, setSingleLink] = useState("")

    const [isCopied, setIsCopied] = useClipboard(singleLink, {
        // `isCopied` will go back to `false` after 1000ms.
        successDuration: 1000,
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch()
    console.log(beneficiary)
    console.log(Profile)

    const [isLoading, setIsloading] = useState(false)

    const Retrieve = (data) => {
        setData(data)
        handleOpen3()
    }


    const withdrawPopUpHandleClose = async () => {
        await FetchWithdrawal()
        await fetchWallet()
        await fetchDashboardProfileTable()
        handleClose()
    }

    const FetchBeneficiary = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/beneficiary/view`)
            console.log(response.data.data)
            setBeneficiaries(response.data.data)
            dispatch(ADD_BENEFICIARY(response.data.data))

        } catch (error) {
            console.log(error)
        }

    }
    const FetchWithdrawal = async () => {
        setIsloading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/withdrawal/profile`)
            console.log('setWithdrawals >> ', response.data.data)
            setWithdrawals(response.data.data)
            setIsloading(false)

        } catch (error) {
            console.log(error)
            setIsloading(false)
        }

    }
    const fetchProfile = async () => {
        const token = window.localStorage.getItem('bearer_token')
        if (token) {
            try {
                setLoading(true)
                const response = await Protected.get(`${BASE_URL}/api/user/profile`)
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

    const fetchWallet = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/wallet`)
            console.log('wallet >> ', response?.data?.data)
            setWallet(response?.data?.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const fetchDashboardProfileTable = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/dashboard/profile/tables`)
            console.log('setProfileTable >> ', response?.data?.data)
            setProfileTable(response?.data?.data)

        } catch (error) {
            console.log(error.response)
        }
    }

    const fetchBanks = async () => {
        const response = await axios.get(`${BASE_URL}/api/paystack/bank-list`)
        // console.log(response?.data?.data)
        setBankList(response.data.data)
    }

    const singleTransact = (data) => {
        setSingleTransaction(data)
        handleOpen7()
    }

    const findLink = async (link, index) => {
        // setSingleLink(link.link)
        try {
            await navigator.clipboard.writeText(link?.link)
            setIsCopied(true)
            toast.success('Copied To Clipboard', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        } catch (error) {
            console.log(error.response)
        }


        console.log({ link, singleLink: link.link })
    }


    useEffect(() => {
        setValue('profile')
    }, [])
    const Payments = (link) => {
        dispatch(SINGLE_PAYMENTLINK(link))
        navigate(`/dashboard/payment/${link.code}`)
        console.log(link)
    }

    useEffect(() => {
        fetchWallet()
        fetchBanks()
        fetchProfile()
        FetchBeneficiary()
        FetchWithdrawal()
        fetchDashboardProfileTable()
    }, [])

    return (
        <>
            <div className='block lg:hidden'>
                <div className='py-6 mt-3'>
                    <div className='w-[90%] mx-auto'>
                        <div className='py-2'>
                            <div>
                                <h1 className='text-xl font-bold fourier'>Profile</h1>
                                <div className='py-2 mt-3'>
                                    <div className='w-full rounded-[15px] py-2 px-4 bg-[#1D3329]'>
                                        <div className='flex items-start gap-4 w-full'>
                                            <div className='space-y-2 w-full'>
                                                <div className='flex items-start justify-between'>
                                                    <div className='space-y-2'>
                                                        {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<h2 style={{ textTransform: 'uppercase' }} className='fourier text-white font-bold'>{profile.firstname} {profile.lastname} </h2>)}
                                                        <h3 className="text-gray-500">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                                                    </div>
                                                    <div className='py-2 ' >
                                                        <IconButton>
                                                            <AccountCircleIcon className='text-white' fontSize='large' />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <div className='py-4'>
                                                        <h1 className='fourier text-[20px] text-white font-bold'>₦ {Intl.NumberFormat('en-US').format(wallet?.amount || 0)}</h1>
                                                        <h3 className="text-white font-bold">Total Balance</h3>
                                                    </div>
                                                    <div className='items-end'>
                                                        {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<div className='font-bold text-gray-500 text-sm'> <p>{profile?.email}</p> <p className='text-right'>{profile?.phonenumber}</p></div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-3 mt-2'>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='text-xl font-bold'>Beneficiaries</h1>
                                            <IconButton onClick={()=>handleOpen2()}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                        <div className='py-2'>
                                            {beneficiaries ? (
                                                <>
                                                    {beneficiaries.map((beneficiary, index) => (
                                                        <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden' key={index}>
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
                                                    ))}
                                                </>
                                            ) : ''}
                                        </div>
                                    </div>
                                    <div className='py-2 mt-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className='py-2'>
                                                <h2 className='font-bold fourier'>Recent Transactions</h2>
                                            </div>
                                            <Link to='/dashboard/transaction'>
                                                <div>
                                                    <p className=''>View All</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='py-2'>
                                            {profileTables.recentTransaction ? profileTables.recentTransaction.map((each, index) => (
                                                <div className='flex justify-between items-center' key={index}>
                                                    <div className='flex items-center space-x-2'>
                                                        {each.in_entity === 'Wallet' ? (<img src='/images/paidd.png' />) : (
                                                            <img src='/images/paiddd.png' />
                                                        )}

                                                        <div className='flex flex-col'>
                                                            <h2 className='font-bold'>{each.reference}</h2>
                                                            <small className='text-sm py-2  flex-1  text-gray-300'>{moment(each.createdAt
                                                            ).format('MMM DD, YYYY')} | {moment(each.createdAt).format('h:mma')}</small>

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h2 className='text-sm py-2 text-gray-400 font-bold self-end'>{each.in_entity}</h2>
                                                        <small className={each.in_entity === 'Wallet' ? 'py-2 self-end  flex-1  font-bold text-gray-600' : 'py-2 self-end  flex-1  font-bold text-red-600'}>{each.in_entity === 'Wallet' ? '+' : '-'}₦{Intl.NumberFormat('en-US').format(each.in_entity_id.amount || 0)}</small>
                                                    </div>
                                                </div>
                                            )) : <div>
                                                <div>
                                                    <Stack spacing={3}>
                                                        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                        <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                                    </Stack>
                                                </div>
                                            </div>}
                                            {profileTables?.recentTransaction?.length === 0 && (
                                                <div className='flex justify-center py-2 px-2'>
                                                    <img src="/images/nolinks.svg" />
                                                </div>
                                            )}
                                        </div>
                                        <div className='py-4'>
                                            <div className='py-2'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='py-2'>
                                                        <h2 className='font-bold fourier'>Recent Withdrawal</h2>
                                                    </div>
                                                    <Link to='/dashboard/transaction'>
                                                        <div>
                                                            <p className=''>View All</p>
                                                        </div>
                                                    </Link>

                                                </div>
                                                <div>
                                                    {withdrawals && !isLoading ? (
                                                        <div>

                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div>
                                                                <Stack spacing={3}>
                                                                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />

                                                                </Stack>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {!isLoading && profileTables?.recentWithdrawals?.length === 0 && (
                                                        <div className='flex justify-center py-2 px-2'>
                                                            <img src="/images/nolinks.svg" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <TransactionDialog  open={open} setOpen={setOpen} handleCloseer={handleCloseer} handleClickOpener={handleClickOpener} transact={transact}/> */}
                {/* <TransactionDialog open={open} setOpen={setOpen} handleCloseer={handleCloseer} handleClickOpener={handleClickOpener} transact={transact}/> */}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
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
            </div>
            <div className='hidden lg:block'>
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
                            {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<small className='font-bold text-gray-500'>{profile?.email} {profile?.phonenumber}</small>)}
                        </div>
                    </Titlebar>
                    <div className='px-16 py-8'>
                        <div className='py-4'>
                            <Grid container spacing={4} alignItems="">
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={4}>
                                        <div className='bg-[#f1f3f0] rounded-md dashboard-wallet'>
                                            <div className='py-6 px-3 w-[90%] mx-auto'>
                                                <div className='spacing-y-3'>
                                                    {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<h2 style={{ textTransform: 'uppercase' }} className='fourier font-bold'>{profile.firstname} {profile.lastname} </h2>)}
                                                    {/* <h1 className='fourier font-bold' style={{ textTransform: 'uppercase' }}>{profile.firstname} {profile.lastname}</h1> */}
                                                    <h3 className="text-gray-400 font-bold">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                                                </div>
                                            </div>
                                            <div className='py-2 px-2 bg-[#f8faf7]'>
                                                <div className='w-[90%] mx-auto'>
                                                    <div className='spacing-y-3 flex justify-between items-center'>
                                                        <div className='py-4'>
                                                            <h1 className='fourier text-[20px] font-bold'>₦ {Intl.NumberFormat('en-US').format(wallet.amount || 0)}</h1>
                                                            <h3 className="text-gray-400 font-bold">Total Balance</h3>
                                                        </div>
                                                        <IconButton onClick={() => handleOpen()}>
                                                            <NearMeIcon className='text-[#1d3329]' />
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
                                                {beneficiaries ? (
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
                                                ) : (
                                                    <>
                                                        <div>
                                                            <Stack spacing={3}>
                                                                <Skeleton variant="rectangular" width={"80%"} height={60} />
                                                                <Skeleton variant="rounded" width={"80%"} height={60} />
                                                            </Stack>
                                                        </div>
                                                    </>
                                                )}
                                                {beneficiaries.length === 0 && (
                                                    <>
                                                        <BeneficiarySkeleton />
                                                        {/* <BeneficiarySkeleton /> */}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <div className="px-3 pt-0 mb-8">
                                        <div className='flex justify-between items-center'>
                                            <h2 className='font-bold fourier text-xl'>Recent Withdrawals</h2>
                                            <Link to="/dashboard/withdrawal">
                                                <p className='text-sm c-primary-color cursor-pointer font-bold'>View All</p>
                                            </Link>

                                        </div>

                                        <div className='py-2 dashboard-payment-link'>
                                            <List>
                                                {
                                                    withdrawals && !isLoading ? (
                                                        withdrawals.map((each, index) => (
                                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4()} key={index}>
                                                                <ListItemButton>
                                                                    <div className='py-1 w-full'>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={6}>
                                                                                <div>
                                                                                    <h2 className='font-bold'>TO: {each.name}</h2>
                                                                                    <p className='text-sm text-gray-400 font-bold'>{each.transaction_id.reference} | {each.bank_name} ({each.account_number})</p>
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={3}>
                                                                                <div className='set-item-left'>
                                                                                    <h2 className='font-bold'>₦ {Intl.NumberFormat('en-US').format(each.amount || 0)}</h2>
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={3}>
                                                                                <div className="text-left">
                                                                                    <p className={each.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{each.status}</p>
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </ListItemButton>
                                                            </ListItem>
                                                        ))
                                                    ) : (
                                                        <div>
                                                            <Stack spacing={3}>
                                                                <Skeleton animation="wave" variant="rectangular" width={"80%"} height={60} />
                                                                <Skeleton animation="wave" variant="rounded" width={"80%"} height={60} />
                                                            </Stack>
                                                        </div>
                                                    )
                                                }
                                            </List>
                                            {withdrawals?.length === 0 && !isLoading && (
                                                <RecentLinksSkeleton />
                                            )}
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
                                                    {
                                                        profileTables.recentTransaction ? profileTables.recentTransaction.map((trnx, index) => (
                                                            <ListItem disablePadding alignItems="flex-center" key={index} onClick={() => singleTransact(trnx)} >
                                                                <ListItemButton>

                                                                    <Grid container spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            <h2 className='text-sm font-bold uppercase'>{trnx.in_entity}</h2>
                                                                            <small className='text-sm text-gray-400'>{trnx.reference}</small>
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <h2 className='text-sm font-bold text-center py-2 px-2'>₦ {Intl.NumberFormat('en-US').format(trnx.amount || 0)}</h2>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <div className="text-left">
                                                                                <p className={trnx.type === 'credit' ? 'py-2 px-2 rounded-lg text-sm text-[#00bf00] font-bold' : 'py-2 px-2 rounded-lg text-sm text-[#f10506] font-bold'}>{trnx.type}</p>
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={2}>
                                                                            <div className="text-left">
                                                                                <p className={trnx.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{trnx.status}</p>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>

                                                                </ListItemButton>
                                                            </ListItem>
                                                        )) : (
                                                            <div>
                                                                <Stack spacing={3}>
                                                                    <Skeleton animation="wave" variant="rectangular" width={"80%"} height={60} />
                                                                    <Skeleton animation="wave" variant="rounded" width={"80%"} height={60} />
                                                                </Stack>
                                                            </div>
                                                        )
                                                    }
                                                    {profileTables?.recentTransaction?.length == 0 && (
                                                        <RecentTransacton />
                                                    )}

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
                <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={withdrawPopUpHandleClose} />
                <SingleTransactionModal open7={open7} setOpen7={setOpen7} handleOpen7={handleOpen7} handleClose7={handleClose7} singleTransaction={singleTransaction} />
            </div>

        </>
    )
}
export default Profile;