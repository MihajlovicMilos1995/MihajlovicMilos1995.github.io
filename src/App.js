import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./components/firebase-config";
import { useNavigate } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import HeaderCartButton from "./components/Cart/HeaderCartButton";
import Order from "./components/Order/Order";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({});
  const [chk, setChk] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(() => {
    return JSON.parse(localStorage.getItem("localStorageCart")) || [];
  });
  const [totalAmount, setTotalAmount] = useState(() => {
    return JSON.parse(localStorage.getItem("totalAmount")) || 0;
  });
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginFormIsShown, setLoginFormIsShown] = useState(false);
  const [orderCompIsShown, setOrderCompIsShown] = useState(false);

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
          Artikli
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

        <div>{user && <Link to="/profile">Nalog</Link>}</div>
        <div>{user && <Link onClick={logout}>Odjava</Link>}</div>
        <div>
          {user && itemsInCart.length > 0 && !orderCompIsShown && (
            <HeaderCartButton
              setCartIsShown={setCartIsShown}
              itemsInCart={itemsInCart}
            />
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Menu
              setItemsInCart={setItemsInCart}
              itemsInCart={itemsInCart}
              user={user}
              setChk={setChk}
            />
          }
        />
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
              chk={chk}
              setChk={setChk}
            />
          }
        />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
