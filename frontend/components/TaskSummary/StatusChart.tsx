import { Status } from '@/types/types';
import React from 'react'
const StatusChart = ({ item, totalTasks }: { item: Status, totalTasks: number }) => {
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
}

export default StatusChart