
const path = require("node:path");
const { readJsonArray } = require("../../../utils/jsonStore");

const TASKS_FILE_PATH = path.join(
    process.cwd(),
    "data",
    "tasks.json"
);

const ACTIVITY_FILE_PATH = path.join(
    process.cwd(),
    "data",
    "activity.json"
);

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

async function getTasksSummary() {
    const [tasks, activities] = await Promise.all([
        readJsonArray(TASKS_FILE_PATH),
        readJsonArray(ACTIVITY_FILE_PATH),
    ]);

    const now = Date.now();
    const cutoffTime = now - SEVEN_DAYS_IN_MS;

    const tasksByStatus = {
        todo: tasks.filter((task) => task.completed === false).length,
        "in-progress": 0,
        done: tasks.filter((task) => task.completed === true).length,
    };

    const recentActivityCount = activities.filter((activity) => {
        const activityTime = new Date(activity.when).getTime();
        return (
            Number.isFinite(activityTime) &&
            activityTime >= cutoffTime &&
            activityTime <= now
        );
    }).length;



    return {
        totalTasks: tasks.length,
        tasksByStatus,
        recentActivityCount,
    };
}

module.exports = { getTasksSummary };
