import React, { useState, useEffect } from "react";
import styles from "../styles/Sidebar.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { AiOutlineDown } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { useSelector, useDispatch } from "react-redux";
import {
  changeSortType,
  addHost,
  removeHost,
  addToken,
  removeToken,
  stableFilter,
  singleSidedFilter,
  showInactiveFilter,
} from "../slices/filterSlice";

import ToggleSwitch from "./ToggleSwitch";

// Hardcoded crypts
import crypts from "../public/data/crypts.json";
import inactiveHosts from "../public/data/inactiveHosts.json";

function Sidebar({ close, mobile = false }) {
  const sort = useSelector((state) => state.filter.sort);
  const farmHostsSort = useSelector((state) => state.filter.farmHosts);
  const tokensSort = useSelector((state) => state.filter.tokens);
  const stables = useSelector((state) => state.filter.stables);
  const singleSided = useSelector((state) => state.filter.singleSided);
  const showInactive = useSelector((state) => state.filter.showInactive);

  const dispatch = useDispatch();

  const [tokens, setTokens] = useState(null);
  const [hosts, setHosts] = useState(null);

  const [tokensOpen, setTokensOpen] = useState(false);
  const [hostsOpen, setHostsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const getData = () => {
    const tokensSet = new Set();
    const hostsSet = new Set();

    crypts.forEach((crypt) => {
      tokensSet.add(crypt.token);
      hostsSet.add(crypt.host);
    });

    setTokens(Array.from(tokensSet));
    setHosts(Array.from(hostsSet));
  };

  // Handles user token click
  const handleTokenClick = (token) => {
    // Check if it is already selected
    let selected = tokensSort.includes(token);

    // If it is selected, remove, else add
    if (selected) {
      dispatch(removeToken(token));
    } else {
      dispatch(addToken(token));
    }
  };

  // Handles user farm host click
  const handleHostClick = (host) => {
    // Check if it is already selected
    let selected = farmHostsSort.includes(host);

    // If it is selected, remove, else add
    if (selected) {
      dispatch(removeHost(host));
    } else {
      dispatch(addHost(host));
    }
  };

  useEffect(() => {
    if (tokens && hosts) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [tokens, hosts]);

  useEffect(() => {
    getData();
  }, [crypts]);

  return (
    <main className={styles.sidebar}>
      <SimpleBar style={{ maxHeight: "57rem" }}>
        <section className={styles.content}>
          {mobile && (
            <>
              <BiArrowBack className={styles.close} onClick={close} />
              <section className={styles.walletInfo}>
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
            </>
          )}

          {/* Sort order (by APY or TVL value) */}
          <section className={styles.sort}>
            <p>Sort by</p>
            <button
              onClick={() => dispatch(changeSortType("APY"))}
              className={
                sort === "APY" ? styles.selectedBtn : styles.unselectedBtn
              }
            >
              <h4>APY</h4>
            </button>
            <button
              onClick={() => dispatch(changeSortType("TVL"))}
              className={
                sort === "TVL" ? styles.selectedBtn : styles.unselectedBtn
              }
            >
              <h4>TVL</h4>
            </button>
          </section>

          {/* Farm Host dropdown select */}
          <section className={styles.dropdown}>
            <section
              className={styles.title}
              onClick={() => setHostsOpen(!hostsOpen)}
            >
              <h5>Farm Host</h5>
              <AiOutlineDown
                style={{ transform: `rotate(${hostsOpen ? "180" : "0"}deg)` }}
              />
            </section>
            {!loading && hostsOpen && (
              <section className={styles.dropdownValues}>
                {hosts.map((host, i) => {
                  let selected = farmHostsSort.includes(host);
                  let inactive = inactiveHosts.includes(host);

                  if (inactive && !showInactive) return null;

                  return (
                    <p
                      key={i}
                      style={{
                        opacity: selected ? 1 : 0.5,
                      }}
                      onClick={() => handleHostClick(host)}
                    >
                      {host}
                    </p>
                  );
                })}
              </section>
            )}
          </section>

          {/* Tokens dropdown select */}
          <section className={styles.dropdown}>
            <section
              className={styles.title}
              onClick={() => setTokensOpen(!tokensOpen)}
            >
              <h5>Tokens</h5>
              <AiOutlineDown
                style={{ transform: `rotate(${tokensOpen ? "180" : "0"}deg)` }}
              />
            </section>
            {!loading && tokensOpen && (
              <section className={styles.dropdownValues}>
                {tokens.map((token, i) => {
                  let selected = tokensSort.includes(token);

                  return (
                    <p
                      key={i}
                      style={{
                        opacity: selected ? 1 : 0.5,
                      }}
                      onClick={() => handleTokenClick(token)}
                    >
                      {token}
                    </p>
                  );
                })}
              </section>
            )}
          </section>

          <section className={styles.filters}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stables}
                    onChange={(e) => dispatch(stableFilter(e.target.checked))}
                    style={{
                      color: "#2887EF",
                    }}
                  />
                }
                label={<p className={styles.filter}>Stables</p>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={singleSided}
                    onChange={(e) =>
                      dispatch(singleSidedFilter(e.target.checked))
                    }
                    style={{
                      color: "#2887EF",
                    }}
                  />
                }
                label={<p className={styles.filter}>Single Sided</p>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showInactive}
                    onChange={(e) =>
                      dispatch(showInactiveFilter(e.target.checked))
                    }
                    style={{
                      color: "#2887EF",
                    }}
                  />
                }
                label={<p className={styles.filter}>Show Inactive</p>}
              />
            </FormGroup>
          </section>
        </section>
      </SimpleBar>
      {mobile && <ToggleSwitch />}
    </main>
  );
}

export default Sidebar;
