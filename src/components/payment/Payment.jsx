import "./payment.css";
import { useStateValue } from "../../contextApi/StateProvider";
import CartItem from "../cartItem/CartItem";
import FlipMove from "react-flip-move";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../contextApi/reducer";
import axios from "../../axios";
import { db } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

const Payment = () => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // when the payment components loads generate the special client secret which allows us to charge a customer. And when the basket changes we need to get a new secret.
    const getClientSecret = async () => {
      const response = await axios({
        method: "post", // stripe accepts the totals in currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("client secret >>> payment.js >>>", clientSecret);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // payment Intent = payment confirmation
        await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };
  const handleChange = (e) => {
    // Listen for the changes in cardElement
    // and display any errors as customer types their details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <main className="payment">
      <section className="payment_container">
        <h1>
          Checkout (<Link to="/cart">{basket?.length} items</Link>)
        </h1>
        {/* payment section - delivery address */}
        <section className="payment_section">
          <section className="payment_title">
            <h3>Delivery Address</h3>
          </section>
          <article className="payment_address">
            <p>{user?.email}</p>
            <p>499 Peninsula Street</p>
            <p> Lakewood, NJ 08701</p>
          </article>
        </section>
        {/* payment section - Review Items */}
        <section className="payment_section">
          <section className="payment_title">
            <h3>Review Items and Delivery</h3>
          </section>
          <article className="payment_items">
            <FlipMove>
              {basket.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </FlipMove>
          </article>
        </section>
        {/* payment section - payment method */}
        <section className="payment_section">
          <section className="payment_title">
            <h3>Payment Method</h3>
          </section>
          <article className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <section className="price_container">
                <CurrencyFormat
                  renderText={(value) => <h4>Order Total : {value}</h4>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={succeeded || processing || disabled}>
                  {processing ? "processing" : "Buy Now"}
                </button>
              </section>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Payment;
