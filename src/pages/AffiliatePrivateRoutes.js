import { Outlet, Navigate } from 'react-router-dom'

const AffiliatePrivateRoutes = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')

	if (!token) {
		return <Navigate to="/affiliate/login" replace />
	}

	let user = null
	try {
		user = userString ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user from localStorage:', error)
		user = null
	}

	// If NOT affiliate → block and redirect to merchant dashboard
	if (user?.user?.role !== 'Affiliate') {
		return <Navigate to="/dashboard" replace />
	}

	// Affiliate → allow affiliate routes
	return <Outlet />
}

export default AffiliatePrivateRoutes
