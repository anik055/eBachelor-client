import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../Login/Login/AuthContext";
import "./showproduct.css";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCat, setAllCat] = useState("");
  const [category, setCategory] = useState("all");
  const { loggedInUser } = useAuth();
  const profileEmail = loggedInUser && loggedInUser.email;

  const handleClick = (e) => {
    setCategory(e.target.value);
  };
  const handleAllClick = (e) => {
    setAllCat(e.target.value);
  };
  const deleteFromCart = (event, id) => {
    const others = cart.filter((pd) => pd._id !== id);
    setCart(others);
    fetch(`https://ebachelor.herokuapp.com/deleteCart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => {
      return pd._id === product._id;
    });
    if (sameProduct) {
      const id = sameProduct._id;
      const c = Number(sameProduct.count) + 1;
      sameProduct.count = c.toString();
      const others = cart.filter((pd) => pd._id !== product._id);
      const newCart = [...others, sameProduct];
      setCart(newCart);

      console.log(JSON.stringify(sameProduct));
      fetch(`https://ebachelor.herokuapp.com/updateCart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sameProduct),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error(error);
        });
    } else {
      const c = 1;
      product.count = c.toString();
      product.email = loggedInUser.email;
      const newCart = [...cart, product];
      setCart(newCart);
      const url = `https://ebachelor.herokuapp.com/addToCart`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  };

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/cart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: profileEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      });
  }, [loggedInUser]);

  useEffect(() => {
    fetch(`https://ebachelor.herokuapp.com/products/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    fetch("https://ebachelor.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setAllCat("");
      });
  }, [allCat]);

  return (
    <div className="middle">
      {loading && (
        <div className="spin">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <div className="products">
        <div className="category">
          <div className="cat">
            <button className="catt all" value="all" onClick={handleAllClick}>
              ALL
            </button>
          </div>
          <div className="cat">
            <button className="catt food " value="food" onClick={handleClick}>
              FOOD
            </button>
          </div>
          <div className="cat">
            <button
              className="catt grocery "
              value="grocery"
              onClick={handleClick}
            >
              GROCERY
            </button>
          </div>
          <div className="cat">
            <button
              className="catt medical"
              value="medical"
              onClick={handleClick}
            >
              {" "}
              MEDICAL
            </button>
          </div>
          <div className="cat">
            <button
              className="catt electronics"
              value="electronics"
              onClick={handleClick}
            >
              ELECTRONICS
            </button>
          </div>
        </div>

        <div
          className="all-products"
          style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
        >
          {products.map((pd) => {
            return (
              <div>
                <Product
                  handleAddProduct={handleAddProduct}
                  key={pd.key}
                  product={pd}
                ></Product>
              </div>
            );
          })}
          {!products[0] && (
            <div>
              <Box className="spin" sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
        </div>
      </div>

      <div>
        <Cart delete={deleteFromCart} cart={cart} />
      </div>
    </div>
  );
};

export default ShowProduct;
