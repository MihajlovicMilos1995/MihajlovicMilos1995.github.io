import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import buttonStyle from "../../styles/Cart.module.css";
import styles from "../../styles/Order.module.css";

const SignUp = ({ setUser }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    if (!registerEmail.includes("@")) {
      setEmailError(true);
      console.log("email");
    }
    if (registerPassword.length < 6) {
      setpasswordError(true);
      console.log("pass");
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h3>Napravi nalog</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          className={styles.input}
          style={{ marginBottom: "2px", marginLeft: "30px" }}
        />
        {emailError && <p>Unesite ispravnu email adresu</p>}
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => setRegisterPassword(event.target.value)}
          className={styles.input}
          style={{ marginLeft: "30px" }}
        />
        {passwordError && <p>Lozinka mora biti 6 ili vise karaktera</p>}
        <div
          className={buttonStyle.actions}
          style={{ justifyContent: "center" }}
        >
          <button onClick={register}>Napravi nalog</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
