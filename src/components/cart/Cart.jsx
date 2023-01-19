import React from "react";
import Subtotal from "../subtotal/Subtotal";
import "./cart.css";
import { useStateValue } from "../../contextApi/StateProvider";
import CartItem from "../cartItem/CartItem";
import FlipMove from "react-flip-move";

const Cart = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <main className="cart">
      <section className="cart_left">
        <section className="banner-img">
          <img
            src="https://plus.unsplash.com/premium_photo-1661503056804-5815f41310ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="banner"
            className="cart_ad"
          />
        </section>
        <article>
          <h5 style={{ marginTop: "10px" }}>{user?.email}</h5>
          <h2 className="cart_title">
            {basket?.length ? "Your Basket" : "Your Basket is Empty!"}
          </h2>
        </article>
        <FlipMove>
          {basket.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </FlipMove>
      </section>
      <section className="cart_right">
        <Subtotal />
      </section>
    </main>
  );
};

export default Cart;
