import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from "react";


const BottomNav = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const trimLocation = location.pathname ? location.pathname.split('?')[0] : ''
    console.log(location.pathname);

    const [value, setValue] = useState(trimLocation ? trimLocation.split('/').pop() : '');
    const handleChange = (event, newValue) => {
        event.stopPropagation();
        event.preventDefault()
    };
    const handleClick = (route, newValue) => {
        setValue(newValue);
        navigate(route)
    };
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: '0 0 2rem #ccc', zIndex: '1000' }}>
            <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label=""
                    value="dashboard"
                    icon={(value === 'dashboard') ? <DashboardIcon /> : <DashboardOutlinedIcon />}
                    onClick={() => handleClick('/dashboard', 'dashboard')}
                />
                <BottomNavigationAction
                    label=""
                    value="transaction"
                    onClick={() => handleClick('/dashboard/transaction', 'transaction')}
                    icon={(value === 'transaction') ? <AccountBalanceIcon /> : <AccountBalanceOutlinedIcon />}
                />
                    <BottomNavigationAction
                    label=""
                    value="payment"
                    icon={(value === 'payment') ? <AddBoxIcon /> : <AddBoxOutlinedIcon />}
                    onClick={() => handleClick('/dashboard/payment', 'payment')}
                />
                <BottomNavigationAction
                    label=""
                    value="paymentlinks"
                    icon={(value === 'paymentlinks') ? <DatasetLinkedIcon /> : <DatasetLinkedOutlinedIcon />}
                    onClick={() => handleClick('/dashboard/paymentlinks', 'paymentlinks')}
                />
                <BottomNavigationAction
                    label=""
                    value="profile"
                    icon={(value === 'profile') ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />}
                    onClick={() => handleClick('/dashboard/profile', 'profile')}
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
                {/* <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} /> */}
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNav