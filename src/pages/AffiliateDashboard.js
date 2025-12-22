  import React, { useState, useEffect } from 'react'
	import { Grid, Stack, List, ListItem, ListItemButton, ListItemText, IconButton, Divider, Tooltip } from '@mui/material'
	import DashboardLayout from '../components/DashboardLayout' // Reuse if possible, or remove for affiliate-only
	import ContentCopyIcon from '@mui/icons-material/ContentCopy'
	import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
	import NearMeIcon from '@mui/icons-material/NearMe'
	import { Link, useNavigate } from 'react-router-dom'
	import Protected, { BASE_URL } from '../utils/axios'
	import Skeleton from '@mui/material/Skeleton'
	import WithdrawDialog from '../components/WithdrawDialog' // Reuse your existing withdrawal dialog
	import BottomNav from '../components/bottomNav' // Keep if needed for mobile
	import { toast } from 'react-toastify'

	const AffiliateDashboard = () => {
		const [loading, setLoading] = useState(true)
		const [affiliateData, setAffiliateData] = useState({
			name: '',
			totalEarnings: 0,
			tier1Earnings: 0,
			tier2Earnings: 0,
			affiliateLinks: [], // array of { paymentLinkName, linkUrl, code }
			recentCommissions: [],
		})
		const [openWithdraw, setOpenWithdraw] = useState(false)
		const navigate = useNavigate()

		// Fetch affiliate data (we'll build this endpoint later)
		const fetchAffiliateData = async () => {
			try {
				setLoading(true)
				const response = await Protected.get(`${BASE_URL}/api/affiliate/dashboard`)
				setAffiliateData(response.data.data)
				setLoading(false)
			} catch (error) {
				console.log(error)
				toast.error('Failed to load dashboard')
				setLoading(false)
			}
		}

		useEffect(() => {
			fetchAffiliateData()
		}, [])

		// Copy link to clipboard
		const copyLink = (link) => {
			navigator.clipboard.writeText(link)
			toast.success('Link copied to clipboard!')
		}

		const handleWithdraw = () => {
			setOpenWithdraw(true)
		}

		return (
			<>
				{/* Mobile View */}
				<div className="block md:hidden">
					<div className="py-6 px-4">
						<h2 className="text-2xl font-bold fourier">Welcome back, {affiliateData.name || 'Affiliate'}! 👋</h2>
						<p className="text-gray-600 mt-2">Share your links below and earn commission when people pay.</p>
					</div>

					{/* Earnings Summary */}
					<div className="px-4 py-6 bg-green-50 rounded-xl mx-4">
						<h3 className="font-bold text-lg">Your Total Earnings</h3>
						<h1 className="text-3xl font-bold text-green-700 mt-2">₦ {affiliateData.totalEarnings?.toLocaleString() || '0.00'}</h1>
						<div className="grid grid-cols-2 gap-4 mt-4">
							<div>
								<p className="text-sm text-gray-600">From your direct shares (Tier 1)</p>
								<p className="font-bold">₦ {affiliateData.tier1Earnings?.toLocaleString() || '0'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">From your recruits (Tier 2)</p>
								<p className="font-bold">₦ {affiliateData.tier2Earnings?.toLocaleString() || '0'}</p>
							</div>
						</div>
						<button onClick={handleWithdraw} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
							<AccountBalanceWalletIcon />
							Request Withdrawal
						</button>
					</div>

					{/* Affiliate Links */}
					<div className="px-4 mt-8">
						<h3 className="text-xl font-bold mb-4">Your Shareable Links</h3>
						{loading ? (
							<Skeleton variant="rectangular" height={100} className="rounded-lg" />
						) : affiliateData.affiliateLinks.length > 0 ? (
							affiliateData.affiliateLinks.map((link, index) => (
								<div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
									<p className="font-medium">{link.paymentLinkName}</p>
									<div className="flex items-center mt-3 bg-gray-100 rounded-lg p-3">
										<p className="text-sm text-gray-700 truncate flex-1">{link.linkUrl}</p>
										<IconButton onClick={() => copyLink(link.linkUrl)}>
											<ContentCopyIcon />
										</IconButton>
									</div>
									<p className="text-xs text-gray-500 mt-2">Share this link to earn commission</p>
								</div>
							))
						) : (
							<p className="text-center text-gray-500 py-8">No links yet. Join a program to get started!</p>
						)}
					</div>

					{/* Recent Commissions */}
					<div className="px-4 mt-8 pb-20">
						<h3 className="text-xl font-bold mb-4">Recent Commissions</h3>
						{affiliateData.recentCommissions.length > 0 ? (
							<div className="space-y-3">
								{affiliateData.recentCommissions.map((comm, i) => (
									<div key={i} className="bg-white border rounded-lg p-4 flex justify-between items-center">
										<div>
											<p className="font-medium">{comm.paymentLinkName}</p>
											<p className="text-sm text-gray-500">
												{comm.tier === 1 ? 'Direct referral' : 'From your recruit'} • {comm.date}
											</p>
										</div>
										<p className="font-bold text-green-600">+₦ {comm.amount.toLocaleString()}</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-gray-500 py-8">No commissions yet. Start sharing!</p>
						)}
					</div>

					<BottomNav />
				</div>

				{/* Desktop View */}
				<div className="hidden md:block">
					<DashboardLayout>
						<div className="px-16 py-8">
							<h1 className="text-3xl font-bold fourier">Affiliate Dashboard</h1>
							<p className="text-gray-600 mt-2 text-lg">
								Welcome back, <strong>{affiliateData.name || 'Affiliate'}</strong>! Share your links and earn commission every time someone pays.
							</p>

							<Grid container spacing={6} className="mt-8">
								{/* Earnings Card */}
								<Grid item xs={12} md={5}>
									<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg">
										<h2 className="text-2xl font-bold">Your Earnings Summary</h2>
										<h1 className="text-5xl font-bold text-green-700 mt-4">₦ {affiliateData.totalEarnings?.toLocaleString() || '0.00'}</h1>
										<Divider className="my-6" />
										<div className="space-y-4">
											<div className="flex justify-between">
												<span className="text-gray-700">Direct shares (Tier 1)</span>
												<span className="font-bold">₦ {affiliateData.tier1Earnings?.toLocaleString() || '0'}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-700">From your recruits (Tier 2)</span>
												<span className="font-bold">₦ {affiliateData.tier2Earnings?.toLocaleString() || '0'}</span>
											</div>
										</div>
										<button
											onClick={handleWithdraw}
											className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
										>
											<NearMeIcon fontSize="large" />
											Request Withdrawal
										</button>
									</div>
								</Grid>

								{/* Links & Commissions */}
								<Grid item xs={12} md={7}>
									<div className="bg-white rounded-2xl shadow-lg p-8">
										<h2 className="text-2xl font-bold mb-6">Your Affiliate Links</h2>
										{affiliateData.affiliateLinks.length > 0 ? (
											<div className="space-y-4">
												{affiliateData.affiliateLinks.map((link, i) => (
													<div key={i} className="border rounded-xl p-5 hover:shadow-md transition">
														<p className="font-semibold text-lg">{link.paymentLinkName}</p>
														<div className="flex items-center mt-3 bg-gray-50 rounded-lg p-3">
															<code className="flex-1 text-sm truncate">{link.linkUrl}</code>
															<Tooltip title="Copy link">
																<IconButton onClick={() => copyLink(link.linkUrl)}>
																	<ContentCopyIcon className="text-green-600" />
																</IconButton>
															</Tooltip>
														</div>
														<p className="text-sm text-gray-600 mt-2">💡 Share this link — earn commission on every payment!</p>
													</div>
												))}
											</div>
										) : (
											<p className="text-center text-gray-500 py-10">You haven't joined any programs yet. Visit a payment link and click "Become an Affiliate" to start!</p>
										)}

										<h2 className="text-2xl font-bold mt-12 mb-6">Recent Commissions</h2>
										{affiliateData.recentCommissions.length > 0 ? (
											<List>
												{affiliateData.recentCommissions.map((c, i) => (
													<ListItem key={i} className="border-b">
														<ListItemText primary={`${c.paymentLinkName} • ${c.tier === 1 ? 'Direct' : 'Tier 2'} referral`} secondary={c.date} />
														<span className="font-bold text-green-600">+₦ {c.amount.toLocaleString()}</span>
													</ListItem>
												))}
											</List>
										) : (
											<p className="text-center text-gray-500 py-8">No earnings yet — keep sharing!</p>
										)}
									</div>
								</Grid>
							</Grid>
						</div>
					</DashboardLayout>
				</div>

				{/* Reuse your withdrawal dialog */}
				<WithdrawDialog opener={openWithdraw} handleClosed={() => setOpenWithdraw(false)} handleClickOpen={() => setOpenWithdraw(true)} setOpener={setOpenWithdraw} />
			</>
		)
	}

	export default AffiliateDashboard