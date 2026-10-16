import React from 'react'

const RecentActivityCard = ({ recentActivityCount }: { recentActivityCount: number }) => {
    return (
        <article
            className="card"
            style={{
                padding: '1.25rem',
                borderTop: `3px solid var(--primary)`,
            }}
        >
            <p
                style={{
                    color: 'var(--muted)',
                    fontSize: '0.85rem',
                    margin: '0 0 0.75rem',
                }}
            >
                Recent Activity
            </p>

            <p
                style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: "var(--success)",
                    margin: 0,
                    lineHeight: 1.2,
                }}
            >
                {recentActivityCount}
            </p>

            <p
                style={{
                    color: 'var(--muted)',
                    fontSize: '0.75rem',
                    margin: '0.75rem 0 0',
                }}
            >
                Count of recent activity in the last 7 days.
            </p>
        </article>
    )
}

export default RecentActivityCard