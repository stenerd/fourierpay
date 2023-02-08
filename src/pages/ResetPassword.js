import { Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/axios';

const ResetPassword = () => {
    let { token } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        if(state.password!==state.confirm_password){
            toast.error('Password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            return
            
        }
       
        const {confirm_password,...others} = state

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, others)
            console.log(res?.data?.data)
            setLoading(false)
            toast.success('Credentials Changed Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            setLoading(false)
        }

    }
    return (
        <>
            <div className='bg-gray-100 h-screen'>
                <div className=''>
                    {/* <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#1d3329]'>Pay</span></h2>
                        </Link>
                    </div> */}
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <div className='min-h-[100vh] flex flex-col justify-center p-3'>
                                <div className='w-[80%] mx-auto mb-0'>
                                    <h2 className='text-xl mb-12 font-bold home c-auth-title'>Reset Password</h2>
                                    <p className='font-bold text-gray-700'>Set Your New Password <span className='c-login-emoji'>👌</span></p>
                                    <small className='font-bold text-gray-500 inline-block w-[70%]'>Old password would be discarded. This is your new login credentials.</small>
                                </div>
                                {/* <h2 className='text-xl font-bold main'>Welcome Back</h2> */}
                                <div className='w-[80%] mx-auto py-8'>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>New Password</label>
                                                <input placeholder='Password' onChange={handleChange} name='password' required type="password" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Confirm New Password</label>
                                                <input placeholder='Confirm Password' onChange={handleChange} name='confirm_password' required type="password" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                        </Grid>
                                        <div className='mt-12 mb-6'>
                                            <button disabled={loading ? true:false}  className='c-primary-button'>
                                                {loading ? 'loading....' : 'Retrieve Account'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className=''>
                                        <p className="text-gray-700 font-bold">I know my credentials. 
                                        <Link to="/login">
                                            <span className='cursor-pointer c-primary-link-color'> Login</span>
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <img src="/images/registration.jpg" className='w-full h-screen object-cover hidden md:block'/>
                        </Grid>
                    </Grid>

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

export default ResetPassword