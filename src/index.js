import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import DashboardProvider, { DashBoardContext } from './context/Dashboard';
import { Provider } from 'react-redux'
import { store } from './redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <DashboardProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </ThemeProvider>
    </DashboardProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
