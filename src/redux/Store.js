import { configureStore } from '@reduxjs/toolkit'
import DashboardSlice from './DashboardSlice'
export const store = configureStore({
  reducer: { dashboard: DashboardSlice },
})