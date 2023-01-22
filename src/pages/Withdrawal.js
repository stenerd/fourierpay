import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Titlebar from '../components/TitleBar'
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import TransactionTable from '../components/TransactionsTable';
import WithdrawalTable from '../components/Withdrawal';
import WithdrawalPopup from '../components/WIthdrawalPopup';
import { DashBoardContext } from '../context/Dashboard';
import Protected from '../utils/axios';
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
 


    const [opener, setOpener] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpener(true);
    };
  
    const handleCloser = () => {
      setOpener(false);
    };

    


    const filterLink = (status,start,end)=>{
        let link = `http://localhost:4000/api/withdrawal/view`
        if(status!==''&&end!==''&&start!==''){
            link = `http://localhost:4000/api/withdrawal/view?status=${status}&startDate=${start}&endDate=${end}`
            return link
        }if(status!==''&&start===''&&end===''){
            link = `http://localhost:4000/api/withdrawal/view?status=${status}`
            return link
        }if(status!==''&&end!==''&&start===''){
            link = `http://localhost:4000/api/withdrawal/view?status=${status}&endDate=${end}`
            return link
        }if(end!==''&&start===''&&status==''){
            link = `http://localhost:4000/api/withdrawal/view?endDate=${end}`
            return link;
        }if(start!==''&&status===''&&end===''){
            link = `http://localhost:4000/api/withdrawal/view?startDate=${start}`
            return link
        }
        if(start!==''&&end!==''&&status===''){
            link = `http://localhost:4000/api/withdrawal/view?startDate=${start}&endDate=${end}`
            return link
        }
        if(start!==''&&end===''&&status!==''){
            link = `http://localhost:4000/api/withdrawal/view?startDate=${start}&status=${status}`
            return link
        }
        if(start===''&&end===''&&status===''){
            return link
        }
        if(start!==''&&end===''&&status===''){
            link = `http://localhost:4000/api/withdrawal/view?startDate=${start}`
            return link
        }
    }

    const filterData =async()=>{
        setLoading(true)
        try {
            // console.log({status,start,end})
            setLoading(true)
            const data = filterLink(status,start,end)
            const response = await Protected.get(data)
            console.log(response.data)
            setLoading(false)
            setWithdrawal(response?.data?.data.data)
            handleCloser()
            setEnd('')
            setStart('')
            setStatus('')
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            
            handleCloser()
        }
    }

   

    const fetchWithdrawal = async () => {
        try {
            const response = await Protected.get(`http://localhost:4000/api/withdrawal/view`)
            console.log('fetchWithdrawal >> ', response?.data?.data)
            setWithdrawal(response?.data?.data.data)
        } catch (error) {
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
                        <button className='px-4 py-2 rounded-sm font-medium text-white bg-[#234243]' onClick={() => handleOpen()}>Withdraw</button>
                    </div>
                </Titlebar>
                <div className='py-4 w-[90%] mx-auto'>
                    <div className="py-3">

                        <div className='py-4'>
                            {/* <div className='flex items-center space-x-4'>
                                <h2 className={payin ? `text-[#234243] font-bold cursor-pointer border-b-2 border-[#234243]` : `cursor-pointer`} onClick={() => handlePayin()}>Pay In </h2>
                                <h2 className={payout ? `text-[#234243] font-bold cursor-pointer border-b-2 border-[#234243]` : `cursor-pointer`} onClick={() => handlePayOut()}>Pay Out </h2>
                            </div>
                            <div className="py-4">
                                <Divider />
                            </div> */}

                        </div>
                    </div>
                    <WithdrawalTable start={start} end={end} setStart={setStart} status={status} setEnd={setEnd} setStatus={setStatus}  withdrawals={withdrawals}  opener={opener} setOpener={setOpener} handleClickOpen={handleClickOpen} handleCloser={handleCloser}/>
                    <WithdrawalDialog loading={loading} filterData={filterData} setStart={setStart} setEnd={setEnd} setStatus={setStatus} start={start} end={end} status={status} opener={opener} setOpener={setOpener} handleClickOpen={handleClickOpen} handleCloser={handleCloser}/>
                    <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
                    {/* <Withdrawls/> */}
                    
                </div>
            </DashboardLayout>
        </>
    )
}

export default Withdrawal;