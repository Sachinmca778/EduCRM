"use client";
import React from "react";

export default function AlertMessage({ type = "success", message }) {
  if (!message) return null;

  const isSuccess = type === "success";

  const styles = isSuccess
    ? {
        border: "border-green-300",
        bg: "from-green-50 to-green-100",
        text: "text-green-800",
        iconColor: "text-green-600",
        iconPath: "M5 13l4 4L19 7", // ✅ check icon
      }
    : {
        border: "border-red-300",
        bg: "from-red-50 to-red-100",
        text: "text-red-800",
        iconColor: "text-red-600",
        iconPath: "M6 18L18 6M6 6l12 12", // ❌ cross icon
      };

  return (
    <div
      className={`flex items-center gap-3 p-4 mb-4 rounded-lg border ${styles.border} bg-gradient-to-r ${styles.bg} ${styles.text} shadow-sm animate-fade-in`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${styles.iconColor}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={styles.iconPath} />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
}



