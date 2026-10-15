import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeeLion Frontend Assessment",
  description: "Task dashboard and activity feed modules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "rgba(15, 17, 23, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(108, 99, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            padding: "0 2rem",
            zIndex: 100,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #6c63ff, #3ecf8e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            VeeLion
          </span>
          <span
            style={{
              marginLeft: "0.4rem",
              color: "var(--muted)",
              fontSize: "0.85rem",
              fontWeight: 400,
            }}
          >
            Assessment
          </span>
        </div>
        <div style={{ paddingTop: "60px" }}>{children}</div>
      </body>
    </html>
  );
}
