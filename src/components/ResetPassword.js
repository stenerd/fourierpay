import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Protected, { BASE_URL } from '../utils/axios';
import BottomNav from './bottomNav';
import { Dialog, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const ResetPassword = ({ open8, setOpen8, close8, handleClose8, handleOpen8 }) => {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [old, setOld] = useState(false)

    const toggleOld = () => setOld(!old)

    const [news, setNews] = useState(false)

    const toggleNew = () => setNews(!news)

    const [conf, setConf] = useState(false)

    const toggleConf = () => setConf(!conf)

    const [currentPassword, setCurrentPassword] = React.useState("")

    const [newPassword, setNewPassword] = React.useState("")

    const [confirm, setConfirm] = React.useState("")

    const [load, setLoad] = React.useState(false)

    const resetpassword = async (e) => {
        e.preventDefault()
        setLoad(true)
        if (newPassword !== confirm) {
            toast.error('Confirm Password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoad(false)
            return;
        }
        try {
            const response = await Protected.post(`${BASE_URL}/api/user/reset_password`, { currentPassword, newPassword })
            console.log(response.data)
            toast.success('Password Successfully changed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoad(false)
            setTimeout(() => {
                handleClose8()
            }, 1200)
            // window.location.reload()
        } catch (error) {
            setLoad(false)
            toast.error(error.response.data.message)
            console.log(error.response)
        }
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open8}
                onClose={handleClose8}
                aria-labelledby="responsive-dialog-title"
            >

                <span className='absolute right-2 top-3'>
                    <IconButton>
                        <CloseIcon onClick={() => handleClose8(!open8)} className="cursor-pointer" />
                    </IconButton>

                </span>
                <div className='py-20 w-4/5 mx-auto'>
                    <h2 className='text-xl text-center'>Password reset</h2>
                    <form onSubmit={resetpassword}>
                        <div className='relative'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Current Password</label>
                            <input required name='Current Password' onChange={(e) => setCurrentPassword(e.target.value)} type={old ? "text" : "password"} className='py-2 px-4 w-full outline-none c-text-input' />
                            <IconButton className="absolute left-[88%] bottom-10" onClick={toggleOld}>
                                {old ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                            </IconButton>
                        </div>
                        <div className='relative'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>New Password</label>
                            <input required name='New Password' onChange={(e) => setNewPassword(e.target.value)} type={news ? "text" : "password"} className='py-2 px-4 w-full outline-none c-text-input' />
                            <IconButton className="absolute left-[88%] bottom-10" onClick={toggleNew}>
                                {news ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                            </IconButton>
                        </div>
                        <div className='relative'>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Confirm New Password</label>
                            <input name='New Password' type={conf ? "text" : "password"} onChange={(e) => setConfirm(e.target.value)} className='py-2 px-4 w-full outline-none c-text-input' />
                            <IconButton className="absolute left-[88%] bottom-10" onClick={toggleConf}>
                                {conf ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                            </IconButton>
                        </div>
                        <div className='py-4'>
                            <button className='c-primary-button w-full'>
                                {load ? 'Loading....' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
                <BottomNav />
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
            </Dialog>
        </>
    )
}

export default ResetPassword