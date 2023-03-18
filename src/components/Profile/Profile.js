import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import styles from "../../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [itemsFromDb, setItemsFromDb] = useState([]);
  const [currentUserOrders, setCurrentUserOrders] = useState([]);

  const navigate = useNavigate();

  const cartsCollectionRef = collection(db, "Carts");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(cartsCollectionRef);
      setItemsFromDb(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getItems();
  }, []);

  useEffect(() => {
    setCurrentUserOrders(
      itemsFromDb.filter((item) => item.user == auth.currentUser.uid)
    );
    console.log(itemsFromDb);
    console.log(currentUserOrders);
  }, [itemsFromDb]);

  return (
    <div className={styles.container}>
      {currentUserOrders.length > 0 ? (
        <ul>
          {currentUserOrders.map((order) => (
            <li className={styles.orderContainer} key={order.id}>
              <p>{order.date}</p>
              <p>Stavke:</p>
              <ul className={styles.itemContainer}>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} - {item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p> Ukupno: {order.total} rsd</p>
            </li>
          ))}
        </ul>
      ) : (
        <h1 onClick={() => navigate("/menu")}>Porucite nesto</h1>
      )}
    </div>
  );
};

export default Profile;
