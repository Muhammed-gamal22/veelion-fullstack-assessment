import { getReportsFromBackend } from '@/lib/backendApi';
import StatusCard from './StatusCard';
import { Status } from '@/types/types';
import StatusChart from './StatusChart';
import RecentActivityCard from './RecentActivityCard';
import CustomEmptyBox from '@/customs/CustomEmptyBox';
const Report = async () => {

    const report = await getReportsFromBackend();

    if (!report) {
        return (
            <CustomEmptyBox title='No Report Data' desc='Unable to retrieve report statistics. Please try again later.' />
        );
    }
    const { totalTasks, tasksByStatus, recentActivityCount } = report;
    const stats: Status[] = [
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
                    <StatusCard key={stat.label} stat={stat} />
                ))}
            </section>

            <section className='stack'>
                <RecentActivityCard recentActivityCount={recentActivityCount} />
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
                        return (
                            <StatusChart key={item.label} item={item} totalTasks={totalTasks} />
                        );
                    })}
                </div>

            </section>
        </div>
    );
};

export default Report;