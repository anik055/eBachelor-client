import React, { useEffect, useState } from "react";
import Modals from "./Modal";
import "./manage.css";

const ManageService = ({ product }) => {
  const { name, price, _id } = product;
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const updateProduct = (price) => {
    setUpdatedPrice(price);
  };
  const deleteProduct = (event, id) => {
    event.target.parentNode.style.display = "none";

    fetch(`https://ebachelor.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(document.getElementById("item"));
        }
      });
  };
  return (
    <tbody>
      <tr>
        <td scope="col">{name}</td>
        <td scope="col">${updatedPrice}</td>
        <td scope="col">
          <button
            className="delete btn btn-dark t"
            onClick={(event) => deleteProduct(event, _id)}
          >
            Delete
          </button>
          <Modals updateProduct={updateProduct} id={_id} />
        </td>
      </tr>
    </tbody>
  );
};

export default ManageService;
