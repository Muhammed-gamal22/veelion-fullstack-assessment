import React from 'react'

const TaskHeader = () => {
    return (
        <header
            className="card"
            style={{
                padding: "1.75rem",
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
                    background: "linear-gradient(90deg, var(--primary), #8b5cf6, var(--success))",
                    borderRadius: "var(--radius) var(--radius) 0 0",
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                        style={{
                            fontSize: "1.6rem",
                            background: "var(--primary-soft)",
                            border: "1px solid rgba(108, 99, 255, 0.3)",
                            borderRadius: "10px",
                            width: "44px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ✅
                    </span>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                            Task Dashboard
                        </h1>
                        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
                            Manage and update your tasks below
                        </p>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default TaskHeader