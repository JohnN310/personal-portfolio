"use client";
import Link from "next/link";
import { useState } from "react";
import { fraudResults, fraudMetrics } from "@/content/fraud-results";
import styles from "./FraudChart.module.css";

const insights: Record<string, string> = {
  recall: "Case 3 reports 72% recall, compared with 23% for the baseline.",
  precision: "Case 3 reports 89% precision; the report also claims 37% fewer false alarms.",
  accuracy: "Case 3 reports 97.8% accuracy; the baseline is higher at 98.7%.",
};

const caseTags: Record<string, string> = {
  Baseline: "Raw features",
  Balanced: "SMOTE sampling",
  Personalized: "SMOTE + Personalization",
};

export function FraudChart({
  compact = false,
  href,
}: {
  compact?: boolean;
  href?: string;
}) {
  const [metricIndex, setMetric] = useState(0);
  const metric = fraudMetrics[metricIndex];

  const chartCard = (
    <div className={styles.visualCard}>
      {fraudResults.map((result) => {
        const value = result[metric.key];
        const isBest = value === Math.max(...fraudResults.map(item => item[metric.key]));
        return (
          <div className={styles.barRow} key={result.name}>
            <div className={styles.barHeader}>
              <div className={styles.caseTitleGroup}>
                <span className={styles.caseName}>{result.name}</span>
                <span className={styles.caseTag}>{caseTags[result.name]}</span>
                {isBest && <span className={styles.bestBadge}>Highest</span>}
              </div>
              <strong className={`${styles.barValue} ${isBest ? styles.bestValue : ""}`}>
                {value.toFixed(2)}%
              </strong>
            </div>
            <div className={styles.track}>
              <span
                className={`${styles.fill} ${isBest ? styles.bestFill : styles.regularFill}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className={styles.kpiRow}>
        <div className={styles.kpi}>
          <strong>97.8%</strong>
          <span>Case 3 accuracy</span>
        </div>
        <div className={styles.kpi}>
          <strong>72.0%</strong>
          <span>Case 3 recall</span>
        </div>
        <div className={styles.kpi}>
          <strong>−37%</strong>
          <span>Reported fewer false alarms</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.demo} aria-label="Random Forest experiment results">
      <div className={styles.top}>
        <strong>
          Random Forest <span className={styles.treesBadge}>200 trees</span>
        </strong>
        <span className={styles.topMeta}>8.9M txns · Report §4.3.4</span>
      </div>

      <div className={styles.tabs} role="group" aria-label="Chart metric">
        {fraudMetrics.map((item, index) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={index === metricIndex}
            onClick={() => setMetric(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className={styles.metricInsight}>
        {insights[metric.key] ?? metric.note}
      </p>

      {compact && href ? (
        <Link
          href={href}
          className={styles.visualLink}
          aria-label="Explore Signal fraud detection research"
        >
          {chartCard}
        </Link>
      ) : (
        chartCard
      )}

      <div className={styles.bottom}>
        <span>
          {compact
            ? "Click card to explore case study ↗"
            : "CS 7641 · Random Forest results"}
        </span>
        <strong>{metric.label}: 0–100%</strong>
      </div>

      {!compact && (
        <>
          <p className={styles.note}>{metric.note}</p>
          <p className={styles.note}>
            Case 3 adds user clusters, location distance, and anomaly flags to
            the balanced model. The analysis reports better recall than the
            baseline and better precision than SMOTE alone.
          </p>
          <details className={styles.source}>
            <summary>Source & results</summary>
            <p>Source: CS 7641 final report, §4.3.4.</p>
            <table>
              <caption>Reported analysis results</caption>
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Accuracy</th>
                  <th>Recall</th>
                  <th>Precision</th>
                </tr>
              </thead>
              <tbody>
                {fraudResults.map(item => (
                  <tr key={item.name}>
                    <th>{item.name}</th>
                    <td>{item.accuracy}%</td>
                    <td>{item.recall}%</td>
                    <td>{item.precision}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </section>
  );
}
