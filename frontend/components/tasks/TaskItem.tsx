import type { Task } from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
  tasks: Task[];
};

export function TaskItem({ task, tasks, busy, onToggle }: TaskItemProps) {
  const taskStatus = tasks.filter((t) => t.status !== task.status)
  console.log(taskStatus)
  return (
    <li
      className="card"
      style={{
        padding: "1.1rem 1.25rem",
        display: "grid",
        gap: "0.6rem",
        animation: "fadeInUp 0.3s ease both",
        transition: "transform 0.15s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flex: 1 }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: task.status === "done" ? "var(--success)" : "var(--warning)",
              flexShrink: 0,
              boxShadow: task.status === "done"
                ? "0 0 8px rgba(62, 207, 142, 0.5)"
                : "0 0 8px rgba(245, 158, 11, 0.5)",
            }}
          />
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
              textDecoration: task.status === "done" ? "line-through" : "none",
              color: task.status === "done" ? "var(--muted)" : "var(--text)",
              transition: "color 0.2s ease",
            }}
          >
            {task.title}
          </p>
        </div>

        <span className={`badge ${task.status === "done" ? "done" : "todo"}`}>
          {task.status === "done" ? "Done" : "Todo"}
        </span>
      </div>

      <small style={{ color: "var(--muted)", fontSize: "0.78rem", paddingLeft: "1.65rem" }}>
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </small>

      <div style={{ paddingLeft: "1.65rem" }}>
        <button
          type="button"
          className={`button${task.status === "done" ? "" : " primary"}`}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.status === "done" ? "todo" : "done"}`}
          style={{ fontSize: "0.82rem" }}
        >
          {busy ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  border: "2px solid transparent",
                  borderTopColor: "currentColor",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Saving…
            </>
          ) : task.status === "done" ? (
            "↩ Mark as todo"
          ) : (
            "✓ Mark as done"
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </li>
  );
}
