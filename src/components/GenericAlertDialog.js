import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import BottomNav from './bottomNav';
import { IconButton } from '@mui/material';
export default function GenericAlertDialog({ open21, handleClose21, handleClickOpen21, setOpen21, children }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open21}
        onClose={handleClose21}
        aria-labelledby="responsive-dialog-title"
        className='block md:hidden'
      >
        <span></span>
        <span></span>
        <div className='py-3 px-3 h-[50vh] flex justify-center items-center relative'>

          <span className='absolute right-2 top-3'>
            <IconButton>
              <CloseIcon onClick={() => handleClose21(!open21)} className="cursor-pointer" />
            </IconButton>

          </span>
          {/* <h1 className='text-center font-bold'>{recentPayment?.payment_link_id?.name}</h1>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Amount</h2>
                                <p className='font-bold'>{recentPayment?.amount}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Description</h2>
                                <p className='font-bold text-sm'>{recentPayment?.payment_link_id.description}</p>
                            </div>
                            <div className='flex justify-between items-center py-3'>
                                <h2 className='text-gray-400'>Status</h2>
                                <p className={recentPayment?.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid' : 'py-2 px-2 rounded-lg text-sm status-fail'}>{recentPayment?.status}</p>
                            </div> */}
          {children}
          {/* <h2>Amount :</h2> */}
        </div>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose21}>
            Disagree
          </Button>
          <Button onClick={handleClose21} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
        <BottomNav />
      </Dialog>
    </div>
  );
}