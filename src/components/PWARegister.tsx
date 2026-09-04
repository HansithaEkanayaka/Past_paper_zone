"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/",
      })
      .then(() => {
        console.log("PastPaperZone PWA service worker registered.");
      })
      .catch((error) => {
        console.error(
          "PastPaperZone service worker registration failed:",
          error
        );
      });
  }, []);

  return null;
}