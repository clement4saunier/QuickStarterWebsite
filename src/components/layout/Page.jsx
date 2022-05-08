import React from "react";
import Footer from "./Footer";
import styles from './Page.module.css'

export default function Page({ children }) {
  return (
    <div className={styles.page}>
      <div></div>
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}