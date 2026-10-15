
"use client";

import CustomError from "@/customs/CustomError";
import { useEffect } from "react";

type ReportsErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ReportsError({
    error,
    reset,
}: ReportsErrorProps) {

    return (
        <div style={{
            height: "calc(100vh - 200px)",
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CustomError error={error.message} fetchAction={reset} />
        </div>
    );
}
