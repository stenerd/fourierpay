import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Modal from '@mui/material/Modal';
import { DashBoardContext } from '../context/Dashboard';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected, { BASE_URL } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TransactionDialog from '../components/TraansactionDialog';
// import BeneficiaryDialog from '../components/BeneficiartDialog';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

export default function BeneficiaryDialog({ open8, setOpen8, handleClickOpen8, handleClose8, FetchBeneficiary, bankList }) {
  // console.log(bankList)
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [bank, setBank] = React.useState('');
  const [bank_name, setBankName] = React.useState('')
  const [bank_code, setBankCode] = React.useState('')
  const [account_no, setAccountNo] = React.useState('')
  const [account_name, setAcoountName] = React.useState('')
  // const { bankList } = React.useContext(DashBoardContext)
  // const [beneficiaries,setBeneficiary] = useState()

  const token = window.localStorage.getItem('bearer_token')

  // console.log(token)


  // console.log(bankList)
  const { state, dispatch } = React.useContext(DashBoardContext)

  const [loading, setLoading] = React.useState(false)

  const createBenefiary = async (e) => {

    e.preventDefault()
    setLoading(true)
    try {
      const response = await Protected.post(`${BASE_URL}/api/beneficiary/create`, { account_number: account_no, bank_name, bank_code })
      console.log(response.data)
      console.log({ account_name, account_no, bank_code })
      setLoading(false)
      toast.success('Beneficiary Created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      FetchBeneficiary()
      setAcoountName('')
      setAccountNo('')
      setBankName('')
      setTimeout(() => {
        handleClose8()
      }, 1000)


    } catch (error) {
      console.log(error.response)
      toast.error('An Error occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAcoountName('')
      setAccountNo('')
      setBankName('')
    }
  }

  const VerifyBank = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/api/paystack/resolve-account-number?account_number=${account_no}&bank_code=${bank_code}`)
      console.log(response.data.data.account_name)
      setAcoountName(response.data.data.account_name)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
    }


  }
  const navigate = useNavigate()

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open8}
        onClose={handleClose8}
        aria-labelledby="responsive-dialog-title"
      >
        <div className='py-5 mt-2 relative'>
          <div className='py-2 w-full flex justify-center  items-center mx-auto min-h-[55vh]'>
            <form onSubmit={account_name ? createBenefiary : VerifyBank} className='w-[90%] mx-auto'>
              <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClose8()}>
                <div className='flex items-center space-x-1'>
                  <IconButton>
                    <CancelIcon className='text-red-500 ' />
                  </IconButton>
                  <h2 className='font-bold'>Close</h2>
                </div>
              </div>
              <h2 className='text-center text-xl'>Create beneficiary</h2>
              <div className='py-4 px-2 w-full'>
                <div className='w-full'>
                  <label className='text-sm font-bold block my-2 text-gray-700'>Account No</label>
                  <input placeholder='Account No' onChange={(e) => setAccountNo(e.target.value)} required name='Account No' type="number" className='py-2 px-4 w-full outline-none c-text-input' />
                </div>
                {bankList && (
                  <div className='py-4'>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bank}
                        label="Bank"
                        onChange={(e) => setBank(e.target.value)}
                      >
                        {bankList?.map((bank) => (
                          <MenuItem onClick={() => {
                            setBankCode(bank.code)
                            setBankName(bank.name)
                            console.log(bank)
                          }} key={bank.name} value={bank.name}>{bank.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
                {account_name.length === 0 ? (
                  <>
                  </>
                ) : (
                  <div>
                    <label className='text-sm font-bold block my-2 text-gray-700'>Account Name</label>
                    <input placeholder='Account Name' value={account_name} onChange={(e) => setAcoountName(e.target.value)} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                  </div>
                )}
                <div className='py-4'>
                  {account_name.length === 0 ? (
                    <button className='c-primary-button w-full'>
                      {loading ? 'Loading....' : 'Verify'}
                    </button>
                  ) : <button className='c-primary-button w-full'>
                    {loading ? 'Loading....' : 'Create'}
                  </button>}

                </div>

              </div>
            </form>
          </div>
        </div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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