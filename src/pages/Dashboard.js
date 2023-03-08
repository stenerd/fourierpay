import { Divider, Grid, IconButton, LinearProgress, List, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
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
import Titlebar from '../components/TitleBar'
import '../styles/Dashboard.css'
import { useNavigate } from 'react-router-dom';
import Protected, { BASE_URL } from '../utils/axios';
import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { ADD_BENEFICIARY, ADD_PAYMENTLINKS, ADD_PROFILE, SINGLE_PAYMENTLINK } from '../redux/DashboardSlice';
import WithdrawalPopup from '../components/WIthdrawalPopup';
import { DashBoardContext } from '../context/Dashboard';
import moment from 'moment'
import RecentModal from '../components/RecentPayment';
import DashboardChart from '../components/DashboardChart';
import Piechart from '../components/DashboardPieChart';
import Skeletons from '../components/Skeletons';
import RecentLinksSkeleton from '../components/RecentLinksSkeleton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Tooltip } from '@mui/material';

// import DashboardChart from '../components/DashboardChart';

const Dashboard = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [opened, setOpened] = React.useState(false);
    const handleOpened = () => setOpened(true);
    const handleCloseed = () => setOpened(false);

    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    const [matrics, setMatrics] = React.useState({});
    const [selectedFilters, setSelectedFilters] = React.useState({
        year: '2023',
        type: 'week',
        week: Math.ceil(days / 7)
    });
    const [chartData, setChartData] = React.useState([]);
    const [tables, setTables] = React.useState({});
    const [pieChartData, setPieChartData] = React.useState([]);

    const monthArr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const [wallet, setWallet] = useState({})
    const [recentPayment, setRecentPayment] = useState()
    const { open, setOpen, handleOpen, handleClose } = useContext(DashBoardContext)

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
    const recentPay = (each) => {
        setRecentPayment(each)
        // console.log(each)
        handleOpened()
    }
    // const FetchLinks = async () => {
    //     // setLoading(true)
    //     try {
    //         const response = await Protected.get(`${BASE_URL}/api/payment-link`)
    //         // console.log(response.data.data)
    //         dispatch(ADD_PAYMENTLINKS(response?.data?.data))

    //     } catch (error) {
    //         console.log(error.response)
    //     }
    // }
    const DashboardMatrics = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/dashboard/matrics`)
            console.log(response.data.data)
            setMatrics(response.data.data)
            setPieChartData([
                { name: 'Available Links', value: response.data.data.availableLinksCount },
                { name: 'Used Links', value: response.data.data.usedLinksCount },
            ])
        } catch (error) {
            console.log(error.response)

        }
    }
    const FetchDashboardChart = async () => {
        try {
            const routeArr = [];
            if (selectedFilters.year) {
                routeArr.push(`year=${selectedFilters.year}`)
            }
            if (selectedFilters.type) {
                routeArr.push(`type=${selectedFilters.type}`)
            }
            if (selectedFilters.week || selectedFilters.month) {
                routeArr.push(`param=${selectedFilters.week || selectedFilters.month}`)
            }
            const response = await Protected.get(`${BASE_URL}/api/dashboard/chart?${routeArr.join('&')}`)
            console.log(response.data.data)
            setChartData(response.data.data)
        } catch (error) {
            console.log(error.response)

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
                // setProfile(response?.data?.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response)
            }

        } else {
            return;
        }
    }

    const handleFilterChanges = (e) => {
        setSelectedFilters((prev) => {
            let name = e.target.name
            let value = e.target.value
            
            const new_data = {
                ...prev,
                [name]: value
            }
            if (name === 'type' && value === 'month') {
                new_data.month = 'January'
                delete new_data.week
            }
            if (name === 'type' && value === 'week') {
                new_data.week = 1
                delete new_data.month
            }
            if (name === 'type' && value === 'year') {
                delete new_data.week
                delete new_data.month
            }
            console.log('new_data >> ', new_data)
            return new_data;
        })
    }

    const DashboardTables = async () => {
        setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/dashboard/tables`)
            // console.log(response.data.data)
            setTables(response.data.data)
            setLoading(false)

        } catch (error) {
            console.log(error.response)
            setLoading(false)
        }

    }
    const FetchBeneficiary = async () => {
        try {
            const response = await Protected.get(`${BASE_URL}/api/beneficiary/view`)
            // console.log(response.data.data)
            // setBeneficiaries(response.data.data)
            dispatch(ADD_BENEFICIARY(response.data.data))

        } catch (error) {
            console.log(error)
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

    const FetchLinks = async () => {
        // setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/payment-link`)
            // console.log(response.data.data)
            dispatch(ADD_PAYMENTLINKS(response?.data?.data))
            // setPaymentLinks(response?.data?.data)

            // console.log({data})
        } catch (error) {
            console.log(error.response)
        }
    }

    const Payments = (link) => {
        dispatch(SINGLE_PAYMENTLINK(link))
        navigate(`/dashboard/payment/${link.code}`)
        console.log(link)
    }
    // const FetchWallet = async()=>{
    //     try {
    //         const response = await Protected.get(`http://localhost:4000/api/wallet`)
    //         console.log(response.data.data)
    //     } catch (error) {
    //         console.log(error.response)
    //     }
    // }
    useEffect(() => {
        fetchWallet()
        // FetchLinks()
        DashboardMatrics()
        DashboardTables()
        FetchDashboardChart()
        FetchBeneficiary()
        // FetchWallet()
        fetchProfile()
        FetchLinks()
    }, [])
    const navigate = useNavigate()
    return (
        <>
            <div className=''>
                <DashboardLayout>
                    <Titlebar>
                        <h2 className='fourier font-bold'>DashBoard</h2>
                        <div>
                            <button onClick={() => navigate('/dashboard/payment')} className='px-4 py-2 rounded-sm font-medium text-white bg-[#1d3329]'>Create Payment</button>
                        </div>
                    </Titlebar>
                    <div className='px-16 py-8'>
                        {/* <div className='flex justify-between items-center w-[90%] mx-auto'>
                        <h2 className='fourier text-xl font-bold'>DashBoard</h2>
                        <button onClick={()=>navigate("/dashboard/payment")} className='px-4 py-2 rounded-md text-white bg-[#1d3329]'>Create Payment</button>
                    </div> */}
                        <div className='py-4'>
                            <Grid container spacing={4} alignItems="">
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={4}>
                                        <div className='bg-[#f1f3f0] rounded-md dashboard-wallet'>
                                            <div className='py-6 px-3 w-[90%] mx-auto'>
                                                <div className='spacing-y-3'>
                                                    {
                                                        wallet.user_id ? (
                                                            <h1 className='fourier font-bold' style={{ textTransform: 'uppercase' }}>{wallet.user_id.firstname} {wallet.user_id.lastname}</h1>
                                                        ) : (
                                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                        )
                                                    }
                                                    <h3 className="text-gray-400 font-bold">{moment(new Date()).format('dddd, MMMM DD YYYY')}</h3>
                                                </div>
                                            </div>
                                            <div className='py-2 px-2 bg-[#f8faf7]'>
                                                <div className='w-[90%] mx-auto'>
                                                    <div className='spacing-y-3 flex justify-between items-center'>
                                                        <div className='py-4'>
                                                            {wallet.amount ? (<h1 className='fourier text-[20px] font-bold'>₦ {Intl.NumberFormat('en-US').format(wallet.amount || 0)}</h1>) :<h1 className='fourier text-[20px] font-bold'>₦0</h1>}
                                                            <h3 className="text-gray-400 font-bold">Total Balance</h3>
                                                        </div>
                                                        <IconButton onClick={() => handleOpen()}>
                                                            <NearMeIcon className='text-[#1d3329]' />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='bg-white shadow-md rounded-md dashboard-spending-limit'>
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
                                                        <span className='text-[#f10707]'>₦ 199</span>
                                                        <span className='text-[#9aa3ae]'> spent out of </span>
                                                        <span className='text-[#1d3329]'>₦ 2,4000</span>
                                                    </p>
                                                    <p className='text-sm font-bold'>10%</p>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className='bg-[#f8faf7] shadow-md rounded-md dashboard-spending-limit pb-4'>
                                            <div className='w-[90%] mx-auto pt-4 pb-6'>
                                                <h2 className='font-bold'>Payment Links</h2>
                                            </div>
                                            <div className="w-[90%] mx-auto flex justify-between items-center">
                                                <div className='flex items-center space-x-3'>
                                                    <div className='h-4 w-4 rounded-full bg-[#1f332b]'></div>
                                                    <h2>Available Links</h2>
                                                </div>
                                                <div className='flex items-center space-x-3'>
                                                    <div className='h-4 w-4 rounded-full bg-[#6dd976]'></div>
                                                    <h2>Used Links</h2>
                                                </div>


                                            </div>
                                            {
                                                pieChartData.length ? (
                                                    <Piechart data={pieChartData} />
                                                ) : ''
                                            }
                                        </div>
                                        <div className='bg-[#f8faf7] shadow-md rounded-md dashboard-spending-limit'>
                                            <div className=''>
                                                <div className='spacing-y-3 mb-0'>
                                                    <div className='w-[90%] mx-auto pt-4'>
                                                        <h2 className='font-bold'>Payment Payments</h2>
                                                    </div>
                                                    {/* <h1 className='fourier font-bold'>Recent Payments</h1> */}
                                                    <div className='pt-2'>
                                                        <List>

                                                            {
                                                                tables.recentPayments ?
                                                                    tables.recentPayments.map(
                                                                        (each, index) => (
                                                                            <div key={index}>
                                                                                <ListItem disablePadding alignItems="flex-center" onClick={() => recentPay(each)}>
                                                                                    <ListItemButton>
                                                                                        <Grid container spacing={3}>
                                                                                            <Grid item xs={6}>
                                                                                                <div className='flex flex-col'>
                                                                                                    <h2 className='text-sm py-2 font-bold'>{each.payment_link_id.name}</h2>
                                                                                                    <small className='text-sm py-2  flex-1  font-bold text-gray-400'>₦ {Intl.NumberFormat('en-US').format(each.amount || 0)}</small>

                                                                                                </div>

                                                                                            </Grid>
                                                                                            <Grid item xs={6}>
                                                                                                <div className="text-right flex-col">
                                                                                                    <p className='py-2 px-2  rounded-lg text-sm font-bold'>{each.unique_answer.substring(0.12) || 'N/A'}</p>
                                                                                                    <div className="text-right">
                                                                                                        <p className={each.status === 'paid' ? 'py-2 flex-1 px-2 rounded-lg text-sm status-paid' : 'py-2 flex-1 px-2 rounded-lg text-sm status-fail'}>{each.status}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </Grid>

                                                                                        </Grid>

                                                                                    </ListItemButton>
                                                                                </ListItem>
                                                                            </div>
                                                                        )
                                                                    ) : (
                                                                        <div>
                                                                            <Stack spacing={3}>
                                                                                <Skeleton  animation="wave" variant="rectangular" width={"80%"} height={60} />
                                                                                <Skeleton  animation="wave" variant="rounded" width={"80%"} height={60} />
                                                                            </Stack>
                                                                        </div>
                                                                    )
                                                            }

                                                        </List>
                                                        {/* <Skeletons /> */}
                                                        {tables?.recentPayments?.length === 0 && (
                                                            <>
                                                                <Skeletons />
                                                            </>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='bg-white shadow-md rounded-md dashboard-spending-limit'> */}
                                        <div className='py-6 px-3 w-[90%] mx-auto'>
                                            {/* <div className='spacing-y-3 mb-8'>
                                                    <h1 className='fourier font-bold'>OutCome Statistics</h1>
                                                  
                                                </div>
                                                <div className='py-2'>
                                                    <BorderLinearProgress variant="determinate" value={50} />
                                                </div>
                                                <div className='flex justify-between items-center font-bold'>
                                                    <p className='text-[#1d3329] text-sm'>Withdrawals</p>
                                                    <p className='text-sm font-bold'>20</p>
                                                </div> */}

                                            {/* </div> */}
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
                                                                <AttachMoneyIcon className='text-[#1d3329]' />
                                                            </div>
                                                            {/* </IconButton> */}
                                                            <div className='pt-8'>
                                                                <h2 className='text-sm text-gray-400 font-bold'>Income</h2>
                                                                <h1 className='font-bold fourier'>₦ {Intl.NumberFormat('en-US').format(matrics.income || 0)}</h1>
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
                                                                <LinkIcon className='text-[#1d3329]' />
                                                            </div>
                                                            <div className='pt-8'>
                                                                <h2 className='text-sm text-gray-400 font-bold'>Payment Links</h2>
                                                                <h1 className='font-bold fourier'>{matrics.paymentLinkCount || 0}</h1>
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
                                                                <PaidIcon className='text-[#1d3329]' />
                                                            </div>
                                                            <div className='pt-8'>
                                                                <h2 className='text-sm text-gray-400 font-bold'>Payments</h2>
                                                                <h1 className='font-bold fourier'>{matrics.paymentCount || 0}</h1>
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
                                                                <PaymentsIcon className='text-[#1d3329]' />
                                                            </div>
                                                            <div className='pt-8'>
                                                                <h2 className='text-sm text-gray-400 font-bold'>Withdrawal</h2>
                                                                <h1 className='font-bold fourier'>₦ {Intl.NumberFormat('en-US').format(matrics.withdrawal || 0)}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='py-8'>
                                        <div className='flex justify-end'>
                                            <div className='flex mb-4 w-[50%]'>
                                                <select placeholder='Year' name='year' value={selectedFilters.year} onChange={(e) => handleFilterChanges(e)} className="py-2 px-4 w-full outline-none c-text-input" style={{backgroundColor: '#f8faf7'}}>
                                                    <option value='2022'>2022 </option>
                                                    <option value='2023'>2023 </option>
                                                    <option value='2024'>2024 </option>
                                                </select>
                                                <select placeholder='Type' name='type' value={selectedFilters.type} onChange={(e) => handleFilterChanges(e)}  className="py-2 px-4 w-full outline-none c-text-input" style={{backgroundColor: '#f8faf7'}}>
                                                    <option value='week'>Week </option>
                                                    <option value='month'>Month </option>
                                                    <option value='year'>Year </option>
                                                </select>
                                                {
                                                    selectedFilters.type === 'week' ? (
                                                        <select placeholder='Week Number' name='week' value={selectedFilters.week || 1} onChange={(e) => handleFilterChanges(e)}  className="py-2 px-4 w-full outline-none c-text-input" style={{backgroundColor: '#f8faf7'}}>
                                                            {
                                                                ([...Array(52).keys()]).map((_, index) => (
                                                                    <option key={index + 1} value={index + 1}>Week {index + 1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    ) : selectedFilters.type === 'month' ? (
                                                        <select placeholder='Month' name='month' value={selectedFilters.month || 'January'} onChange={(e) => handleFilterChanges(e)}  className="py-2 px-4 w-full outline-none c-text-input" style={{backgroundColor: '#f8faf7'}}>
                                                            {
                                                                monthArr.map((month, index) => (
                                                                    <option key={index + 1} value={month}>{month}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    ) : ''
                                                }
                                                
                                                <Tooltip title='Run filter on chart'>
                                                    <span className='dynamic-form-option-cta' style={{backgroundColor: '#f8faf7'}} onClick={() => FetchDashboardChart()} >
                                                        <FilterAltIcon className='text-gray-500' />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        {
                                            chartData.length ? (
                                                <DashboardChart data={chartData} />
                                            ) : ''
                                        }
                                    </div>
                                    <div className="px-3 pt-8">
                                        <h2 className='font-bold fourier text-xl'>Recent Links</h2>
                                        <div className='py-2 dashboard-payment-link'>
                                            <List>
                                                {
                                                    tables.recentPaymentLinks ?
                                                        tables.recentPaymentLinks.map(
                                                            (each, index) => (
                                                                <div key={index}>
                                                                    <ListItem disablePadding alignItems="flex-center" onClick={() => Payments(each)}>
                                                                        <ListItemButton>
                                                                            <div className='py-1 w-full'>
                                                                                <Grid container spacing={3}>
                                                                                    <Grid item xs={7}>
                                                                                        <div>
                                                                                            <h2 className='font-bold'>{each.name}</h2>
                                                                                            <small className='text-sm text-gray-400' style={{ fontSize: '80%' }}>
                                                                                                {each.link}
                                                                                            </small>
                                                                                        </div>

                                                                                    </Grid>
                                                                                    <Grid item xs={2}>
                                                                                        <div className='set-item-center'>
                                                                                            <h2 className='font-bold'>₦ {Intl.NumberFormat('en-US').format(each.amount || 0)}</h2>
                                                                                        </div>

                                                                                    </Grid>
                                                                                    <Grid item xs={3}>
                                                                                        <div className='set-item-center'>
                                                                                            <small className='text-sm text-[#f10707] status-pill capitalize'>{each.status}{each.expires_at ? ` - ${moment(each.expires_at).format('MMM DD, YYYY')
                                                                                                }` : ''}</small>
                                                                                        </div>

                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>
                                                                        </ListItemButton>

                                                                    </ListItem>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div>
                                                                <Stack spacing={3}>
                                                                    <Skeleton variant="rectangular" width={"80%"} height={60} />
                                                                    <Skeleton variant="rounded" width={"80%"} height={60} />
                                                                </Stack>
                                                            </div>
                                                        )
                                                }
                                            </List>
                                            {tables?.recentPaymentLinks?.length === 0 && (
                                                <RecentLinksSkeleton />
                                            )}

                                        </div>

                                    </div>

                                    <div className='pt-4 px-3'>
                                        <div className=''>
                                            {/* <h1 className='fourier font-bold text-xl'>Recent Payments</h1> */}
                                            <div className='py-2'>

                                                {/* <List>

                                                    {
                                                        tables.recentPayments ?
                                                            tables.recentPayments.map(
                                                                (each, index) => (
                                                                    <div key={index}>
                                                                        <ListItem disablePadding alignItems="flex-center" onClick={() => recentPay(each)}>
                                                                            <ListItemButton>
                                                                                <Grid container spacing={3}>
                                                                                    <Grid item xs={4}>
                                                                                        <h2 className='text-sm font-bold'>{each.payment_link_id.name}</h2>
                                                                                        <small className='text-sm text-gray-400'>{each.transaction_id.reference}</small>
                                                                                    </Grid>
                                                                                    <Grid item xs={4}>
                                                                                        <div className="text-left">
                                                                                            <p className='py-2 px-2 rounded-lg text-sm font-bold'>{each.unique_answer || 'N/A'}</p>
                                                                                        </div>
                                                                                    </Grid>
                                                                                    <Grid item xs={2}>
                                                                                        <h2 className='text-sm font-bold text-left'>₦ {each.amount}</h2>
                                                                                    </Grid>
                                                                                    <Grid item xs={2}>
                                                                                        <div className="text-left">
                                                                                            <p className={each.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{each.status}</p>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>
                                                                              
                                                                            </ListItemButton>
                                                                        </ListItem>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div>
                                                                    <Stack spacing={3}>
                                                                        <Skeleton variant="rectangular" width={"80%"} height={60} />
                                                                        <Skeleton variant="rounded" width={"80%"} height={60} />
                                                                    </Stack>
                                                                </div>
                                                            )
                                                    }

                                                </List> */}
                                            </div>
                                        </div>
                                    </div>


                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </DashboardLayout>

            </div>

            <PaymentDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} />
            <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
            <RecentModal opened={opened} setOpened={setOpened} handleOpened={handleOpened} handleCloseed={handleCloseed} recentPayment={recentPayment} />
        </>
    )
}
export default Dashboard;