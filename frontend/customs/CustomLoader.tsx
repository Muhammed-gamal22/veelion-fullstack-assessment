import React from 'react'

const CustomLoader = ({ title }: { title?: string }) => {
    return (
        <section className="card" style={{ padding: "2rem", textAlign: "center" }}>
            <div
                style={{
                    width: "36px",
                    height: "36px",
                    border: "3px solid var(--border)",
                    borderTopColor: "var(--primary)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 1rem",
                }}
            />
            <p style={{ margin: 0, color: "var(--muted)" }}>Loading {title}...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
    )
}

export default CustomLoader