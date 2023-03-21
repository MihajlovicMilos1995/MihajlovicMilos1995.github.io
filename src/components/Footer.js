import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <form className={styles.form}>
        <div className={styles.contact}>Kontaktirajte nas:</div>
        <div className={styles.address}>
          <h3 className={styles.h3}>Adresa:</h3>
          <p className={styles.p}> &nbsp;Vojvođanskih brigada 4</p>
        </div>
        <div className={styles.phone}>
          <h3 className={styles.h3}>Kontakt telefon:</h3>
          <Link className={styles.link} to="tel:021-20-70-401">
            021 20 70 401
          </Link>
        </div>
      </form>
    </footer>
  );
};

export default Footer;
