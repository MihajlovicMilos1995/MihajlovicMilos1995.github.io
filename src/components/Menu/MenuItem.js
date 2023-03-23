import React, { useEffect } from "react";
import style from "../../styles/MenuItem.module.css";
import buttonStyles from "../../styles/Cart.module.css";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ items, setItemsInCart, itemsInCart, user, setChk }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(itemsInCart);
  }, [itemsInCart]);

  const addItemHandler = (item) => {
    const existingItem = itemsInCart.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      setItemsInCart(
        itemsInCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setItemsInCart([...itemsInCart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className={style.container}>
      <ul>
        {items &&
          items.map((item, index) => (
            <li
              className={style.li}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: 0.8,
              }}
              key={index}
            >
              <p className={style.p}>{item.title}</p>
              <p className={style.p}>{item.price} din</p>
              <button
                className={style.button}
                onClick={() => {
                  if (user) {
                    addItemHandler(item);
                  } else {
                    setChk(true);
                    navigate("/login");
                  }
                }}
              >
                Dodaj u korpu
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuItem;
