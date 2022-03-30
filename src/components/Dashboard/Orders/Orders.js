import React, { useState } from "react";
import "./order.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Orders = ({ orders, isAdmin }) => {
  const [status, setStatus] = useState("pending");

  const handleBlur = (event, id) => {
    event.target.parentNode.parentNode.previousElementSibling.innerHTML =
      event.target.value;
    setStatus(event.target.value);

    const statuss = {
      status: event.target.value,
    };
    fetch(`https://ebachelor.herokuapp.com/updateStatus/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(statuss),
    })
      .then((response) => response.json())
      .then((data) => {});
  };
  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="text-secondary text-left" scope="col">
              Sr No
            </th>
            {isAdmin && (
              <th className="text-secondary" scope="col">
                Email
              </th>
            )}
            <th className="text-secondary" scope="col">
              Price
            </th>
            <th className="text-secondary" scope="col">
              Status
            </th>
            {isAdmin && (
              <th className="text-secondary" scope="col">
                Change Status
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr>
              <td>{index + 1}</td>
              {isAdmin && <td>{order.email}</td>}
              <td>${order.subtotal}</td>
              <td>{order.status}</td>
              {isAdmin && (
                <td>
                  <div className="col-4">
                    <select
                      className="select"
                      onChange={(event) => handleBlur(event, order._id)}
                      name="status"
                    >
                      <option disabled={true} value="pending">
                        Select Status
                      </option>
                      <option value="pending">pending</option>
                      <option value="Processing">processing</option>
                      <option value="Done">done</option>
                    </select>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!orders[0] && (
        <div>
          <Box className="spin" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Orders;
