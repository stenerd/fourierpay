import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Titlebar from '../components/TitleBar'
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
// import TransactionTable from '../components/TransactionsTable';
import WithdrawalTable from '../components/Withdrawal';
import WithdrawalPopup from '../components/WIthdrawalPopup';
import { DashBoardContext } from '../context/Dashboard';
import Protected, { BASE_URL } from '../utils/axios';
import WithdrawalDialog from '../components/WithdrawalDialog';
import axios from 'axios';
const Withdrawal = ({}) => {
    const navigate = useNavigate()
    const [withdrawals, setWithdrawal] = useState([])
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [meta,setMeta] = useState({page: 1, lastPage: 1})


    const [opener, setOpener] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpener(true);
    };
  
    const handleCloser = () => {
      setOpener(false);
    };

    const filterLink = (status,start,end)=>{
        let link = `${BASE_URL}/api/withdrawal/view?q=${search}`
        if(status!==''&&end!==''&&start!==''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&status=${status}&startDate=${start}&endDate=${end}`
            return link
        }if(status!==''&&start===''&&end===''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&status=${status}`
            return link
        }if(status!==''&&end!==''&&start===''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&status=${status}&endDate=${end}`
            return link
        }if(end!==''&&start===''&&status==''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&endDate=${end}`
            return link;
        }if(start!==''&&status===''&&end===''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&startDate=${start}`
            return link
        }
        if(start!==''&&end!==''&&status===''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&startDate=${start}&endDate=${end}`
            return link
        }
        if(start!==''&&end===''&&status!==''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&startDate=${start}&status=${status}`
            return link
        }
        if(start===''&&end===''&&status===''){
            return link
        }
        if(start!==''&&end===''&&status===''){
            link = `${BASE_URL}/api/withdrawal/view?q=${search}&startDate=${start}`
            return link
        }
    }

    const handleKeyDown = async(event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            // const data = filterLink()
            try {
                const data = filterLink(status,start,end)
                const response = await Protected.get(data)
                // console.log(`${data}`, response?.data?.data)
                setWithdrawal(response?.data?.data.data)
            } catch (error) {
                console.log(error.response)
            }
        }
    };

    const filterData = async(page = '') => {
        setLoading(true)
        try {
            // console.log({status,start,end})
            setLoading(true)
            const data = filterLink(status,start,end)
            console.log(data)
            const response = await Protected.get(`${data}&page=${page || meta.page}`)
            console.log(response.data)
            setLoading(false)
            setWithdrawal(response?.data?.data?.data)
            handleCloser()
      
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            
            handleCloser()
        }
    }

    const fetchWithdrawal = async () => {
        setLoading(true)
        try {
            const response = await Protected.get(`${BASE_URL}/api/withdrawal/view?q=${search}`)
            console.log('fetchWithdrawal >> ', response?.data?.data)
            setWithdrawal(response?.data?.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchWithdrawal()
    }, [])

    const {state ,open,setOpen,handleOpen,handleClose} = useContext(DashBoardContext)
    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2>Withdrawal</h2>
                    <div>
                        <button className='c-bg-primary-light' onClick={() => handleOpen()}> Request Withdraw</button>
                    </div>
                </Titlebar>
                <div className='py-4 w-[90%] mx-auto'>
                    <div className="py-3">

                        <div className='py-4'>
                            {/* <div className='flex items-center space-x-4'>
                                <h2 className={payin ? `text-[#1d3329] font-bold cursor-pointer border-b-2 border-[#1d3329]` : `cursor-pointer`} onClick={() => handlePayin()}>Pay In </h2>
                                <h2 className={payout ? `text-[#1d3329] font-bold cursor-pointer border-b-2 border-[#1d3329]` : `cursor-pointer`} onClick={() => handlePayOut()}>Pay Out </h2>
                            </div>
                            <div className="py-4">
                                <Divider />
                            </div> */}

                        </div>
                    </div>
                    <WithdrawalTable
                        handleKeyDown={handleKeyDown}
                        search={search}
                        setSearch={setSearch}
                        start={start} end={end}
                        setStart={setStart}
                        status={status}
                        setEnd={setEnd}
                        setStatus={setStatus}
                        withdrawals={withdrawals}
                        opener={opener}
                        loading={loading}
                        setOpener={setOpener}
                        handleClickOpen={handleClickOpen}
                        handleCloser={handleCloser}
                        filterData={filterData}
                        setMeta={setMeta}
                        meta={meta}
                    />
                    <WithdrawalDialog loading={loading}
                        filterData={filterData} setStart={setStart} setEnd={setEnd} setStatus={setStatus} start={start} end={end} status={status} opener={opener} setOpener={setOpener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} />
                    <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
                    {/* <Withdrawls/> */}
                    
                </div>
            </DashboardLayout>
        </>
    )
}

export default Withdrawal;