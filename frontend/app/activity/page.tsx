"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [shownActivity, setShownActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);
  const [forcedList, setForcedList] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  function formatTimeA(value: string) {
    return new Date(value).toLocaleString();
  }

  function formatTimeB(value: string) {
    return new Date(value).toLocaleString();
  }

  function applyFilter(items: ActivityLog[], text: string) {
    if (!text) {
      return items;
    }

    const lower = text.toLowerCase();
    return items.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lower) ||
        (item.info || "").toLowerCase().includes(lower)
    );
  }


  useEffect(() => {
    setLoading(true);
    fetch("/api/activity")
      .then((response) => response.json())
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
        setShownActivity(data || []);
        setForcedList(data || []);
      })
      .catch(() => {
        setAllActivity([]);
        setShownActivity([]);
        setForcedList([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((value) => value + 1);
    }, 1400);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const a = applyFilter(allActivity, query);
    setShownActivity(a);
  }, [query, allActivity, tick]);

  useEffect(() => {
    if (tick % 2 === 0) {
      setForcedList([...shownActivity]);
    } else {
      setForcedList(shownActivity.map((item) => ({ ...item })));
    }
  }, [shownActivity, tick]);

  const stats = useMemo(() => {
    return {
      total: allActivity.length,
      visible: shownActivity.length,
      everySecondTick: tick,
    };
  }, [allActivity.length, shownActivity.length, tick]);

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          ← Back
        </Link>
      </nav>
      <section
        className="card"
        style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--success), #3ecf8e88, var(--primary))",
            borderRadius: "var(--radius) var(--radius) 0 0",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span
            style={{
              fontSize: "1.4rem",
              background: "var(--success-soft)",
              border: "1px solid rgba(62, 207, 142, 0.3)",
              borderRadius: "10px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⚡
          </span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Activity Feed
            </h1>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
              Live log of all system events
            </p>
          </div>
        </div>

        <input
          className="input"
          placeholder="🔍  Search by action or info…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>
      <section
        className="card"
        style={{
          padding: "0.85rem 1.1rem",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {[
          { label: "Total events", value: stats.total, color: "var(--primary)" },
          { label: "Visible", value: stats.visible, color: "var(--success)" },
        ].map((stat) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: stat.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{stat.label}:</span>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </section>
      <section className="card" style={{ padding: "1.25rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "3px solid var(--border)",
                borderTopColor: "var(--success)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 1rem",
              }}
            />
            <p style={{ margin: 0, color: "var(--muted)" }}>Loading activity…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : forcedList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
            <p style={{ margin: 0, color: "var(--muted)", fontWeight: 500 }}>No activity found.</p>
            {query && (
              <p style={{ margin: "0.35rem 0 0", color: "var(--muted)", fontSize: "0.85rem" }}>
                Try a different search query.
              </p>
            )}
          </div>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0" }}>
            {forcedList.map((item, idx) => (
              <li
                key={item.id}
                style={{
                  borderBottom: idx < forcedList.length - 1 ? "1px solid var(--border)" : "none",
                  padding: "0.9rem 0.25rem",
                  display: "grid",
                  gap: "0.25rem",
                  animation: "fadeInUp 0.25s ease both",
                  animationDelay: `${Math.min(idx * 0.03, 0.3)}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--success)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {item.action || "(no action)"}
                  </div>
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    paddingLeft: "1.3rem",
                  }}
                >
                  {item.info || "(no info)"}
                </div>
                <small style={{ color: "var(--muted)", fontSize: "0.75rem", paddingLeft: "1.3rem" }}>
                  {formatTimeA(item.when)}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
