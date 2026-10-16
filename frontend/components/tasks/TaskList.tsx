import type { Task } from "@/types/api";
import { TaskItem } from "@/components/tasks/TaskItem";
import CustomEmptyBox from "@/customs/CustomEmptyBox";

type TaskListProps = {
  tasks: Task[];
  updatingTaskId: string;
  onToggle: (task: Task) => void;
};

export function TaskList({ tasks, updatingTaskId, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <CustomEmptyBox title=" No tasks match this filter." desc="Try changing the filter above." />
      // <section className="card" style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      //   <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
      //   <p style={{ margin: 0, color: "var(--muted)", fontWeight: 500 }}>
      //     No tasks match this filter.
      //   </p>
      //   <p style={{ margin: "0.35rem 0 0", color: "var(--muted)", fontSize: "0.85rem" }}>
      //     Try changing the filter above.
      //   </p>
      // </section>
    );
  }

  return (
    <section aria-label="Task list">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.6rem",
          padding: "0 0.2rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </p>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            busy={updatingTaskId === task.id}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}
