import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Protected from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function BenificiaryModal({ data, open3, handleOpen3, setOpen3, handleClose3 }) {
    const [loading, setLoading] = React.useState(false)
    console.log(data)

    const DeleteBenefiary = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Protected.delete(`http://localhost:4000/api/beneficiary/remove/${data.user_id}`)
            console.log(response.data)
            setLoading(false)
            toast.success('Beneficiary Deleted!', {
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
                handleClose3()
            }, 1200)

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
            console.log(error.response)
        }
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='text-xl text-center'>Beneficiary</h2>
                    <form onSubmit={DeleteBenefiary}>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Account Name</label>
                            <input value={data.account_name} readOnly required name='Account Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Bank Name</label>
                            <input value={data.bank_name} readOnly required name='Bank Name' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div>
                            <label className='text-sm font-bold block my-2 text-gray-700'>Account Number</label>
                            <input value={data.account_number} readOnly name='Account Number' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                        </div>
                        <div className='py-4'>
                            <button className='c-secondary-button'>
                                {loading ? 'Loading....' : 'Delete'}
                            </button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}