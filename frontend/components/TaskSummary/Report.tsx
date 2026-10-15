import { getReportsFromBackend } from '@/lib/backendApi';
import { ReportResponse } from '@/types/api';

const Report = async () => {
    const report = await getReportsFromBackend();

    if (!report) {
        return (
            <div style={{ padding: '1.5rem 0' }}>
                <h2 style={{ margin: 0, fontSize: '1.1rem' }}>
                    No Report Data
                </h2>
                <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
                    Unable to retrieve report statistics. Please try again later.
                </p>
            </div>
        );
    }

    const { totalTasks, tasksByStatus, recentActivityCount } = report;


    const stats = [
        {
            label: 'Total Tasks',
            value: totalTasks,
            description: 'All tasks',
            color: 'var(--primary)',
        },
        {
            label: 'To Do',
            value: tasksByStatus.todo,
            description: 'Waiting to start',
            color: 'var(--warning)',
        },
        {
            label: 'In Progress',
            value: tasksByStatus['in-progress'],
            description: 'Currently active',
            color: 'var(--primary-hover)',
        },
        {
            label: 'Completed',
            value: tasksByStatus.done,
            description: 'Successfully finished',
            color: 'var(--success)',
        },
    ];

    const statusBreakdown = [
        {
            label: 'To Do',
            value: tasksByStatus.todo,
            color: 'var(--warning)',
        },
        {
            label: 'In Progress',
            value: tasksByStatus['in-progress'],
            color: 'var(--primary-hover)',
        },
        {
            label: 'Completed',
            value: tasksByStatus.done,
            color: 'var(--success)',
        },
    ];

    return (
        <div className="stack fade-in" style={{ gap: '1.5rem', textAlign: 'left' }}>
            <section
                className="stack"
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                }}
                aria-label="Task statistics"
            >
                {stats.map((stat) => (
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
                ))}
            </section>





            <section className="card" style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1rem' }}>
                        Tasks by Status
                    </h2>
                    <p
                        style={{
                            color: 'var(--muted)',
                            fontSize: '0.8rem',
                            margin: '0.4rem 0 0',
                        }}
                    >
                        Distribution of tasks across different stages
                    </p>
                </div>

                <div className="stack" style={{ gap: '1.4rem' }}>
                    {statusBreakdown.map((item) => {
                        const percentage =
                            totalTasks > 0
                                ? Math.round((item.value / totalTasks) * 100)
                                : 0;

                        return (
                            <div key={item.label}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        marginBottom: '0.6rem',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    <span style={{ fontWeight: 600 }}>
                                        {item.label}
                                    </span>

                                    <span style={{ color: 'var(--muted)' }}>
                                        {item.value} tasks · {percentage}%
                                    </span>
                                </div>

                                <div
                                    style={{
                                        height: '8px',
                                        borderRadius: '999px',
                                        background: 'var(--surface-2)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            borderRadius: '999px',
                                            background: item.color,
                                            transition: 'width 0.3s ease',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Report;