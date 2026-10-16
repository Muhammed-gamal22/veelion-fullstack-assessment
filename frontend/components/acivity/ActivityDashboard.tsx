"use client"
import React from 'react'
import ActivityHeader from "@/components/acivity/ActivityHeader";
import CustomLoader from "@/customs/CustomLoader";
import ActivityList from "@/components/acivity/ActivityList";
import ActivityStats from "@/components/acivity/ActivityStats";
import { useActivity } from "@/hooks/useActivity";
import CustomEmptyBox from '@/customs/CustomEmptyBox';
const ActivityDashboard = () => {
    const { allActivity, loading, shownActivity, query, setQuery } = useActivity()
    const stats = {
        total: allActivity.length,
        visible: shownActivity.length
    }
    return (
        <>
            <ActivityHeader query={query} setQuery={setQuery} />
            <ActivityStats stats={stats} />
            <section className="card" style={{ padding: "1.25rem" }}>
                {loading ? (
                    <CustomLoader title="activity…" />
                )
                    : shownActivity.length === 0 ? (
                        <CustomEmptyBox title='No activity found.' desc={"Try a different search query."} query={query} />
                    )
                        : (
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0" }}>
                                {shownActivity.map((item, idx) => {
                                    return (
                                        <ActivityList
                                            key={item.id} idx={idx}
                                            isLast={idx === shownActivity.length - 1}
                                            item={item} />
                                    )
                                })}
                            </ul>
                        )}
            </section>
        </>
    )
}

export default ActivityDashboard