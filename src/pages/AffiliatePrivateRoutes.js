import { Outlet, Navigate } from 'react-router-dom'

const AffiliatePrivateRoutes = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')

	// Safely parse user
	let user = null
	try {
		user = userString ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user from localStorage:', error)
		user = null
	}

	// No token → redirect to login
	if (!token) {
		return <Navigate to="/affiliate/login" replace />
	}

	// Not an affiliate → redirect to main dashboard
	if (user?.role !== 'Affiliate') {
		return <Navigate to="/dashboard" replace />
	}

	// Affiliate with token → allow access to affiliate routes
	return <Outlet />
}

export default AffiliatePrivateRoutes
