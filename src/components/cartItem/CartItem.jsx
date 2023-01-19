import React, { forwardRef } from "react";
import "./cartItem.css";
import { useStateValue } from "../../contextApi/StateProvider";

const CartItem = forwardRef(
  ({ id, title, image, price, rating, hideButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    function removeFromBasket() {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    }
    return (
      <main ref={ref} className="cartItem">
        <img src={image} alt="" className="cartItem_image" />
        <article className="cartItem_info">
          <p className="item_title">{title}</p>
          <p className="item_price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <section className="item_rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </section>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}
        </article>
      </main>
    );
  }
);

export default CartItem;
