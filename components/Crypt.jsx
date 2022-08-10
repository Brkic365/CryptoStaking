import React from "react";
import styles from "../styles/Crypt.module.scss";

function Crypt({ crypt }) {
  return (
    <section className={styles.crypt}>
      <section className={styles.top}>
        <p>{crypt.name}</p>
      </section>
      <section className={styles.profits}>
        <section className={styles.profitBlock}>
          <span>Day</span>
          <h4>{crypt.profits.day}%</h4>
        </section>
        <section className={styles.profitBlock}>
          <span>Week</span>
          <h4>{crypt.profits.week}%</h4>
        </section>
        <section className={styles.profitBlock}>
          <span>Year</span>
          <h4>{crypt.profits.year}%</h4>
        </section>
      </section>
      <p>TVL = ${crypt.tvl.toLocaleString("en-US")}</p>
      <section className={styles.buttons}>
        <button>Stake</button>
        <button className={styles.hollowBtn}>Unstake</button>
      </section>
    </section>
  );
}

export default Crypt;
