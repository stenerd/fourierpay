import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import PaymentLinks from "./pages/PaymentLinks";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import MakePayment from "./pages/MakePayment";
import Withdrawal from "./pages/Withdrawal";
import SinglePaymentLink from "./pages/SinglePaymentLink";
// import Protected from "./utils/axios";
import PrivateRoutes from "./pages/Protected";
import PaymentReciept from "./pages/PaymentReciept";
import PublicPayment from "./pages/PublicPayment";
import AdminLogin from './pages/Admin/Login'
import ProtectedRoute from "./pages/ProtectedRoute";
import Waitlist from "./pages/Waitlist";
import About from "./pages/About";

function App() {
  return (
    <div className="App overflow-hidden">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/signup" element={<Navigate to="/login" />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/pay/:code" element={<MakePayment />} />
        <Route path="/external-link/:code" element={<PublicPayment />} />

        <Route path="/pay/:code/reciept/:reference" element={<PaymentReciept />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/waitlist' element={<Waitlist />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/transaction" element={<Transactions />} />
          <Route path="/dashboard/paymentlinks" element={<PaymentLinks />} />
          <Route path="/dashboard/payment" element={<Payment />} />
          <Route path="/dashboard/withdrawal" element={<Withdrawal />} />
          <Route path="/dashboard/payment/:code" element={<SinglePaymentLink />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
