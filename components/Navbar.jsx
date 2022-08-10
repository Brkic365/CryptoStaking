import React, { useState } from "react";
import styles from "../styles/Navbar.module.scss";
import Image from "next/image";

import Sidebar from "./Sidebar";

import { AiOutlineMenu } from "react-icons/ai";

import ToggleSwitch from "./ToggleSwitch";

function Navbar() {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <main className={styles.navbar}>
      <section className={styles.mobileSidebar}>
        {sidebarOpened && (
          <Sidebar close={() => setSidebarOpened(false)} mobile={true} />
        )}
      </section>
      <section className={styles.desktopSidebar}>
        <Sidebar />
      </section>

      <section className={styles.topBar}>
        {" "}
        <AiOutlineMenu onClick={() => setSidebarOpened(true)} />
        <section className={styles.logoHolder}>
          <Image src="/navbar/logo.svg" alt="Logo" width={152} height={46} />
        </section>
        <section className={styles.walletInfo}>
          <ToggleSwitch />
          <section className={styles.coin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 31 31"
            >
              <circle
                id="Ellipse_2"
                data-name="Ellipse 2"
                cx="15.5"
                cy="15.5"
                r="15.5"
                fill="#2887ef"
              />
            </svg>
            <p>$0.003657055</p>
          </section>
          <button>
            <p>Connect Wallet</p>
          </button>
        </section>
      </section>
    </main>
  );
}

export default Navbar;
