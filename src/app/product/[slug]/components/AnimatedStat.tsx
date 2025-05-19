"use client";

import React from "react";
import CountUp from "./CountUp";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

const AnimatedStat = ({ value, className = "" }: AnimatedStatProps) => {
  // For "500+" format
  if (/^\d+\+$/.test(value)) {
    const numValue = parseInt(value.replace("+", ""), 10);
    return (
      <span className={className}>
        <CountUp end={numValue} duration={1.2} suffix="+" />
      </span>
    );
  }

  // For "24/7" format
  if (value === "24/7") {
    return <span className={className}>{value}</span>;
  }

  // For "до 7 лет" format
  if (/^до \d+ лет$/.test(value)) {
    const numValue = parseInt(value.match(/\d+/)?.[0] || "0", 10);
    return (
      <span className={className}>
        до <CountUp end={numValue} duration={1} /> лет
      </span>
    );
  }

  // For pure numbers
  if (/^\d+$/.test(value)) {
    return (
      <span className={className}>
        <CountUp end={parseInt(value, 10)} duration={1.5} />
      </span>
    );
  }

  // Fallback for any other format
  return <span className={className}>{value}</span>;
};

export default AnimatedStat;
