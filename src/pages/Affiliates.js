import React, { useState, useEffect } from 'react'
import { Skeleton, Button, IconButton, Tooltip } from '@mui/material'
import DashboardLayout from '../components/DashboardLayout'
import BottomNav from '../components/bottomNav'
import Protected, { BASE_URL } from '../utils/axios'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'

const Affiliates = () => {
	const [loading, setLoading] = useState(true)
	const [affiliates, setAffiliates] = useState([])
	const [commissions, setCommissions] = useState([])
	const [commLoading, setCommLoading] = useState(true)
	const fetchAffiliates = async () => {
		try {
			setLoading(true)
			const response = await Protected.get(`${BASE_URL}/api/commission/affiliates`)
			const data = response.data.data || []
			setAffiliates(data)
		} catch (error) {
			console.error(error)
			toast.error('Failed to load affiliates')
			setAffiliates([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchAffiliates()
	}, [])
	useEffect(() => {
		const fetchAllCommissions = async () => {
			try {
				setCommLoading(true)
				const res = await Protected.get(`${BASE_URL}/api/commission/all`)
				setCommissions(res.data.data || [])
			} catch (err) {
				console.error(err)
				toast.error('Failed to load commissions')
				setCommissions([])
			} finally {
				setCommLoading(false)
			}
		}

		fetchAllCommissions()
	}, [])

	const copyCode = (code) => {
		navigator.clipboard.writeText(code)
		toast.success('Affiliate code copied!')
	}

	const totalCommissions = affiliates.reduce((sum, aff) => sum + (aff.earnings || 0), 0)

	return (
		<>
			{/* Desktop View */}
			<div className="hidden md:block">
				<DashboardLayout>
					<div className="px-16 py-8">
						<div className="flex justify-between items-center mb-8">
							<div>
								<h1 className="text-3xl font-bold fourier">Affiliates</h1>
								<p className="text-gray-600 text-lg mt-2">All affiliates promoting your payment links</p>
							</div>
							{!loading && affiliates.length > 0 && (
								<div className="text-right">
									<p className="text-sm text-gray-600">Total commissions owed</p>
									<p className="text-3xl font-bold text-green-600">₦{totalCommissions.toLocaleString()}</p>
								</div>
							)}
						</div>

						<div className="mt-8">
							{loading ? (
								<div className="space-y-4">
									{[1, 2, 3, 4, 5].map((i) => (
										<Skeleton key={i} variant="rectangular" height={60} className="rounded-lg" />
									))}
								</div>
							) : affiliates.length > 0 ? (
								<div className="border-2 border-gray-300 rounded-3xl bg-white overflow-hidden">
									<table className="w-full">
										<thead className="bg-gray-100">
											<tr>
												<th className="text-left p-6 font-bold text-gray-700">Affiliate Code</th>
												<th className="text-left p-6 font-bold text-gray-700">Name / Email</th>
												<th className="text-left p-6 font-bold text-gray-700">Links Joined</th>
												<th className="text-left p-6 font-bold text-gray-700">Sales</th>
												<th className="text-left p-6 font-bold text-gray-700">Earnings (₦)</th>
												<th className="text-left p-6 font-bold text-gray-700">Actions</th>
											</tr>
										</thead>
										<tbody>
											{affiliates.map((aff) => (
												<tr key={aff._id} className="border-t hover:bg-gray-50">
													<td className="p-6">
														<div className="flex items-center gap-2">
															<code className="font-mono text-sm">{aff.affiliateCode}</code>
															<Tooltip title="Copy code">
																<IconButton size="small" onClick={() => copyCode(aff.affiliateCode)}>
																	<ContentCopyIcon fontSize="small" />
																</IconButton>
															</Tooltip>
														</div>
													</td>
													<td className="p-6">
														<div>
															<p className="font-medium">{aff.name || 'N/A'}</p>
															<p className="text-sm text-gray-500">{aff.email}</p>
														</div>
													</td>
													<td className="p-6">{aff.linksJoined || 0}</td>
													<td className="p-6">{aff.sales || 0}</td>
													<td className="p-6 font-bold text-green-600">₦{(aff.earnings || 0).toLocaleString()}</td>
													<td className="p-6">
														<Button variant="outlined" size="small">
															View Details
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="text-center py-16">
									<p className="text-gray-500 text-lg">No affiliates yet. When someone joins your affiliate program, they will appear here.</p>
								</div>
							)}
						</div>
{/* 
						<div className="mt-16">
							<h2 className="text-2xl font-bold mb-6">All Commissions Log</h2>
							{commLoading ? (
								<div className="space-y-4">
									{[1, 2, 3, 4].map((i) => (
										<Skeleton key={i} height={60} className="rounded-lg" />
									))}
								</div>
							) : commissions.length > 0 ? (
								<div className="border-2 border-gray-300 rounded-3xl bg-white overflow-hidden">
									<table className="w-full">
										<thead className="bg-gray-100">
											<tr>
												<th className="text-left p-6 font-bold text-gray-700">Date</th>
												<th className="text-left p-6 font-bold text-gray-700">Affiliate</th>
												<th className="text-left p-6 font-bold text-gray-700">Link</th>
												<th className="text-left p-6 font-bold text-gray-700">Tier</th>
												<th className="text-right p-6 font-bold text-gray-700">Amount (₦)</th>
											</tr>
										</thead>
										<tbody>
											{commissions.map((comm) => (
												<tr key={comm._id} className="border-t hover:bg-gray-50">
													<td className="p-6">{new Date(comm.createdAt).toLocaleDateString()}</td>
													<td className="p-6">
														<p className="font-medium">
															{comm.affiliateId?.firstname} {comm.affiliateId?.lastname}
														</p>
														<p className="text-sm text-gray-500">{comm.affiliateId?.email}</p>
													</td>
													<td className="p-6">{comm.paymentLinkId?.name || 'N/A'}</td>
													<td className="p-6">{comm.tier === 1 ? 'Tier 1' : 'Tier 2'}</td>
													<td className="p-6 text-right font-bold text-green-600">₦{comm.amount.toLocaleString()}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<p className="text-center text-gray-500 py-12 text-lg">No commissions have been logged yet.</p>
							)}
						</div> */}
					</div>
				</DashboardLayout>
			</div>

			{/* Mobile View */}
			<div className="block md:hidden">
				<div className="py-6 px-4">
					<h2 className="text-2xl font-bold fourier">Affiliates</h2>
					<p className="text-gray-600 mt-2">All affiliates promoting your links</p>
					{!loading && affiliates.length > 0 && <p className="text-right text-lg font-bold text-green-600 mt-4">Total owed: ₦{totalCommissions.toLocaleString()}</p>}
				</div>

				<div className="mx-4 pb-20">
					{loading ? (
						<div className="space-y-4">
							{[1, 2, 3, 4].map((i) => (
								<Skeleton key={i} variant="rectangular" height={120} className="rounded-lg" />
							))}
						</div>
					) : affiliates.length > 0 ? (
						<div className="space-y-4">
							{affiliates.map((aff) => (
								<div key={aff._id} className="border-2 border-gray-300 rounded-2xl p-6 bg-white">
									<div className="flex justify-between items-start mb-4">
										<div>
											<p className="font-bold text-lg">{aff.name || 'N/A'}</p>
											<p className="text-sm text-gray-600">{aff.email}</p>
											<div className="flex items-center gap-2 mt-2">
												<code className="text-sm">{aff.affiliateCode}</code>
												<Tooltip title="Copy">
													<IconButton size="small" onClick={() => copyCode(aff.affiliateCode)}>
														<ContentCopyIcon fontSize="small" />
													</IconButton>
												</Tooltip>
											</div>
										</div>
										<div className="text-right">
											<p className="font-bold text-green-600 text-2xl">₦{(aff.earnings || 0).toLocaleString()}</p>
											<p className="text-sm text-gray-600">Earnings</p>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4 text-center text-sm">
										<div>
											<p className="font-bold">{aff.linksJoined || 0}</p>
											<p className="text-gray-600">Links</p>
										</div>
										<div>
											<p className="font-bold">{aff.sales || 0}</p>
											<p className="text-gray-600">Sales</p>
										</div>
										<div>
											<Button variant="outlined" size="small" fullWidth>
												View
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-center text-gray-500 py-12">No affiliates yet.</p>
					)}
				</div>

				<BottomNav />
			</div>
		</>
	)
}

export default Affiliates
