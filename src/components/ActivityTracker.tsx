"use client";

import { useEffect } from "react";

function getVisitorId() {
  const key = "ppz_visitor_id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(key, id);
  return id;
}

export default function ActivityTracker() {
  useEffect(() => {
    const visitorId = getVisitorId();
    const visitedKey = `ppz_visited_${new Date().toISOString().slice(0, 10)}`;

    if (window.sessionStorage.getItem(visitedKey)) return;
    window.sessionStorage.setItem(visitedKey, "1");

    fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-visitor-id": visitorId,
      },
      body: JSON.stringify({ action: "visit" }),
      keepalive: true,
    }).catch(() => {
      // Analytics is non-critical.
    });
  }, []);

  return null;
}
