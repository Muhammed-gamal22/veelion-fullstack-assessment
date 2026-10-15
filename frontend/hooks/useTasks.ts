"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ErrorResponse, Task, TaskFilter, TaskResponse, TasksResponse } from "@/types/api";
import { getErrorMessage, requestJson } from "@/utils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string>("");
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [titleTouched, setTitleTouched] = useState(false);
  const [addNewTaskModal, setAddNewTaskModal] = useState(false);
  const [taskFormData, setTaskFormData] = useState<{
    title: string;
    status: string;
  }>({
    title: "",
    status: "todo",
  })

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const body = await requestJson<TasksResponse>("/api/tasks", {
        method: "GET",
      });

      setTasks(body.data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId: string, status: "todo" | "in-progress" | "done") => {
    try {
      setUpdatingTaskId(taskId);
      setError("");

      const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? body.data : task))
      );
    } catch (error) {
      setError(getErrorMessage(error, "Could not update task status."));
    } finally {
      setUpdatingTaskId("");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "done") {
      return tasks.filter((task) => task.status === "done");
    }

    if (filter === "todo") {
      return tasks.filter((task) => task.status === "todo");
    }

    if (filter === "in-progress") {
      return tasks.filter((task) => task.status === "in-progress");
    }

    return tasks;
  }, [tasks, filter]);

  const addNewTask = async () => {
    if (!taskFormData.title.trim()) {
      setTitleTouched(true);
      return;
    }

    try {
      setIsCreatingTask(true);
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskFormData),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.error?.message || "Failed to create task");
      }

      await res.json();

      setTaskFormData({
        title: '',
        status: 'todo',
      });
      setTitleTouched(false);
      setAddNewTaskModal(false);
      setIsCreatingTask(false);
      fetchTasks();
    } catch (error) {
      setError(getErrorMessage(error, "Failed to create task"));
    } finally {
      setIsCreatingTask(false);
    }
  }

  return {
    tasks,
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    addNewTaskModal,
    taskFormData,
    titleTouched,
    isCreatingTask,
    setTitleTouched,
    setAddNewTaskModal,
    setTaskFormData,
    setIsCreatingTask,
    setFilter,
    fetchTasks,
    updateTaskStatus,
    addNewTask,
  };
}
