import Report from "@/components/TaskSummary/Report";
import ReportsHeader from "@/components/TaskSummary/ReportsHeader";
import CustomLoader from "@/customs/CustomLoader";
import Link from "next/link";
import { Suspense } from "react";

export default async function ReportsPage() {
    return (
        <main className="stack">
            <nav>
                <Link href="/" className="button">
                    ← Back
                </Link>
            </nav>
            <ReportsHeader />
            <section
                className="card"
                style={{ padding: "3rem 1.5rem", textAlign: "center" }}
            >
                <Suspense fallback={<CustomLoader title="reports" />}>
                    <Report />
                </Suspense>
            </section>
        </main>
    );
}