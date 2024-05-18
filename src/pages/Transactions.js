import { Button, Divider, IconButton, InputBase, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
import FilterDialog from '../components/FilterDialog';
import StatusBadge from '../components/atom/mobile/StatusBadge';
import Pagination from '../components/molecule/web/Pagination';
// import FilterDialog from '../components/FilterDialog';
const Transactions = () => {
    const [payin, setPayin] = useState(true)
    const [payout, setPayout] = useState(false)
    const [transactions, setTransaction] = useState([])
    const [search, setSearch] = useState('')
    const SearchTransaction = async () => {
        try {
            const res = await Protected.get(`${BASE_URL}/api/transaction?q=${search}`)
            // console.log(res?.data?.data?.data)
            setTransaction(res?.data?.data?.data)
        } catch (error) {
            // console.log(error.response)
        }

    }
    const [open, setOpen] = useState(false)

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
    const [status, setStatus] = React.useState("paid")
    const [entity, setEntity] = useState("")
    const [type, setType] = useState("")
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [meta, setMeta] = useState({ page: 1, lastPage: 1 })

    const [opener, setOpener] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     setValue('transactions')
    // }, [])

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
    // console.log("profile >> ", profile)
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

    const [open21, setOpen21] = React.useState(false);
    const handleClickOpen21 = () => {
        setOpen21(true);
    };

    const handleClose21 = () => {
        setOpen21(false);
    };

    const formRef = useRef()
    const startRef = useRef()
    const endRef = useRef()
    const statusRef = useRef()
    const typeRef = useRef()
    const entityRef = useRef()


    const handleKeyDown = async (event) => {
        // event.preventDefault()
        if (event.key === 'Enter') {
            // 👇 Get input value
            // SearchTransaction()
            const data = filterLink(status, start, end, type, entity)
            const response = await Protected.get(data)
            // console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data.data)
        }
    };
    // console.log("transactions >> ", transactions)

    const fetchTransaction = async () => {
        setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/transaction?q=${search}&status=${status}`)
            // console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data.data)
            setMeta(response?.data?.data?.meta)
            // console.log('meta>>>>', response?.data?.data?.meta)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            // console.log('dfvd >> ', error.response)
        }
    }

    const filterData = async (page) => {
        try {
            setLoading(true)
            const data = filterLink(status, start, end, type, entity)
            const response = await Protected.get(`${data}&page=${page || 1}`)
            setTransaction(response.data.data.data)
            setMeta(response.data.data.meta)
            setLoading(false)
            // console.log(data)
            handleCloser()
            handleClose21()
            // console.log({ status, type, entity, end, start })

        } catch (error) {
            // console.log(error.response)
            setLoading(false)

            // console.log('error')
        }
    }

    const onPageChange = async (pageNumber) => {
        // console.log("pageNumber >> ", pageNumber)
        await filterData(pageNumber)
    }

    const clearData = async () => {
        formRef.current.reset()
        setEnd("")
        setStart("")
        setStatus("")
        setType("")
        setEntity("")
        try {
            setLoading(true)
            const response = await Protected.get(`${BASE_URL}/api/transaction`)
            setTransaction(response.data.data.data)
            setLoading(false)
            // console.log(data)
            handleCloser()
            handleClose21()
            // console.log({ status, type, entity, end, start })

        } catch (error) {
            // console.log(error.response)
            setLoading(false)

            // console.log('error')
        }
    }

    // const filterThrough = (value)=>{
    //     value('')

    // }

    useEffect(() => {
        setValue('transactions')
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
                            <TransactionTable
                                handleClickOpen={handleClickOpen}
                                handleCloser={handleCloser}
                                opener={opener}
                                setOpener={setOpener}
                                transactions={transactions}
                                handleKeyDown={handleKeyDown}
                                setSearch={setSearch}
                                start={start}
                                end={end}
                                setStart={setStart}
                                setEnd={setEnd}
                                status={status}
                                entity={entity}
                                type={type}
                                setEntity={setEntity}
                                setType={setType}
                                loading={loading}
                                setLoading={setLoading}
                                setStatus={setStatus}
                                filterData={filterData}
                                meta={meta}
                                setMeta={setMeta}
                                setTransaction={setTransaction}
                                BASE_URL={BASE_URL}
                                Protected={Protected}
                            />
                        ) : <PayOutTable />}
                    </div>
                </DashboardLayout>
            </div>

            {/* MOBILE SCREENS */}
            <div className='block lg:hidden'>
                <div className='py-0'>
                    <div className='w-[90%] mx-auto'>
                        <div className='py-0'>
                            <div className='flex justify-between items-center py-6'>
                                <h2 className='text-xl fourier font-bold'>Transactions</h2>
                                <MenuDropDown open20={open20} handleClose20={handleClose20} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} name={`${profile.firstname} ${profile.lastname}`} />
                            </div>
                            <div className=''>
                                <Paper
                                    // component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClickOpen21}>
                                        <TuneIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <div className='flex flex-col'>
                                {start !== '' || end !== '' || entity !== '' || type !== '' || entity !== '' || status !== '' ? (
                                    <div className='py-4'>
                                        <h2 className='font-bold'>Filtering By</h2>
                                    </div>

                                ) : ''}
                                <div className='flex items-center flex-wrap space-x-1 gap-4'>
                                    {start !== '' && (
                                        <small onClick={() => handleClickOpen21()} className={`create-payment-divider-options cursor-pointer`}>StartDate <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' > x</span></small>
                                    )}
                                    {end !== '' && (
                                        <small onClick={() => handleClickOpen21()} className={`create-payment-divider-options cursor-pointer`}>EndDate <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' > x</span></small>
                                    )}
                                    {status !== '' && (
                                        <small onClick={() => handleClickOpen21()} className={`create-payment-divider-options cursor-pointer`}>Status <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
                                    )}
                                    {type !== '' && (
                                        <small onClick={() => handleClickOpen21()} className={`create-payment-divider-options cursor-pointer`}>Type <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
                                    )}
                                    {entity !== '' && (
                                        <small onClick={() => handleClickOpen21()} className={`create-payment-divider-options cursor-pointer`}>Entity <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
                                    )}
                                </div>

                            </div>
                            <div className='py-8 mb-4'>
                                {transactions && !loading ?
                                    (
                                        <>
                                            {
                                                transactions.map((each, index) => (
                                                    <div className='flex justify-between mb-8 items-center' key={index} onClick={() => {
                                                        setTransact(each)
                                                        handleClickOpener()
                                                    }}>
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
                                                                <h2 className='font-bold text-base text-[#2d2d2d] c-text-elipses'>{(each.in_entity === 'Wallet' || each.in_entity === 'Withdrawal') ? each.out_entity_id.name : each.payment_link_id.name}</h2>
                                                                <small className='text-xs font-medium pt-1 flex-1 text-gray-500'>{moment(each.createdAt
                                                                ).format('MMM DD, YYYY')} | {moment(each.createdAt).format('h:mm A')}</small>
                                                                <small className='block text-xs font-bold pt-1 text-gray-500'>
                                                                    {each.in_entity === 'Wallet' ? 'Wallet | ' : `${each.in_entity_id.unique_answer} | `} {each.reference}
                                                                </small>

                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <h2 className='text-sm p-0 text-gray-500 font-bold lowercase self-end'>{each.in_entity !== 'Wallet' ? each.in_entity : 'Withdrawal'}</h2>
                                                            <small className={each.in_entity !== 'Wallet' ? 'pt-1 self-end flex-1 font-bold text-[#01b133]' : 'pt-1 self-end flex-1 font-bold c-text-danger'}>{each.in_entity !== 'Wallet' ? '+' : '-'} ₦{Intl.NumberFormat('en-US').format(each.in_entity_id.amount || 0)}</small>
                                                            <StatusBadge status={each.status} />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='mb-12 flex justify-center'>
                                                <Pagination currentPage={meta.page} lastPage={meta.lastPage} onPageChange={(page) => onPageChange(page)} />
                                            </div>
                                        </>
                                    )
                                    : (
                                        <div>
                                            <div>
                                                <Stack spacing={2}>
                                                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={40} />
                                                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={40} />
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
                                {transactions?.length === 0 && !loading && (
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
                <FilterDialog
                    open21={open21}
                    setOpen21={setOpen21}
                    handleClose21={handleClose21}
                    handleClickOpen21={handleClickOpen21}
                    transactions={transactions}
                    handleKeyDown={handleKeyDown}
                    load={false}
                    setSearch={setSearch}
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                    status={status}
                    entity={entity}
                    type={type}
                    setEntity={setEntity}
                    setType={setType}
                    loading={loading}
                    setStatus={setStatus}
                    filterData={filterData}
                    formRef={formRef}
                    statusRef={statusRef}
                    startRef={startRef}
                    endRef={endRef}
                    typeRef={typeRef}
                    entityRef={entityRef}
                    filterLink={filterLink}
                    clearData={clearData}
                />
                <TransactionDialog
                    open={open}
                    setOpen={setOpen}
                    handleCloseer={handleCloseer}
                    handleClickOpener={handleClickOpener}
                    transact={transact}
                />
                <BottomNav />
            </div>
        </>
    )
}

export default Transactions