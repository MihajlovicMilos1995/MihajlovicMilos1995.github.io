import React, { useEffect } from "react";
import CartIcon from "./CartIcon";
import styles from "../../styles/HeaderCartButton.module.css";

const HeaderCartButton = ({ setCartIsShown, itemsInCart }) => {
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const itemCount = itemsInCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <button onClick={showCartHandler} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Kolica</span>
      <span className={styles.badge}>{itemCount}</span>
    </button>
  );
};

export default HeaderCartButton;
