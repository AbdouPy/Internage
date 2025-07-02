// File: server/routes/intern.routes.js

const express = require("express");
const router = express.Router();
const internController = require("../controllers/internController");


router.get("/", internController.findAll);
router.get("/:id", internController.findOne);
router.post("/", internController.create);
router.put("/:id", internController.update);
router.delete("/:id", internController.delete);

module.exports = router;
