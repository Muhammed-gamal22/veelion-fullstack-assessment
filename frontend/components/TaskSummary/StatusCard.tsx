import React from 'react'
import type { Status } from "@/types/types";

const StatusCard = ({ stat }: { stat: Status }) => {
    return (
        <article
            key={stat.label}
            className="card"
            style={{
                padding: '1.25rem',
                borderTop: `3px solid ${stat.color}`,
            }}
        >
            <p
                style={{
                    color: 'var(--muted)',
                    fontSize: '0.85rem',
                    margin: '0 0 0.75rem',
                }}
            >
                {stat.label}
            </p>

            <p
                style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: stat.color,
                    margin: 0,
                    lineHeight: 1.2,
                }}
            >
                {stat.value}
            </p>

            <p
                style={{
                    color: 'var(--muted)',
                    fontSize: '0.75rem',
                    margin: '0.75rem 0 0',
                }}
            >
                {stat.description}
            </p>
        </article>
    )
}

export default StatusCard