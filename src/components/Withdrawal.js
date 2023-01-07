import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Recipient, Bank_Name, Transaction_ref, Amount, Status) {
    return { Recipient, Bank_Name, Transaction_ref, Amount, Status };
}

const rows = [
    createData('Ofuzor Chukwuemeke', "GTbank", "#3252f62777716", 25000, "success"),
    createData('FaithFulness Ukpebor', "Access Bank", "#3252f62777716", 20300, "success"),
    createData('Osas Agbonze Celestine', "GTbank", "#3252f62777716", 28000, "success"),
    createData('Divine Ubah', "GTbank", "$sjhsuw778282", 59099, "success")
];

export default function WithdrawalTable() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className='font-bold'>
                        <TableCell className='font-bold' style={{ fontWeight: '600' }}>Recipient</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600' }}>Bank Name</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600' }}>Reference Number</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600' }}>Amount</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                                {row.Recipient}
                            </TableCell>
                            <TableCell align="center" className='text-gray-400'>{row.Bank_Name}</TableCell>
                            <TableCell align="center" style={{ color: 'rgb(156 163 175 / 1)' }}>{row.Transaction_ref}</TableCell>
                            <TableCell align="center" style={{ color: 'rgb(156 163 175 / 1)' }}>{row.Amount}</TableCell>
                            <TableCell align="center">
                                <div className="text-center">
                                    <p className='py-2 px-2 rounded-lg text-sm status-paid'>paid</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}