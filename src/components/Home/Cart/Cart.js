import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ModalCart from "./ModalCart";

function Cart(props) {
  const cart = props.cart;
  let subtotal = 0;
  const handleClick = () => {};

  return (
    <div>
      <div className="cart1">
        <div className="cart">
          <h3 className="title">Your Order List</h3>
          {cart &&
            cart.map((pd) => {
              subtotal = subtotal + pd.price * pd.count;
              return (
                <div>
                  <div className="cart-price">
                    <h6>{pd.name}</h6>
                    <span>
                      {pd.count} x {pd.price}
                    </span>
                    <button onClick={(event) => props.delete(event, pd._id)}>
                      <FontAwesomeIcon className="delete" icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })}
          <hr />
          <div className="cart-price">
            <h6>subtoal : </h6>
            <span>$ {subtotal}</span>
          </div>

          <Link to="/checkout">
            {" "}
            <button
              onClick={handleClick}
              className="btn btn-dark text-uppercase checkout"
            >
              Go to checkout
            </button>
          </Link>
        </div>
      </div>
      <div className="cart2">
        <ModalCart delete={props.delete} subtotal={subtotal} cart={cart} />
        {/* <div className="cart-compo">
          <div>
            <IconButton aria-label="cart">
              <StyledBadge
                className="cart-badge"
                badgeContent={cart.length}
                color="primary"
              >
                <ShoppingCartIcon className="cart-icon" />
              </StyledBadge>
            </IconButton>
          </div>
          <div>
            <h5>view cart</h5>
          </div>
          <div>
            <span className="subtotal">${subtotal}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Cart;
