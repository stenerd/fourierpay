import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:[],
    profile:{},
    beneficiaries:[],
    paymentLinks:[],
    singleLink:{},
    payments:{}
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    ADD_PROFILE: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.profile = action.payload
    },
    ADD_BENEFICIARY: (state,action) => {
      state.beneficiaries = action.payload
    },
    ADD_PAYMENTLINKS:(state,action)=>{
      state.paymentLinks = action.payload
    },
    SINGLE_PAYMENTLINK: (state, action) => {
      state.singleLink = action.payload
    },
    PAYMENTS:(state,action)=>{
      state.payments = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { ADD_BENEFICIARY,ADD_PROFILE,ADD_PAYMENTLINKS,SINGLE_PAYMENTLINK,PAYMENTS } = dashboardSlice.actions

export default dashboardSlice.reducer