import { Outlet, Navigate } from 'react-router-dom'

const AffiliatePrivateRoutes = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')

	// Safely parse user
	let user = null
	try {
		user = userString?.user ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user from localStorage:', error)
		user = null
	}

	console.log('user in affiliate routes', user)
	

	if (!token) {
		return <Navigate to="/affiliate/login" replace />
	}

	if (user?.role == 'Affiliate') {
		return <Navigate to="/affiliate/dashboard" replace /> 
	}

	return <Outlet />
}

export default AffiliatePrivateRoutes
