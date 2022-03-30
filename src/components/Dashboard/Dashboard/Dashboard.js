import React, { useEffect, useState } from "react";
import "./mainDash.css";
import {Outlet } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar/Sidebar";
import { useAuth } from "./../../Login/Login/AuthContext";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const { loggedInUser } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
       setIsAdmin(data);

      });
  }, [loggedInUser]);

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/ordersByUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
      });
  }, [loggedInUser]);

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar isAdmin={isAdmin}></Sidebar>
      <div className="main-dash">
        <div>
          <h1 className="title">Your dashboard</h1>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
