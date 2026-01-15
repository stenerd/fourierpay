import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AffiliateSignup from './pages/AffiliateSignup';
import AffiliateLogin from './pages/AffiliateLogin';
import AffiliateDashboard from './pages/AffiliateDashboard';
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
import FourierAgent from "./pages/Agent";
import AffiliatePrivateRoutes from "./pages/AffiliatePrivateRoutes";
import Affiliates from './pages/Affiliates'

function App() {
  return (
		<div className="App overflow-hidden">
			<Routes>
				<Route element={<ProtectedRoute />}>
					{/* <Route exact path="/" element={<Home />} /> */}
					<Route exact path="/" element={<Login />} />
					{/* <Route path="/signup" element={<Navigate to="/login" />} /> */}
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/affiliate/signup" element={<AffiliateSignup />} />
					<Route path="/affiliate/login" element={<AffiliateLogin />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/about" element={<About />} />
					<Route path="/reset-password/:token" element={<ResetPassword />} />
				</Route>
				<Route path="/pay/:code" element={<MakePayment />} />
				<Route path="/external-link/:code" element={<PublicPayment />} />

				<Route path="/reciept/:reference" element={<PaymentReciept />} />
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route path="/waitlist" element={<Waitlist />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/profile" element={<Profile />} />
					<Route path="/dashboard/transaction" element={<Transactions />} />
					<Route path="/dashboard/paymentlinks" element={<PaymentLinks />} />
					<Route path="/dashboard/payment" element={<Payment />} />
					<Route path="/dashboard/agent" element={<FourierAgent />} />
					<Route path="/dashboard/withdrawal" element={<Withdrawal />} />
					<Route path="/dashboard/payment/:code" element={<SinglePaymentLink />} />
					<Route path="/dashboard/affiliates" element={<Affiliates />} /> 
				</Route>

				<Route element={<AffiliatePrivateRoutes />}>
					<Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
					{/* Add more affiliate routes here later */}
				</Route>
			</Routes>
		</div>
	)
}

export default App;
