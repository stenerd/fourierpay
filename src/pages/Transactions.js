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
    const [search, setSearch] = useState('')
    const SearchTransaction = async () => {
        try {
            const res = await Protected.get(`http://localhost:4000/api/transaction?q=${search}`)
            console.log(res?.data?.data?.data)
            setTransaction(res?.data?.data?.data)
        } catch (error) {
            console.log(error.response)
        }

    }
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [entity, setEntity] = useState("")
    const [type, setType] = useState("")
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const [opener, setOpener] = React.useState(false);

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


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            SearchTransaction()
        }

    };

    const fetchTransaction = async () => {
        try {
            const response = await Protected.get(`http://localhost:4000/api/transaction`)
            console.log('fetchTransaction >> ', response?.data?.data)
            setTransaction(response?.data?.data.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const filterLink = (status, start, end, type, entity) => {
        let link = `http://localhost:4000/api/transaction`
        if (status !== '' && end !== '' && start !== '' && type !== '' && entity !== '') {
            link = `http://localhost:4000/api/transaction?status=${status}&startDate=${start}&endDate=${end}&type=${type}&entity=${entity}`
            return link
        } if (status !== '' && start === '' && end === '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?status=${status}`
            return link
        }
        if (status !== '' && end !== '' && start === '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?status=${status}&endDate=${end}`
            return link
        } if (end !== '' && start === '' && status == '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?endDate=${end}`
            return link;
        } if (start !== '' && status === '' && end === '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?startDate=${start}`
            return link
        }
        if (start !== '' && end !== '' && status === '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?startDate=${start}&endDate=${end}`
            return link
        }
        if (start !== '' && end === '' && status !== '' && type === '' && entity == '') {
            link = `http://localhost:4000/api/transaction?startDate=${start}&status=${status}`
            return link
        }
        if (start === '' && end === '' && status === '' && type === '' && entity == '') {
            return link
        }
        if (start !== '' && end === '' && status === '' && type !== '' && entity == '') {
            link = `http://localhost:4000/api/transaction?startDate=${start}&type=${type}`
            return link
        }
        if (type !== '' && entity === '' && start === '' && end === '' && status === '') {
            link = `http://localhost:4000/api/transaction?type=${type}`
            return link
        }
        if (type === '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `http://localhost:4000/api/transaction?entity=${entity}`
            return link
        }
        if (type !== '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `http://localhost:4000/api/transaction?type=${type}&entity=${entity}`
            return link
        }
        if (type !== '' && entity !== '' && start !== '' && end === '' && status === '') {
            link = `http://localhost:4000/api/transaction?type=${type}&entity=${entity}&startDate=${start}`
            return link
        }
        if (type !== '' && entity !== '' && start !== '' && end !== '' && status === '') {
            link = `http://localhost:4000/api/transaction?type=${type}&entity=${entity}&startDate=${start}&endDate=${end}`
            return link
        }
        if (type === '' && entity !== '' && start === '' && end === '' && status === '') {
            link = `http://localhost:4000/api/transaction?entity=${entity}`
            return link
        }
        if (type === '' && entity === '' && start === '' && end === '' && status === '') {
            // link = `http://localhost:4000/api/transaction?entity=${entity}`
            return link
        }
        return link

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
            setEntity('')
            setEnd('')
            setStart('')
            setStatus('')
            setType('')

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
            <DashboardLayout>
                <Titlebar>
                    <h2 className='fourier font-bold'>Transactions</h2>
                </Titlebar>
                <div className='py-4 px-3 w-[90%] my-8 mx-auto'>

                    {payin ? (
                        <TransactionTable handleClickOpen={handleClickOpen} handleCloser={handleCloser} opener={opener} setOpener={setOpener} transactions={transactions} handleKeyDown={handleKeyDown} setSearch={setSearch} start={start} end={end} setStart={setStart} setEnd={setEnd} status={status} entity={entity} type={type} setEntity={setEntity} setType={setType} loading={loading} setStatus={setStatus} filterData={filterData} />
                    ) : <PayOutTable />}

                </div>

            </DashboardLayout>
        </>
    )
}

export default Transactions