const path = require('node:path');
const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}


async function createNewActivity(data) {
  const list = await readJsonArray(ACTIVITY_FILE_PATH);

  const activity = {
    id: createId(),
    when: new Date().toISOString(),
  };

  if (Object.hasOwn(data, 'action')) {
    activity.action = data.action;
  }

  if (Object.hasOwn(data, 'info')) {
    activity.info = data.info;
  }

  list.push(activity);
  await writeJsonArray(ACTIVITY_FILE_PATH, list);

  return activity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
