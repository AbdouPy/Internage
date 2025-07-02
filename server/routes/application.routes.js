const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
// const { getAllApplications, getApplicationStats, create } = require("../controllers/applicationController");
const multer = require("multer");
const path = require("path");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", checkAdmin, applicationController.getAllApplications);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage }); // ⚠️ Assure-toi que ce `upload` est défini UNE SEULE FOIS

router.post(
  "/",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "motivationLetter", maxCount: 1 }
  ]),
  applicationController.create
);

router.get("/stats", applicationController.getApplicationStats);
router.put("/:internId/:programId/status",checkAdmin, applicationController.updateStatus);

module.exports = router;
