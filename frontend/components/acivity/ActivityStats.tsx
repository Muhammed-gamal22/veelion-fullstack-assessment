import { ActivityLog } from '@/types/api'
import { ActivityStatsProps } from '@/types/types'
import React from 'react'

const ActivityStats = ({ stats }: ActivityStatsProps) => {
    return (
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
    )
}

export default ActivityStats