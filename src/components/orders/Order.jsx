import React from "react";
import moment from "moment";
import CartItem from "../cartItem/CartItem";
import CurrencyFormat from "react-currency-format";
import "./order.css";

const Order = ({ order }) => {
  return (
    <section className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CartItem key={item.id} {...item} hideButton />
      ))}
      <CurrencyFormat
        renderText={(value) => {
          return <h3 className="order_total">Order Total: {value}</h3>;
        }}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </section>
  );
};

export default Order;
