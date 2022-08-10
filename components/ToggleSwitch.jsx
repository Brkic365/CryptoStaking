import React, { useState, useEffect } from "react";
import styles from "../styles/ToggleSwitch.module.scss";

import { useTheme } from "next-themes";

export default function ToggleSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className={styles.toggleContainer}>
      <p
        style={{ opacity: theme === "light" ? 1 : 0.5 }}
        onClick={() => setTheme("light")}
      >
        Light
      </p>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <span className={styles.switch} />
      </label>
      <p
        style={{ opacity: theme === "dark" ? 1 : 0.5 }}
        onClick={() => setTheme("dark")}
      >
        Dark
      </p>
    </main>
  );
}
