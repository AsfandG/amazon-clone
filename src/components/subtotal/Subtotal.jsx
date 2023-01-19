import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../contextApi/StateProvider";
import { getBasketTotal } from "../../contextApi/reducer";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <main className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items ): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to checkout</button>
    </main>
  );
};

export default Subtotal;
