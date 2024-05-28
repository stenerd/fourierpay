import { IconButton, InputBase, Paper, Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import moment from 'moment'
import TuneIcon from '@mui/icons-material/Tune';
import React from 'react'
import FilterDialog from './FilterDialog';
import Pagination from './molecule/web/Pagination';
import PaymentDialog from './PaymentsDialog';

const SinglePayment = ({ data, onChange, handleKeyDown, start, end, status, setStatus, setEnd, setStart, filterData, opener, setOpener, handleClickOpen, handleCloser, loading, setSearch, meta, setMeta ,  recentTransactionData,paymentName }) => {
    const [open21, setOpen21] = React.useState(false);
    const handleClickOpen21 = () => {
        setOpen21(true);
    };


    const handleClose21 = () => {
        setOpen21(false);
    };

    const onPageChange = async (pageNumber) => {
        setMeta({ page: pageNumber, lastPage: meta.lastPage })
        filterData(pageNumber)
    }


    const [transact, setTransact] = React.useState()

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    console.log(data)
    return (
        <>
            <div className='space-y-3 py-4'>

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
                <div className='space-y-6 mb-10'>
                    {data ? data?.payments?.map((row, index) => (
                        <div className='flex space-x-2 items-center' key={index} onClick={() => { console.log(row); handleClickOpen1(); setTransact(row) }}>
                            {row.transaction_id.status === 'paid' ?
                                (
                                    <div className='p-2 c-icon-bg'>
                                        <img src='/images/payment-icon-in.svg' className='w-[20px]' alt="alt-img" />
                                    </div>
                                ) :
                                (
                                    <div className='p-2 c-icon-bg-withdrawal'>
                                        <img src='/images/withdrawal-icon-out.svg' className='w-[20px]' alt="alt-img" />
                                    </div>
                                )
                            }
                            <div className='flex flex-1 flex-col items-start'>

                                <h2 className='font-bold text-base text-[#2d2d2d] c-text-elipses'>{row?.unique_answer}</h2>
                                <small className='text-xs font-medium pt-1 flex-1 text-gray-500'>{moment(row.createdAt
                                ).format('MMM DD, YYYY')} | {moment(row.createdAt).format('h:mma')}</small>
                                {/* <small className='block text-xs font-bold pt-1 text-gray-500'>
                                                    {row.transaction_id.in_entity === 'Wallet' ? 'Wallet | ' : `${row.transaction_id.in_entity} | `} {row.transaction_id.reference}
                                                </small> */}
                            </div>
                            <div className='flex flex-1 flex-col items-end space-y-2'>
                                <h2 className='self-end'>₦{Intl.NumberFormat('en-US').format(row.amount || 0)}</h2>
                                <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid2 self-end' : 'py-2 px-2 rounded-lg text-sm status-fail2 self-end'}>{row.status}</p>
                            </div>
                        </div>
                    )) : (
                        <div>
                            <div>
                                <Stack spacing={3}>
                                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />
                                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={30} />
                                </Stack>
                            </div>
                        </div>
                    )}
                    {data?.payments?.length === 0 && (
                        <div className='flex flex-col py-6 justify-center px-2'>
                            <img src="/images/nolinks.svg" className='w-2/5 mx-auto' alt='img' />
                            <p className='text-gray-500 text-center'>No Payments Yet!</p>
                        </div>
                    )}
                    {data?.payments?.length !== 0 && (
                        <div className='pb-12 flex justify-center'>
                            <Pagination currentPage={meta.page} lastPage={meta.lastPage} onPageChange={(page) => onPageChange(page)} />
                        </div>
                        )
                    }
                </div>
            </div>
        <FilterDialog loading={loading} open21={open21} setOpen21={setOpener} handleClickOpen21={handleClickOpen21} handleClose21={handleClose21} data={data} onChange={onChange} handleKeyDown={handleKeyDown} start={start} end={end} setStart={setStart} setEnd={setEnd} status={status} setStatus={setStatus} filterData={filterData} recentTransactionData={recentTransactionData} paymentName={paymentName}/>
            <PaymentDialog open1={open1} transact={transact} setOpen1={setOpen1} handleClickOpen1={handleClickOpen1} handleClose1={handleClose1} />
        </>
    )
}

export default SinglePayment;