import React, { useEffect } from "react";
import style from "../../styles/MenuItem.module.css";

const MenuItem = ({ items, setItemsInCart, itemsInCart }) => {
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
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
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
              onClick={() => addItemHandler(item)}
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuItem;
