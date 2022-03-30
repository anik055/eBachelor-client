import "./product.css";

const Product = (props) => {
  const { name, price, image } = props.product;

  return (
    <div className="product">
      <img
        alt=""
        className="image"
        src={`data:image/png;base64,${image.img}`}
      />
      <h1 className="name">{name}</h1>

      <h1 className="price">$ {price}</h1>
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
