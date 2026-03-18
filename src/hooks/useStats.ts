"use client";

import { useState, useEffect } from "react";

export function useStats(key: string) {
  const [results, setResults] = useState<boolean[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`stats_${key}`);
    if (saved) {
      try {
        setResults(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    }
  }, [key]);

  const addResult = (isCorrect: boolean) => {
    setResults((prev) => {
      const newResults = [...prev, isCorrect].slice(-10); // Keep only last 10
      localStorage.setItem(`stats_${key}`, JSON.stringify(newResults));
      return newResults;
    });
  };

  const successRate = results.length > 0 
    ? Math.round((results.filter(Boolean).length / results.length) * 100) 
    : null;

  return { successRate, addResult, totalAttempted: results.length };
}
