import Link from "next/link";

export default function ReportsPage() {
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
                        background: "linear-gradient(90deg, var(--warning), #f59e0b88, var(--primary))",
                        borderRadius: "var(--radius) var(--radius) 0 0",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                        style={{
                            fontSize: "1.4rem",
                            background: "rgba(245, 158, 11, 0.12)",
                            border: "1px solid rgba(245, 158, 11, 0.3)",
                            borderRadius: "10px",
                            width: "44px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        📊
                    </span>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                            Reports
                        </h1>
                        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
                            Aggregated statistics and performance insights
                        </p>
                    </div>
                </div>
            </section>

            <section
                className="card"
                style={{ padding: "3rem 1.5rem", textAlign: "center" }}
            >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</div>
                <h2 style={{ margin: "0 0 0.5rem", fontWeight: 700, fontSize: "1.1rem" }}>
                    Coming Soon
                </h2>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
                    Reports module is under development.
                </p>
            </section>
        </main>
    );
}