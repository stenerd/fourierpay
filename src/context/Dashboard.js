import axios from "axios";
import { createContext, useEffect, useState } from "react";

// protected endpoint
import Protected from "../utils/axios";


export const DashBoardContext = createContext();


const DashboardProvider = ({children})=>{
    const [bankList,setBankList] = useState('')
    const [benefiaries,setBeneficiary] = useState()
    const [paymentLinks, setPaymentLink] = useState()
    const FetchPaymentLink = async()=>{
        try {
            const response = await Protected.get(`http://localhost:4000/api/payment-link`)  
            console.log(response.data.data)
            setPaymentLink(response.data.data)
        } catch (error) {
            console.log(error)
        }
       
    }
    const fetchBanks = async()=>{
        const response = await axios.get(`http://localhost:4000/api/paystack/bank-list`)
        console.log(response?.data?.data)
        setBankList(response.data.data)
    }
    const FetchBeneficiary = async()=>{
        try {
            const response = await Protected.get(`http://localhost:4000/api/beneficiary/view`)  
            console.log(response.data.data)
            setBeneficiary(response.data.data)
        } catch (error) {
            console.log(error)
        }
       
    }
    useEffect(()=>{
         fetchBanks()  
         FetchBeneficiary()
         FetchPaymentLink()
    },[])
    return(
        <DashBoardContext.Provider value={{bankList,benefiaries, paymentLinks}}>
            {children}
        </DashBoardContext.Provider>
    )
}

export default DashboardProvider;

