import { Divider } from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import GenericAlertModal from "./GenericAlertModal";
import ToggleButton from "./ToggleButton";
import axios from 'axios'
import Protected, { BASE_URL } from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import GenericAlertDialog from "./GenericAlertDialog";

const STATUS_MAP = {
    'inactive': 'Not Active',
    'active': 'Active',
    'paused': 'Paused',
    'expired': 'Expired',
    'terminated': 'Terminated',
}

export default function PaymentLinkSettings({ recallServerData, initialOpenState, linkData, paymentLink, copyText }) {
    const [openDownloadModal, setOpenDownloadModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [openSetPublicModal, setOpenSetPublicModal] = useState(false);
    const fileTypes = ["xlsx"];

    const [open21, setOpen21] = useState(false);
    const handleClickOpen21 = () => {
        setOpen21(true);
    };

    const handleClose21 = () => {
        setOpen21(false);
    };


    const [open, setOpen] = useState({
        state: true,
        status: true,
        link: true
    })
    const [statusHistory, setStatusHistory] = useState({
        old: '',
        new: ''
    })

    const [statusCheckBox, setStatusCheckBox] = useState(paymentLink && paymentLink.status)

    const [showUpload, setShowUpload] = useState(paymentLink && (paymentLink.state === 'private'))
    const [showPublicLink, setShowPublicLink] = useState(paymentLink && paymentLink.activate_public_link)
    const [remountShowUploadToggle, setRemountShowUploadToggle] = useState(1)

    const changeSetOpenState = (key) => {
        setOpen({ ...open, [key]: !open[key] })
    }

    const changeSetShowPublicLink = async (val) => {
        try {
            const resp = await changePublicLinkCall()
            console.log('resp >> ', resp)
            toast.success(val ? 'Link is now transparent to the public.' : 'Link is not transparent.')
            setShowPublicLink(val)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const changeSetStatusCheckBox = (e, key, disabled = false) => {
        if ((statusCheckBox === key) || disabled) return;
        const sHistory = {
            old: statusCheckBox,
            new: key
        }
        e.preventDefault()
        e.stopPropagation()
        setStatusHistory(sHistory)
        setOpenStatusModal(true)
        handleClickOpen21()
    }

    const confirmSetShowUpload = async (val) => {
        if (showUpload && !val && (paymentLink.state === 'private')) {
            setRemountShowUploadToggle(remountShowUploadToggle === 1 ? 2 : 1)
            setOpenSetPublicModal(true)
        } else {
            setShowUpload(val)
        }
    }

    const confirmStatusChange = async (key) => {
        try {
            const resp = await changeStatusCall(key)
            console.log('resp >> ', resp)
            toast.success('Status succesfully changed')
            setStatusCheckBox(key)
            setOpenStatusModal(false)
            setOpen21(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        if (file) {
            console.log('v >> ', file)
            setOpenDownloadModal(true)
        }
    };

    const closeDownloadModal = (val) => {
        setFile(null)
        setOpenDownloadModal(val)
    }

    //api calls
    const uploadDocumentCall = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            await Protected.post(`${BASE_URL}/api/payment-link/set-private/${paymentLink && paymentLink.code}`, formData)
            toast.success('Your payment link is now private, view payers on the payers sheet tab.')
            setFile(null)
            recallServerData()
            setOpenDownloadModal(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const setToPublicCall = async () => {
        try {
            const resp = await Protected.put(`${BASE_URL}/api/payment-link/set-public/${paymentLink && paymentLink.code}`, {})
            console.log('resp >> ', resp)
            toast.success('Your payment link is now public.')
            recallServerData()
            setOpenSetPublicModal(false)
            setShowUpload(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const changeStatusCall = async (status) => {
        const resp = await Protected.put(`${BASE_URL}/api/payment-link/change-status/${paymentLink && paymentLink.code}`, {
            status
        })
        return resp;
    };

    const changePublicLinkCall = async () => {
        const resp = await Protected.put(`${BASE_URL}/api/payment-link/${paymentLink && paymentLink.code}/change-public-link-state`)
        return resp;
    };

    return (
        <>
            <div className="md:w-[65%] w-full">
                <div data-accordion="collapse" className="text-[#1d3329]">
                    <h2>
                        <div type="button" className="flex items-center justify-between w-full pb-3 pt-5 text-left">
                            <div className="flex">
                                <div className="flex items-center">
                                    <img src="/images/state-icon.svg" alt="state-icon" />
                                </div>
                                <div className="ml-3">
                                    <span className="font-bold">
                                        Basic link behaviour
                                    </span>

                                </div>
                            </div>

                            <svg onClick={() => changeSetOpenState('state')} className={`w-6 h-6 ${open.state ? 'rotate-180' : ''} shrink-0 cursor-pointer`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </h2>
                    <div>
                        <div className="px-5 c-payment-link-setting-content">
                            <p className="mb-2 text-[#909492] text-sm w-[80%]">
                                Choose the visibility of your payment links for users to see or not. If your choice is to make this payment link private then upload the payers sheet.
                            </p>
                            {
                                open.state ? (
                                    <>
                                        <div className="flex mt-4 text-gray-600 justify-between md:w-[90%] w-full">
                                            <p className="font-bold text-base">Make your payment link private</p>
                                            <ToggleButton full={true} initialState={showUpload} key={remountShowUploadToggle} switcher={(val) => confirmSetShowUpload(val)} />
                                        </div>
                                        {
                                            (showUpload && (paymentLink.state === 'public')) ? (
                                                <>
                                                    <div className="mt-4 text-gray-600 md:w-[90%] w-full">
                                                        <p className="font-bold mb-2 text-base">Upload payer sheet to complete the privitization process</p>
                                                        <FileUploader
                                                            multiple={false}
                                                            handleChange={handleChange}
                                                            name="file"
                                                            types={fileTypes}
                                                        >
                                                            <div className="flex justify-center p-8 c-dd-background">
                                                                <div className="text-center">
                                                                    <div className="flex justify-center">
                                                                        <img className="text-center" src="/images/state-download-icon.svg" alt="state-icon" />
                                                                    </div>
                                                                    <p className="mt-4 font-bold text-gray-500">
                                                                        Drag and drop files here
                                                                    </p>
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
                                                </>
                                            ) : ''
                                        }
                                    </>
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
                <div data-accordion="collapse" className="text-[#1d3329] mt-3">
                    <h2>
                        <div type="button" className="flex items-center justify-between w-full pb-3 pt-5 text-left">
                            <div className="flex">
                                <div className="flex items-center">
                                    <img src="/images/status.svg" alt="status-icon" />
                                </div>
                                <div className="ml-3">
                                    <span className="font-bold">
                                        Status of link
                                    </span>
                                </div>
                            </div>
                            <svg onClick={() => changeSetOpenState('status')} className={`w-6 h-6 ${open.status ? 'rotate-180' : ''} shrink-0 cursor-pointer`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </h2>
                    <div>
                        <div className="px-5 c-payment-link-setting-content">
                            <p className="mb-2 text-[#909492] text-sm w-[80%]">
                                Update the status of your links based on the progress of each individual contributions and activities.
                            </p>
                            {
                                open.status ? (
                                    <div className="mt-4 text-gray-600 w-[90%]">
                                        <div className="">

                                            <div className="">

                                                <div className="flex items-center mr-4 mb-3">
                                                    <input id="radio1" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'inactive'} />
                                                    <label onClick={(e) => changeSetStatusCheckBox(e, 'inactive', true)} for="radio1" className="opacity-50 flex items-center cursor-not-allowed font-bold purple">
                                                        <span className="w-4 h-4 inline-block mr-1 border border-grey font-bold purple"></span>
                                                        Not Active
                                                    </label>
                                                </div>

                                                <div className="flex items-center mr-4 mb-3">
                                                    <input id="radio2" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'active'} />
                                                    <label for="radio2" className="flex items-center cursor-pointer font-bold" onClick={(e) => changeSetStatusCheckBox(e, 'active')}>
                                                        <span className="w-4 h-4 inline-block mr-1 border border-grey font-bold"></span>
                                                        Active
                                                    </label>
                                                </div>

                                                <div className="flex items-center mr-4 mb-3">
                                                    <input id="radio3" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'paused'} />
                                                    <label for="radio3" className="flex items-center cursor-pointer font-bold blue" onClick={(e) => changeSetStatusCheckBox(e, 'paused')}>
                                                        <span className="w-4 h-4 inline-block mr-1 border border-grey font-bold blue"></span>
                                                        Paused
                                                    </label>
                                                </div>

                                                <div className="flex items-center mr-4 mb-3">
                                                    <input id="radio4" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'expired'} />
                                                    <label for="radio4" className="opacity-50 flex items-center cursor-not-allowed font-bold yellow" onClick={(e) => changeSetStatusCheckBox(e, 'expired', true)}>
                                                        <span className="w-4 h-4 inline-block mr-1 border border-grey font-bold yellow"></span>
                                                        Expired
                                                    </label>
                                                </div>

                                                <div className="flex items-center mr-4 mb-3">
                                                    <input id="radio5" type="radio" name="radio" className="hidden" checked={statusCheckBox === 'terminated'} />
                                                    <label for="radio5" className="flex items-center cursor-pointer font-bold red" onClick={(e) => changeSetStatusCheckBox(e, 'terminated')}>
                                                        <span className="w-4 h-4 inline-block mr-1 border border-grey font-bold red"></span>
                                                        Terminated
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''
                            }

                        </div>
                    </div>
                </div>
                <div data-accordion="collapse" className="text-[#1d3329] mt-3">
                    <h2>
                        <div type="button" className="flex items-center justify-between w-full pb-3 pt-5 text-left">
                            <div className="flex">
                                <div className="flex items-center">
                                    <img src="/images/link.svg" alt="status-icon" />
                                </div>
                                <div className="ml-3">
                                    <span className="font-bold">
                                        Share links to become more transparent
                                    </span>
                                </div>
                            </div>
                            <svg onClick={() => changeSetOpenState('link')} className={`w-6 h-6 ${open.link ? 'rotate-180' : ''} shrink-0 cursor-pointer`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </h2>
                    <div>
                        <div className="px-5 c-payment-link-setting-content">
                            <p className="mb-2 text-[#909492] text-sm w-[80%]">
                                Generate links that would grant access to potential persons to monitor the contribution progress of the team.
                            </p>
                            {
                                open.link ? (
                                    <div className="mb-8 text-gray-600 w-[90%]">
                                        <div className="flex mb-4 text-gray-600 justify-between w-full">
                                            <p className="font-bold text-base">Make paymemt analysis available for the public</p>
                                            <ToggleButton full={true} initialState={showPublicLink} switcher={(val) => changeSetShowPublicLink(val)} />
                                        </div>
                                        {
                                            showPublicLink ? (
                                                <div className="mt-8 flex">
                                                    <div className="pl-4 pr-20 py-3 c-link-public-url">
                                                        http://www.fourierpay.com/payment/{paymentLink && paymentLink.code}
                                                    </div>
                                                    <div className="c-link-public-url-button" onClick={() => copyText(`http://www.fourierpay.com/payment/${paymentLink && paymentLink.code}`)}>
                                                        <span>copy</span>
                                                    </div>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                ) : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
            <GenericAlertModal opened={openDownloadModal} width={600} handleClosed={(val) => closeDownloadModal(val)}>
                <div>
                    <h4 className="text-xl font-bold text-[#1d3329]">Warning Alert!</h4>
                    <p className="text-gray-700">Are you sure you want to complete the process of privatizing your payment link?</p>
                    <p>
                        <span className="text-gray-700 text-base underline">{file ? file.name : ''}</span> -
                        <span className="text-[#2a92f2] text-sm text-base">{file ? file.lastModifiedDate.toString() : ''}</span>
                    </p>
                    <div className="flex justify-end mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => closeDownloadModal(false)}>Back</button>
                        <button className="c-secondary-button-2" onClick={() => uploadDocumentCall()}>Complete</button>
                    </div>
                </div>
            </GenericAlertModal>
            <GenericAlertModal opened={openStatusModal} width={600} handleClosed={(val) => setOpenStatusModal(val)}>
                <div>
                    <h4 className="text-xl font-bold text-[#1d3329]">Status Change Alert!</h4>
                    <p className="text-gray-700">Are you sure you want to change your status from
                        <span className="font-bold">
                            &nbsp;{STATUS_MAP[statusHistory.old]}
                        </span> to
                        <span className="font-bold">
                            &nbsp;{STATUS_MAP[statusHistory.new]}
                        </span>
                        ?
                    </p>
                    <div className="flex justify-end mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => setOpenStatusModal(false)}>No</button>
                        <button className="c-secondary-button-2" onClick={() => confirmStatusChange(statusHistory.new)}>Yes</button>
                    </div>
                </div>
            </GenericAlertModal>
            <GenericAlertModal opened={openSetPublicModal} width={600} handleClosed={(val) => setOpenSetPublicModal(val)}>
                <div>
                    <h4 className="text-xl font-bold text-[#1d3329]">State Change Alert!</h4>
                    <p className="text-gray-700">Are you sure you want to make your payment Link
                        <span className="font-bold">
                            &nbsp;public
                        </span>
                        ?
                    </p>
                    <div className="flex justify-end mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => setOpenSetPublicModal(false)}>No</button>
                        <button className="c-secondary-button-2" onClick={() => setToPublicCall()}>Yes</button>
                    </div>
                </div>
            </GenericAlertModal>
            <GenericAlertDialog open21={open21} handleClickOpen21={handleClickOpen21} setOpen21={setOpen21} handleClose21={handleClose21}>
                <div>
                    <h4 className="text-xl font-bold text-center text-[#1d3329]">Status Change Alert!</h4>
                    <p className="text-gray-700 py-4 text-center">Are you sure you want to change your status from
                        <span className="font-bold">
                            &nbsp;{STATUS_MAP[statusHistory.old]}
                        </span> to
                        <span className="font-bold">
                            &nbsp;{STATUS_MAP[statusHistory.new]}
                        </span>
                        ?
                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="c-secondary-button-sm mr-3" onClick={() => setOpen21(false)}>No</button>
                        <button className="c-secondary-button-2" onClick={() => confirmStatusChange(statusHistory.new)}>Yes</button>
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


    );
}