import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../utils/axios'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import { CircularProgress } from '@mui/material'

const AffiliateLogin = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const [text, setText] = useState(false) // password visibility

	const [state, setState] = useState({
		email: '',
		password: '',
	})

	// Preserve context in links (optional — not used in backend login)
	const queryParams = new URLSearchParams(location.search)
	const paymentLinkId = queryParams.get('link')
	const parentRef = queryParams.get('ref')

	const togglePassword = () => setText(!text)

	const handleChange = (e) => {
		setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (!state.email.trim() || !state.password) {
			toast.error('Please fill in both email and password')
			setLoading(false)
			return
		}

		try {
			const payload = {
				email: state.email.trim().toLowerCase(),
				password: state.password,
			}

			const res = await axios.post(`${BASE_URL}/api/auth/affiliate-login`, payload)

			// Save token and user data
			window.localStorage.setItem('bearer_token', res?.data?.data.token)
			window.localStorage.setItem('user', JSON.stringify(res?.data?.data))

			toast.success('Welcome back! Ready to earn.')
			setLoading(false)

			// Redirect to dashboard
			navigate('/affiliate/dashboard')
		} catch (error) {
			console.log(error)
			const message = error.response?.data?.message || 'Login failed. Please check your email and password.'
			toast.error(message)
			setLoading(false)
		}
	}

	return (
		<>
			<div className="bg-gray-100 h-screen">
				<Grid container>
					<Grid item xs={12} md={7}>
						<img src="/images/registration.jpg" className="w-full h-screen object-cover hidden md:block" alt="background" />
					</Grid>
					<Grid item xs={12} md={5}>
						<div className="w-[80%] ml-[8%] block mt-[5%]">
							<Link to="/">
								<img src="/images/five.svg" width="110" className="absolute" alt="logo" />
							</Link>
						</div>

						<div className="min-h-[100vh] justify-center w-[85%] mx-auto flex flex-col">
							<div>
								<p className="text-gray-700">Welcome back!</p>
								<h2 className="text-xl mb-4 font-bold home c-auth-title">Sign in to your affiliate account</h2>
								<p className="text-gray-600">Log in to see your earnings and share your link.</p>
							</div>

							<div className="py-4">
								<form onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<label className="text-sm font-bold block my-2 text-gray-700">Email Address</label>
											<input
												placeholder="you@example.com"
												onChange={handleChange}
												required
												name="email"
												type="email"
												className="py-2 px-4 w-full outline-none rounded-lg border border-gray-400 focus:border-green-500 c-text-input"
											/>
										</Grid>

										<Grid item xs={12}>
											<label className="text-sm font-bold block py-1 text-gray-700">Password</label>
											<div className="relative">
												<input
													placeholder="Enter your password"
													name="password"
													onChange={handleChange}
													required
													type={text ? 'text' : 'password'}
													className="py-2 px-4 w-full rounded-lg border border-gray-400 focus:border-green-500 outline-none c-text-input"
												/>
												<IconButton className="absolute right-3 top-2" onClick={togglePassword}>
													{text ? <VisibilityOffIcon /> : <VisibilityIcon />}
												</IconButton>
											</div>
										</Grid>
									</Grid>

									<div className="my-6">
										<button type="submit" disabled={loading} className="c-primary-button w-full md:w-auto px-12">
											{loading ? (
												<>
													<CircularProgress size={20} color="inherit" className="mr-2" />
													Logging in...
												</>
											) : (
												'Log In'
											)}
										</button>
									</div>
								</form>

								<div className="text-center">
									<p className="text-gray-700">
										Don't have an account?{' '}
										<Link to={`/affiliate/signup?link=${paymentLinkId || ''}&ref=${parentRef || ''}`}>
											<span className="c-primary-link-color cursor-pointer font-bold">Sign Up</span>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</Grid>
				</Grid>
			</div>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	)
}

export default AffiliateLogin
