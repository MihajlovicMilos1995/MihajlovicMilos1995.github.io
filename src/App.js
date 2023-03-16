import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./components/firebase-config";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu/Menu";
import Contact from "./components/Contact";
import Cart from "./components/Cart/Cart";
import HeaderCartButton from "./components/Cart/HeaderCartButton";
import Order from "./components/Order/Order";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

function App() {
  const [itemsInCart, setItemsInCart] = useState(() => {
    return JSON.parse(localStorage.getItem("localStorageCart")) || [];
  });
  const [totalAmount, setTotalAmount] = useState(() => {
    return JSON.parse(localStorage.getItem("totalAmount")) || 0;
  });
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginFormIsShown, setLoginFormIsShown] = useState(false);
  const [orderCompIsShown, setOrderCompIsShown] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    setUser();
    navigate("/");
  };
  return (
    <div className="App">
      <nav>
        <Link to="/" onClick={() => setOrderCompIsShown(false)}>
          Pocetna
        </Link>
        {user && (
          <Link to="/menu" onClick={() => setOrderCompIsShown(false)}>
            Artikli
          </Link>
        )}
        <Link to="/contact" onClick={() => setOrderCompIsShown(false)}>
          Kontakt
        </Link>
        {!user && (
          <Link to="/login" onClick={() => setLoginFormIsShown(true)}>
            Prijava
          </Link>
        )}
        {cartIsShown && (
          <Cart
            itemsInCart={itemsInCart}
            setItemsInCart={setItemsInCart}
            setCartIsShown={setCartIsShown}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            setOrderCompIsShown={setOrderCompIsShown}
          />
        )}
        <div>
          {user && itemsInCart.length > 0 && !orderCompIsShown && (
            <HeaderCartButton
              setCartIsShown={setCartIsShown}
              itemsInCart={itemsInCart}
            />
          )}
        </div>
        <div>{user && <button onClick={logout}>Odjava</button>}</div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <Menu setItemsInCart={setItemsInCart} itemsInCart={itemsInCart} />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/order"
          element={
            <Order
              itemsInCart={itemsInCart}
              totalAmount={totalAmount}
              setItemsInCart={setItemsInCart}
              setOrderCompIsShown={setOrderCompIsShown}
              setTotalAmount={setTotalAmount}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setLoginFormIsShown={setLoginFormIsShown}
              loginFormIsShown={loginFormIsShown}
              setUser={setUser}
            />
          }
        />
        <Route path="signup" element={<SignUp setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
