const path = require('node:path');
const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createNewActivity(b) {
  const list = await readJsonArray(ACTIVITY_FILE_PATH)
  const one = {
    id: createId(),
    action: b.action.trim(),
    info: b.info.trim(),
    when: new Date().toISOString(),
  };

  list.push(one);
  await writeJsonArray(ACTIVITY_FILE_PATH, list);

  return one;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
