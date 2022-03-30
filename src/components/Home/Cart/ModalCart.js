import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCart(props) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 4,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const { subtotal, cart } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>
        <div className="cart-compo">
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
        </div>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="cart">
                <h3 className="title">Your order list</h3>
                {cart &&
                  cart.map((pd) => {
                    return (
                      <div>
                        <div className="cart-price">
                          <h6>{pd.name}</h6>
                          <span>
                            {pd.count} x {pd.price}
                          </span>
                          <button
                            onClick={(event) => props.delete(event, pd._id)}
                          >
                            <FontAwesomeIcon
                              className="delete"
                              icon={faTrash}
                            />
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
                  <button className="btn btn-dark text-uppercase checkout">
                    Go to checkout
                  </button>
                </Link>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
