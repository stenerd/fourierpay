import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Description, Customer,Amount,Payment, Status) {
  return {Description, Customer,Amount,Payment, Status };
}

const rows = [
  createData('ELA Dues', "Ofuzor Chukwuemeke", "$2,500", "CARD", 4.0),
  createData('UBIT', "FaithFulness Ukpebor", "$3,000", "BANK TRANSFER", 4.3),
  createData('NAMES Dues', "Osas Agbonze Celestine", "$3,000", "CARD", 6.0),
  createData('Class Dues', "Divine Ubah", "$3,000","WALLET", 4.3),
  createData('Thermo Text Book',"Darlington", "$3,000", "BANK TRANSFER", 3.9),
  createData('Class Dues', "Divine Ubah", "$3,000","WALLET", 4.3),
  createData('Thermo Text Book',"Darlington", "$3,000", "BANK TRANSFER", 3.9),
  createData('Class Dues', "Divine Ubah", "$3,000","WALLET", 4.3),
  createData('Thermo Text Book',"Darlington", "$3,000", "BANK TRANSFER", 3.9),
  createData('Class Dues', "Divine Ubah", "$3,000","WALLET", 4.3),
  createData('Thermo Text Book',"Darlington", "$3,000", "BANK TRANSFER", 3.9),
  createData('Class Dues', "Divine Ubah", "$3,000","WALLET", 4.3),
  createData('Thermo Text Book',"Darlington", "$3,000", "BANK TRANSFER", 3.9),
];

export default function TransactionTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='font-bold'>
            <TableCell className='font-bold' style={{fontWeight:'600'}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight:'600'}}>Customer</TableCell>
            <TableCell align="center" style={{fontWeight:'600'}}>Amount</TableCell>
            <TableCell align="center" style={{fontWeight:'600'}}>Payment Method</TableCell>
            <TableCell align="center" style={{fontWeight:'600'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <TableCell component="th" scope="row" style={{fontWeight:'700'}} >
                {row.Description}
              </TableCell>
              <TableCell align="center" className='text-gray-400'>{row.Customer}</TableCell>
              <TableCell align="center" style={{color:'rgb(156 163 175 / 1)'}}>{row.Amount}</TableCell>
              <TableCell align="center"  style={{color:'rgb(156 163 175 / 1)'}}>{row.Payment}</TableCell>
              <TableCell align="center">
                <button className='py-2 px-3 rounded-md bg-[#f8faf7]  text-[#22c55e]'>Success</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}