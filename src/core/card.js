import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import ShowImage from "./showimage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./carthelpers";

const Card = ({
  product,
  isshowViewProduct = true,
  isshowAddToCart = true,
  isshowCartUpdate = false,
  isshowRemoveProduct = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  // Nut xem san pham
  const ViewProductBtn = (isshowViewProduct) => {
    return (
      isshowViewProduct && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  // Event khi user click them san pham vao gio
  const addToCart = () => {
    addItem(product, setRedirect(true)); // du ma callback lam tao mat time
  };

  // Event user xoa khoi gio hang
  const removeOutCart = () => {
    removeItem(product._id);
    setRun(!run);
  };

  // Co chuyen den gio hang ko ?
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  // Nut them gio hang
  const AddToCardBtn = (isshowAddToCart) => {
    return (
      // tai sao addToCart lai ko co () tai vi ben trong addToCard la goi ham luon chu khong dinh nghia nua
      isshowAddToCart && (
        <button onClick={addToCart} className="btn btn-outline-warning my-2">
          Add to cart
        </button>
      )
    );
  };

  // thay doi so luong san pham muon mua localStorage theo user event
  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const viewStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill ">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill ">Out of Stock</span>
    );
  };

  // nut input edit so luong muon mua of user
  const CartUpdateOptionsIp = (isshowCartUpdate) => {
    return (
      isshowCartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  // Nut Xoa khoi gio hang
  const RemoveProductBtn = (isshowRemoveProduct) => {
    return (
      // tai sao addToCart lai ko co () tai vi ben trong addToCard la goi ham luon chu khong dinh nghia nua
      isshowRemoveProduct && (
        <button onClick={removeOutCart} className="btn btn-outline-danger my-2">
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {viewStock(product.quantity)}
        <br />

        {ViewProductBtn(isshowViewProduct)}
        {AddToCardBtn(isshowAddToCart)}
        {RemoveProductBtn(isshowRemoveProduct)}
        {CartUpdateOptionsIp(isshowCartUpdate)}
      </div>
    </div>
  );
};

export default Card;
