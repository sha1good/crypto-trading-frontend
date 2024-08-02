import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfilio/Portfolio";
import Auth from "./pages/Auth/Auth";
import { Route, Routes, useLocation } from "react-router-dom";
import StockDetails from "./pages/StockDetails/StockDetails";
import Profile from "./pages/Profile/Profile";
import Notfound from "./pages/Notfound/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import Wallet from "./pages/Wallet/Wallet";
import Watchlist from "./pages/Watchlist/Watchlist";
import TwoFactorAuth from "./pages/Auth/TwoFactorAuth";
import ResetPasswordForm from "./pages/Auth/ResetPassword";
import PasswordUpdateSuccess from "./pages/Auth/PasswordUpdateSuccess";
import LoginWithGoogle from "./pages/Auth/LoginWithGoogle.";
import PaymentSuccess from "./pages/Wallet/PaymentSuccess";
import Withdrawal from "./pages/Wallet/Withdrawal";
import PaymentDetails from "./pages/Wallet/PaymentDetails";
import WithdrawalAdmin from "./Admin/Withdrawal/WithdrawalAdmin";
import Activity from "./pages/Activity/Activity";
import SearchCoin from "./pages/Search/Search";
import { shouldShowNavbar } from "./Util/shouldShowNavbar";


const routes = [
  { path: "/", role: "ROLE_CUSTOMER" },
  { path: "/portfolio", role: "ROLE_CUSTOMER" },
  { path: "/activity", role: "ROLE_CUSTOMER" },
  { path: "/wallet", role: "ROLE_CUSTOMER" },
  { path: "/withdrawal", role: "ROLE_CUSTOMER" },
  { path: "/payment-details", role: "ROLE_CUSTOMER" },
  { path: "/wallet/success", role: "ROLE_CUSTOMER" },
  { path: "/market/:id", role: "ROLE_CUSTOMER" },
  { path: "/watchlist", role: "ROLE_CUSTOMER" },
  { path: "/profile", role: "ROLE_CUSTOMER" },
  { path: "/search", role: "ROLE_CUSTOMER" },
  { path: "/admin/withdrawal", role: "ROLE_ADMIN" }
];

function App() {
  const {auth}=useSelector(store=>store);
  const location = useLocation();
  console.log(auth)
  const dispatch=useDispatch();

  useEffect(()=>{
  dispatch(getUser(localStorage.getItem("token")))
  },[auth.jwt, dispatch])

  

  const showNavbar=auth.user?shouldShowNavbar(location.pathname,routes,auth.user?.role) :false

  return (
    <>
      {" "}
      {auth.user ? ( 
        <>
         {showNavbar && <Navbar />}
         {/* <Navbar /> */}
          <Routes>
            <Route element={<Home />} path="/" />
            
            <Route element={<Portfolio />} path="/portfolio" />
            <Route element={<Activity />} path="/activity" />
            <Route element={<Wallet />} path="/wallet" />
            <Route element={<Withdrawal />} path="/withdrawal" />
            <Route element={<PaymentDetails />} path="/payment-details" />
            <Route element={<Wallet />} path="/wallet/:order_id" />
            <Route element={<StockDetails />} path="/market/:id" />
            <Route element={<Watchlist />} path="/watchlist" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchCoin />} path="/search" />
            {auth.user.role=="ROLE_ADMIN"&&<Route element={<WithdrawalAdmin />} path="/admin/withdrawal" />}
            <Route element={<Notfound />} path="*" />
            
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route element={<Auth />} path="/" />
            <Route element={<Auth />} path="/signup" />
            <Route element={<Auth />} path="/signin" />
            <Route element={<Auth />} path="/forgot-password" />
            <Route element={<LoginWithGoogle />} path="/login-with-google" />
            <Route element={<ResetPasswordForm />} path="/reset-password/:session" />
            <Route element={<PasswordUpdateSuccess />} path="/password-update-successfully" />
            <Route element={<TwoFactorAuth />} path="/two-factor-auth/:session" />
            <Route element={<Notfound />} path="*" />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
