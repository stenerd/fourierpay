import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')
    
	// No token → login
	if (!token) {
		return <Navigate to="/login" replace />
	}

	let user = null
	try {
		user = userString ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user:', error)
		return <Navigate to="/login" replace />
    }

	// Affiliate trying merchant routes → force redirect to affiliate dashboard
	if (user?.user?.role === 'Affiliate') {
		return <Navigate to="/affiliate/dashboard" replace />
	}

	// Merchant or other roles → allow merchant routes
	return <Outlet />
}

export default PrivateRoutes
