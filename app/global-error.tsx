"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#000", color: "#fff", fontFamily: "sans-serif" }}>
        <main style={{ padding: "48px 24px", textAlign: "center" }}>
          <h1 style={{ marginBottom: "12px" }}>843Shine</h1>
          <p style={{ color: "#b8b8b8", marginBottom: "24px" }}>
            Something went wrong loading the site.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "12px 20px",
              border: 0,
              borderRadius: "8px",
              background: "#fff",
              color: "#000",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}