import { useTasks } from '@/hooks/useTasks';
import React, { useState } from 'react'


const TaskModal = ({
    setAddNewTaskModal,
    taskFormData,
    setTaskFormData,
    titleTouched,
    setTitleTouched,
    isCreatingTask,
    addNewTask,
}: {
    setAddNewTaskModal: (value: boolean) => void;
    taskFormData: { title: string; status: string };
    setTaskFormData: (value: { title: string; status: string }) => void;
    titleTouched: boolean;
    setTitleTouched: (value: boolean) => void;
    isCreatingTask: boolean;
    addNewTask: () => void;
}) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNewTask()
    };
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
            }}

        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-task-title"
                onClick={(event) => event.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "480px",
                    background: "var(--bg)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow)",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div>
                        <h2
                            id="add-task-title"
                            style={{ margin: 0, fontSize: "1.4rem" }}
                        >
                            Add New Task
                        </h2>
                        <p
                            style={{
                                margin: "0.5rem 0 0",
                                color: "var(--muted)",
                                fontSize: "0.9rem",
                            }}
                        >
                            Enter the details of your new task below.
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={() => {
                            setTitleTouched(false)
                            setTaskFormData({ title: '', status: 'todo' })
                            setAddNewTaskModal(false)
                        }}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "var(--muted)",
                            fontSize: "1.4rem",
                            cursor: "pointer",
                            lineHeight: 1,
                        }}
                    >
                        &times;
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "grid",
                        gap: "1rem",
                    }}
                >
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                        <label htmlFor="task-title">Task title</label>
                        <input
                            id="task-title"
                            className="input"
                            type="text"
                            placeholder="e.g. Build reports page"
                            required
                            style={{ width: "100%", boxSizing: "border-box" }}
                            value={taskFormData.title}
                            onKeyUp={() => {
                                setTitleTouched(true)
                            }}
                            onKeyDown={() => {
                                setTitleTouched(false)
                            }}
                            onChange={(e) => {
                                setTaskFormData({ ...taskFormData, title: e.target.value })
                            }}
                        />
                        {titleTouched && !taskFormData.title && (
                            <p style={{ color: "red", fontSize: "0.8rem" }}>Title is required</p>
                        )}
                    </div>

                    <div style={{ display: "grid", gap: "0.4rem" }}>
                        <label htmlFor="task-status">Task Status</label>
                        <select
                            id="task-status"
                            className="input"
                            required
                            value={taskFormData.status}
                            onChange={(e) => {
                                setTaskFormData({ ...taskFormData, status: e.target.value })
                            }}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                cursor: "pointer",
                                resize: "vertical",
                                fontFamily: "inherit",
                            }}
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "0.75rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        <button
                            type="button"
                            disabled={isCreatingTask}
                            onClick={() => {
                                setTitleTouched(false)
                                setTaskFormData({ title: '', status: 'todo' })
                                setAddNewTaskModal(false)
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="button primary"
                            disabled={isCreatingTask}
                        >
                            {isCreatingTask ? 'Creating...' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal