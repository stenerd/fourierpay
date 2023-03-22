import * as React from 'react';
import { Grid, Divider, TableBody, TableRow, TableCell, Skeleton, TableContainer, Table, TableHead } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Protected, { BASE_URL } from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const PublicPayment = () => {
    let { code } = useParams();
    const dispatch = useDispatch()
    const [result, setResult] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    // const FetchPaymentLink = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}/api/payment-link/${code}`)
    //         console.log('ppp >> ', response.data.data)
    //         setPaymentLink(response.data.data)

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    const FetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/payment/external-link/${code}`)
            console.log('result >> ', response.data.data)
            setResult(response.data.data)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    React.useEffect(() => {
        // FetchPaymentLink()
        FetchData()
    }, [])
    const array = [1, 2, 3, 4, 5, 6, 7]

    return (
        <>
            <div className='min-h-screen'>
                <div className=''>
                    <div className='pt-12 pb-4 flex justify-center c-pp-body'>
                        <div className='font-bold text-lg'>
                            {
                                result.data ?
                                    (
                                        (
                                            result.data &&
                                            result.data.paymentLink &&
                                            result.data.paymentLink.creator_id &&
                                            result.data.paymentLink.creator_id.firstname
                                        ) + ' ' +
                                        (
                                            result.data &&
                                            result.data.paymentLink &&
                                            result.data.paymentLink.creator_id &&
                                            result.data.paymentLink.creator_id.lastname
                                        ) +
                                        ' - ' + (result.data && result.data.paymentLink && result.data.paymentLink.name)) :
                                    'Loading...'
                            }
                        </div>
                    </div>
                    <div className='w-[75%] pt-8 mx-auto relative'>
                        <div className='absolute flex c-pp-header-info'>
                            <div className='w-[50%] py-6 px-5 left'>
                                <p className='font-bold pb-2'>Description</p>
                                <p className='text-sm text-gray-600 overflow-y-scroll'>
                                    {(result.data && result.data.paymentLink) ? result.data.paymentLink.description : 'No description.'}
                                </p>
                            </div>
                            <div className='w-[50%] right flex'>
                                <div className='w-[35%] pl-2 flex justify-center items-center'>
                                    <img className='w-[10rem]' src='/images/refer.svg' alt="alt-img" />
                                </div>
                                <div className='w-[65%] p-6'>
                                    <p className='font-bold text-[#15C01A] pb-2'>Refer Friends</p>
                                    <div className='text-sm text-white'>
                                        Join us in making a meaningful difference! Together, we can
                                        support a cause that matters by contributing to this group link.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between w-full p-10 pb-28 c-pp-header space-x-8'>
                            <div className='bg-white w-full p-6 rounded-xl relative'>
                                <span className='absolute c-pp-header-card color1'></span>
                                <img src='/images/ep.svg' alt="alt-img" />
                                <p className='text-[.88rem] pt-3 pb-1 font-medium text-gray-700'>Expected Payment</p>
                                <p><span className='text-sm text-gray-500'>₦</span><span className='font-bold text-lg'>{
                                    Intl.NumberFormat('en-US').format(
                                        ((result.data && result.data.paymentLink) ? result.data.paymentLink.amount : 0) *
                                        ((result.data && result.data.paymentLink) ? result.data.paymentLink.expected_number_of_payments : 0)
                                    )
                                }</span></p>
                            </div>
                            <div className='bg-white w-full p-6 rounded-xl relative'>
                                <span className='absolute c-pp-header-card color2'></span>
                                <img src='/images/app.svg' alt="alt-img" />
                                <p className='text-[.88rem] pt-3 pb-1 font-medium text-gray-700'>Amount Per Payment</p>
                                <p><span className='text-sm text-gray-500'>₦</span><span className='font-bold text-lg'>
                                    {
                                        Intl.NumberFormat('en-US').format(
                                            ((result.data && result.data.paymentLink) ? result.data.paymentLink.amount : 0)
                                        )
                                    }
                                </span></p>
                            </div>
                            <div className='bg-white w-full p-6 rounded-xl relative'>
                                <span className='absolute c-pp-header-card color3'></span>
                                <img src='/images/rp.svg' alt="alt-img" />
                                <p className='text-[.88rem] pt-3 pb-1 font-medium text-gray-700'>Recieved Payment</p>
                                <p><span className='text-sm text-gray-500'>₦</span><span className='font-bold text-lg'>
                                    {
                                        Intl.NumberFormat('en-US').format(
                                            ((result.data && result.data.recievedAmount) ? result.data.recievedAmount : 0)
                                        )
                                    }
                                </span></p>
                            </div>
                            <div className='bg-white w-full p-6 rounded-xl relative'>
                                <span className='absolute c-pp-header-card color4'></span>
                                <img src='/images/contributors.svg' alt="alt-img" />
                                <p className='text-[.88rem] pt-3 pb-1 font-medium text-gray-700'>Number of Contributors</p>
                                <p><span className='font-bold text-lg'>{
                                    (result.data && result.data.paymentLink) ? result.data.paymentLink.expected_number_of_payments : 0
                                }</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[75%] pt-32 mb-12 mx-auto relative'>
                        <div>
                            <TableContainer style={{ borderRadius: '.75rem' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='font-bold'>
                                            <TableCell style={{ fontWeight: '600' }}>S/N</TableCell>
                                            <TableCell className='font-bold' style={{ fontWeight: '600' }}>
                                                {
                                                    (result.data && result.data.paymentLink) ? result.data.paymentLink.unique_field : 'Identifier'
                                                }
                                            </TableCell>
                                            <TableCell style={{ fontWeight: '600' }}>DATE PAID | DATE UPLOADED</TableCell>
                                            <TableCell style={{ fontWeight: '600' }}>TIME</TableCell>
                                            <TableCell style={{ fontWeight: '600' }}>AMOUNT</TableCell>
                                            <TableCell style={{ fontWeight: '600' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {!loading && (result.data && result.data.payments) ? (
                                        <TableBody>
                                            {result.data.payments.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell component="th" scope="row" style={{ fontWeight: '700' }} >
                                                        <h2 className='font-bold uppercase'>{row.unique_answer}</h2>
                                                    </TableCell>
                                                    <TableCell>{moment(row.payment_id ? row.payment_id.createdAt : row.createdAt).format('dddd, DD MMMM YYYY')}</TableCell>
                                                    <TableCell>{moment(row.payment_id ? row.payment_id.createdAt : row.createdAt).format('hh:mm:ss A')}</TableCell>
                                                    <TableCell>
                                                        <p className='font-bold'>₦
                                                            {Intl.NumberFormat('en-US').format(
                                                                ((result.data && result.data.paymentLink) ? result.data.paymentLink.amount : 0)
                                                            )}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-left">
                                                            <p className={row.status === 'paid' ? 'py-2 px-2 rounded-lg text-base uppercase status-paid2' : 'py-2 px-2 rounded-lg text-base uppercase text-sm status-fail2'}>{row.status}</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    ) : ''}
                                    {
                                        loading ? (

                                            <TableBody>
                                                {[1, 2, 3, 4, 5, 6, 7].map((arr, index) => (
                                                    <TableRow key={index}>

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
                                    {!loading && (result.data && result.data.payments && !result.data.payments.length) && (
                                        <>
                                            {/* <div className='relative'> */}
                                            <div className='absolute top-[40%] left-[40%] z-20' >
                                                <img src="/images/cuate.svg" alt="alt-img" className='w-40' />
                                                <h2 className='text-gray-600 text-xl text-center font-bold'>No Transactions Yet!</h2>
                                            </div>

                                            {array.map((arr, index) => (
                                                <TableBody className='relative' key={index}>

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



                                                        </div></TableCell>
                                                        <TableCell> <div className='space-y-2 w-full'>
                                                            <div className='bg-gray-100 h-4 w-[60%]'>
                                                            </div>

                                                            {/* <div className='bg-gray-100 h-4 w-[40%]'>
                                                </div> */}

                                                        </div></TableCell>
                                                    </TableRow>

                                                </TableBody>
                                            ))}
                                            {/* </div> */}

                                        </>
                                    )}


                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>


            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </>
    )
}

export default PublicPayment;