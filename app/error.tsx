"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-shell" style={{ padding: "48px 24px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "12px" }}>Something went wrong</h1>
      <p style={{ color: "#b8b8b8", marginBottom: "24px" }}>
        The page hit an error. Try refreshing, or head back to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginRight: "12px",
          padding: "12px 20px",
          border: "1px solid rgba(255,255,255,.3)",
          borderRadius: "8px",
          background: "#fff",
          color: "#000",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
      <a
        href="/"
        style={{
          padding: "12px 20px",
          border: "1px solid rgba(255,255,255,.3)",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Go home
      </a>
    </main>
  );
}