import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransactionModal from './TrnsactionModal';
import { Button } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import moment from 'moment'
import SinglePaymentModal from './SinglePaymentModal';
import FilterDialog from './FilterDialog';


export default function PaymentTable({data,onChange,handleKeyDown ,start,end,status,setStatus,setEnd,setStart,filterData,opener,setOpener,handleClickOpen,handleCloser,loading}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [search,setSearch] = React.useState("")
 

  // const handleChange = e => {
  //   e.preventDefault()
  //   console.log(e)
  //   setSearch(e.target.value);
  // };

  // const filteredPayments = data?.payments?.filter(payment =>
  //   payment?.unique_answer?.toLowerCase().includes(search.toLowerCase())
  // );

  const [recentPayment,setRecentPayment ] = React.useState()

  return (
    <>
      <div className='flex justify-between mb-4'>
          <div className='w-[20%]'>
              <input placeholder='Search' onChange={onChange} onKeyDown={handleKeyDown} style={{backgroundColor: '#f8faf7'}} name='q' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
          </div>
          <Button variant="outlined" className='text-black c-withdraw-page-filter' startIcon={<TuneIcon />} onClick={()=>handleClickOpen()}>
              Filter
          </Button>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='font-bold'>
              <TableCell className='font-bold' style={{ fontWeight: '600' }}>{data.paymentLink.unique_field}</TableCell>
              <TableCell style={{ fontWeight: '600' }}>REFERENCE</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Date</TableCell>
              <TableCell style={{ fontWeight: '600' }}>TIME</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Amount</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.payments.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() =>{
                  console.log(row)
                  setRecentPayment(row)
                  handleOpen()
                }}
              >
                <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                  <h2 className='font-bold'>{row.unique_answer}</h2>
                </TableCell>
                <TableCell className='text-gray-400'>{row.transaction_id.reference}</TableCell>
                <TableCell>{moment(row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                <TableCell>{moment(row.createdAt).format('hh:mm:ss A')}</TableCell>
                <TableCell>
                  <p className='font-bold'>₦ {Intl.NumberFormat('en-US').format(row.amount || 0)}</p>
                </TableCell>
                <TableCell>
                <div className="text-left">
                    <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{row.status}</p>
                </div>              
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TransactionModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentTransaction={recentTransaction}/> */}
      <SinglePaymentModal  open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentPayment={recentPayment}/>
      <FilterDialog loading={loading} setOpener={setOpener} opener={opener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} start={start} end={end} setStart={setStart} status={status} setEnd={setEnd} setStatus={setStatus} filterData={filterData}/>
    </>

  );
}