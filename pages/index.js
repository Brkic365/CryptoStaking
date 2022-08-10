import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import Crypt from "../components/Crypt";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { useSelector } from "react-redux";

// Hardcoded crypts
import cryptsRaw from "../public/data/crypts.json";
import inactiveHosts from "../public/data/inactiveHosts.json";

export default function Home() {
  const sortType = useSelector((state) => state.filter.sort);
  const farmHostsSort = useSelector((state) => state.filter.farmHosts);
  const tokensSort = useSelector((state) => state.filter.tokens);
  const stables = useSelector((state) => state.filter.stables);
  const singleSided = useSelector((state) => state.filter.singleSided);
  const showInactive = useSelector((state) => state.filter.showInactive);

  const [crypts, setCrypts] = useState(cryptsRaw);

  const [loading, setLoading] = useState(true);

  // Filter the array
  const filter = () => {
    let tempCrypts = cryptsRaw;

    // If there are any hosts selected, filter them
    if (farmHostsSort.length > 0) {
      tempCrypts = tempCrypts.filter((crypt) =>
        farmHostsSort.includes(crypt.host)
      );
    }

    // If there are any tokens selected, filter them
    if (tokensSort.length > 0) {
      tempCrypts = tempCrypts.filter((crypt) =>
        tokensSort.includes(crypt.token)
      );
    }

    if (stables) {
      tempCrypts = tempCrypts.filter((crypt) => crypt.stables);
    }

    if (singleSided) {
      tempCrypts = tempCrypts.filter((crypt) => crypt.singleSided);
    }

    if (!showInactive) {
      tempCrypts = tempCrypts.filter(
        (crypt) => !inactiveHosts.includes(crypt.host)
      );
    }

    tempCrypts.sort((a, b) => {
      if (sortType === "APY") {
        return a.profits.year - b.profits.year;
      } else {
        return a.tvl - b.tvl;
      }
    });

    setCrypts([...tempCrypts]);
  };

  useEffect(() => {
    filter();
  }, [sortType, farmHostsSort, tokensSort, stables, singleSided, showInactive]);

  useEffect(() => {
    if (crypts) {
      setLoading(false);
    }
  }, [crypts]);

  return (
    <main className={styles.home}>
      <Head>
        <title>Staking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Site Description." />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <section className={styles.totalLocked}>
        <p>Total Value Locked</p>
        <h1>$13,599,053.65</h1>
      </section>
      <section className={styles.cryptContainer}>
        <SimpleBar style={{ maxHeight: "70vh" }}>
          <section className={styles.grid}>
            {
              // Map through all crypts and display them
              !loading &&
                crypts.map((crypt, i) => {
                  return <Crypt crypt={crypt} key={i} />;
                })
            }
          </section>
        </SimpleBar>
      </section>
    </main>
  );
}
