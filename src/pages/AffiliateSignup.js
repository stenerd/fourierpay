import { CircularProgress, Grid, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../utils/axios'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'

const AffiliateSignup = () => {
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		name: '', // changed from firstname
		phone_number: '',
		password: '',
	})
	const [text, setText] = useState(false) // password visibility
	const navigate = useNavigate()
	const location = useLocation()

	// Capture query params: ?link=abc123&ref=xyz789
	const queryParams = new URLSearchParams(location.search)
	const paymentLinkId = queryParams.get('link') // e.g., the payment link slug/id
	const parentRef = queryParams.get('ref') // parent's referral code

	const handleChange = (e) => {
		setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const togglePassword = () => setText(!text)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		// Basic validation
		if (!state.name || !state.phone_number || !state.password) {
			toast.error('Please fill all fields')
			setLoading(false)
			return
		}

		if (state.password.length < 6) {
			toast.error('Password must be at least 6 characters')
			setLoading(false)
			return
		}

		try {
			const payload = {
				name: state.name.trim(),
				phone_number: state.phone_number.trim(),
				password: state.password,
				// Send affiliate-specific data
				affiliate_link_id: paymentLinkId || null, // which payment link they're joining
				parent_ref: parentRef || null, // who referred them (for Tier 2)
			}

			const res = await axios.post(`${BASE_URL}/api/auth/affiliate-registration`, payload)

			console.log(res.data)
			toast.success('Welcome! You can now start earning commissions.')
			setLoading(false)

			// Redirect to affiliate dashboard
			navigate('/affiliate/dashboard')
		} catch (error) {
			console.log(error)
			const message = error.response?.data?.message || 'Signup failed. Try again.'
			toast.error(message)
			setLoading(false)
		}
	}

	return (
		<>
			<div className="bg-gray-100 min-h-screen md:h-screen">
				<Grid container>
					<Grid item xs={12} md={5}>
						<img src="/images/registration.jpg" className="w-full h-screen object-cover hidden md:block" alt="signup" />
					</Grid>
					<Grid item xs={12} md={7}>
						<div className="w-[90%] ml-[8%] block mt-[5%]">
							<Link to="/">
								<img src="/images/five.svg" width="110" className="absolute" alt="logo" />
							</Link>
						</div>

						<div className="min-h-[100vh] flex flex-col justify-center p-3">
							<div className="w-[90%] md:w-[85%] mx-auto mb-0 py-6 md:py-0">
								<h2 className="text-xl md:mb-4 mb-4 font-bold home c-auth-title">Become an Affiliate</h2>
								<p className="font-2xl text-gray-700">Sign up free and start earning commission when people pay using your link.</p>
							</div>

							<div className="w-[85%] mx-auto md:py-4 py-2">
								<form onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<label className="text-sm font-bold block my-2 text-gray-700">Full Name</label>
											<input
												placeholder="Enter your name"
												onChange={handleChange}
												required
												name="name"
												type="text"
												className="py-2 px-4 w-full outline-none rounded-lg border-gray-400 focus:border-green-500 c-text-input"
											/>
										</Grid>

										<Grid item xs={12}>
											<label className="text-sm font-bold block my-2 text-gray-700">Phone Number</label>
											<input
												placeholder="e.g. 08012345678"
												onChange={handleChange}
												required
												name="phone_number"
												type="text"
												className="py-2 px-4 w-full outline-none rounded-lg border-gray-400 focus:border-green-500 c-text-input"
											/>
										</Grid>

										<Grid item xs={12}>
											<label className="text-sm font-bold block my-2 text-gray-700">Password</label>
											<div className="relative">
												<input
													placeholder="Create a password"
													name="password"
													onChange={handleChange}
													required
													type={text ? 'text' : 'password'}
													className="py-2 px-4 w-full outline-none rounded-lg border-gray-400 focus:border-green-500 c-text-input"
												/>
												<IconButton className="absolute right-2 top-1" onClick={togglePassword}>
													{text ? <VisibilityOffIcon /> : <VisibilityIcon />}
												</IconButton>
											</div>
										</Grid>
									</Grid>

									<div className="my-6">
										<p className="text-sm font-bold text-gray-500">
											By signing up, you agree to our <span className="">Terms</span> and <span className="">Privacy Policy</span>.
										</p>
									</div>

									<div className="md:block hidden">
										<button disabled={loading} className="c-primary-button">
											{loading ? 'Creating Account...' : 'Start Earning'}
										</button>
									</div>
									<div className="block md:hidden">
										<button disabled={loading} className="c-primary-button w-full">
											{loading ? 'Creating Account...' : 'Start Earning'}
										</button>
									</div>
								</form>

								<div className="py-4">
									<p className="text-gray-700">
										Already have an account?{' '}
										<Link to={`/affiliate/login?link=${paymentLinkId || ''}&ref=${parentRef || ''}`}>
											<span className="cursor-pointer c-primary-link-color">Log in</span>
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

export default AffiliateSignup
