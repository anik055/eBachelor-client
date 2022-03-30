import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Orders from "../Orders/Orders";

import { useAuth } from "./../../Login/Login/AuthContext";

const AllOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/isAdmin", {
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
        console.log(data);
      });
  }, []);

  return (
    <div>
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
