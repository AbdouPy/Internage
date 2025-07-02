// File: server/routes/assignment.routes.js

const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// Get all assignments
router.get("/", assignmentController.findAll);
router.get("/:id", assignmentController.findOne);
router.post("/", assignmentController.create);

router.put("/:id", assignmentController.update);

router.delete("/:id", assignmentController.delete);

module.exports = router;
