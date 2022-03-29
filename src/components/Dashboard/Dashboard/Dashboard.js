import React, { useEffect, useState } from "react";
import "./mainDash.css";
import { Link, Outlet } from "react-router-dom";
import Orders from "../Orders/Orders";
import Sidebar from "../../Dashboard/Sidebar/Sidebar";
import { useAuth } from "./../../Login/Login/AuthContext";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const { loggedInUser } = useAuth();

const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  fetch("http://localhost:5050/isAdmin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: loggedInUser.email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setIsAdmin(data);
      console.log(isAdmin)
    });
}, [loggedInUser]);


  useEffect(() => {
    fetch("http://localhost:5050/ordersByUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5050/orders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar isAdmin={isAdmin}></Sidebar>
      {console.log(isAdmin) }

      <div className="main-dash">
        <div>
          <h1 className="title">Your dashboard</h1>
          {/* <h5>All Orders</h5>
          {isAdmin ? (
            <Orders orders={allOrders} />
          ) : (
            <Orders orders={userOrders} />
          )} */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
