import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')

	if (!token) {
		return <Navigate to="/login" replace />
	}

	let user = null
	try {
		user = userString ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user:', error)
	}

	// If affiliate, block merchant routes — redirect to affiliate dashboard
	if (user?.role === 'Affiliate') {
		return <Navigate to="/affiliate/dashboard" replace />
	}

	// Normal merchant — allow
	return <Outlet />
}

export default PrivateRoutes
