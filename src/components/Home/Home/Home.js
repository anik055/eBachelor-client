import React from "react";

import Navbar from "../Navbar/Navbar";
import "./home.css";
import ShowProduct from "../ShowProduct/ShowProduct";

const Home = () => {
  return (
    <div
      className="
    home"
    >
      <Navbar />
      <ShowProduct />
    </div>
  );
};

export default Home;
