import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ManageService from "../ManageService/ManageService";
import "./manageServices.css";

const ManageServices = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <section>
      <div className="main-dash">
        <h5 className="text-brand">Manage products</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {products.map((product) => (
            <ManageService product={product}></ManageService>
          ))}
        </table>
      </div>
    </section>
  );
};

export default ManageServices;
