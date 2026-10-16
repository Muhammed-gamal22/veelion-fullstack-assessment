"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import CustomLoader from "@/customs/CustomLoader";
import CustomError from "@/customs/CustomError";
import TaskHeader from "./TaskHeader";

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
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <>
      <section className="stack">
        <TaskHeader />
        <StatusFilter value={filter} onChange={setFilter} />

        {
          loading && (
            <CustomLoader title="tasks" />
          )
        }

        {
          error && (
            <CustomError error={error} fetchAction={fetchTasks} />
          )
        }

        {
          !loading && !error && (
            <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
          )
        }


      </section >

    </>
  );
}
