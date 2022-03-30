import React, { useEffect } from "react";
import "./checkout.css";
import { useState } from "react";
import { useAuth } from "../Login/Login/AuthContext";
import Navbar from "../Home/Navbar/Navbar";

function CheckoutDetails() {
  const { loggedInUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const profileEmail = loggedInUser && loggedInUser.email;

  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    console.log(newInfo);
    setInfo(newInfo);
  };

  const onSubmit = (e) => {
    let subtotal = 0;
    cart.map((pd) => {
      subtotal = subtotal + pd.price * pd.count;
    });
    console.log(subtotal);

    const submitInfo = { ...info };
    submitInfo["product"] = cart;
    submitInfo["name"] = loggedInUser.displayName;
    submitInfo["email"] = loggedInUser.email;
    submitInfo["status"] = "pending";
    submitInfo["subtotal"] = subtotal;

    console.log(submitInfo);
    console.log(JSON.stringify(submitInfo));
    fetch("https://ebachelor.herokuapp.com/addNewOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("https://ebachelor.herokuapp.com/deleteWholeCart/", {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setSuccess(true);
            console.log(success);
            alert("Success");
          })
          .catch((error) => {});
      })
      .catch((error) => {});
    e.preventDefault();
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

  return (
    <div>
      <Navbar />
      {!success && (
        <div className="checkout">
          <form onSubmit={onSubmit} className="checkoutform">
            <div className="form-group ">
              <label>select your location</label>
              <select
                name="location"
                onChange={handleBlur}
                className="form-control"
              >
                <option value=""></option>
                <option value="Khan jahan ali hall">Khan jahan ali hall</option>
                <option value="Khan bahadur ahsanullah hall">
                  Khan bahadur ahsanullah hall
                </option>
                <option value="Bangobondhu hall">Bangobondhu hall</option>
                <option value="Hadi chattor">Hadi chattor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="">select your payment method</label>
              <select
                name="payment"
                onChange={handleBlur}
                className="form-control"
              >
                <option value="nagad">nagad</option>
                <option value="Bkash">Bkash</option>
                <option value="rocket">rocket</option>
                <option value="bank">bank</option>
              </select>
            </div>

            <div className="form-group ">
              <label for="phone">your phone number</label>
              <input
                onChange={handleBlur}
                className="form-control"
                type=""
                name="phone"
                value={info.phone}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </form>
        </div>
      )}
      {success && (
        <div className="thank">
          <h1>Thanks for your order!</h1>
        </div>
      )}
    </div>
  );
}

export default CheckoutDetails;
