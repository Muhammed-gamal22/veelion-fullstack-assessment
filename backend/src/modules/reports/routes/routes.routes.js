
const express = require('express');
const asyncHandler = require('../../../middleware/asyncHandler');
const { getTasks } = require('../controllers/reports.controller');

const reportsRouter = express.Router();

reportsRouter.get(
    '/tasks-summary',
    asyncHandler(getTasks)
);

module.exports = reportsRouter;
