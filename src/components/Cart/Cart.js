import React, { useState, useEffect } from "react";
import style from "../../styles/Cart.module.css";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

const Cart = ({
  itemsInCart,
  setItemsInCart,
  setCartIsShown,
  totalAmount,
  setTotalAmount,
  setOrderCompIsShown,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const newTotalAmount = itemsInCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalAmount(newTotalAmount);
    localStorage.setItem("totalAmount", newTotalAmount);
  }, [itemsInCart]);

  const orderButtonClickHandler = () => {
    setCartIsShown(false);
    setOrderCompIsShown(true);
    navigate("/order");
  };

  const addItemHandler = (item) => {
    const existingItem = itemsInCart.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      setItemsInCart(
        itemsInCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setItemsInCart([...itemsInCart, { ...item, quantity: 1 }]);
    }
  };

  const removeItemHandler = (itemId) => {
    const updatedItems = itemsInCart.map((item) => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity === 0) {
          return null; // returning null will remove the item from the array
        } else {
          return { ...item, quantity: updatedQuantity };
        }
      } else {
        return item;
      }
    });
    setItemsInCart(updatedItems.filter((item) => item !== null));
  };
  const cartItems = (
    <ul className={style["cart-items"]}>
      {itemsInCart.map((item) => (
        <li className={style["cart-item"]} key={item.title}>
          <span className={style.summary}>{item.title}</span>
          <div className={style["summary-wrapper"]}>
            <span className={style.price}>{item.price} rsd</span>
            <span className={style.amount}>x{item.quantity}</span>
          </div>
          <div className={style.actions}>
            <button onClick={() => addItemHandler(item)}>+</button>
            <button onClick={() => removeItemHandler(item.id)}>-</button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal setCartIsShown={setCartIsShown}>
      {cartItems}
      <div className={style.total}>
        <span>Ukupno</span>
        <span>{totalAmount.toFixed(2)} din</span>
      </div>
      <div className={style.actions}>
        <button
          onClick={() => setCartIsShown(false)}
          className={style["button--alt"]}
        >
          Zatvori
        </button>
        {itemsInCart.length > 0 && (
          <button className={style.button} onClick={orderButtonClickHandler}>
            Poruci
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
