import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import IPO from "./pages/IPO/IPO";
import Upcoming from "./pages/IPO/Upcoming";
import Community from "./pages/Community";
import Brokers from "./pages/Brokers";
import Signin from "./pages/Signin";
import SignUpNow from "./pages/SignUpNow";
import NotFound from "./pages/NotFound";

// Products Dropdown Pages
import Products from "./pages/Products/Products"
import Blog from "./pages/Products/Blog";
import Sector from "./pages/Products/Sector";
import Mutualfund from "./pages/Products/Mutualfund";
import Stockschool from "./pages/Products/Stockschool";

// About Dropdown Pages
import AboutUs from "./pages/About/AboutUs";
import Careers from "./pages/About/Careers";
import ContactUs from "./pages/About/ContactUs";

const LayoutWrapper = ({ children, setIsAuthenticated }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass setIsAuthenticated to Navbar so it can update auth state */}
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Optional: listen to changes in token dynamically (can improve if your app requires)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <LayoutWrapper setIsAuthenticated={setIsAuthenticated}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signupnow" element={<SignUpNow />} />

        {/* Protected Routes */}
        <Route path="/ipo" element={isAuthenticated ? <IPO /> : <Navigate replace to="/signin" />} />
        <Route path="/ipo/upcoming" element={isAuthenticated ? <Upcoming /> : <Navigate replace to="/signin" />} />
        <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate replace to="/signin" />} />
        <Route path="/brokers" element={isAuthenticated ? <Brokers /> : <Navigate replace to="/signin" />} />

        {/* Products Pages */}
        <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate replace to="/signin" />} />
        <Route path="/blog" element={isAuthenticated ? <Blog /> : <Navigate replace to="/signin" />} />
        <Route path="/sector" element={isAuthenticated ? <Sector /> : <Navigate replace to="/signin" />} />
        <Route path="/mutualfunds" element={isAuthenticated ? <Mutualfund /> : <Navigate replace to="/signin" />} />
        <Route path="/stockschool" element={isAuthenticated ? <Stockschool /> : <Navigate replace to="/signin" />} />

        {/* About Pages */}
        <Route path="/aboutus" element={isAuthenticated ? <AboutUs /> : <Navigate replace to="/signin" />} />
        <Route path="/aboutus/careers" element={isAuthenticated ? <Careers /> : <Navigate replace to="/signin" />} />
        <Route path="/aboutus/contactus" element={isAuthenticated ? <ContactUs /> : <Navigate replace to="/signin" />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutWrapper>
  );
};

export default App;
