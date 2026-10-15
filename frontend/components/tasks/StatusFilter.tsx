import type { TaskFilter } from "@/types/api";

const FILTERS: Array<{ label: string; value: TaskFilter; icon: string }> = [
  { label: "All", value: "all", icon: "◈" },
  { label: "In Progress", value: "in-progress", icon: "⟳" },
  { label: "Done", value: "done", icon: "✓" },
  { label: "Todo", value: "todo", icon: "○" },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <section
      aria-label="Filter tasks by status"
      className="card"
      style={{ padding: "0.9rem 1.1rem" }}
    >
      <p
        style={{
          margin: "0 0 0.6rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Filter by status
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {FILTERS.map((filter) => {
          const active = filter.value === value;

          return (
            <button
              key={filter.value}
              type="button"
              className={active ? "button primary" : "button"}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
              style={{ fontSize: "0.85rem" }}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
