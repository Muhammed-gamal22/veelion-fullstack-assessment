"use client";

import { ActivityLog } from "@/types/api";
import { useEffect, useState } from "react";

export function useActivity() {
    const [loading, setLoading] = useState<boolean>(true);
    const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
    const [query, setQuery] = useState("");
    const shownActivity = allActivity.filter((item) => {
        const search = query.toLowerCase();
        return (
            (item.action || "").toLowerCase().includes(search) ||
            (item.info || "").toLowerCase().includes(search)
        );
    });
    useEffect(() => {
        setLoading(true);
        fetch("/api/activity")
            .then((response) => response.json())
            .then((data: ActivityLog[]) => {
                setAllActivity(data || []);
            })
            .catch(() => {
                setAllActivity([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        shownActivity,
        query,
        setQuery,
        allActivity,
        loading,

    }

} 