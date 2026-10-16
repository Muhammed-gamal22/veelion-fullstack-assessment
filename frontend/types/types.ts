import { ActivityLog, Task, TaskFilter } from "./api";

export type Status = {
    label: string;
    value: number;
    description?: string;
    color: string;
}
export type ActivityHeaderProps = {
    query: string,
    setQuery: (query: string) => void
}
export type ActivityListProps = {
    item: ActivityLog,
    allActivity: ActivityLog[]
    idx: number
}
export type ActivityStatsProps = {
    stats: {
        total: number,
        visible: number
    }
}

export type StatusFilterProps = {
    value: TaskFilter;
    onChange: (value: TaskFilter) => void;
};

export type TaskItemProps = {
    task: Task;
    busy: boolean;
    onToggle: (task: Task) => void;
};