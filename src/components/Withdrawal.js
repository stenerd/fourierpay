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


function createData(Recipient, Bank_Name,Bank_Account, Transaction_ref, Amount, Status) {
    return { Recipient, Bank_Name, Bank_Account,Transaction_ref, Amount, Status };
}

const rows = [
    createData('Ofuzor Chukwuemeke', "GTbank","0430775470", "#3252f62777716", 25000, "success"),
    createData('FaithFulness Ukpebor', "Access Bank","0430775470" ,"#3252f62777716", 20300, "success"),
    createData('Osas Agbonze Celestine', "GTbank", "0430775470","#3252f62777716", 28000, "success"),
    createData('Divine Ubah', "GTbank","0430775470" ,"$sjhsuw778282", 59099, "success")
];

export default function WithdrawalTable() {
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
                            <TableCell style={{ fontWeight: '600' }}>Vendor</TableCell>
                            <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
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
                                        <p>{row.Recipient}</p>
                                        <div className='text-sm text-gray-400'><span>{row.Bank_Name}</span> - <span>5433231243</span></div>
                                    </div>
                                </TableCell>
                                <TableCell align="left">{row.Transaction_ref}</TableCell>
                                <TableCell align="left" style={{ fontWeight: '600' }}>$ {row.Amount}</TableCell>
                                <TableCell align="left" >Monday, 14th September 2022</TableCell>
                                <TableCell align="left" >PAYSTACK</TableCell>
                                <TableCell align="left">
                                    <div className="">
                                        <p className='py-2 px-2 rounded-lg text-sm status-paid'>paid</p>
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