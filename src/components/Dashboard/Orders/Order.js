import React from 'react'

function Order(props) {
    const index = 0;
    const { order, isAdmin, handleBlur } = props;
    console.log(props)
  return (
    <tr>
      <td>{index + 1}</td>
      {/* <td>{order.Shipment.name}</td> */}
      <td>{order.email}</td>
      {/* <td>{order.product.name}</td> */}
      {/* <td>${order.product.price}</td> */}
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
  );
}

export default Order