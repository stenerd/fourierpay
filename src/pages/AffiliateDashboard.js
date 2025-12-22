import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, IconButton, Tooltip, Divider } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useNavigate } from 'react-router-dom';
import Protected, { BASE_URL } from '../utils/axios';
import Skeleton from '@mui/material/Skeleton';
import WithdrawDialog from '../components/WithdrawDialog';
import BottomNav from '../components/bottomNav';
import { toast } from 'react-toastify';

const AffiliateDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [affiliateData, setAffiliateData] = useState({
        name: '',
        totalEarnings: 0,
        tier1Earnings: 0,
        tier2Earnings: 0,
        affiliateLinks: [], // { paymentLinkName, linkUrl }
        recentCommissions: [] // { paymentLinkName, tier, amount, date }
    });
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const navigate = useNavigate();

    const fetchAffiliateData = async () => {
        try {
            setLoading(true);
            const response = await Protected.get(`${BASE_URL}/api/affiliate/dashboard`);
            setAffiliateData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load dashboard');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAffiliateData();
    }, []);

    const copyLink = (link) => {
        navigator.clipboard.writeText(link);
        toast.success('Link copied!');
    };

    const handleWithdraw = () => {
        setOpenWithdraw(true);
    };

    return (
			<>
				{/* Mobile View */}
				<div className="block md:hidden">
					<div className="py-6 px-4">
						<h2 className="text-2xl font-bold fourier">Welcome, {affiliateData.name || 'Affiliate'}! 👋</h2>
						<p className="text-gray-600 mt-2">Share your links and earn when people pay.</p>
					</div>

					{/* Total Earnings Card */}
					<div className="mx-4 mt-4 mb-6 border-2 border-green-600 rounded-2xl p-6 bg-green-50">
						<h3 className="text-lg font-bold text-gray-800">Total Earnings</h3>
						<h1 className="text-4xl font-bold text-green-700 mt-3">₦ {(affiliateData.totalEarnings || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
						<p className="text-gray-600 mt-2">All commissions earned so far</p>
						<button onClick={handleWithdraw} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
							<AccountBalanceWalletIcon />
							Request Withdrawal
						</button>
					</div>

					{/* Tier 1 & Tier 2 Cards */}
					<div className="mx-4 grid grid-cols-1 gap-4 mb-8">
						<div className="border-1 border-blue-500 rounded-2xl p-6 bg-blue-50">
							<h3 className="text-lg font-bold">Tier 1 Earnings</h3>
							<p className="text-gray-600 mt-1 text-sm">
								From people who pay using <strong>your direct link</strong>
							</p>
							<h2 className="text-3xl font-bold text-blue-700 mt-4">₦ {(affiliateData.tier1Earnings || 0).toLocaleString()}</h2>
						</div>

						<div className="border-1 border-purple-500 rounded-2xl p-6 bg-purple-50">
							<h3 className="text-lg font-bold">Tier 2 Earnings</h3>
							<p className="text-gray-600 mt-1 text-sm">
								From people recruited by <strong>your referrals</strong>
							</p>
							<h2 className="text-3xl font-bold text-purple-700 mt-4">₦ {(affiliateData.tier2Earnings || 0).toLocaleString()}</h2>
						</div>
					</div>

					{/* Affiliate Links Card */}
					<div className="mx-4 border-1 border-gray-300 rounded-2xl p-6 bg-white mb-8">
						<h3 className="text-xl font-bold mb-4">Your Affiliate Links</h3>
						{loading ? (
							<Skeleton variant="rectangular" height={80} className="rounded-lg" />
						) : affiliateData.affiliateLinks.length > 0 ? (
							<div className="space-y-4">
								{affiliateData.affiliateLinks.map((link, i) => (
									<div key={i} className="border border-gray-300 rounded-xl p-4">
										<p className="font-semibold">{link.paymentLinkName}</p>
										<div className="flex items-center mt-3 bg-gray-100 rounded-lg p-3">
											<p className="text-sm truncate flex-1">{link.linkUrl}</p>
											<Tooltip title="Copy">
												<IconButton onClick={() => copyLink(link.linkUrl)}>
													<ContentCopyIcon className="text-green-600" />
												</IconButton>
											</Tooltip>
										</div>
										<p className="text-xs text-gray-500 mt-2">Share this to earn commission</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-gray-500 py-6">No links yet — join a program to start earning!</p>
						)}
					</div>

					{/* Recent Commissions Card */}
					<div className="mx-4 border-1 border-gray-300 rounded-2xl p-6 bg-white pb-20">
						<h3 className="text-xl font-bold mb-4">Recent Commissions</h3>
						{affiliateData.recentCommissions.length > 0 ? (
							<div className="space-y-3">
								{affiliateData.recentCommissions.map((c, i) => (
									<div key={i} className="border-b pb-3 last:border-0">
										<div className="flex justify-between items-start">
											<div>
												<p className="font-medium">{c.paymentLinkName}</p>
												<p className="text-sm text-gray-500">
													{c.tier === 1 ? 'Direct referral' : "Your recruit's referral"} • {c.date}
												</p>
											</div>
											<p className="font-bold text-green-600">+₦ {c.amount.toLocaleString()}</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-gray-500 py-6">No commissions yet — keep sharing!</p>
						)}
					</div>

					<BottomNav />
				</div>

				{/* Desktop View */}
				<div className="hidden md:block">
					<DashboardLayout>
						<div className="px-16 py-8">
							<h1 className="text-3xl font-bold fourier">Affiliate Dashboard</h1>
							<p className="text-gray-600 text-lg mt-2">
								Welcome back, <strong>{affiliateData.name || 'Affiliate'}</strong>! Share your links and earn commissions.
							</p>

							<Grid container spacing={6} className="mt-8">
								{/* Total Earnings Card */}
								<Grid item xs={12} md={4}>
									<div className="border-2 mt-8 border-green-600 rounded-3xl p-10 bg-green-50 text-center">
										<h2 className="text-2xl font-bold">Total Earnings</h2>
										<h1 className="text-6xl font-bold text-green-700 mt-6">₦ {(affiliateData.totalEarnings || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
										<p className="text-gray-600 mt-4 text-lg">All your commissions combined</p>
										<button
											onClick={handleWithdraw}
											className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl text-xl flex items-center justify-center gap-3"
										>
											<NearMeIcon fontSize="large" />
											Request Withdrawal
										</button>
									</div>
								</Grid>

								{/* Tier 1 Card */}
								<Grid item xs={12} md={4}>
									<div className="mt-8 border-2 border-gray-200 rounded-3xl p-10 bg-blue-50">
										<h2 className="text-2xl font-bold text-center">Tier 1 Earnings</h2>
										<p className="text-gray-700 text-center mt-4 text-lg">
											From people who pay using <strong>your personal link</strong>
										</p>
										<h1 className="text-5xl font-bold text-blue-700 text-center mt-8">₦ {(affiliateData.tier1Earnings || 0).toLocaleString()}</h1>
									</div>
								</Grid>

								{/* Tier 2 Card */}
								<Grid item xs={12} md={4}>
									<div className="mt-8 border-2 border-gray-200 rounded-3xl p-10 bg-purple-50">
										<h2 className="text-2xl font-bold text-center">Tier 2 Earnings</h2>
										<p className="text-gray-700 text-center mt-4 text-lg">
											From sales made by <strong>people you recruited</strong>
										</p>
										<h1 className="text-5xl font-bold text-purple-700 text-center mt-8">₦ {(affiliateData.tier2Earnings || 0).toLocaleString()}</h1>
									</div>
								</Grid>
							</Grid>

							<Grid container spacing={6} className="mt-12">
								{/* Affiliate Links Card */}
								<Grid item xs={12} md={7}>
									<div className="border-2 mt-10 border-gray-200 rounded-3xl p-8 bg-white">
										<h2 className="text-2xl font-bold mb-6">Your Affiliate Links</h2>
										{affiliateData.affiliateLinks.length > 0 ? (
											<div className="space-y-6">
												{affiliateData.affiliateLinks.map((link, i) => (
													<div key={i} className="border-2 border-gray-300 rounded-2xl p-6">
														<p className="font-bold text-lg">{link.paymentLinkName}</p>
														<div className="flex items-center mt-4 bg-gray-100 rounded-xl p-4">
															<code className="flex-1 text-sm truncate pr-4">{link.linkUrl}</code>
															<Tooltip title="Copy link">
																<IconButton onClick={() => copyLink(link.linkUrl)}>
																	<ContentCopyIcon fontSize="large" className="text-green-600" />
																</IconButton>
															</Tooltip>
														</div>
														<p className="text-gray-600 mt-3">Share this link to earn commission on every payment</p>
													</div>
												))}
											</div>
										) : (
											<p className="text-center text-gray-500 py-12 text-lg">No links yet. Click "Become an Affiliate" on any payment page to join and start earning!</p>
										)}
									</div>
								</Grid>

								{/* Recent Commissions Card */}
								<Grid item xs={12} md={5}>
									<div className="border-2 border-gray-200 rounded-3xl p-8 mt-10 bg-white">
										<h2 className="text-2xl font-bold mb-6">Recent Commissions</h2>
										{affiliateData.recentCommissions.length > 0 ? (
											<List>
												{affiliateData.recentCommissions.map((c, i) => (
													<ListItem key={i} className="border-b last:border-0 py-4">
														<ListItemText
															primary={<span className="font-semibold">{c.paymentLinkName}</span>}
															secondary={
																<span className="text-gray-600">
																	{c.tier === 1 ? 'You shared directly' : 'From your recruit'} • {c.date}
																</span>
															}
														/>
														<span className="font-bold text-green-600 text-xl">+₦ {c.amount.toLocaleString()}</span>
													</ListItem>
												))}
											</List>
										) : (
											<p className="text-center text-gray-500 py-12 text-lg">No commissions yet — start sharing your links!</p>
										)}
									</div>
								</Grid>
							</Grid>
						</div>
					</DashboardLayout>
				</div>

				<WithdrawDialog opener={openWithdraw} handleClosed={() => setOpenWithdraw(false)} handleClickOpen={() => setOpenWithdraw(true)} setOpener={setOpenWithdraw} />
			</>
		)
};

export default AffiliateDashboard;