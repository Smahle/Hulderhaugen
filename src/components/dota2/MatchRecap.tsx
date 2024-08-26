// src/components/dota2/MatchRecap.tsx

import React from "react";
import styles from "./Dota2Page.module.css"; // Import CSS module

export default function MatchRecap() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>Match Recap and Analysis</h1>
        <p>
          Detailed recap and analysis of recent matches, including key moments
          and stats.
        </p>
        {/* Add additional content and components as needed */}
      </div>
    </div>
  );
}
