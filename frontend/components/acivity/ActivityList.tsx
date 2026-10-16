import { ActivityListProps } from '@/types/types';
import React from 'react'

const ActivityList = ({ item, allActivity, idx }: ActivityListProps) => {
    function formatTime(value: string) {
        return new Date(value).toLocaleString();
    }
    return (
        <li
            key={item.id}
            style={{
                borderBottom: idx < allActivity.length - 1 ? "1px solid var(--border)" : "none",
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
                {formatTime(item.when)}
            </small>
        </li>
    )
}

export default ActivityList