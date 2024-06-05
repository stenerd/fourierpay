import { Divider, Grid, IconButton, LinearProgress, List, Skeleton, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PaymentDrawer from '../components/PaymentDrawer';
import NearMeIcon from '@mui/icons-material/NearMe';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { linearProgressClasses } from '@mui/material/LinearProgress';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeneficiaryDialog from '../components/BeneficiartDialog';
import DeleteBenefiaryDialog from '../components/DeleteBeneficiaryDialog';
import ProfileDialog from '../components/ProfileDialog';
import MenuDropDown from '../components/Menu';
import BottomNav from '../components/bottomNav';
import StatusBadge from '../components/atom/web/StatusBadge';
import StatusBadgeMobile from '../components/atom/mobile/StatusBadge';
import GenericAlertModal from '../components/GenericAlertModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// import moment from 'moment';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Profile = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [withdraw, setWithdrawal] = useState()

    const [old, setOld] = useState(false)

    const toggleOld = () => setOld(!old)

    const [news, setNews] = useState(false)

    const toggleNew = () => setNews(!news)

    const [conf, setConf] = useState(false)

    const toggleConf = () => setConf(!conf)

    // const toggleOld = () => setOld(!old)




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
    const handleOpen4 = (each) => {
        setOpen4(true)
        setWithdrawal(each)
        // console.log(each)
    };
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

    const [open10, setOpen10] = React.useState(false);

    const [currentPassword, setCurrentPassword] = React.useState("")

    const [newPassword, setNewPassword] = React.useState("")
    const [confirm, setConfirm] = React.useState("")

    const [load, setLoad] = React.useState(false)

    const handleClickOpen10 = () => {
        setOpen10(true);
    };

    const handleClose10 = () => {
        setOpen10(false);
    };

    const [open11, setOpen11] = React.useState(false);

    const handleClickOpen11 = () => {
        setOpen11(true);
    };

    const handleClose11 = () => {
        setOpen11(false);
    };

    const retrieve = (data) => {
        setData(data)
        handleClickOpen10()
    }

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open20 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose20 = () => {
        setAnchorEl(null);
    };
    const { profile: details } = useSelector((state) => state.dashboard)

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

    const [open8, setOpen8] = useState()
    const handleClickOpen8 = () => {
        setOpen8(true);
    };

    const handleClose8 = () => {
        setOpen8(false);
    };

    const [popup, setPopup] = useState(false)

    const handleOpened = () => {
        setPopup(true)
    }

    const handleClosed = () => {
        setPopup(false)
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

    const Resetpassword = async (e) => {
        e.preventDefault()
        setLoad(true)
        if (newPassword !== confirm) {
            toast.error('Confirm Password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoad(false)
            return;
        }
        try {
            const response = await Protected.post(`${BASE_URL}/api/user/reset_password`, { currentPassword, newPassword })
            console.log(response.data)
            toast.success('Password Successfully changed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoad(false)
            setTimeout(() => {
                handleClosed()
            }, 1200)
            // window.location.reload()
        } catch (error) {
            setLoad(false)
            toast.error(error.response.data.message)
            console.log(error.response)
        }
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
                <div className='mb-24'>
                    <div className='w-[90%] mx-auto'>
                        <div className=''>
                            <div>
                                <div className='flex justify-between items-center py-6'>
                                    <h1 className='text-xl font-bold fourier'>Profile</h1>
                                    <MenuDropDown open20={open20} handleClose20={handleClose20} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} name={`${details.firstname} ${details.lastname}`} />
                                </div>
                                <div className='pb-2 0'>
                                    <div className='w-full rounded-[15px] py-6 px-6 c-p-background'>
                                        <div className='flex items-start gap-4 w-full'>
                                            <div className='space-y-6 w-full'>
                                                <div className='flex items-start justify-between'>
                                                    <div className=''>
                                                        {loading ? <Skeleton variant="text" width={150} height={32} sx={{ fontSize: '1rem' }} /> : (
                                                            <div className='flex items-center space-x-2'>
                                                                <h2 style={{ textTransform: 'uppercase' }} className='fourier text-white font-bold'>{profile.firstname} {profile.lastname} </h2>
                                                                <AutoFixHighIcon className="mx-2 mb-2 text-gray-400 fourier-profile-icon cursor-pointer" onClick={() => handleClickOpen11()} />
                                                            </div>

                                                        )}
                                                        <h3 className="text-gray-400 font-bold">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                                                    </div>
                                                    <div className='py-0'>
                                                        <AccountCircleIcon className='text-white' fontSize='large' />
                                                    </div>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <div className='py-0'>
                                                        <h1 className='fourier text-[20px] text-white font-bold'>₦ {Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(wallet?.amount || 0)}</h1>
                                                        <h3 className="text-white font-bold">Total Balance</h3>
                                                    </div>
                                                    <div className='items-end'>
                                                        {loading ? <Skeleton variant="text" width={150} height={32} sx={{ fontSize: '1rem' }} /> : (<div className='font-bold text-gray-500 text-sm'> <p>{profile?.email}</p> <p className='text-right'>{profile?.phonenumber}</p></div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-3 mt-2'>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='text-xl font-bold'>Beneficiaries</h1>
                                            <IconButton onClick={() => handleClickOpen8()}>
                                                <AddIcon className='cursor-pointer font-bold text-lg c-primary-link-color' />
                                            </IconButton>
                                        </div>
                                        <div className='py-2'>
                                            {beneficiaries ? (
                                                <>
                                                    {beneficiaries.map((beneficiary, index) => (
                                                        <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden' key={index} onClick={() => retrieve(beneficiary)}>
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
                                            {beneficiaries.length === 0 && (
                                                <BeneficiarySkeleton />
                                            )}
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className='py-2'>
                                                <h2 className='font-bold text-xl'>Recent Transactions</h2>
                                            </div>
                                            <Link to='/dashboard/transaction'>
                                                <div>
                                                    <p className='cursor-pointer font-bold c-primary-link-color'>View All</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='pb-2 pt-4'>
                                            {profileTables.recentTransaction ? profileTables.recentTransaction.map((each, index) => (
                                                <div className='flex justify-between mb-8 items-center' key={index}>
                                                    <div className='flex items-center space-x-3'>
                                                        {each.in_entity !== 'Wallet' ?
                                                            (
                                                                <div className='p-2 c-icon-bg'>
                                                                    <img src='/images/in-icon.svg' className='w-[28px]' alt="alt-img" />
                                                                </div>
                                                            ) :
                                                            (
                                                                <div className='p-2 c-icon-bg-withdrawal'>
                                                                    <img src='/images/out-icon.svg' className='w-[28px]' alt="alt-img" />
                                                                </div>
                                                            )
                                                        }

                                                        <div className='flex flex-col'>
                                                            <h2 className='font-bold text-base c-text-elipses text-[#2d2d2d]'>{(each.in_entity === 'Wallet' || each.in_entity === 'Withdrawal') ? each.out_entity_id.name : each.payment_link_id.name}</h2>
                                                            <small className='text-xs font-medium pt-1 flex-1 text-gray-500'>{moment(each.createdAt
                                                            ).format('MMMM DD, YYYY')} | {moment(each.createdAt).format('h:mm A')}</small>
                                                            <small className='block text-xs font-bold pt-1 text-gray-500'>
                                                                {each.in_entity === 'Wallet' ? 'Wallet | ' : `${each.in_entity_id.unique_answer} | `} {each.reference}
                                                            </small>

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h2 className='text-sm p-0 text-gray-500 font-bold lowercase self-end'>{each.in_entity !== 'Wallet' ? each.in_entity : 'Withdrawal'}</h2>
                                                        <small className={each.in_entity !== 'Wallet' ? 'pt-1 self-end flex-1 font-bold text-[#01b133]' : 'pt-1 self-end flex-1 font-bold c-text-danger'}>{each.in_entity !== 'Wallet' ? '+' : '-'} ₦{Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(each.in_entity_id.amount || 0)}</small>
                                                        <StatusBadgeMobile status={each.status} />

                                                    </div>
                                                </div>
                                            )) : <div>
                                                <div>
                                                    <Stack spacing={3}>
                                                        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                        <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                                        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                        <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                                    </Stack>
                                                </div>
                                            </div>}
                                            {profileTables?.recentTransaction?.length === 0 && (
                                                // <div className='flex flex-col justify-center py-2 px-2'>
                                                //     <img src="/images/payments.svg" className='w-2/5 mx-auto' />
                                                //     <p className='text-gray-500 text-center'>No Transactions Yet!</p>
                                                // </div>
                                                <RecentTransacton />
                                            )}
                                        </div>
                                        <div className='py-2'>
                                            <div className='py-2'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='py-2'>
                                                        <h2 className='font-bold text-xl'>Recent Withdrawals</h2>
                                                    </div>
                                                    <Link to='/dashboard/transaction'>
                                                        <div>
                                                            <p className='cursor-pointer font-bold  c-primary-link-color'>View All</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className='py-4 space-y-6'>
                                                    {withdrawals ? withdrawals?.map((each, index) => (
                                                        <div className='flex justify-between items-center' key={index}>

                                                            <div className='flex items-center space-x-3'>
                                                                <div className='p-2 c-icon-bg-withdrawal'>
                                                                    <img src='/images/out-icon.svg' className='w-[28px]' alt="alt-img" />
                                                                </div>

                                                                <div className='flex flex-col items-start'>
                                                                    <h2 className='font-bold text-base c-text-elipses text-[#2d2d2d]'>{each.name}</h2>
                                                                    <small className='text-xs font-medium pt-1 flex-1 text-gray-500'>{moment(each.createdAt
                                                                    ).format('MMMM DD, YYYY')} | {moment(each.createdAt).format('h:mm A')}</small>
                                                                    <span className='block text-xs font-bold pt-1 text-gray-500'>
                                                                        {each.account_number} | {each.bank_name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col items-end'>
                                                                <h2 className='text-sm p-0 c-text-danger font-bold lowercase self-end'>
                                                                    - ₦ {Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(each.amount)}</h2>
                                                                <StatusBadgeMobile status={each.status} />
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div>
                                                            <Stack spacing={3}>
                                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                                <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                                                <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                                            </Stack>
                                                        </div>
                                                    )}
                                                    {withdrawals?.length === 0 && (
                                                        // <div className='flex flex-col justify-center py-2 px-2'>
                                                        //     <img src="/images/payments.svg" className='w-2/5 mx-auto' />
                                                        //     <p className='text-gray-500 text-center'>No Transactions Yet!</p>
                                                        // </div>
                                                        <RecentLinksSkeleton title={"No Withdrawals Yet!"} />

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
                <DeleteBenefiaryDialog data={data} open10={open10} handleClickOpen10={handleClickOpen10} setOpen10={setOpen10} handleClose10={handleClose10} beneficiaries={beneficiaries} setBeneficiaries={setBeneficiaries} />
                <BeneficiaryDialog FetchBeneficiary={FetchBeneficiary} open8={open8} setOpen8={setOpen8} handleClickOpen8={handleClickOpen8} handleClose8={handleClose8} bankList={bankList} />
                {/* <TransactionDialog  open={open} setOpen={setOpen} handleCloseer={handleCloseer} handleClickOpener={handleClickOpener} transact={transact}/> */}
                {/* <TransactionDialog open={open} setOpen={setOpen} handleCloseer={handleCloseer} handleClickOpener={handleClickOpener} transact={transact}/> */}
                <ProfileDialog open11={open11} setOpen11={setOpen11} handleClickOpen11={handleClickOpen11} handleClose11={handleClose11} profile={profile} setProfile={setProfile} fetchProfile={fetchProfile} />
                <BottomNav />
            </div>
            <div className='hidden lg:block'>
                <DashboardLayout>
                    <Titlebar>
                        {/* <div className='flex justify-between items-center'> */}
                        <div className="flex-1">
                            {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : (
                                <div className='flex items-center space-x-5'>
                                    <h2 className='fourier profile font-bold'>{profile?.firstname} {profile?.lastname}
                                        {/* <IconButton onClick={() => handleOpen()}> */}
                                        {/* </IconButton> */}
                                    </h2>
                                
                                </div>
                            )}
                                <div className='flex items-center space-x-5 mt-2'>
                                    {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<p className='font-semibold text-gray-500'>{profile?.email} {profile?.phonenumber}</p>)}

                                    <div className='flex border border-2 cursor-pointer rounded-sm hover:font-bold p-1 ' onClick={() => handleOpen5()}>
                                        <p className='font-extralight m-auto'>Edit profile</p>
                                        <AutoFixHighIcon className="pl-2 text-gray-500 fourier-profile-icon cursor-pointer"  />
                                    </div>
                                </div>
                        </div>
                        <div>
                            <button className='c-bg-primary-light' onClick={handleOpened}>Change Password</button>
                        </div>
                        
                        {/* </div> */}
                    </Titlebar>
                    <div className='px-16 py-8'>
                        <div className='py-4'>
                            <Grid container spacing={4} alignItems="">
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={4}>
                                        <div className='bg-[#f1f3f0] rounded-md dashboard-wallet dashboard-border'>
                                            <div className='py-6 w-[90%] mx-auto '>
                                                <div className='spacing-y-3'>
                                                    {loading ? <Skeleton variant="text" width={250} height={40} sx={{ fontSize: '1rem' }} /> : (<h2 style={{ textTransform: 'uppercase' }} className='fourier font-bold'>{profile.firstname} {profile.lastname} </h2>)}
                                                    {/* <h1 className='fourier font-bold' style={{ textTransform: 'uppercase' }}>{profile.firstname} {profile.lastname}</h1> */}
                                                    <h3 className="text-gray-500 ">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                                                </div>
                                            </div>
                                            <div className='py-2 px-2 bg-[#f8faf7]'>
                                                <div className='w-[90%] mx-auto'>
                                                    <div className='spacing-y-3 flex justify-between items-center'>
                                                        <div className='py-4'>
                                                            <h1 className='fourier text-[20px] font-bold'>₦ {Intl.NumberFormat('en-US',  { minimumFractionDigits: 2 }).format(wallet.amount || 0)}</h1>
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
                                                                <div className='dashboard-border py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden '>
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
                                <Grid item xs={12} md={8} className=''>
                                    <div className="px-3 py-3 mb-8 dashboard-border">
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
                                                            <ListItem disablePadding alignItems="flex-center" onClick={() => handleOpen4(each)} key={index}>
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
                                                                                <div className="">
                                                                                    <StatusBadge status={each?.status} />
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={3}>
                                                                                <div className='set-item-left'>
                                                                                    <h2 className={`font-bold text-left ${each.amount > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                                                                                        
                                                                                    {each.amount > 0 ? `+₦ ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(each.amount)}` : `-₦ ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(Math.abs(each.amount))}`}
                                                                                    </h2>
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
                                                <RecentLinksSkeleton title={"No Withdrawals Yet!"} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='pt-4 px-3 dashboard-border'>
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
                                                            <ListItem className='dashboard-border' disablePadding alignItems="flex-center" key={index} onClick={() => singleTransact(trnx)} >
                                                                <ListItemButton>

                                                                    <Grid container spacing={3} >
                                                                        <Grid item xs={7}>
                                                                            <h2 className={`text-sm font-bold uppercase ${trnx.is_charges && 'text-[#f10506]'}`}>
                                                                                {trnx.in_entity === 'Wallet' ? 'Withdrawal' + (!trnx.is_charges ? '' : ' Charges') : trnx.in_entity}
                                                                            </h2>
                                                                            <small className='text-gray-400'>{
                                                                                trnx.in_entity === 'Payment' ?
                                                                                    `${trnx.payment_link_id.name} | ${trnx.in_entity_id.unique_answer}` :
                                                                                    (trnx.is_charges ? '' : `${trnx.out_entity_id.name} | ${trnx.out_entity_id.account_number} | ${trnx.out_entity_id.bank_name}`)}</small>
                                                                            {/* <small className='text-sm text-gray-400'>{trnx.reference}</small> */}
                                                                        </Grid>
                                                                        <Grid item xs={2} className="flex items-center">
                                                                            <div className="text-left ">
                                                                                <StatusBadge status={trnx?.status} />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={3} className='    flex items-center justify-end'>                                                                            
                                                                            <h2 className={`font-bold ${trnx.amount > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                                                                                {trnx.amount > 0 ? `+₦ ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(trnx.amount)}` : `-₦ ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(Math.abs(trnx.amount))}`}
                                                                            </h2>
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
                    <GenericAlertModal opened={popup} handleOpened={handleOpened} handleClosed={handleClosed} setOpen={setPopup}>
                        <div className='py-4'>
                            <h2 className='text-xl text-center'>Password reset</h2>
                            <form onSubmit={Resetpassword}>
                                <div className='relative'>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>Current Password</label>
                                    <input required name='Current Password' onChange={(e) => setCurrentPassword(e.target.value)} type={old ? "text" : "password"} className='py-2 px-4 w-full outline-none c-text-input' />
                                    <IconButton className="absolute left-[88%] bottom-10" onClick={toggleOld}>
                                        {old ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                                    </IconButton>
                                </div>
                                <div className='relative'>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>New Password</label>
                                    <input required name='New Password' onChange={(e) => setNewPassword(e.target.value)} type={news ? "text" : "password"} className='py-2 px-4 w-full outline-none c-text-input' />
                                    <IconButton className="absolute left-[88%] bottom-10" onClick={toggleNew}>
                                        {news ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                                    </IconButton>
                                </div>
                                <div className='relative'>
                                    <label className='text-sm font-bold block my-2 text-gray-700'>Confirm New Password</label>
                                    <input name='New Password' type={conf ? "text" : "password"} onChange={(e) => setConfirm(e.target.value)} className='py-2 px-4 w-full outline-none c-text-input' />
                                    <IconButton className="absolute left-[88%] bottom-10" onClick={toggleConf}>
                                        {conf ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                                    </IconButton>
                                </div>
                                <div className='py-4'>
                                    <button className='c-primary-button'>
                                        {load ? 'Loading....' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </GenericAlertModal>
                </DashboardLayout>
                <PaymentDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} />
                <ProfileModal open5={open5} setOpen5={setOpen5} handleOpen5={handleOpen5} handleClose5={handleClose5} profile={profile} setProfile={setProfile} fetchProfile={fetchProfile} />
                <WithdrawalModal open2={open2} handleOpen2={handleOpen2} handleClose2={handleClose2} setOpen2={setOpen2} bankList={bankList} FetchBeneficiary={FetchBeneficiary} />
                <BenificiaryModal open3={open3} setOpen3={setOpen3} handleOpen3={handleOpen3} handleClose3={handleClose3} data={data} beneficiaries={beneficiaries} setBeneficiaries={setBeneficiaries} />
                <RecentWithDrawalModal open4={open4} setOpen4={setOpen4} handleOpen4={handleOpen4} handleClose4={handleClose4} withdraw={withdraw} />
                <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={withdrawPopUpHandleClose} />
                <SingleTransactionModal open7={open7} setOpen7={setOpen7} handleOpen7={handleOpen7} handleClose7={handleClose7} singleTransaction={singleTransaction} />


            </div>
        </>
    )
}
export default Profile;