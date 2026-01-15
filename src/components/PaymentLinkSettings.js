import { Divider } from '@mui/material'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import GenericAlertModal from './GenericAlertModal'
import ToggleButton from './ToggleButton'
import Protected, { BASE_URL } from '../utils/axios'
import { ToastContainer, toast } from 'react-toastify'
import GenericAlertDialog from './GenericAlertDialog'

const STATUS_MAP = {
	inactive: 'Not Active',
	active: 'Active',
	paused: 'Paused',
	expired: 'Expired',
	terminated: 'Terminated',
}

export default function PaymentLinkSettings({ recallServerData, paymentLink, copyText }) {
	const [openDownloadModal, setOpenDownloadModal] = useState(false)
	const [openStatusModal, setOpenStatusModal] = useState(false)
	const [openSetPublicModal, setOpenSetPublicModal] = useState(false)
	const fileTypes = ['xlsx']

	const [open21, setOpen21] = useState(false)
	const handleClickOpen21 = () => setOpen21(true)
	const handleClose21 = () => setOpen21(false)

	const [open, setOpen] = useState({
		state: true,
		status: true,
		link: true,
		affiliate: true,
	})

	const [statusHistory, setStatusHistory] = useState({ old: '', new: '' })
	const [statusCheckBox, setStatusCheckBox] = useState(paymentLink?.status || 'active')

	const [showUpload, setShowUpload] = useState(paymentLink?.state === 'private')
	const [showPublicLink, setShowPublicLink] = useState(paymentLink?.activate_public_link || false)
	const [remountShowUploadToggle, setRemountShowUploadToggle] = useState(1)

	// Affiliate Program States
	const [affiliateEnabled, setAffiliateEnabled] = useState(paymentLink?.affiliateEnabled || false)
	const [tier1FixedAmount, setTier1FixedAmount] = useState(paymentLink?.tier1FixedAmount || '')
	const [tier1Percent, setTier1Percent] = useState(paymentLink?.tier1CommissionPercent || '')
	const [tier2FixedAmount, setTier2FixedAmount] = useState(paymentLink?.tier2FixedAmount || '')
	const [tier2Percent, setTier2Percent] = useState(paymentLink?.tier2CommissionPercent || '')
	const [savingAffiliate, setSavingAffiliate] = useState(false)

	const changeSetOpenState = (key) => {
		setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
	}

	const changeSetShowPublicLink = async (val) => {
		try {
			await changePublicLinkCall()
			toast.success(val ? 'Link is now transparent to the public.' : 'Link is not transparent.')
			setShowPublicLink(val)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed')
		}
	}

	const changeSetStatusCheckBox = (e, key, disabled = false) => {
		if (statusCheckBox === key || disabled) return
		setStatusHistory({ old: statusCheckBox, new: key })
		setOpenStatusModal(true)
		handleClickOpen21()
	}

	const confirmSetShowUpload = async (val) => {
		if (showUpload && !val && paymentLink.state === 'private') {
			setRemountShowUploadToggle((prev) => (prev === 1 ? 2 : 1))
			setOpenSetPublicModal(true)
		} else {
			setShowUpload(val)
		}
	}

	const confirmStatusChange = async (key) => {
		try {
			await changeStatusCall(key)
			toast.success('Status successfully changed')
			setStatusCheckBox(key)
			setOpenStatusModal(false)
			setOpen21(false)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed')
		}
	}

	// Save Affiliate Settings
	const saveAffiliateSettings = async () => {
		// Basic validation
		if (tier1FixedAmount && isNaN(tier1FixedAmount)) {
			toast.error('Tier 1 fixed amount must be a valid number')
			return
		}
		if (tier2FixedAmount && isNaN(tier2FixedAmount)) {
			toast.error('Tier 2 fixed amount must be a valid number')
			return
		}
		if (tier1Percent && (tier1Percent < 0 || tier1Percent > 100)) {
			toast.error('Tier 1 percentage must be between 0 and 100')
			return
		}
		if (tier2Percent && (tier2Percent < 0 || tier2Percent > 100)) {
			toast.error('Tier 2 percentage must be between 0 and 100')
			return
		}

		try {
			setSavingAffiliate(true)
			await Protected.put(`${BASE_URL}/api/payment-link/${paymentLink.code}/affiliate-settings`, {
				affiliateEnabled,
				tier1FixedAmount: tier1FixedAmount ? Number(tier1FixedAmount) : null,
				tier1CommissionPercent: tier1Percent ? Number(tier1Percent) : null,
				tier2FixedAmount: tier2FixedAmount ? Number(tier2FixedAmount) : null,
				tier2CommissionPercent: tier2Percent ? Number(tier2Percent) : null,
			})
			toast.success('Affiliate program settings saved successfully!')
			recallServerData()
		} catch (error) {
			console.log(error)
			toast.error(error.response?.data?.message || 'Failed to save affiliate settings')
		} finally {
			setSavingAffiliate(false)
		}
	}

	const [file, setFile] = useState(null)
	const handleChange = (file) => {
		setFile(file)
		if (file) setOpenDownloadModal(true)
	}

	const closeDownloadModal = (val) => {
		setFile(null)
		setOpenDownloadModal(val)
	}

	// API calls
	const uploadDocumentCall = async () => {
		try {
			const formData = new FormData()
			formData.append('file', file)
			await Protected.post(`${BASE_URL}/api/payment-link/set-private/${paymentLink?.code}`, formData)
			toast.success('Your payment link is now private, view payers on the payers sheet tab.')
			setFile(null)
			recallServerData()
			setOpenDownloadModal(false)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed')
		}
	}

	const setToPublicCall = async () => {
		try {
			await Protected.put(`${BASE_URL}/api/payment-link/set-public/${paymentLink?.code}`, {})
			toast.success('Your payment link is now public.')
			recallServerData()
			setOpenSetPublicModal(false)
			setShowUpload(false)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed')
		}
	}

	const changeStatusCall = async (status) => {
		const resp = await Protected.put(`${BASE_URL}/api/payment-link/change-status/${paymentLink?.code}`, { status })
		return resp
	}

	const changePublicLinkCall = async () => {
		const resp = await Protected.put(`${BASE_URL}/api/payment-link/${paymentLink?.code}/change-public-link-state`)
		return resp
	}

	return (
		<>
			<div className="md:w-[65%] w-full">
				{/* Basic link behaviour */}
				<div data-accordion="collapse" className="text-[#1d3329]">
					<h2>
						<div className="flex items-center justify-between w-full pb-3 pt-5 text-left">
							<div className="flex">
								<div className="flex items-center">
									<img src="/images/state-icon.svg" alt="state-icon" />
								</div>
								<div className="ml-3">
									<span className="font-bold">Basic link behaviour</span>
								</div>
							</div>
							<svg
								onClick={() => changeSetOpenState('state')}
								className={`w-6 h-6 ${open.state ? 'rotate-180' : ''} shrink-0 cursor-pointer`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</h2>
					<div>
						<div className="px-5 c-payment-link-setting-content">
							<p className="mb-2 text-[#909492] text-sm w-[80%]">
								Choose the visibility of your payment links for users to see or not. If your choice is to make this payment link private then upload the payers sheet.
							</p>
							{open.state && (
								<>
									<div className="flex mt-4 text-gray-600 justify-between md:w-[90%] w-full">
										<p className="font-bold text-base">Make your payment link private</p>
										<ToggleButton full={true} initialState={showUpload} key={remountShowUploadToggle} switcher={confirmSetShowUpload} />
									</div>
									{showUpload && paymentLink.state === 'public' && (
										<div className="mt-4 text-gray-600 md:w-[90%] w-full">
											<p className="font-bold mb-2 text-base">Upload payer sheet to complete the privitization process</p>
											<FileUploader multiple={false} handleChange={handleChange} name="file" types={fileTypes}>
												<div className="flex justify-center p-8 c-dd-background">
													<div className="text-center">
														<div className="flex justify-center">
															<img src="/images/state-download-icon.svg" alt="state-icon" />
														</div>
														<p className="mt-4 font-bold text-gray-500">Drag and drop files here</p>
														<div className="py-6 relative">
															<span className="c-dd-abs">OR</span>
															<Divider />
														</div>
														<button className="c-secondary-button-2">Browse device</button>
													</div>
												</div>
											</FileUploader>
											<span className="cursor-pointer underline text-base mt-1 text-gray-700 hover:text-[#2a92f2]">Download sheet sample</span>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>

				{/* Status of link */}
				<div data-accordion="collapse" className="text-[#1d3329] mt-3">
					<h2>
						<div className="flex items-center justify-between w-full pb-3 pt-5 text-left">
							<div className="flex">
								<div className="flex items-center">
									<img src="/images/status.svg" alt="status-icon" />
								</div>
								<div className="ml-3">
									<span className="font-bold">Status of link</span>
								</div>
							</div>
							<svg
								onClick={() => changeSetOpenState('status')}
								className={`w-6 h-6 ${open.status ? 'rotate-180' : ''} shrink-0 cursor-pointer`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</h2>
					<div>
						<div className="px-5 c-payment-link-setting-content">
							<p className="mb-2 text-[#909492] text-sm w-[80%]">Update the status of your links based on the progress of each individual contributions and activities.</p>
							{open.status && (
								<div className="mt-4 text-gray-600 w-[90%]">
									<div className="flex items-center mr-4 mb-3">
										<input id="radio1" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'inactive'} />
										<label onClick={(e) => changeSetStatusCheckBox(e, 'inactive', true)} className="opacity-50 flex items-center cursor-not-allowed font-bold purple">
											<span className="w-4 h-4 inline-block mr-1 border border-grey"></span> Not Active
										</label>
									</div>
									<div className="flex items-center mr-4 mb-3">
										<input id="radio2" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'active'} />
										<label onClick={(e) => changeSetStatusCheckBox(e, 'active')} className="flex items-center cursor-pointer font-bold">
											<span className="w-4 h-4 inline-block mr-1 border border-grey"></span> Active
										</label>
									</div>
									<div className="flex items-center mr-4 mb-3">
										<input id="radio3" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'paused'} />
										<label onClick={(e) => changeSetStatusCheckBox(e, 'paused')} className="flex items-center cursor-pointer font-bold blue">
											<span className="w-4 h-4 inline-block mr-1 border border-grey"></span> Paused
										</label>
									</div>
									<div className="flex items-center mr-4 mb-3">
										<input id="radio4" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'expired'} />
										<label onClick={(e) => changeSetStatusCheckBox(e, 'expired', true)} className="opacity-50 flex items-center cursor-not-allowed font-bold yellow">
											<span className="w-4 h-4 inline-block mr-1 border border-grey"></span> Expired
										</label>
									</div>
									<div className="flex items-center mr-4 mb-3">
										<input id="radio5" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'terminated'} />
										<label onClick={(e) => changeSetStatusCheckBox(e, 'terminated')} className="flex items-center cursor-pointer font-bold red">
											<span className="w-4 h-4 inline-block mr-1 border border-grey"></span> Terminated
										</label>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Share links */}
				<div data-accordion="collapse" className="text-[#1d3329] mt-3">
					<h2>
						<div className="flex items-center justify-between w-full pb-3 pt-5 text-left">
							<div className="flex">
								<div className="flex items-center">
									<img src="/images/link.svg" alt="status-icon" />
								</div>
								<div className="ml-3">
									<span className="font-bold">Share links to become more transparent</span>
								</div>
							</div>
							<svg
								onClick={() => changeSetOpenState('link')}
								className={`w-6 h-6 ${open.link ? 'rotate-180' : ''} shrink-0 cursor-pointer`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</h2>
					<div>
						<div className="px-5 c-payment-link-setting-content">
							<p className="mb-2 text-[#909492] text-sm w-[80%]">Generate links that would grant access to potential persons to monitor the contribution progress of the team.</p>
							{open.link && (
								<div className="mb-8 text-gray-600 w-[90%]">
									<div className="flex mb-4 text-gray-600 justify-between w-full">
										<p className="font-bold text-base">Make payment analysis available for the public</p>
										<ToggleButton full={true} initialState={showPublicLink} switcher={changeSetShowPublicLink} />
									</div>
									{showPublicLink && (
										<div className="mt-8 flex">
											<div className="pl-4 pr-20 py-3 c-link-public-url">http://app.fourierpay.com/payment/{paymentLink?.code}</div>
											<div className="c-link-public-url-button" onClick={() => copyText(`http://app.fourierpay.com/payment/${paymentLink?.code}`)}>
												<span>copy</span>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Affiliate Program Section */}
				<div data-accordion="collapse" className="text-[#1d3329] mt-3">
					<h2>
						<div className="flex items-center justify-between w-full pb-3 pt-5 text-left">
							<div className="flex">
								<div className="flex items-center">
									<img src="/images/money-share.svg" alt="affiliate-icon" className="w-6 h-6" />
								</div>
								<div className="ml-3">
									<span className="font-bold">Affiliate Program</span>
								</div>
							</div>
							<svg
								onClick={() => changeSetOpenState('affiliate')}
								className={`w-6 h-6 ${open.affiliate ? 'rotate-180' : ''} shrink-0 cursor-pointer`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</h2>
					<div>
						<div className="px-5 c-payment-link-setting-content">
							<p className="mb-2 text-[#909492] text-sm w-[80%]">Let others earn money by sharing your link. You decide how much they earn per successful payment.</p>
							{open.affiliate && (
								<div className="mt-4 text-gray-600 w-[90%] space-y-8">
									<div className="flex justify-between items-center">
										<p className="font-bold text-base">Enable Affiliate Program</p>
										<ToggleButton full={true} initialState={affiliateEnabled} switcher={setAffiliateEnabled} />
									</div>

									{affiliateEnabled && (
										<>
											<div>
												<h3 className="font-bold text-lg mb-4">Tier 1 - Direct Referrals</h3>
												<p className="text-sm text-gray-500 mb-4">Paid to someone who shares your link and someone pays through it</p>

												<div className="space-y-6">
													<div>
														<label className="font-bold block mb-2">Fixed Amount (Recommended)</label>
														<p className="text-sm text-gray-500 mb-2">Flat ₦ amount per successful payment</p>
														<input
															type="number"
															placeholder="e.g. 5000"
															value={tier1FixedAmount}
															onChange={(e) => setTier1FixedAmount(e.target.value)}
															className="py-2 px-4 w-full md:w-1/2 outline-none rounded-lg border border-gray-400 focus:border-green-500"
														/>
													</div>

													<div>
														<label className="font-bold block mb-2">Percentage (Optional)</label>
														<p className="text-sm text-gray-500 mb-2">Only used if no fixed amount is set</p>
														<input
															type="number"
															min="0"
															max="100"
															placeholder="e.g. 15"
															value={tier1Percent}
															onChange={(e) => setTier1Percent(e.target.value)}
															className="py-2 px-4 w-full md:w-1/2 outline-none rounded-lg border border-gray-400 focus:border-green-500"
														/>
													</div>
												</div>
											</div>

											<Divider />

											<div>
												<h3 className="font-bold text-lg mb-4">Tier 2 - Recruited Referrals</h3>
												<p className="text-sm text-gray-500 mb-4">Paid to the recruiter when someone they invited makes a sale</p>

												<div className="space-y-6">
													<div>
														<label className="font-bold block mb-2">Fixed Amount (Recommended)</label>
														<p className="text-sm text-gray-500 mb-2">Flat ₦ amount per successful payment</p>
														<input
															type="number"
															placeholder="e.g. 2000"
															value={tier2FixedAmount}
															onChange={(e) => setTier2FixedAmount(e.target.value)}
															className="py-2 px-4 w-full md:w-1/2 outline-none rounded-lg border border-gray-400 focus:border-green-500"
														/>
													</div>

													<div>
														<label className="font-bold block mb-2">Percentage (Optional)</label>
														<p className="text-sm text-gray-500 mb-2">Only used if no fixed amount is set</p>
														<input
															type="number"
															min="0"
															max="100"
															placeholder="e.g. 5"
															value={tier2Percent}
															onChange={(e) => setTier2Percent(e.target.value)}
															className="py-2 px-4 w-full md:w-1/2 outline-none rounded-lg border border-gray-400 focus:border-green-500"
														/>
													</div>
												</div>
											</div>

											<div className="pt-6">
												<button onClick={saveAffiliateSettings} disabled={savingAffiliate} className="c-primary-button text-lg px-8 py-3">
													{savingAffiliate ? 'Saving...' : 'Save Affiliate Settings'}
												</button>
											</div>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* All Modals */}
			<GenericAlertModal opened={openDownloadModal} width={600} handleClosed={closeDownloadModal}>
				<div>
					<h4 className="text-xl font-bold text-[#1d3329]">Warning Alert!</h4>
					<p className="text-gray-700">Are you sure you want to complete the process of privatizing your payment link?</p>
					<p>
						<span className="text-gray-700 text-base underline">{file ? file.name : ''}</span> -
						<span className="text-[#2a92f2] text-sm text-base">{file ? file.lastModifiedDate.toString() : ''}</span>
					</p>
					<div className="flex justify-end mt-6">
						<button className="c-secondary-button-sm mr-3" onClick={() => closeDownloadModal(false)}>
							Back
						</button>
						<button className="c-secondary-button-2" onClick={uploadDocumentCall}>
							Complete
						</button>
					</div>
				</div>
			</GenericAlertModal>

			<GenericAlertModal opened={openStatusModal} width={600} handleClosed={setOpenStatusModal}>
				<div>
					<h4 className="text-xl font-bold text-[#1d3329]">Status Change Alert!</h4>
					<p className="text-gray-700">
						Are you sure you want to change your status from
						<span className="font-bold"> {STATUS_MAP[statusHistory.old]}</span> to
						<span className="font-bold"> {STATUS_MAP[statusHistory.new]}</span>?
					</p>
					<div className="flex justify-end mt-6">
						<button className="c-secondary-button-sm mr-3" onClick={() => setOpenStatusModal(false)}>
							No
						</button>
						<button className="c-secondary-button-2" onClick={() => confirmStatusChange(statusHistory.new)}>
							Yes
						</button>
					</div>
				</div>
			</GenericAlertModal>

			<GenericAlertModal opened={openSetPublicModal} width={600} handleClosed={setOpenSetPublicModal}>
				<div>
					<h4 className="text-xl font-bold text-[#1d3329]">State Change Alert!</h4>
					<p className="text-gray-700">
						Are you sure you want to make your payment link <span className="font-bold">public</span>?
					</p>
					<div className="flex justify-end mt-6">
						<button className="c-secondary-button-sm mr-3" onClick={() => setOpenSetPublicModal(false)}>
							No
						</button>
						<button className="c-secondary-button-2" onClick={setToPublicCall}>
							Yes
						</button>
					</div>
				</div>
			</GenericAlertModal>

			<GenericAlertDialog open21={open21} handleClickOpen21={handleClickOpen21} setOpen21={setOpen21} handleClose21={handleClose21}>
				<div>
					<h4 className="text-xl font-bold text-center text-[#1d3329]">Status Change Alert!</h4>
					<p className="text-gray-700 py-4 text-center">
						Are you sure you want to change your status from
						<span className="font-bold"> {STATUS_MAP[statusHistory.old]}</span> to
						<span className="font-bold"> {STATUS_MAP[statusHistory.new]}</span>?
					</p>
					<div className="flex justify-center mt-6">
						<button className="c-secondary-button-sm mr-3" onClick={() => setOpen21(false)}>
							No
						</button>
						<button className="c-secondary-button-2" onClick={() => confirmStatusChange(statusHistory.new)}>
							Yes
						</button>
					</div>
				</div>
			</GenericAlertDialog>

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
