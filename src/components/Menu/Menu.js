import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { dorucak, palacinke, pizza, rostilj, ostalo } from "../../data/data";
import style from "../../styles/Menu.module.css";

const menu = [
  { name: "Dorucak", items: dorucak },
  { name: "Palacinke", items: palacinke },
  { name: "Pizza", items: pizza },
  { name: "Rostilj", items: rostilj },
  { name: "Ostalo", items: ostalo },
];

const Menu = ({ setItemsInCart, itemsInCart, user, setChk }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("localStorageCart", JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  const handleCategoryClick = (index) => {
    if (index === activeCategory) {
      setActiveCategory(null);
    } else {
      setActiveCategory(index);
    }
  };
  return (
    <div className={style.container}>
      {menu.map((category, index) => (
        <div key={index}>
          <button
            className={style.button}
            onClick={() => handleCategoryClick(index)}
          >
            {category.name}
          </button>
          {activeCategory === index && (
            <MenuItem
              items={category.items}
              setItemsInCart={setItemsInCart}
              itemsInCart={itemsInCart}
              user={user}
              setChk={setChk}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
