import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import BottomNav from './bottomNav';

export default function TransactionDialog({ open, setOpen, handleClickOpener, handleCloseer, transact: recentTransaction }) {
    //   const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate()

    React.useEffect(() => {
        setValue('transactions')
    })



    return (
        <div>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCloseer}
                aria-labelledby="responsive-dialog-title"
            >
                <div className='flex w-[90%] mx-auto flex-col justify-start  items-start min-h-screen'>
                    <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleCloseer()}>
                        <div className='flex items-center space-x-1'>
                            <IconButton>
                                <CancelIcon className='text-red-500 ' />
                            </IconButton>
                            <h2 className='font-bold'>Close</h2>
                        </div>
                    </div>
                    <div className='py-10 w-full mt-6'>
                        <div className='py-3'>
                            <h2 className='text-xl text-center font-bold'>Transaction Reciept</h2>
                        </div>
                        <div className='py-3 divide-y-2 space-y-4 w-full'>

                            {/* <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1> */}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Reference</h2>
                                <p className='font-bold'>{recentTransaction?.reference}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.amount}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                <p className={recentTransaction?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{recentTransaction?.status}</p>
                            </div>
                            {recentTransaction?.in_entity_id?.form?.map((tx, index) => (
                                <div className='flex justify-between items-center py-3'>
                                    <h2 className='text-gray-400 capitalize'>{tx?.field_name}</h2>
                                    <p className='font-bold text-sm'>{tx?.answer}</p>
                                </div>
                            ))}
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Date</h2>
                                <p className='font-bold text-sm'>{moment(recentTransaction?.createdAt).format('dddd, DD MMMM YYYY')}</p>
                            </div>

                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Payment Method</h2>
                                <p className='font-bold text-sm'>{recentTransaction?.type}</p>
                            </div>

                            {/* <h2>Amount :</h2> */}
                        </div>
                    </div>

                </div>
                {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dashboard"
                            onClick={() => navigate('/dashboard')}
                            icon={<DashboardIcon />}
                        />
                        <BottomNavigationAction
                            label="Transactions"
                            value="transactions"
                            onClick={() => navigate('/dashboard/transaction')}
                            icon={<ReceiptIcon />}
                        />
                        <BottomNavigationAction
                            label="Links"
                            value="links"
                            icon={<InsertLinkIcon />}
                            onClick={() => navigate('/dashboard/paymentlinks')}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountCircleIcon />}
                            onClick={() => navigate('/dashboard/profile')}
                        />
                      
                        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                    </BottomNavigation>
                </Paper> */}
                <BottomNav/>
            </Dialog>

        </div>
    );
}