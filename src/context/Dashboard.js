import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

// protected endpoint
import Protected from "../utils/axios";
import { DashboardReducer } from "./DashboardReducer";


export const DashBoardContext = createContext();

const INITIAL_STATE = {
    data: []
}


const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DashboardReducer, INITIAL_STATE)

    console.log(state)

    // const [bankList,setBankList] = useState('')
    const [beneficiaries, setBeneficiary] = useState()
    // const fetchBanks = async()=>{
    //     const response = await axios.get(`http://localhost:4000/api/paystack/bank-list`)
    //     console.log(response?.data?.data)
    //     setBankList(response.data.data)
    // }

    // const fetchLink = async () => {
    //     const response = await Protected.get(`http://localhost:4000/api/payment-link/r5kbeINOcs`)
    //     console.log(response)
    // }
    // const FetchBeneficiary = async () => {
    //     try {
    //         const response = await Protected.get(`http://localhost:4000/api/beneficiary/view`)
    //         console.log(response.data.data)
    //         setBeneficiary(response.data.data)
    //         // dispatch({type:'ADD_BENEFICIARY',payload:response?.data.data})
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
    // useEffect(()=>{
    //      fetchLink()
    // },[])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <DashBoardContext.Provider value={{ beneficiaries, dispatch, state ,open,setOpen,handleOpen,handleClose}}>
            {children}
        </DashBoardContext.Provider>
    )
}

export default DashboardProvider;

