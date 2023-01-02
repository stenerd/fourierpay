import { Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import TransactionTable from '../components/TransactionsTable'
import TuneIcon from '@mui/icons-material/Tune';
import PayOutTable from '../components/PayoutTable';
const Transactions = () => {
    const [payin, setPayin] = useState(true)
    const [payout, setPayout] = useState(false)

    const handlePayin = () => {
        setPayin(true)
        setPayout(false)
    }
    const handlePayOut = () => {
        setPayout(true)
        setPayin(false)
    }
    return (
        <>
            <DashboardLayout>

                <div className='py-4 px-3 w-[90%] mx-auto'>
                    <div className="py-3">
                        <h1 className='fourier text-lg font-bold'>Transactions</h1>

                        <div className='py-4'>
                            <div className='flex items-center space-x-4'>
                                <h2 className={payin ? `text-[#234243] font-bold cursor-pointer border-b-2 border-[#234243]` : `cursor-pointer`} onClick={() => handlePayin()}>Pay In </h2>
                                <h2 className={payout ? `text-[#234243] font-bold cursor-pointer border-b-2 border-[#234243]` : `cursor-pointer`} onClick={() => handlePayOut()}>Pay Out </h2>
                            </div>
                            <div className="py-4">
                                <Divider />
                            </div>
                            <div className='py-4'>
                                <div className='flex items-center space-x-6'>
                                    <Button variant="outlined" className='text-black rounded-[50px]' startIcon={<TuneIcon />}>
                                        Filter
                                    </Button>
                                    <input className='px-2 py-2 rounded-xl outline-none border border-gray-200' placeholder='Search' />
                                </div>

                            </div>
                        </div>
                    </div>
                    {payin ? (
                        <TransactionTable />
                    ) : <PayOutTable />}

                </div>

            </DashboardLayout>
        </>
    )
}

export default Transactions