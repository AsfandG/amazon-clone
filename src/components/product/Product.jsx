import React from "react";
import { useStateValue } from "../../contextApi/StateProvider";
import "./product.css";

const Product = ({ id, title, price, image, rating }) => {
  const [state, dispatch] = useStateValue();

  // console.log("Basket >>>", basket);
  function addToBasket() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, price, image, rating },
    });
  }
  return (
    <main className="product">
      <section className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <section className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </section>
      </section>
      <img src={image} alt="watch" />
      <button onClick={addToBasket}>Add to Basket</button>
    </main>
  );
};

export default Product;
