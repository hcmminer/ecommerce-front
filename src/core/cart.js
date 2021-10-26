import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./layout";
import { getCart } from "./carthelpers";
import Card from "./card";
import Checkout from "./checkout";

//!!!!!!!!!!!!!!!!!!!!!!!! ten file tuyet doi khong viet sai , pb hoa

const Cart = () => {

  // mang cua nhung san pham trong gi hang
  const [items, setItems] = useState([]);

  const [run, setRun] = useState(false);

  useEffect(() => {
    console.log('MAX DEPTH ...');
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            isshowAddToCart={false}
            isshowCartUpdate={true}
            isshowRemoveProduct={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
