/** CS 7641 final report, section 4.3.4 Analysis, page 35.
 * User-selected narrative results. Do not mix with conflicting five-fold tables.
 */
export const fraudResults = [
  { name: "Baseline", description: "Raw data · Core features", accuracy: 98.7, recall: 23, precision: 81 },
  { name: "Balanced", description: "SMOTE · Core features", accuracy: 97.2, recall: 68, precision: 76 },
  { name: "Personalized", description: "Case 3 · SMOTE + personalization", accuracy: 97.8, recall: 72, precision: 89 },
] as const;
export const fraudMetrics = [
  { key: "recall", label: "Recall", note: "How much actual fraud the model detects." },
  { key: "accuracy", label: "Accuracy", note: "Overall correct classifications. High accuracy alone can hide missed fraud." },
  { key: "precision", label: "Precision", note: "How many fraud flags are correct." },
] as const;
