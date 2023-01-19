import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Login from "./components/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useEffect } from "react";
import { useStateValue } from "./contextApi/StateProvider";
import Payment from "./components/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/orders/Orders";

const promise = loadStripe(
  "pk_test_51M0divBS3QPbXiTKU85xEGBFjorbwXRP76vwAdqtMPWY4NQA62E2SUXLXSivycFeDjzadfXDmrdfibMhYAHu3HGf001TPvE0d6"
);

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("User >>>", user.email);
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
