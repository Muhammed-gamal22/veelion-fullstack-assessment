import React from 'react'

const CustomEmptyBox = ({ title, desc, query }: {
    title: string;
    desc: string;
    query?: string
}) => {
    return (
        <section className="card" style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
            <p style={{ margin: 0, color: "var(--muted)", fontWeight: 500 }}>
                {title}
            </p>
            {query && <p style={{ margin: "0.35rem 0 0", color: "var(--muted)", fontSize: "0.85rem" }}>
                {desc}
            </p>}
        </section>
    )
}

export default CustomEmptyBox