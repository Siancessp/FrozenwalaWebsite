import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import "./assets/css/theme.css";
import Signup from "./Pages/Auth/Signup";
import LoginOTP from "./Pages/Auth/LoginOTP";
import Signupotp from "./Pages/Auth/Signupotp";
import Product from "./Pages/Home/Product";
import Menu from "./Pages/Home/Menu";
import Profile from "./Pages/Extra/Profile";
import CartDetails from "./Pages/Cart/CartDetails";
import Checkout from "./Pages/Cart/Checkout";
import OrderDetails from "./Pages/Extra/OrderDetails";
import Terms from "./Pages/Footer.js/Terms";
import Privacy from "./Pages/Footer.js/Privacy";
import Refund from "./Pages/Footer.js/Refund";
import AboutUs from "./Pages/Footer.js/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginotp" element={<LoginOTP />} />
        <Route path="/signupotp" element={<Signupotp />} />
        <Route path="/products" element={<Product />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
export default App;
