import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Titlebar from '../components/TitleBar'
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import TransactionTable from '../components/TransactionsTable';
import WithdrawalTable from '../components/Withdrawal';
import WithdrawalPopup from '../components/WIthdrawalPopup';
const Withdrawal = () => {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2>Withdrawal</h2>
                    <div>
                        <button className='px-4 py-2 rounded-md text-white bg-[#234243]' onClick={() => handleOpen()}>Withdraw</button>
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
                    <WithdrawalTable />
                    <WithdrawalPopup open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
                </div>
            </DashboardLayout>
        </>
    )
}

export default Withdrawal