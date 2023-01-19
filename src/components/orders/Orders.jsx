import React, { useState, useEffect } from "react";
import { useStateValue } from "../../contextApi/StateProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import Order from "./Order";
import "./order.css";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, `users/${user?.uid}/orders`);
    const q = query(collectionRef, orderBy("created", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsub;
  }, [user?.uid]);

  return (
    <main className="orders">
      <h1>Your orders</h1>
      <section className="orders__order">
        {orders?.map((order, i) => (
          <Order key={i} order={order} />
        ))}
      </section>
    </main>
  );
};

export default Orders;
