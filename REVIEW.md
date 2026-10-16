# Code Review

This review focuses on concrete issues found in the original Tasks and Activity modules and the frontend Task Dashboard and Activity Feed. Recommendations distinguish refactoring already implemented from follow-up items that should be verified before submission.

## Backend

### Security / Data integrity

#### 1. The task update endpoint could persist unsupported fields

**What is wrong:** The original `PATCH /tasks/:id` controller validated `title` and `completed`, but did not reject unknown properties. The service merged the whole request body into the stored task with `{ ...existingTask, ...updates }`. As a result, an input such as `{ "completed": true, "unexpectedField": "value" }` could add an unsupported property to the JSON record.

**Why it matters:** The stored data could drift from the documented `Task` shape, and clients could write fields that the API does not intend to support.

**How to improve it:** Validate the request body against an allowlist before calling the service. The existing `taskValidator.js` is now used by the controller to restrict updates to `title` and `completed`, check their types, normalize the title, and reject empty updates. Verify that `validateUpdateTask` also enforces the documented minimum title length after trimming.

**Refactor status:** The unsupported-fields issue is addressed by wiring the existing validator into the controller. The minimum-title-length rule should be confirmed in the final validator before submission.

### Bugs

#### 2. Activity creation accepted unvalidated request data

**What is wrong:** The original activity controller passed `req.body || {}` directly to the service. The service then used `.trim()` on `action` and `info`, which could throw for values of the wrong type. The request body was not checked for unsupported fields or invalid object shapes.

**Why it matters:** Malformed client input could cause avoidable server errors and create inconsistent API behavior.

**How to improve it:** Validate that the payload is a JSON object, reject unsupported fields, and validate/trim each optional field when it is supplied. Keep `action` and `info` optional to preserve the documented API contract. The refactor adds `activityValidator.js` and passes its normalized payload to the service. The service must also avoid calling `.trim()` on a missing optional field (for example, by omitting that property from the new record when it was not supplied).

**Refactor status:** Request validation is implemented. Confirm the final `activity.service.js` safely handles omitted `action` and/or `info`; the version reviewed earlier called `.trim()` on both unconditionally.

#### 3. Verify the Reports response matches the documented API contract

**What is wrong:** The documented `GET /reports/tasks-summary` response uses `total` and `byStatus`. The reports service code reviewed earlier returned `totalTasks` and `tasksByStatus` instead.

**Why it matters:** A response with different field names does not satisfy the documented endpoint contract and can break frontend consumers or assessment checks, even if the counts themselves are correct.

**How to improve it:** Return the exact documented shape: `{ total, byStatus: { todo, "in-progress", done }, recentActivityCount }`, and ensure the frontend types and component read those same names.

**Status:** Confirm this is corrected in the current code before submission; it was a mismatch in the version reviewed.

### Performance

#### 4. Activity file operations blocked the Node.js event loop

**What is wrong:** The original activity service used `fs.readFileSync` and `fs.writeFileSync` to read and write `activity.json`.

**Why it matters:** Synchronous file operations block the event loop while they run, delaying other requests handled by the server.

**How to improve it:** Use asynchronous file operations and share the common JSON read/write implementation rather than performing synchronous I/O in the feature service. The refactored service now uses `readJsonArray` and `writeJsonArray` with `await`.

**Refactor status:** Addressed in the activity service.

### Maintainability

#### 5. Activity data-loading logic was duplicated

**What is wrong:** The original service had two nearly identical helpers, `loadDataA()` and `loadDataB()`, for reading the same JSON file.

**Why it matters:** Duplicated logic creates more code to maintain and makes future behavior changes easier to apply inconsistently.

**How to improve it:** Use one shared JSON storage utility for reading and writing. The refactored service removes the duplicate loaders and uses the shared helpers.

**Refactor status:** Addressed.

#### 6. Request validation was mixed into controllers and repeated in services

**What is wrong:** The original Tasks controller contained inline validation and directly constructed several error responses, while the service repeated some of the same checks. This spread validation rules across multiple layers.

**Why it matters:** Validation behavior and error messages can drift, making the code harder to change and test consistently.

**How to improve it:** Keep request-specific validation and normalization in dedicated validators, let controllers coordinate the request/response, and keep services focused on task/activity operations. The new task and activity validators move request checks into dedicated modules.

**Refactor status:** Addressed through the validators and thinner controllers.

### Code quality

#### 7. Activity IDs were based only on the current millisecond

**What is wrong:** The original service created IDs with `String(Date.now())`.

**Why it matters:** Two activity records created during the same millisecond could receive the same ID.

**How to improve it:** Use the shared `createId()` helper, as the refactored activity service now does.

**Refactor status:** Addressed; this reduces collision risk.

## Frontend

### Performance

#### 1. The original Activity Feed forced unnecessary rerenders

**What is wrong:** The original `ActivityPage` incremented a `tick` every 1.4 seconds, repeatedly recalculated filters, and cloned the displayed activity items into `forcedList`. It also applied two effectively equivalent filters in sequence and recomputed stats on each tick. The interval did not actually fetch new activity data.

**Why it matters:** It caused repeated state updates and rendering work without new data, added unnecessary complexity, and could misleadingly suggest the feed was live.

**How to improve it:** Remove the timer and forced clones, keep the source activity data as state, and derive the visible list directly from the search query. The refactor moves fetching/search logic into `useActivity` and derives `shownActivity` from `allActivity` and `query`.

**Refactor status:** Addressed in the Activity Feed refactor.

### Maintainability

#### 2. The original Activity page mixed unrelated responsibilities and duplicated helpers

**What is wrong:** The original page handled data fetching, search, statistics, time formatting, timer state, and the complete list UI in one component. It also defined duplicate time-formatting functions and duplicate filter functions with equivalent behavior.

**Why it matters:** A large component with duplicated logic is harder to reason about, test, and extend safely.

**How to improve it:** Separate UI sections into focused components and put data/search state in a hook. The refactor introduces `ActivityDashboard`, `ActivityHeader`, `ActivityStats`, `ActivityList`, and `useActivity`, while reusing shared loading and empty-state components.

**Refactor status:** Addressed by separating the UI and moving the data/search logic into a dedicated hook.
