import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransactionModal from './TrnsactionModal';
import { Button, Skeleton, Stack } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import moment from 'moment'
import TransactionDialog from './TraansactionDialog';
// import Pagination from './Pagination';
import StatusBadge from './atom/web/StatusBadge';
import Pagination from './molecule/web/Pagination';


export default function TransactionTable({
  opener,
  setOpener,
  handleClickOpen,
  handleCloser,
  loading,
  setLoading,
  transactions,
  handleKeyDown,
  setSearch,
  search,
  start,
  end,
  status,
  setStatus,
  setEnd,
  setStart,
  filterData,
  entity,
  setEntity,
  type,
  setType,
  load,
  meta,
  setMeta,
  setTransaction,
  Protected,
  BASE_URL
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toggle, setToggle] = React.useState(false)

  const formRef = React.useRef()
  const startRef = React.useRef()
  const endRef = React.useRef()
  const statusRef = React.useRef()
  const typeRef = React.useRef()
  const entityRef = React.useRef()

  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(meta?.length);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = transactions?.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = pageNumber => setCurrentPage(pageNumber);

  const onPageChange = async (pageNumber) => {
    setLoading(true)
    try {
      const response = await Protected.get(`${BASE_URL}/api/transaction?page=${pageNumber}`)
      console.log(response.data.data)
      setTransaction(response?.data?.data.data)
      setMeta(response?.data?.data.meta)
      // setTransaction(response?.data?.data.data)
      // setMeta(response?.data?.data?.meta)
      console.log('meta>>>>', response?.data?.data?.meta)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.response)
    }
    console.log(pageNumber)

  }

  const clearAll = () => {
    setEnd("")
    setStart("")
    setStatus("")
    setType("")
    setEntity("")

    formRef.current.reset()
    setTimeout(() => {
      // formRef.current.reset()
      filterData()
    }, 1000)

  }
  const [recentTransaction, setRecentTransaction] = React.useState()
  // const [search, setSearch] = React.useState('');

  // const handleChange = e => {
  //   e.preventDefault()
  //   console.log(e)
  //   setSearch(e.target.value);
  // };
  // console.log(transactions)

  // const filteredTransaction = transactions.filter(transaction =>
  //   (transaction.in_entity === 'Payment') ? transaction?.in_entity_id?.unique_answer?.toLowerCase().includes(search.toLowerCase()) : true
  // );

  const array = [1, 2, 3, 4, 5, 6, 7]

  return (
    <>
      <div className='flex justify-between mb-4'>
        <div className='w-[20%]'>
          <input placeholder='Search' style={{ backgroundColor: '#f8faf7' }} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} type="text" className='py-2 px-4 w-full outline-none c-text-input' />
        </div>

        <div className='flex items-center space-x-4'>
          <div className='mr-5'>

            <Pagination currentPage={meta.page} lastPage={meta.lastPage} onPageChange={(page) => onPageChange(page)} />

          </div>
          <Button variant="outlined" className='text-black c-withdraw-page-filter' startIcon={<TuneIcon />} onClick={() => setToggle(!toggle)}>
            Filter
          </Button>
        </div>

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
                {/* <Grid item xs={12} md={6}> */}
                <div className="">
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
                <div className="">
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


            <div className='flex justify-end items-end'>
              <button className='c-primary-button rounded-md' onClick={() => filterData()}>
                {loading ? 'Loading....' : 'Fliter'}
              </button>
            </div>
          </div>
        </div>
      )}


      <TableContainer className='relative'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='font-bold'>
              <TableCell className='font-bold' style={{ fontWeight: '600' }}>RECIPIENT</TableCell>
              <TableCell style={{ fontWeight: '600' }}>REFERENCE</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Date</TableCell>
              <TableCell style={{ fontWeight: '600' }}>TIME</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Amount</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Type</TableCell>
              <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          {transactions?.length && !loading ? (
            <TableBody>
              {transactions?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    console.log(row)
                    setRecentTransaction(row)
                    console.log(row)
                    handleOpen()
                  }}
                >
                  <TableCell component="th" scope="row" style={{ fontWeight: '700', maxWidth: '15rem' }} >
                    <h2 className='font-bold uppercase'>{row.in_entity === 'Wallet' ? 'Withdrawal' : row.in_entity}</h2>
                    <small className='text-gray-400'>{row.in_entity === 'Payment' ? `${row.payment_link_id.name} | ${row.in_entity_id.unique_answer}` : `${row.out_entity_id.name} | ${row.out_entity_id.account_number} | ${row.out_entity_id.bank_name}`}</small>
                  </TableCell>
                  <TableCell className='text-gray-400'>{row.reference}</TableCell>
                  <TableCell>{moment(row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                  <TableCell>{moment(row.createdAt).format('hh:mm:ss A')}</TableCell>
                  <TableCell>
                    <p className='font-bold'>₦ {Intl.NumberFormat('en-US').format(row.amount || 0)}</p>
                  </TableCell>
                  <TableCell>
                    <div className="text-left">
                      <p className={(row.type === 'credit') ? 'py-2 px-2 rounded-lg text-sm text-[#00bf00] font-bold' : 'py-2 px-2 rounded-lg text-sm text-[#f10506] font-bold'}>{row.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-left uppercase">
                      <StatusBadge status={row?.status} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : ''}
          {
            (loading || load) ? (

              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7].map((arr, index) => (
                  <TableRow>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                    <TableCell><Skeleton animation="wave" variant="rectangular" width={"100%"} height={20} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : ''
          }
          {transactions?.length === 0 && !load && (
            <>
              {/* <div className='relative'> */}
              <div className='absolute top-[40%] left-[40%] z-20' >
                <img src="/images/cuate.svg" alt="alt-img" className='w-40' />
                <h2 className='text-gray-600 text-xl text-center font-bold'>No Transactions Yet!</h2>
              </div>

              {array.map((arr) => (
                <TableBody className='relative'>

                  <TableRow>

                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-200 h-4 w-[40%]'>
                          </div> */}

                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-100 h-4 w-[40%]'>
                          </div> */}

                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>


                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>



                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-100 h-4 w-[40%]'>
                          </div> */}

                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-4 w-[60%]'>
                      </div>

                      {/* <div className='bg-gray-100 h-4 w-[40%]'>
                          </div> */}

                    </div></TableCell>
                    <TableCell> <div className='space-y-2 w-full'>
                      <div className='bg-gray-100 h-8 rounded-full w-[60%]'>
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
      <TransactionModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} recentTransaction={recentTransaction} />
      <TransactionDialog setOpener={setOpener} opener={opener} handleClickOpen={handleClickOpen} handleCloser={handleCloser} start={start} end={end} setStart={setStart} status={status} setEnd={setEnd} setStatus={setStatus} filterData={filterData} entity={entity} loading={loading} setEntity={setEntity} type={type} setType={setType} />
    </>

  );
}