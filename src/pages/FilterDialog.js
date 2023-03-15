import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
export default function FilterDialog({ open21, setOpen21, handleClickOpen21, handleClose21, transactions, setSearch, search, start, end, status, setStatus, setEnd, setStart, filterData, entity, setEntity, type, setType, load, loading, formRef, startRef, endRef, statusRef, typeRef, entityRef, filterLink, clearData }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const formRef = React.useRef()
  // const startRef = React.useRef()
  // const endRef = React.useRef()
  // const statusRef = React.useRef()
  // const typeRef = React.useRef()
  // const entityRef = React.useRef()

  const clearAll = () => {
    formRef.current.reset()
    setEnd("")
    setStart("")
    setStatus("")
    setType("")
    setEntity("")

    // const data = filterLink(status='', start='', end='', type='', entity='')
    // console.log(data)

    formRef.current.reset()
    setTimeout(() => {
      filterData()
    }, 1500)

  }



  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open21}
        onClose={handleClose21}
        aria-labelledby="responsive-dialog-title"
      >
        <div className='py-10 px-3'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={() => handleClose21()} >
            <div className='flex items-center space-x-1' >
              <IconButton>
                <CancelIcon className='text-red-500 ' />
              </IconButton>
              <h2 className='font-bold'>Close</h2>
            </div>
          </div>
          <div className='py-4 px-2'>
            <h2 className='py-2 text-xl font-bold'>Filter Transactions</h2>
            <p>You are filtering the item currently in the table below</p>
            <p className='underline py-4 text-red-500' onClick={() => clearData()}>clear filters</p>
          </div>

          <div className='flex flex-col'>
            {start !== '' || end !== '' || entity !== '' || type !== '' || entity !== '' ? (
              <div className='flex justify-between items-center px-2'>
                <h2 className='font-bold'>Filtering By</h2>
                {/* <h2 className='text-red-600 underline cursor-pointer' onClick={() => clearAll()}>Clear Filters</h2> */}
              </div>

            ) : ''}


            <div className='flex items-center flex-wrap space-x-1 gap-4 py-3'>
              {start !== '' && (
                <small onClick={(e) => {
                  startRef.current.value = ''
                  setStart('')
                }}
                  className={`create-payment-divider-options cursor-pointer`}>StartDate <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' > x</span></small>
              )}
              {end !== '' && (
                <small onClick={(e) => {
                  endRef.current.value = ''
                  setEnd('')
                }} className={`create-payment-divider-options cursor-pointer`}>EndDate <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' > x</span></small>
              )}
              {status !== '' && (
                <small onClick={(e) => {
                  statusRef.current.value = ''
                  setStatus('')
                }} className={`create-payment-divider-options cursor-pointer`}>Status <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
              )}
              {type !== '' && (
                <small onClick={(e) => {
                  typeRef.current.value = ''
                  setType('')
                }} className={`create-payment-divider-options cursor-pointer`}>Type <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
              )}
              {entity !== '' && (
                <small onClick={(e) => {
                  entityRef.current.value = ''
                  setEntity('')
                }} className={`create-payment-divider-options cursor-pointer`}>Entity <span className='text-white create-payment-dynamic-form-options-close cursor-pointer'  > x</span></small>
              )}
            </div>


          </div>
          <div className='py-3'>
            <form ref={formRef}>
              <div className='flex py-2 flex-col space-y-4 w-[95%] mx-auto items-center'>
                <div className='w-full'>
                  <label>Start Date</label>
                  <input ref={startRef} placeholder='Expiry Date' onChange={(e) => setStart(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                </div>
                <div className='w-full'>
                  <label>End Date</label>
                  <input ref={endRef} placeholder='Expiry Date' onChange={(e) => setEnd(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                </div>
                <div className='w-full'>
                  <div className='font-bold'>Status</div>
                  <select ref={statusRef} className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => setStatus(e.target.value)}>
                    <option value={""}>Select One</option>
                    <option value={"pending"}>pending</option>
                    <option value={"paid"}>paid</option>
                    <option value={"declined"}>declined</option>
                    <option value={"abandoned"}>abandoned</option>
                  </select>
                </div>
                {/* <Grid item xs={12} md={6}> */}
                <div className="w-full">
                  <div className='font-bold'>Entity</div>
                  <select ref={entityRef} className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => setEntity(e.target.value)}>
                    <option value={""}>Select One</option>
                    <option value={"Payment"}>Payment</option>
                    <option value={"Withdrawal"}>Withdrawal</option>
                    <option value={"Wallet"}>Wallet</option>
                    {/* <option value={"abandoned"}>abandoned</option> */}
                  </select>
                </div>
                {/* </Grid> */}
                {/* <Grid item xs={12} md={12}> */}
                <div className="w-full">
                  <div className='font-bold'>Type</div>
                  <select ref={typeRef} className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => setType(e.target.value)}>
                    <option value={""}>Select One</option>
                    <option value={"credit"}>credit</option>
                    <option value={"debit"}>debit</option>
                    {/* <option value={"Wallet"}>Wallet</option> */}
                    {/* <option value={"abandoned"}>abandoned</option> */}
                  </select>
                </div>
                {/* </Grid> */}
                {/* </Grid> */}


              </div>
            </form>
            <div className='w-full py-4'>
              <button className='c-primary-button rounded-md w-full' onClick={() => filterData()}>
                {loading ? 'Loading....' : 'Fliter'}
              </button>
            </div>
          </div>
        </div>

      </Dialog>
    </div>
  );
}