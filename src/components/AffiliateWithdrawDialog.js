
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Protected, { BASE_URL } from '../utils/axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

export default function AffiliateWithdrawDialog({ opener, setOpener, handleClosed, handleClickOpen, balance }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = React.useState(false);
  const [accountNumber, setAccountNumber] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [requestMessage, setRequestMessage] = React.useState(''); // for bold message in dialog
  const [showForm, setShowForm] = React.useState(false);
  const [hasTodayRequest, setHasTodayRequest] = React.useState(false);
  const [requestDetails, setRequestDetails] = React.useState(null);

  React.useEffect(() => {
    const storedDetails = localStorage.getItem('affiliateBankDetails');
    if (storedDetails) {
      const { accountNumber: storedAccount, bankName: storedBank } = JSON.parse(storedDetails);
      setAccountNumber(storedAccount);
      setBankName(storedBank);
    }

    const today = new Date().toDateString();
    const withdrawalLog = JSON.parse(localStorage.getItem('withdrawalLog') || '[]');

    const todayRequest = withdrawalLog.find(log => log.date === today);
    if (todayRequest) {
      setHasTodayRequest(true);
      setRequestDetails(todayRequest);
    }

    setShowForm(balance > 0 && !todayRequest);
  }, [balance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountNumber && bankName) {
      const today = new Date().toDateString();
      const request = {
        date: today,
        amount: balance,
        accountNumber,
        bankName,
        status: 'Pending (this Friday)'
      };

      // Save bank details
      localStorage.setItem('affiliateBankDetails', JSON.stringify({ accountNumber, bankName }));

      // Log withdrawal request
      const withdrawalLog = JSON.parse(localStorage.getItem('withdrawalLog') || '[]');
      withdrawalLog.push(request);
      localStorage.setItem('withdrawalLog', JSON.stringify(withdrawalLog));

      setHasTodayRequest(true);
      setRequestDetails(request);

      // Show bold message in dialog
      setRequestMessage(
        `You’ve requested Payout of ₦${balance.toLocaleString()}. You will receive it this Friday to ${accountNumber} (${bankName}).`
      );

      toast.success('Payout request noted!');
    } else {
      toast.error('Please enter account details.');
    }
  };

  return (
    <Dialog fullScreen={fullScreen} open={opener} onClose={handleClosed} aria-labelledby="responsive-dialog-title">
      <div className='py-5 px-3 min-h-screen relative'>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={handleClosed}>
          <div className='flex items-center space-x-1'>
            <IconButton>
              <CancelIcon />
            </IconButton>
            <h2 className='text-red-500 font-bold'>Close</h2>
          </div>
        </div>
        <div className='flex flex-col justify-center h-[80vh] items-center'>
          <div className='title'>
            <h2 className='text-2xl font-bold fourier text-left'>Get Payout</h2>
          </div>
          <div className='w-full max-w-md p-4'>
            {showForm ? (
              <>
                <Typography variant="h6" className="text-center text-green-700 mb-4">
                  Your current balance: ₦{balance.toLocaleString()}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Bank Name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <Button variant="contained" color="success" type="submit" fullWidth size="large" disabled={loading}>
                    {loading ? 'Processing...' : 'Request Payout'}
                  </Button>
                </form>
                {requestMessage && (
                  <Typography variant="body1" className="text-center text-green-700 font-bold mt-6">
                    {requestMessage}
                  </Typography>
                )}
              </>
            ) : requestDetails ? (
              <div className="text-center mt-6">
                <Typography variant="h6" className="text-green-700 font-bold">
                  You’ve requested Payout of ₦{requestDetails.amount.toLocaleString()}
                </Typography>
                <Typography variant="body1" className="text-gray-700 mt-3">
                  To account: {requestDetails.accountNumber} ({requestDetails.bankName})
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Scheduled for this Friday. Thank you!
                </Typography>
              </div>
            ) : (
              <DialogContentText className="text-center text-gray-700 text-lg mt-6">
                You don't have a balance yet. Share your affiliate links to start earning commissions! Once you have earnings, you can request payouts every Friday.
              </DialogContentText>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Dialog>
  );
}