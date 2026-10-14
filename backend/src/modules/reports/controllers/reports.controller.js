
const { getTasksSummary } = require('../services/reports.services');

async function getTasks(req, res) {
    const summary = await getTasksSummary();
    res.status(200).json(summary);
}

module.exports = { getTasks };