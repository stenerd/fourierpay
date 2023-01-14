import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = window.localStorage.getItem('bearer_token');
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes;