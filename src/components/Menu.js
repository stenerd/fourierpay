import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from 'react';
import GenericAlertDialog from './GenericAlertDialog';
import ResetPassword from './ResetPassword';
export default function MenuDropDown({ open20, handleClose20, handleClick, anchorEl, setAnchorEl, name }) {
    const navigate = useNavigate()


    const [open8, setOpen8] = useState(false)

    const handleOpen8 = () => {
        setOpen8(true)
    }

    const handleClose8 = () => {
        setOpen8(false)
    }

    // const Logout = async () => {
    //     window.localStorage.removeItem('bearer_token')
    //     navigate('/')
    // }

    const [open21, setOpen21] = useState(false);
    const handleClickOpen21 = () => {
        setOpen21(true);
    };

    const handleClose21 = () => {
        setOpen21(false);
    };



    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Account settings">
                    {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > */}
                    {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                    <div className='py-2 px-3 rounded-full bg-[#1D3329]'
                        // onClick={handleClick} aria-controls={open20 ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open20 ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Person3Icon className="text-white" />
                    </div>
                    {/* </IconButton> */}
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open20}
                onClose={handleClose20}
                // onClick={handleClose20}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                // onClick={() => {
                //     navigate('/dashboard/profile')
                // }}
                >
                    <Avatar /> {name}
                </MenuItem>

                <Divider />
                <MenuItem
                   onClick={handleOpen8}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Change password
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        window.localStorage.removeItem('bearer_token')
                        navigate('/')
                        // handleClickOpen21()
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            {/* <GenericAlertDialog open21={open21} handleClickOpen21={handleClickOpen21} setOpen21={setOpen21} handleClose21={handleClose21}>
                <div>
                    <h4 className="text-xl font-bold text-center text-[#1d3329]">Are You Sure you wan to Logout?</h4>
                    <p className="text-gray-700 py-4 text-center">Are You Sure you wan to Logout?

                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => setOpen21(false)}>No</button>
                        <button className="c-secondary-button-2" onClick={() => {
                            window.localStorage.removeItem('bearer_token')
                            navigate('/')
                        }}>Yes</button>
                    </div>
                </div>
            </GenericAlertDialog> */}
            <ResetPassword open8={open8} setOpen8={setOpen8} handleOpen8={handleOpen8} handleClose8={handleClose8} />
        </React.Fragment>
    );
}