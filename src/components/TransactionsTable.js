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


function createData(Description, Customer, Amount, Payment, Status) {
  return { Description, Customer, Amount, Payment, Status };
}

export default function TransactionTable({ transactions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [recentTransaction, setRecentTransaction] = React.useState()
  const [search, setSearch] = React.useState('');

  const handleChange = e => {
    e.preventDefault()
    console.log(e)
    setSearch(e.target.value);
  };
  console.log(transactions)

  const filteredTransaction = transactions.filter(transaction =>
    (transaction.in_entity === 'Payment') ? transaction?.in_entity_id?.unique_answer?.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <>
      <div className='flex justify-between mb-4'>
        <div className='w-[20%]'>
          <input placeholder='Search' style={{ backgroundColor: '#f8faf7' }} onChange={handleChange} type="text" className='py-2 px-4 w-full outline-none c-text-input' />
        </div>
        <Button variant="outlined" className='text-black c-withdraw-page-filter' startIcon={<TuneIcon />}>
          Filter
        </Button>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='font-bold'>
              <TableCell className='font-bold' style={{ fontWeight: '600' }}>RECIPIENT</TableCell>
              <TableCell style={{ fontWeight: '600' }}>REFERENCE</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Date</TableCell>
              <TableCell style={{ fontWeight: '600' }}>TIME</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Amount</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Type</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransaction.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  console.log(row)
                  setRecentTransaction(row)
                  console.log(row)
                  handleOpen()
                }}
              >
                <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                  <h2 className='font-bold uppercase'>{row.in_entity}</h2>
                  <small className='text-gray-400'>{row.in_entity === 'Payment' ? row.in_entity_id.unique_answer : ''}</small>
                </TableCell>
                <TableCell className='text-gray-400'>{row.reference}</TableCell>
                <TableCell>{moment(row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                <TableCell>{moment(row.createdAt).format('hh:mm:ss A')}</TableCell>
                <TableCell>
                  <p className='font-bold'>₦ {Intl.NumberFormat('en-US').format(row.amount || 0)}</p>
                </TableCell>
                <TableCell>
                  <div className="text-left">
                    <p className={(row.type === 'credit') ? 'py-2 px-2 rounded-lg text-sm text-[#00bf00] font-bold' : 'py-2 px-2 rounded-lg text-sm text-[#f10506] font-bold'}>{row.type}</p>
                  </div>
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
      <TransactionModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentTransaction={recentTransaction} />
    </>

  );
}