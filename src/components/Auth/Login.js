import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Order.module.css";
import buttonStyle from "../../styles/Cart.module.css";

const Login = ({ setLoginFormIsShown, setUser, chk, setChk }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setChk(false);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h3>Prijava</h3>
        {chk && <p>Morate se prijaviti da bi mogli poruciti!</p>}
        <input
          style={{ marginBottom: "2px", marginLeft: "30px" }}
          placeholder="Email..."
          onChange={(event) => setLoginEmail(event.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => setLoginPassword(event.target.value)}
          className={`${styles.input} ${error ? styles.invalid : ""}`}
          style={{ marginLeft: "30px" }}
        />
        {error && <p>Neispravan email ili lozinka</p>}
        <div className={buttonStyle.actions}>
          <button onClick={login}>Prijava</button>
          <button
            onClick={() => {
              setLoginFormIsShown(false);
              navigate("/signup");
            }}
          >
            Napravi nalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
