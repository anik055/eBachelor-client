import React, { useEffect, useState } from "react";
import Modals from "./Modal";
import "./manage.css";

const ManageService = ({ product }) => {
  const { name, price, _id } = product;

  const updateProduct = () => {};
  const deleteProduct = (event, id) => {
    event.target.parentNode.style.display = "none";

    fetch(`http://localhost:5050/delete/${id}`, {
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
        <td scope="col">${price}</td>
        <td scope="col">
          <button
            className="delete btn btn-dark t"
            onClick={(event) => deleteProduct(event, _id)}
          >
            Delete
          </button>
          <Modals id={_id} />
        </td>
      </tr>
    </tbody>
  );
};

export default ManageService;
