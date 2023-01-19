import Product from "../product/Product";
import "./home.css";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useStateValue } from "../../contextApi/StateProvider";

const Home = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <main className="home">
      <section className="home_container">
        <img
          src="https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=896&q=80"
          alt="display"
          className="home_image"
        />
        <section className="home_row">
          <Product
            id={1}
            title="Garmin 010-02064-00 Instinct, Rugged Outdoor Watch with GPS"
            price={149}
            rating={4}
            image="https://m.media-amazon.com/images/I/71oRQ2nTOqL._AC_SL1500_.jpg"
          />
          <Product
            id={2}
            title="
            Amazon Basics 21-Inch Hardside Spinner, Black"
            price={96}
            rating={3}
            image="https://m.media-amazon.com/images/I/71s7HbyqzEL._AC_SL1500_.jpg"
          />
        </section>
        <section className="home_row">
          <Product
            id={3}
            title="SanDisk 256GB Ultra microSDXC UHS-I Memory Card with Adapter"
            rating={5}
            price={21}
            image="https://m.media-amazon.com/images/I/51G0OYpkCYL._AC_SL1000_.jpg"
          />
          <Product
            id={4}
            title="BENGOO G9000 Stereo Gaming Headset for PS4 PC Xbox One PS5 Controller"
            rating={5}
            price={24}
            image="https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg"
          />
          <Product
            id={5}
            title="Logitech G920 Driving Force Racing Wheel and Floor Pedals"
            rating={5}
            price={275}
            image="https://m.media-amazon.com/images/I/61O7HHu181L._AC_SL1500_.jpg"
          />
          {/* Product */}
          {/* Product */}
        </section>
        <section className="home_row">
          <Product
            id={6}
            title="Brother Genuine-Drum Unit, DR730, Seamless Integration, Yields Up to 12,000 Pages, Black (-Drum unit, NOT toner)"
            rating={4}
            price={106}
            image="https://m.media-amazon.com/images/I/71TUCw8d3iL._AC_SL1500_.jpg"
          />
        </section>
      </section>
    </main>
  );
};

export default Home;
