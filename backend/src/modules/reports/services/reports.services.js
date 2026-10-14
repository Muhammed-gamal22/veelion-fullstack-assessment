
const path = require('node:path');
const {
    readJsonArray,
} = require('../../../utils/jsonStore');

const TASKS_FILE_PATH = path.join(
    process.cwd(),
    'data',
    'tasks.json'
);

const ACTIVITY_FILE_PATH = path.join(
    process.cwd(),
    'data',
    'activity.json'
);
const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;
const cutoffTime = Date.now() - THREE_HOURS_IN_MS;
async function getTasksSummary() {
    const [tasks, activities] = await Promise.all([
        readJsonArray(TASKS_FILE_PATH),
        readJsonArray(ACTIVITY_FILE_PATH),
    ]);
    const byStatus = {
        todo: 0,
        'in-progress': 0,
        done: 0,
    };

    const recentActivityCount = activities.filter((activity) => {
        const activityTime = new Date(activity.when).getTime();

        return (
            Number.isFinite(activityTime) &&
            activityTime >= cutoffTime &&
            activityTime <= Date.now()
        );
    }).length;

    for (const task of tasks) {
        if (Object.hasOwn(byStatus, task.status)) {
            byStatus[task.status]++;
        }
    }

    return {
        totalTasks: tasks.length,
        tasksByStatus: byStatus,
        recentActivityCount: recentActivityCount,
    }
}

module.exports = { getTasksSummary };
