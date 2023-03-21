import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Order.module.css";
import buttonStyle from "../../styles/Cart.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const isEmpty = (value) => value.trim() === "";
const isNumber = (value) => {
  return isNaN(value);
};

const Order = ({
  itemsInCart,
  totalAmount,
  setItemsInCart,
  setOrderCompIsShown,
  setTotalAmount,
}) => {
  const navigate = useNavigate();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    phone: true,
  });
  const [info, setInfo] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const phoneInputRef = useRef();
  const noteInputref = useRef();

  const cartsCollectionRef = collection(db, "Carts");
  const currentDate = new Date().toLocaleDateString("en-GB");

  const sendCartToDB = async () => {
    await addDoc(cartsCollectionRef, {
      items: itemsInCart,
      total: totalAmount,
      note: noteInputref.current.value,
      user: auth.currentUser.uid,
      date: currentDate,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPhoneIsValid =
      !isNumber(enteredPhone) && !isEmpty(enteredPhone);

    setFormInputValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    setInfo({
      nameInputRef,
      addressInputRef,
      cityInputRef,
      phoneInputRef,
      noteInputref,
      itemsInCart,
    });
    sendCartToDB();

    setItemsInCart([]);
    localStorage.clear();
    setTotalAmount(0);
    setOrderCompIsShown(false);
    setIsComplete(true);
    console.log(info);
    navigate("/");
  };

  const returnButtonHandler = () => {
    setOrderCompIsShown(false);
    navigate("/");
  };

  const nameControlStyle = `${style.control} ${
    formInputValidity.name ? "" : style.invalid
  }`;
  const addressControlStyle = `${style.control} ${
    formInputValidity.address ? "" : style.invalid
  }`;
  const cityControlStyle = `${style.control} ${
    formInputValidity.city ? "" : style.invalid
  }`;
  const phoneControlStyle = `${style.control} ${
    formInputValidity.phone ? "" : style.invalid
  }`;

  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <ul className={style["cart-items"]}>
          <li className={style["cart-header"]}>
            <div className={style["cart-header__container"]}>
              <h3>Naziv</h3>
              <h3 className={style["cena-header"]}>Cena</h3>
              <h3>Količina</h3>
            </div>
          </li>
          {itemsInCart.map((item) => (
            <li className={style["cart-item"]} key={item.id}>
              <div>
                <span>{item.title}</span>
                <span>{item.price} rsd</span>
                <span>x {item.quantity} &nbsp;</span>
              </div>
            </li>
          ))}
        </ul>
        {isComplete && <p>Porudzbina je izvrsena</p>}
        <div className={style.total}>
          <span>Ukupno : &nbsp;</span>
          <span>{totalAmount.toFixed(2)} din</span>
        </div>
        <div>
          <div className={style.container}>
            <div className={nameControlStyle}>
              <label className={style.label} htmlFor="name-input">
                Ime i prezime :
              </label>
              <input
                className={style.input}
                name="name-input"
                type="text"
                ref={nameInputRef}
                placeholder={
                  !formInputValidity.name ? "Polje ne sme biti prazno" : ""
                }
              ></input>
            </div>
            <div className={addressControlStyle}>
              <label className={style.label} htmlFor="street-input">
                Ulica i broj :
              </label>
              <input
                className={style.input}
                name="street-input"
                type="text"
                ref={addressInputRef}
                placeholder={
                  !formInputValidity.address ? "Polje ne sme biti prazno" : ""
                }
              ></input>
            </div>
            <div className={cityControlStyle}>
              <label className={style.label} htmlFor="city-input">
                Grad :
              </label>
              <input
                className={style.input}
                name="city-input"
                type="text"
                ref={cityInputRef}
                placeholder={
                  !formInputValidity.city ? "Polje ne sme biti prazno" : ""
                }
              ></input>
            </div>
            <div className={phoneControlStyle}>
              <label className={style.label} htmlFor="phone-input">
                Broj telefona :
              </label>
              <input
                className={style.input}
                name="phone-input"
                type="text"
                ref={phoneInputRef}
                placeholder={
                  !formInputValidity.phone ? "Polje ne sme biti prazno" : ""
                }
              ></input>
              {!formInputValidity.phone && <p>Polje mora biti broj!</p>}
            </div>
            <div>
              <label className={style.label} htmlFor="note">
                Napomena:
              </label>
              <input
                className={style.input}
                name="note"
                type="text"
                ref={noteInputref}
                placeholder="napomena"
              />
            </div>
          </div>
          <div className={buttonStyle.actions}>
            <button
              type="button"
              className={buttonStyle["button--alt"]}
              onClick={returnButtonHandler}
            >
              Povratak
            </button>

            <button onClick={onSubmitHandler} className={buttonStyle.button}>
              Poruci
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
