"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../artifacts/adodo-collections/src/App"), {
  ssr: false,
});

export default function Page() {
  return <App />;
}
