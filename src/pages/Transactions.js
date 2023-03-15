import { Button, Divider, IconButton, InputBase, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import TransactionTable from '../components/TransactionsTable'
import TuneIcon from '@mui/icons-material/Tune';
import PayOutTable from '../components/PayoutTable';
import Titlebar from '../components/TitleBar'
import Protected, { BASE_URL } from '../utils/axios';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import TransactionDialog from '../components/TraansactionDialog';
import RecentTransacton from '../components/RecentTransaction';
import { useSelector } from 'react-redux';
import MenuDropDown from '../components/Menu';
import BottomNav from '../components/bottomNav';
const Transactions = () => {
    const [payin, setPayin] = useState(true)
    const [payout, setPayout] = useState(false)
    const [transactions, setTransaction] = useState([])
    const [search, setSearch] = useState('')
    const SearchTransaction = async () => {
        try {
            const res = await Protected.get(`${BASE_URL}/api/transaction?q=${search}`)
            console.log(res?.data?.data?.data)
            setTransaction(res?.data?.data?.data)
        } catch (error) {
            console.log(error.response)
        }

    }
    console.log(transactions)
    const [open, setOpen] = useState()

    const handleClickOpener = () => {
        setOpen(true);
    };

    const handleCloseer = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open20 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose20 = () => {
        setAnchorEl(null);
    };
    const { profile } = useSelector((state) => state.dashboard)

    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [entity, setEntity] = useState("")
    const [type, setType] = useState("")
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    const [opener, setOpener] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setValue('transactions')
    }, [])

    const handleClickOpen = () => {
        setOpener(true);
    };

    const handleCloser = () => {
        setOpener(false);
    };


    const handlePayin = () => {
        setPayin(true)
        setPayout(false)
    }
    const handlePayOut = () => {
        setPayout(true)
        setPayin(false)
    }
    // const {profile} = useSelector((state)=>state.dashboard)
    console.log(profile)
    const [transact, setTransact] = useState()

    const filterLink = (status, start, end, type, entity) => {
        let link = `${BASE_URL}/api/transaction?q=${search}`
        if (status !== '' && end !== '' && start !== '' && type !== '' && entity !== '') {
            link = `${BASE_URL}/api/transaction?q=${search}&status=${status}&startDate=${start}&endDate=${end}&type=${type}&entity=${entity}`
            return link
        } if (status !== '' && start === '' && end === '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&status=${status}`
            return link
        }
        if (status !== '' && end !== '' && start === '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&status=${status}&endDate=${end}`
            return link
        } if (end !== '' && start === '' && status == '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&endDate=${end}`
            return link;
        } if (start !== '' && status === '' && end === '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&startDate=${start}`
            return link
        }
        if (start !== '' && end !== '' && status === '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&startDate=${start}&endDate=${end}`
            return link
        }
        if (start !== '' && end === '' && status !== '' && type === '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&startDate=${start}&status=${status}`
            return link
        }
        if (start === '' && end === '' && status === '' && type === '' && entity == '') {
            return link
        }
        if (start !== '' && end === '' && status === '' && type !== '' && entity == '') {
            link = `${BASE_URL}/api/transaction?q=${search}&startDate=${start}&type=${type}`
            return link
        }
        if (type !== '' && entity === '' && start === '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}`
            return link
        }
        if (type === '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&entity=${entity}`
            return link
        }
        if (type !== '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}&entity=${entity}`
            return link
        }
        if (type !== '' && entity !== '' && start !== '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}&entity=${entity}&startDate=${start}`
            return link
        }
        if (type !== '' && entity !== '' && start !== '' && end !== '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}&entity=${entity}&startDate=${start}&endDate=${end}`
            return link
        }
        if (type !== '' && entity !== '' && start !== '' && end === '' && status !== '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}&entity=${entity}&startDate=${start}&status=${status}`
            return link
        }
        if (type !== '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&type=${type}&entity=${entity}`
            return link
        }
        if (type === '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `${BASE_URL}/api/transaction?q=${search}&entity=${entity}`
            return link
        }
        if (type === '' && entity !== '' && start === '' && end === '' && status !== '') {
            link = `${BASE_URL}/api/transaction?q=${search}&entity=${entity}$status=${status}`
            return link
        }
        if (type === '' && entity === '' && start === '' && end === '' && status === '') {
            // link = `http://localhost:4000/api/transaction?entity=${entity}`
            return link
        }
        return link

    }


    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            // SearchTransaction()
            const data = filterLink(status, start, end, type, entity)
            const response = await Protected.get(data)
            console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data.data)
        }

    };
    console.log(transactions)

    const fetchTransaction = async () => {
        setLoad(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/transaction?q=${search}`)
            console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data.data)
            setLoad(false)
        } catch (error) {
            setLoad(false)
            console.log(error.response)
        }
    }

    const filterData = async () => {
        // let link =`http://localhost:4000/api/transaction?status=${status}`
        // if (status=''>0&&)
        try {
            // const response = await Protected.get(`http://localhost:4000/api/transaction?status=${status}&startDate=${start}&endDate=${end}`)
            // const response = await Protected.get(`http://localhost:4000/api/transaction?`+status==''?null:status=status+`&`+end==''?null:end=end+`&`+start==''?null:start=start)
            // const response = await Protected.get(link)
            setLoading(true)
            const data = filterLink(status, start, end, type, entity)
            const response = await Protected.get(data)
            console.log(response.data.data.data)
            setTransaction(response.data.data.data)
            setLoading(false)
            // console.log('processing')
            console.log(data)
            handleCloser()
            console.log({ status, type, entity, end, start })
            // setEntity('')
            // setEnd('')
            // setStart('')
            // setStatus('')
            // setType('')

        } catch (error) {
            console.log(error.response)
            setLoading(false)

            console.log('error')
        }
    }

    useEffect(() => {
        fetchTransaction()
    }, [])

    return (
        <>
            <div className="hidden lg:block">
                <DashboardLayout>
                    <Titlebar>
                        <h2 className='fourier font-bold'>Transactions</h2>
                    </Titlebar>
                    <div className='py-4 px-3 w-[90%] my-8 mx-auto'>

                        {payin ? (
                            <TransactionTable handleClickOpen={handleClickOpen} handleCloser={handleCloser} opener={opener} setOpener={setOpener} transactions={transactions} handleKeyDown={handleKeyDown} load={load} setSearch={setSearch} start={start} end={end} setStart={setStart} setEnd={setEnd} status={status} entity={entity} type={type} setEntity={setEntity} setType={setType} loading={loading} setStatus={setStatus} filterData={filterData} />
                        ) : <PayOutTable />}

                    </div>
                </DashboardLayout>
            </div>


            {/* MOBILE SCREENS */}


            <div className='block lg:hidden'>
                <div className='py-6'>
                    {/* <div className='py-6 flex justify-between items-center  w-[85%] mx-auto '>
                        <div className=''> 
                            <h2 className='text-xl title fourier font-bold'>Fourier<span>Pay</span></h2>
                        </div>  
                        <div className='py-2 px-3 rounded-full bg-[#1D3329]'>
                            <Person3Icon className="text-white" />
                        </div>     
                    </div> */}
                    <div className='w-[90%] mx-auto'>
                        <div className='py-3'>
                            <div className='flex justify-between items-center py-4'>
                                <h2 className='text-xl fourier font-bold'>Transactions</h2>
                                <MenuDropDown open20={open20} handleClose20={handleClose20} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} name={`${profile.firstname} ${profile.lastname}`} />
                            </div>
                            <div className='py-3 mt-2'>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search"
                                        // className='w-2/5 mx-auto'
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        {/* <SearchIcon /> */}
                                        <TuneIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <div className='py-2 mb-4'>
                                {transactions && !load ? transactions.map((each, index) => (
                                    <div className='flex justify-between items-center' key={index} onClick={() => {
                                        // console.log(each)
                                        setTransact(each)
                                        handleClickOpener()
                                    }}>
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
                                )) : (
                                    <div>
                                        <div>
                                            <Stack spacing={2}>
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={40} />
                                                <Skeleton animation="wave" variant="rounded" width={"100%"} height={40} />
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={40} />
                                                <Skeleton animation="wave" variant="rounded" width={"100%"} height={40} />
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={40} />
                                                <Skeleton animation="wave" variant="rounded" width={"100%"} height={40} />
                                            </Stack>
                                        </div>
                                    </div>
                                )}
                                {/* {} */}
                                {transactions?.length === 0 && !load && (
                                    // <div className='flex flex-col h-[60vh] justify-center py-2 px-2'>
                                    //     <img src="/images/payments.svg" className='w-2/5 mx-auto' />
                                    //     <p className='text-gray-500 text-center'>No Transactions Yet!</p>
                                    // </div>
                                    // <RecentTransacton/>
                                    <>
                                        <RecentTransacton />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <TransactionDialog open={open} setOpen={setOpen} handleCloseer={handleCloseer} handleClickOpener={handleClickOpener} transact={transact} />
                <BottomNav />
            </div>
        </>
    )
}

export default Transactions