import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setLoginFormIsShown, loginFormIsShown, setUser }) => {
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
      navigate("/menu");
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };
  return (
    <div>
      <h3>Prijava</h3>
      <input
        placeholder="Email..."
        onChange={(event) => setLoginEmail(event.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(event) => setLoginPassword(event.target.value)}
      />
      <button onClick={login}>Prijava</button>
      {error && <p>Neispravan email ili lozinka</p>}
      <Link to="/signup" onClick={() => setLoginFormIsShown(false)}>
        Napravi nalog
      </Link>
    </div>
  );
};

export default Login;
