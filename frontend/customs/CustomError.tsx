
interface ErrorProps {
    error: string;
    fetchAction: () => void;
}

const CustomError = ({ error, fetchAction }: ErrorProps) => {
    return (
        <section
            className="card"
            style={{
                padding: "1.25rem",
                borderColor: "var(--danger)",
                background: "var(--danger-soft)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <p style={{ margin: 0, color: "var(--danger)", fontWeight: 600 }}>{error}</p>
            </div>
            <button type="button" className="button" onClick={fetchAction}>
                ↺ Retry
            </button>
        </section>
    )
}

export default CustomError