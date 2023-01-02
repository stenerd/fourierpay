import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
         e.preventDefault()
         navigate('/dashboard')
    }
    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                <div className='py-6'>
                    <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#234243]'>Pay</span></h2>
                        </Link>
                    </div>
                    <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                        <h2 className='text-xl font-bold selectt'>Welcome Back</h2>
                        <div className='w-[30%] mx-auto py-8'>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <label className='p-4'>Email</label>
                                        <input placeholder='Email' type="email" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label className='p-4'>Password</label>
                                        <input placeholder='Password' type="password" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                </Grid>
                                <div className='py-4'>
                                    <button  className='bg-[#234243] w-full rounded-md py-3 text-white'>Log In</button>
                                </div>
                            </form>
                            <div className='py-2 flex justify-between items-center'>
                                <p className="text-center underline cursor-pointer text-gray-500 text-sm">Do You Have an Account ?</p>
                                <p className='text-center text-sm text-gray-500 cursor-pointer underline'>Forgot Pasword</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login