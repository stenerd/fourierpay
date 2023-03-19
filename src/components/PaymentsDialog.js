import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment'
import { IconButton } from '@mui/material';
export default function PaymentDialog({ open1, setOpen1, handleClose1, handleClickOpen1, transact: recentTransaction }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue('dashboard')
  }, [])


  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open1}
        onClose={handleClose1}
        aria-labelledby="responsive-dialog-title"
      >
        <div className='flex w-[90%] mx-auto flex-col justify-start  items-start min-h-screen'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClose1()} >
            <div className='flex items-center space-x-1' >
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
                <h2 className='text-gray-400'>Payment</h2>
                <p className='font-bold'>{recentTransaction?.payment_link_id?.name}</p>
              </div>
              <div className='flex justify-between items-center py-3'>
                <h2 className='text-gray-400'>Amount</h2>
                <p className='font-bold text-sm'>{recentTransaction?.amount}</p>
              </div>
              <div className='flex justify-between items-center py-3'>
                <h2 className='text-gray-400'>Status</h2>
                <p className={recentTransaction?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid2' : 'py-2 px-2 rounded-lg text-sm status-fail2'}>{recentTransaction?.status}</p>
              </div>
              {recentTransaction?.form?.map((tx, index) => (
                <div className='flex justify-between items-center py-3' key={index}>
                  <h2 className='text-gray-400 capitalize'>{tx?.field_name}</h2>
                  <p className='font-bold text-sm text-right'>{tx?.answer}</p>
                </div>
              ))}
              <div className='flex justify-between items-center py-3'>
                <h2 className='text-gray-400'>Date</h2>
                <p className='font-bold text-sm'>{moment(recentTransaction?.createdAt).format('dddd, DD MMMM YYYY')}</p>
              </div>
              {/* check later */}
              {/* <div className='flex justify-between items-center py-3'>
                <h2 className='text-gray-400'>Payment Method</h2>
                <p className='font-bold text-sm'>{recentTransaction?.type}</p>
              </div> */}
            </div>
          </div>
        </div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Dashboard"
              value="dashboard"
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
            {/* <BottomNavigationAction
                            label="Favorites"
                            value="favorites"
                            icon={<FavoriteIcon />}
                        /> */}
            {/* <BottomNavigationAction
                            label="Nearby"
                            value="nearby"
                            icon={<LocationOnIcon />}
                        /> */}
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
          </BottomNavigation>
        </Paper>
      </Dialog>
    </div>
  );
}