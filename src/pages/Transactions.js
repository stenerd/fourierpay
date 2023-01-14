import { Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import TransactionTable from '../components/TransactionsTable'
import TuneIcon from '@mui/icons-material/Tune';
import PayOutTable from '../components/PayoutTable';
import Titlebar from '../components/TitleBar'
import Protected from '../utils/axios';

const Transactions = () => {
    const [payin, setPayin] = useState(true)
    const [payout, setPayout] = useState(false)
    const [transactions, setTransaction] = useState([])


    const handlePayin = () => {
        setPayin(true)
        setPayout(false)
    }
    const handlePayOut = () => {
        setPayout(true)
        setPayin(false)
    }

    const fetchTransaction = async () => {
        try {
            const response = await Protected.get(`http://localhost:4000/api/transaction`)
            console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchTransaction()
    }, [])

    return (
        <>
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Transactions</h2>
                </Titlebar>
                <div className='py-4 px-3 w-[90%] my-8 mx-auto'>
                    
                    {payin ? (
                        <TransactionTable transactions={transactions} />
                    ) : <PayOutTable />}

                </div>

            </DashboardLayout>
        </>
    )
}

export default Transactions