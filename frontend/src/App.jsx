import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Shipping from "./pages/Shipping/Shipping";
import ScrollToTop from "./components/ScrollToTop";
import Category from "./pages/Category/Category";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import Loader from "./components/Loaders/maxLoader/Loader";
import { useCartStore } from "./stores/useCartStore";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
const App = () => {
  const { user, checkAuth,checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);


  if (checkingAuth) return <Loader />;



  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/"/> : <Login/>  }
        />
        <Route
          path="/admin-dashboard"
          element={user?.role === "admin" ? <AdminDashboard /> : <Login />}
        />
        <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup/>  } />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/purchase-success" element={<Success />} />
        <Route path="/purchase-cancel" element={<Cancel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
