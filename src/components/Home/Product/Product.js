import { Link, NavLink } from "react-router-dom";
import "./product.css"


const Product = (props) => {
  const { name, price, description, image } = props.product;
  // console.log(props.product.image)
  const handleAdd = (e) => {
    console.log(e.target)
  };
  return (
    <div className="product">
      <img
        alt=""
        className="image"
        src={`data:image/png;base64,${image.img}`}
      />
      <h1 className="name">{props.product.name}</h1>

      <h1 className="price">$ {props.product.price}</h1>
      <button
        className="button"
        onClick={() => props.handleAddProduct(props.product)}
        type="submit"
      >
        Add to cart
      </button>
    </div>
  );
};

export default Product;
