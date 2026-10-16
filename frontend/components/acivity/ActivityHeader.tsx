"use client"
import { ActivityLog } from '@/types/api';
import { ActivityHeaderProps } from '@/types/types';
import React, { useState } from 'react'

const ActivityHeader = ({ query, setQuery }: ActivityHeaderProps) => {


    return (
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
                onChange={(event) => {
                    setQuery(event.target.value)
                }}
            />
        </section>
    )
}

export default ActivityHeader