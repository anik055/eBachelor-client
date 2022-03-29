import React, { useEffect, useState } from "react";

import { Link, Outlet } from "react-router-dom";
import Orders from "../Orders/Orders";
import Sidebar from "../../Dashboard/Sidebar/Sidebar";
import { useAuth } from "./../../Login/Login/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser} = useAuth();
  console.log(loggedInUser);


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
        console.log(isAdmin);
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
        setLoading(false);
      });
  }, [loggedInUser]);

  useEffect(() => {
    fetch("http://localhost:5050/orders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <div >

      <div className="main-dash">
        <h1>All orders</h1>
        <div>
          {isAdmin ? (
            <Orders isAdmin={isAdmin} orders={allOrders} />
          ) : (
            <Orders isAdmin={isAdmin} orders={userOrders} />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AllOrder;
