import type { Task } from "@/types/api";
import { TaskItemProps } from "@/types/types";



export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
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
              background: task.completed ? "var(--success)" : "var(--warning)",
              flexShrink: 0,
              boxShadow: task.completed
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
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "var(--muted)" : "var(--text)",
              transition: "color 0.2s ease",
            }}
          >
            {task.title}
          </p>
        </div>

        <span className={`badge ${task.completed ? "done" : "todo"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small style={{ color: "var(--muted)", fontSize: "0.78rem", paddingLeft: "1.65rem" }}>
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </small>

      <div style={{ paddingLeft: "1.65rem" }}>
        <button
          type="button"
          className={`button${task.completed ? "" : " primary"}`}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "todo" : "done"}`}
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
          ) : task.completed ? (
            "↩ Mark as pending"
          ) : (
            "✓ Mark as completed"
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </li>
  );
}
