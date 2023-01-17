import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import moment from 'moment'


export default function WithdrawalTable({ withdrawals }) {
    return (
        <>
            <div className='flex justify-between mb-4'>
                <div className='w-[20%]'>
                    <input placeholder='Search' style={{backgroundColor: '#f8faf7'}} name='q' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                </div>
                <Button variant="outlined" className='text-black c-withdraw-page-filter' startIcon={<TuneIcon />}>
                    Filter
                </Button>
            </div>
             <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='font-bold'>
                            <TableCell className='font-bold' style={{ fontWeight: '600' }}>Recipient</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Reference Number</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Amount</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Time</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Vendor Reference</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {withdrawals.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className="hover:bg-gray-100 cursor-pointer"
                            >
                                {/* <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                                    {row.Recipient}
                                </TableCell> */}
                                <TableCell align="left" style={{ fontWeight: '600' }} >
                                    <div>
                                        <p>{row.name}</p>
                                        <div className='text-sm text-gray-400'><span>{row.bank_name}</span> - <span>{row.account_number}</span></div>
                                    </div>
                                </TableCell>
                                <TableCell align="left">{row.transaction_id.reference}</TableCell>
                                <TableCell align="left" style={{ fontWeight: '600' }}>₦ {Intl.NumberFormat('en-US').format(row.amount || 0)}</TableCell>
                                <TableCell align="left" >{moment(row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                                <TableCell align="left" >{moment(row.createdAt).format('hh:mm:ss A')}</TableCell>
                                <TableCell align="left" >{row.paystack_reference}</TableCell>
                                <TableCell align="left">
                                    <div className="text-left">
                                        <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{row.status}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}