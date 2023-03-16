import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const SignUp = ({setUser}) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3>Napravi nalog</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => setRegisterPassword(event.target.value)}
        />

        <button onClick={register}>Napravi nalog</button>
      </div>
    </div>
  );
};

export default SignUp;
