import React, { useState } from "react";
import "./order.css"
import { useAuth } from "../../Login/Login/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Orders = ({ orders, isAdmin }) => {
  const [status, setStatus] = useState("pending");
  // const { isAdmin } = useAuth();
  console.log(orders);

  const handleBlur = (event, id) => {
    event.target.parentNode.parentNode.previousElementSibling.innerHTML =
      event.target.value;
    console.log(event.target.parentNode.parentNode.previousElementSibling);
    setStatus(event.target.value);
    console.log(id);
    const statuss = {
      status: event.target.value,
    };
    fetch(`http://localhost:5050/updateStatus/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(statuss),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="text-secondary text-left" scope="col">
              Sr No
            </th>
            {/* <th className="text-secondary" scope="col">
            Name
          </th> */}
            {isAdmin && (
              <th className="text-secondary" scope="col">
                Email
              </th>
            )}
            {/* <th className="text-secondary" scope="col">
            Service
          </th> */}
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
              {/* <td>{order.Shipment.name}</td> */}
              {isAdmin && <td>{order.email}</td>}
              {/* <td>{order.product.name}</td> */}
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
      {orders[0] && (
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
