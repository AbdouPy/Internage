const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("/", programController.findAll);
router.get("/:id", programController.findOne);
router.post("/", programController.create);
router.put("/:id", programController.update);
router.delete("/:id", programController.delete);

module.exports = router;
