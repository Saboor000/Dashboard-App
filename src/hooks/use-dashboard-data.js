"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchDashboardData } from "@/services/dashboard-service";

const POLL_MS = 5000;

export function useDashboardData() {
  const [records, setRecords] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const loadData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await fetchDashboardData(controller.signal);
      setRecords(data.records);
      setUpdatedAt(data.updatedAt);
      setError(null);
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError(err instanceof Error ? err.message : "Unable to fetch data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, POLL_MS);

    return () => {
      clearInterval(timer);
      abortRef.current?.abort();
    };
  }, [loadData]);

  return {
    records,
    updatedAt,
    loading,
    error,
    refetch: loadData,
  };
}
