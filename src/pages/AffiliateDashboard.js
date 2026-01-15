	import React, { useState, useEffect } from 'react'
	import { Grid, List, ListItem, ListItemText, IconButton, Tooltip, Skeleton, Button } from '@mui/material'
	import ContentCopyIcon from '@mui/icons-material/ContentCopy'
	import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
	import NearMeIcon from '@mui/icons-material/NearMe'
	import LogoutIcon from '@mui/icons-material/Logout'
	import { useNavigate } from 'react-router-dom'
	import Protected, { BASE_URL } from '../utils/axios'
	import WithdrawDialog from '../components/WithdrawDialog'
	import BottomNav from '../components/bottomNav'
	import { toast } from 'react-toastify'

	const AffiliateDashboard = () => {
		const [loading, setLoading] = useState(true)
		const [error, setError] = useState(null)
		const [recentCommissions, setRecentCommissions] = useState([])
		const [affiliateData, setAffiliateData] = useState({
			totalEarnings: 0,
			tier1Earnings: 0,
			tier2Earnings: 0,
			sharedLinks: [],
		})
		const [openWithdraw, setOpenWithdraw] = useState(false)
		const navigate = useNavigate()

		const fetchAffiliateData = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await Protected.get(`${BASE_URL}/api/payment-link-affiliate/dashboard`)

				const data = response.data.data

				console.log("REcent commissions data:", data.recentCommissions.length);
				
				

				setAffiliateData({
					totalEarnings: Number(data.totalEarnings) || 0,
					tier1Earnings: Number(data.tier1Earnings) || 0,
					tier2Earnings: Number(data.tier2Earnings) || 0,
					sharedLinks: data.sharedLinks || [],
				})
				setRecentCommissions(data.recentCommissions || [])

			} catch (err) {
				console.error('Dashboard fetch error:', err)
				toast.error('Failed to load dashboard data')
				setError('Could not load dashboard data. Please try again.')
			} finally {
				setLoading(false)
			}
		}

		useEffect(() => {
			fetchAffiliateData()
		}, [])

		const copyLink = (link) => {
			navigator.clipboard.writeText(link)
			toast.success('Link copied to clipboard!')
		}

		const handleWithdraw = () => {
			setOpenWithdraw(true)
		}

		const handleLogout = () => {
			localStorage.removeItem('bearer_token')
			localStorage.removeItem('user')
			toast.success('Logged out successfully')
			navigate('/affiliate/login')
		}

		if (error) {
			return (
				<div className="p-6 text-center text-red-600">
					{error}
					<button onClick={fetchAffiliateData} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
						Try Again
					</button>
				</div>
			)
		}

		return (
			<>
				{/* Mobile View */}
				<div className="block md:hidden">
					<div className="py-6 px-4">
						<h2 className="text-2xl font-bold text-gray-800">Affiliate Dashboard </h2>
						<p className="text-gray-600 mt-2">Share your links and earn commissions.</p>
						<p className="text-green-600 font-bold text-2xl mt-2">Payouts Every Friday</p>
					</div>

					{/* Total Earnings */}
					<div className="mx-4 mt-4 mb-6 border-2 border-gray-400 rounded-2xl p-6 bg-gray-50">
						<h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
						{loading ? (
							<Skeleton variant="text" width={120} height={40} />
						) : (
							<h1 className="text-3xl font-bold text-green-700 mt-3">₦ {affiliateData.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
						)}
						<p className="text-gray-600 mt-2 text-sm">All commissions earned so far</p>
						{/* <button
							onClick={handleWithdraw}
							disabled={loading}
							className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
						>
							<AccountBalanceWalletIcon />
							Request Withdrawal
						</button> */}

						<button disabled className="mt-6 w-full bg-gray-300 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
							<AccountBalanceWalletIcon />
							Request Withdrawals
						</button>
					</div>

					{/* Affiliate Links */}
					<div className="mx-4 mb-6 border-2 border-gray-300 rounded-2xl p-6 bg-white">
						<h3 className="text-lg font-bold text-gray-800 mb-4">Your Affiliate Links ({affiliateData.sharedLinks.length})</h3>
						{loading ? (
							<Skeleton variant="rectangular" height={80} className="rounded-lg" />
						) : affiliateData.sharedLinks.length > 0 ? (
							<div className="space-y-4">
								{affiliateData.sharedLinks.map((link, i) => (
									<div key={i} className="border border-gray-300 rounded-xl p-4">
										<p className="font-semibold text-gray-800">{link.name}</p>
										<p className="text-sm text-gray-600 mt-1">Commission: ₦{link.yourCommissionPerSale.toLocaleString()} per sale</p>
										<div className="flex items-center mt-3 bg-gray-100 rounded-lg p-3">
											<p className="text-sm truncate flex-1 text-gray-700">{link.shareableLink}</p>
											<Tooltip title="Copy">
												<IconButton onClick={() => copyLink(link.shareableLink)}>
													<ContentCopyIcon className="text-gray-600" />
												</IconButton>
											</Tooltip>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-gray-500 py-6">No links yet — visit a payment page and click "Get my affiliate link" to start!</p>
						)}
					</div>

					{/* Tier 1 & Tier 2 (grayscale) */}
					<div className="mx-4 grid grid-cols-1 gap-4 mb-8">
						<div className="border-2 border-gray-400 rounded-2xl p-6 bg-gray-50">
							<h3 className="text-lg font-bold text-gray-800">Tier 1 Earnings</h3>
							<p className="text-gray-600 mt-1 text-sm">
								From people who pay using <strong>your direct link</strong>
							</p>
							{loading ? (
								<Skeleton variant="text" width={80} height={32} />
							) : (
								<h2 className="text-2xl font-bold text-gray-800 mt-4">₦ {affiliateData.tier1Earnings.toLocaleString()}</h2>
							)}
						</div>

						<div className="border-2 border-gray-400 rounded-2xl p-6 bg-gray-50">
							<h3 className="text-lg font-bold text-gray-800">Tier 2 Earnings</h3>
							<p className="text-gray-600 mt-1 text-sm">
								From people recruited by <strong>your referrals</strong>
							</p>
							{loading ? (
								<Skeleton variant="text" width={80} height={32} />
							) : (
								<h2 className="text-2xl font-bold text-gray-800 mt-4">₦ {affiliateData.tier2Earnings.toLocaleString()}</h2>
							)}
						</div>
					</div>

					{/* Recent Commissions */}
					<div className="mx-4 border-2 border-gray-300 rounded-2xl p-6 bg-white pb-20">
						<h3 className="text-lg font-bold text-gray-800 mb-4">Recent Commissions</h3>
						{loading ? (
							<div className="space-y-3">
								{[1, 2, 3].map((i) => (
									<Skeleton key={i} height={60} />
								))}
							</div>
						) : recentCommissions.length > 0 ? (
							<div className="space-y-3">
								{recentCommissions.map((comm, i) => (
									<div key={i} className="border rounded-lg p-4 bg-gray-50">
										<div className="flex justify-between">
											<p className="font-medium">{comm.linkName}</p>
											<p className="text-sm text-gray-600">Tier {comm.tier}</p>
										</div>
										<p className="text-2xl font-bold text-green-600 mt-2">₦{comm.amount.toLocaleString()}</p>
										<p className="text-xs text-gray-500 mt-1">{new Date(comm.date).toLocaleDateString()}</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-gray-500 py-6">No commissions yet — keep sharing your links!</p>
						)}
					</div>

					{/* Logout Button */}
					<div className="mx-4 mb-20">
						<Button fullWidth variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</div>

				{/* Desktop View */}
				<div className="hidden md:block min-h-screen bg-gray-50">
					<div className="max-w-6xl mx-auto py-12 px-8">
						<div className="flex justify-between items-center mb-8">
							<div>
								<h1 className="text-3xl font-bold text-gray-800">Affiliate Dashboard</h1>
								<p className="text-gray-600 text-lg mt-2">Track your earnings and share your links</p>
								<p className="text-green-600 font-bold text-2xl mt-2">Payouts Every Friday</p>
							</div>
							<Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout} size="large">
								Logout
							</Button>
						</div>

						{loading ? (
							<div className="space-y-8">
								<Skeleton variant="rectangular" height={200} />
								<Skeleton variant="rectangular" height={400} />
							</div>
						) : (
							<>
								{/* Total Earnings */}
								<div className="mb-12">
									<div className="border-2 border-gray-400 rounded-3xl p-10 bg-gray-50 text-center">
										<h2 className="text-xl font-bold text-gray-700">Total Earnings</h2>
										<h1 className="text-5xl font-bold text-green-700 mt-6">₦ {affiliateData.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
										<p className="text-gray-600 mt-4 text-base">All commissions earned so far</p>
										{/* <button
											onClick={handleWithdraw}
											className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl text-lg flex items-center justify-center gap-3"
										>
											<NearMeIcon fontSize="large" />
											Request Withdrawal
										</button> */}

										<button disabled className="mt-8 w-full bg-gray-300 hover:bg-green-700 text-white font-bold py-5 rounded-2xl text-lg flex items-center justify-center gap-3">
											<NearMeIcon fontSize="large" />
											Request Withdrawal
										</button>
									</div>
								</div>

								{/* Affiliate Links */}
								<div className="mb-12">
									<div className="border-2 border-gray-300 rounded-3xl p-8 bg-white">
										<h2 className="text-2xl font-bold text-gray-800 mb-6">Your Affiliate Links ({affiliateData.sharedLinks.length})</h2>
										{affiliateData.sharedLinks.length > 0 ? (
											<Grid container spacing={4}>
												{affiliateData.sharedLinks.map((link, i) => (
													<Grid item xs={12} key={i}>
														<div className="border-2 border-gray-300 rounded-2xl p-6">
															<p className="font-bold text-lg text-gray-800">{link.name}</p>
															<p className="text-sm text-gray-600 mt-1">Commission: ₦{link.yourCommissionPerSale.toLocaleString()} per sale</p>
															<div className="flex items-center mt-4 bg-gray-100 rounded-xl p-4">
																<code className="flex-1 text-sm truncate pr-4 text-gray-700">{link.shareableLink}</code>
																<Tooltip title="Copy">
																	<IconButton onClick={() => copyLink(link.shareableLink)}>
																		<ContentCopyIcon fontSize="large" className="text-gray-600" />
																	</IconButton>
																</Tooltip>
															</div>
														</div>
													</Grid>
												))}
											</Grid>
										) : (
											<p className="text-center text-gray-500 py-12 text-lg">No links yet. Visit a payment page and click "Get my affiliate link" to start earning!</p>
										)}
									</div>
								</div>

								{/* Tier 1 & Tier 2 (grayscale, stacked) */}
								<Grid container spacing={6} className="mb-12">
									<Grid item xs={12} md={6}>
										<div className="border-2 border-gray-400 rounded-3xl p-8 bg-gray-50">
											<h2 className="text-xl font-bold text-gray-800">Tier 1 Earnings</h2>
											<p className="text-gray-600 mt-3 text-base">
												From people who pay using <strong>your direct link</strong>
											</p>
											<h1 className="text-4xl font-bold text-gray-800 mt-6">₦ {affiliateData.tier1Earnings.toLocaleString()}</h1>
										</div>
									</Grid>

									<Grid item xs={12} md={6}>
										<div className="border-2 border-gray-400 rounded-3xl p-8 bg-gray-50">
											<h2 className="text-xl font-bold text-gray-800">Tier 2 Earnings</h2>
											<p className="text-gray-600 mt-3 text-base">
												From people recruited by <strong>your referrals</strong>
											</p>
											<h1 className="text-4xl font-bold text-gray-800 mt-6">₦ {affiliateData.tier2Earnings.toLocaleString()}</h1>
										</div>
									</Grid>
								</Grid>

								{/* Recent Commissions — full width */}
								{/* Recent Commissions */}
								<div className="mx-4 border-2 border-gray-300 rounded-2xl p-6 bg-white pb-20">
									<h3 className="text-lg font-bold text-gray-800 mb-4">Recent Commissions</h3>
									{loading ? (
										<div className="space-y-3">
											{[1, 2, 3].map((i) => (
												<Skeleton key={i} height={60} />
											))}
										</div>
									) : recentCommissions.length > 0 ? (
										<div className="space-y-3">
											{recentCommissions.map((comm, i) => (
												<div key={i} className="border rounded-lg p-4 bg-gray-50">
													<div className="flex justify-between">
														<p className="font-medium">{comm.linkName}</p>
														<p className="text-sm text-gray-600">Tier {comm.tier}</p>
													</div>
													<p className="text-2xl font-bold text-green-600 mt-2">₦{comm.amount.toLocaleString()}</p>
													<p className="text-xs text-gray-500 mt-1">{new Date(comm.date).toLocaleDateString()}</p>
												</div>
											))}
										</div>
									) : (
										<p className="text-center text-gray-500 py-6">No commissions yet — keep sharing your links!</p>
									)}
								</div>
							</>
						)}
					</div>
				</div>

				<WithdrawDialog opener={openWithdraw} handleClosed={() => setOpenWithdraw(false)} handleClickOpen={() => setOpenWithdraw(true)} setOpener={setOpenWithdraw} />
			</>
		)
	}

	export default AffiliateDashboard
