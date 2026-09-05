"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const App = dynamic(() => import("../artifacts/adodo-collections/src/App"), {
  ssr: false,
});

export default function Page() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
        console.error("Unable to register the ADODO app service worker", error);
      });
    };
    window.addEventListener("load", register);
    if (document.readyState === "complete") register();
    return () => window.removeEventListener("load", register);
  }, []);

  return <App />;
}
