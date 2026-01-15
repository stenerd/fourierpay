import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
	const token = window.localStorage.getItem('bearer_token')
	const userString = window.localStorage.getItem('user')

	// Safely parse user - handle null, undefined, and invalid JSON
	let user = null
	try {
		user = userString.user ? JSON.parse(userString) : null
	} catch (error) {
		console.error('Failed to parse user from localStorage:', error)
		user = null
	}

		console.log('user in Protected routes', user)

	if (token) {
		if (user?.role == 'Affiliate') {
			return <Navigate to="/affiliate/dashboard" replace />
		}
		return <Navigate to="/dashboard" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
