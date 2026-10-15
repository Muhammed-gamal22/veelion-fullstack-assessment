import Link from "next/link";

const MODULES = [
  {
    href: "/tasks",
    title: "Task Dashboard",
    description: "Manage and track all your tasks. Toggle completion status with real-time updates.",
    icon: "✅",
    color: "var(--primary)",
    glow: "rgba(108, 99, 255, 0.15)",
  },
  {
    href: "/activity",
    title: "Activity Feed",
    description: "Browse a live-updating log of all system events and user actions.",
    icon: "⚡",
    color: "var(--success)",
    glow: "rgba(62, 207, 142, 0.15)",
  },
  {
    href: "/reports",
    title: "Reports",
    description: "View aggregated statistics and performance reports across all modules.",
    icon: "📊",
    color: "var(--warning)",
    glow: "rgba(245, 158, 11, 0.15)",
  },
];

export default function HomePage() {
  return (
    <main>
      <header
        className="stack"
        style={{
          marginBottom: "3rem",
          textAlign: "center",
          padding: "3rem 0 1rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(108, 99, 255, 0.1)",
            border: "1px solid rgba(108, 99, 255, 0.3)",
            borderRadius: "999px",
            padding: "0.3rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--primary)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            justifyContent: "center",
          }}
        >
          <span>⚡</span> Fullstack Assessment
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #e8eaf2 30%, #6c63ff 70%, #3ecf8e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          VeeLion Frontend
        </h1>

        <p
          style={{
            margin: "0.75rem auto 0",
            color: "var(--muted)",
            maxWidth: "460px",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Two standalone modules built against the provided backend API. Select a module below to get started.
        </p>
      </header>

      <section
        className="stack"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {MODULES.map((mod, i) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="card"
            style={{
              padding: "1.75rem",
              display: "block",
              animationDelay: `${i * 0.08}s`,
              animation: "fadeInUp 0.4s ease both",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${mod.color}, transparent)`,
                borderRadius: "var(--radius) var(--radius) 0 0",
              }}
            />

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: mod.glow,
                border: `1px solid ${mod.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {mod.icon}
            </div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: "0.5rem",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              {mod.title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {mod.description}
            </p>

            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: mod.color,
              }}
            >
              Open module
              <span style={{ transition: "transform 0.2s" }}>→</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
