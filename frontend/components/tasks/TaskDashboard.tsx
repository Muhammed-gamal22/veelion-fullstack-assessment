"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import { useState } from "react";
import TaskModal from "@/models/TaskModal";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
    setAddNewTaskModal,
    addNewTaskModal,
    taskFormData,
    setTaskFormData,
    titleTouched,
    setTitleTouched,
    isCreatingTask,
    addNewTask,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, task.status === "done" ? "todo" : "done");
  };
  const handleAddTask = () => {
    setAddNewTaskModal(true);
  };

  return (
    <>
      <section className="stack">
        <header
          className="card"
          style={{
            padding: "1.75rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, var(--primary), #8b5cf6, var(--success))",
              borderRadius: "var(--radius) var(--radius) 0 0",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  fontSize: "1.6rem",
                  background: "var(--primary-soft)",
                  border: "1px solid rgba(108, 99, 255, 0.3)",
                  borderRadius: "10px",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✅
              </span>
              <div>
                <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Task Dashboard
                </h1>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
                  Manage and update your tasks below
                </p>
              </div>
            </div>
            <button onClick={() => {
              setAddNewTaskModal(true)
            }} className="button primary">Add New Task</button>
          </div>

        </header>

        <StatusFilter value={filter} onChange={setFilter} />

        {
          loading ? (
            <section className="card" style={{ padding: "2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "3px solid var(--border)",
                  borderTopColor: "var(--primary)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ margin: 0, color: "var(--muted)" }}>Loading tasks…</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </section>
          ) : null
        }

        {
          error ? (
            <section
              className="card"
              style={{
                padding: "1.25rem",
                borderColor: "var(--danger)",
                background: "var(--danger-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <p style={{ margin: 0, color: "var(--danger)", fontWeight: 600 }}>{error}</p>
              </div>
              <button type="button" className="button" onClick={fetchTasks}>
                ↺ Retry
              </button>
            </section>
          ) : null
        }

        {
          !loading && !error ? (
            <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
          ) : null
        }


      </section >
      {addNewTaskModal && (
        <TaskModal
          setAddNewTaskModal={setAddNewTaskModal}
          taskFormData={taskFormData}
          setTaskFormData={setTaskFormData}
          titleTouched={titleTouched}
          setTitleTouched={setTitleTouched}
          isCreatingTask={isCreatingTask}
          addNewTask={addNewTask}
        />
      )}
    </>
  );
}
