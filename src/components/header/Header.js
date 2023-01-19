import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../contextApi/StateProvider";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth)
        .then(() => console.log("signOut Successfull!"))
        .catch((err) => console.log(err.message));
    }
  };
  return (
    <main className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
          className="header_logo"
        />
      </Link>
      <section className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </section>
      <section className="header_nav">
        <Link to={!user && "/login"}>
          <article onClick={handleAuthentication} className="nav-item">
            <span className="nav_linkone">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="nav_link">
              <strong> {user ? "Sign Out" : "Sign In"}</strong>
            </span>
          </article>
        </Link>
        <Link to="/orders">
          <article className="nav-item">
            <span className="nav_linkone">Return</span>
            <span className="nav_link">
              <strong>& Orders</strong>
            </span>
          </article>
        </Link>
        <article className="nav-item">
          <span className="nav_linkone">Your</span>
          <span className="nav_link">
            <strong>Prime</strong>
          </span>
        </article>
        <Link to="/cart">
          <article className="header_basket">
            <ShoppingBasketIcon />
            <span className="nav_link basket_count">{basket?.length}</span>
          </article>
        </Link>
      </section>
    </main>
  );
};

export default Header;
