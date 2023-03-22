import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransactionModal from './TrnsactionModal';
import { Button } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import moment from 'moment'
import SinglePaymentModal from './SinglePaymentModal';
import FilterDialog from './FilterDialog';


export default function PayersSheetTable({
  data,
  payersSheet,
  onChange,
  handleKeyDown,
  start,
  end,
  status,
  setStatus,
  setEnd,
  setStart,
  filterData,
  opener,
  setOpener,
  handleClickOpen,
  handleCloser,
  loading
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toggle, setToggle] = React.useState(false)
  const formRef = React.useRef()
  const startRef = React.useRef()
  const endRef = React.useRef()
  const statusRef = React.useRef()
  const clearAll = () => {
    setEnd("")
    setStart("")
    setStatus("")

    formRef.current.reset()
    setTimeout(() => {
      filterData()
    }, 1000)

  }
  const array = [1, 2, 3, 4, 5, 6, 7]

  const [recentPayment, setRecentPayment] = React.useState()

  console.log(payersSheet)

  return (
    <>
      <div className='md:flex justify-between mb-4 hidden'>
        <div className='w-[20%]'>
          <input placeholder='Search' onChange={onChange} onKeyDown={handleKeyDown} style={{ backgroundColor: '#f8faf7' }} name='q' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
        </div>
        <Button variant="outlined" className='text-black c-withdraw-page-filter' startIcon={<TuneIcon />} onClick={() => setToggle(!toggle)}>
          Filter
        </Button>
      </div>
      {toggle && (
        <div className='w-full mt-2 py-4 rounded-md border-2 border-gray-300'>
          <div className='w-[95%] mx-auto py-6'>
            <div className='flex justify-between items-center'>

              <div className='flex items-center space-x-6'>
                <h2 className='font-bold text-xl'>Filtering By</h2>
                <div className='flex items-center space-x-3'>
                  {start !== '' && (
                    <small onClick={(e) => {
                      startRef.current.value = ''
                      setStart('')
                    }} className={`create-payment-divider-options cursor-pointer`}>StartDate <span className='text-white create-payment-dynamic-form-options-close cursor-pointer' > x</span></small>
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
                </div>

              </div>
              <h2 className='text-red-600 underline cursor-pointer' onClick={() => clearAll()}>Clear Filters</h2>
            </div>

            <div className='py-3'>
              <h2>You are filtering the item currently in the table below</h2>

            </div>
            <form ref={formRef}>
              <div className='flex py-2 space-x-6 items-center'>
                <div>
                  <label>Start Date</label>
                  <input ref={startRef} placeholder='Expiry Date' onChange={(e) => setStart(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                </div>
                <div>
                  <label>End Date</label>
                  <input ref={endRef} placeholder='Expiry Date' onChange={(e) => setEnd(e.target.value)} name='expires_at' type="date" className="py-2 px-4 w-full outline-none c-text-input" />
                </div>
                <div className="">
                  <div className='font-bold'>Status</div>
                  <select ref={statusRef} className="py-2 px-4 w-full outline-none c-text-input" onChange={(e) => setStatus(e.target.value)}>
                    <option value={""}>Select One</option>
                    <option value={"pending"}>pending</option>
                    <option value={"paid"}>paid</option>
                    <option value={"declined"}>declined</option>
                    <option value={"abandoned"}>abandoned</option>
                  </select>
                </div>
              </div>
            </form>


            <div className='flex justify-end items-end'>
              <button className='c-primary-button rounded-md' onClick={() => filterData()}>
                {loading ? 'Loading....' : 'Fliter'}
              </button>
            </div>
          </div>
        </div>
      )}
      <TableContainer className='relative hidden md:block'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='font-bold'>
              <TableCell className='font-bold' style={{ fontWeight: '600' }}>{data.paymentLink.unique_field}</TableCell>
              {
                data.paymentLink.priority_1 ?
                  (<TableCell className='font-bold' style={{ fontWeight: '600' }}>{data.paymentLink.priority_1}</TableCell>) : ''
              }
              <TableCell style={{ fontWeight: '600' }}>Personal Link</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Date Uploaded</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          {payersSheet.data && (payersSheet.data.length !== 0) ? (
            <TableBody>
              {payersSheet.data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    console.log(row)
                    setRecentPayment(row)
                    handleOpen()
                  }}
                >
                  <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                    <h2 className='font-bold'>{row.unique_answer}</h2>
                  </TableCell>
                  <TableCell className='text-gray-400'>{row.priority_1_answer}</TableCell>
                  <TableCell className='text-gray-400' style={{ fontSize: '72%' }}>{data.paymentLink.link + '/' + row.unique_answer}</TableCell>
                  <TableCell>{moment(row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                  <TableCell>
                    <div className="text-left">
                      <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-base uppercase status-paid2' : 'py-2 px-2 rounded-lg text-base uppercase status-fail2'}>{row.status === 'paid' ? 'paid' : 'not paid'}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <>
              {/* <div className='relative'> */}
              <div className='absolute top-[40%] left-[40%] z-20' >
                <img src="/images/cuate.svg" alt="payers sheet" className='w-40' />
                <h2 className='text-gray-500 text-lg mt-3 text-center font-bold'>No Data Yet!</h2>
              </div>

              {array.map((arr) => (
                <TableBody className='relative'>

                  <TableRow>

                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-200 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-200 h-4 w-[40%]'>
                      </div> */}

                    </div></TableCell>
                    {
                      data.paymentLink.priority_1 ?
                        (
                          <TableCell> <div className='space-y-2 w-full'>
                            <div className='bg-gray-200 h-4 w-[60%]'>
                            </div>

                            {/* <div className='bg-gray-200 h-4 w-[40%]'>
                                </div> */}

                          </div></TableCell>
                        ) : ''
                    }
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-200 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-200 h-4 w-[40%]'>
                      </div> */}

                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-200 h-4 w-[60%]'>
                      </div>


                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-200 h-4 w-[60%]'>
                      </div>



                    </div></TableCell>
                  </TableRow>

                </TableBody>
              ))}
              {/* </div> */}

            </>
          )}
        </Table>
      </TableContainer>
      {/* mobile view */}
      <div className='px-2 mb-4'>
        <div>
          {payersSheet.data ? payersSheet.data.map((each, index) => (
            <div className='py-3 flex justify-between items-center' key={index}>
              <div className='flex flex-col items-start'>
                <h2 className='font-bold text-base text-[#2d2d2d] c-text-elipses'>{each?.unique_answer}</h2>
                <small className='text-xs font-medium pt-1 flex-1 text-gray-500'>{moment(each.createdAt
                ).format('MMM DD, YYYY')} | {moment(each.createdAt).format('h:mma')}</small>
              </div>
              <div className='flex flex-col items-end'>
                <p className={each.status === 'paid' ? 'py-2 px-2 rounded-lg text-sm status-paid2 self-end' : 'py-2 px-2 rounded-lg text-sm status-fail2 self-end'}>{each.status}</p>
              </div>
            </div>
          )) : <div></div>}
        </div>
      </div>
      {/* <TransactionModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentTransaction={recentTransaction}/> */}
      <SinglePaymentModal from={'payer sheet'} open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentPayment={recentPayment} />
      <FilterDialog loading={loading} setOpener={setOpener} opener={opener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} start={start} end={end} setStart={setStart} status={status} setEnd={setEnd} setStatus={setStatus} filterData={filterData} />
    </>
  );
}