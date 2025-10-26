"use client";
import React from "react";

export default function AlertMessage({ type = "success", message }) {
  if (!message) return null;

  const isSuccess = type === "success";

  const styles = isSuccess
    ? {
        border: "border-green-400",
        bg: "bg-gradient-to-r from-green-100 via-green-50 to-green-100",
        text: "text-green-900",
        iconColor: "text-green-700",
        iconPath: "M5 13l4 4L19 7", // ✅ check icon
      }
    : {
        border: "border-red-400",
        bg: "bg-gradient-to-r from-red-100 via-red-50 to-red-100",
        text: "text-red-900",
        iconColor: "text-red-700",
        iconPath: "M6 18L18 6M6 6l12 12", // ❌ cross icon
      };

  return (
    <div
      className={`
        flex items-center gap-3 p-4 mb-4 rounded-xl border ${styles.border} ${styles.bg} ${styles.text} 
        shadow-lg transform transition-all duration-300 ease-out hover:scale-[1.02] 
        animate-fade-in
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${styles.iconColor} flex-shrink-0`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={styles.iconPath} />
      </svg>
      <span className="font-semibold text-sm sm:text-base">{message}</span>
    </div>
  );
}



