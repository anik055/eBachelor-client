import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import { Provider } from "react-redux";

import Dashboard from "./components/Dashboard/Dashboard/Dashboard";

import SignupForm from "./components/Login/Login/SignUpForm";
import { AuthProvider } from "./components/Login/Login/AuthContext";
import PrivateRoute from "./components/Login/Login/PrivateRoute";
import LoginForm from "./components/Login/Login/LoginForm";

import AddAdmin from "./components/Dashboard/AddAdmin/AddAdmin";
import ManageServices from "./components/Dashboard/ManageServices/ManageServices";
import AddProduct from "./components/Dashboard/AddProduct/AddProduct";
import CheckoutDetails from "./components/Checkout/CheckoutDetails";
import Orders from "./components/Dashboard/Orders/Orders";
import AllOrder from "./components/Dashboard/Orders/AllOrder";


// import Navigation from "./components/Shared/Navbar/Navigation";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/manage" element={<ManageServices />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/checkout" element={<CheckoutDetails />} />
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="manage" element={<ManageServices />} />
          <Route path="orders" element={<AllOrder />} />
          <Route path="addAdmin" element={<AddAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
