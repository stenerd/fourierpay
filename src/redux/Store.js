import { configureStore } from '@reduxjs/toolkit'
import DashboardSlice from './DashboardSlice'

// import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  dashboard: DashboardSlice
});


const persistedReducer = persistReducer(persistConfig, reducers);


// const reducers = combineReducers({ user: userReducer });
// const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});


// export const store = configureStore({
//   reducer: { dashboard: DashboardSlice },
// })