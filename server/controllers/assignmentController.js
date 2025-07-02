const db = require("../models");
const Assignment = db.Assignment;

exports.findAll = (req, res) => {
  Assignment.findAll()
    .then(assignments => res.json(assignments))
    .catch(error => {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.findOne = (req, res) => {
  Assignment.findByPk(req.params.id)
    .then(assignment => {
      if (!assignment) return res.status(404).json({ message: "Not found" });
      res.json(assignment);
    })
    .catch(error => {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.create = async (req, res) => {
  console.log("✅ Received assignment create request:", req.body);
  try {
    const { internId, programId, startDate, endDate, notes } = req.body;

    if (!internId || !programId || !startDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAssignment = await Assignment.create({
      intern_id: internId,
      program_id: programId,
      start_date: startDate,
      end_date: endDate || null,
      notes: notes || null,
    });

    res.status(201).json({ message: "Assignment created", assignment: newAssignment });
  } catch (error) {
    console.log('Create intern error:', error);
    console.log("Assignment model:", Assignment);
    console.error("Error creating assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.update = (req, res) => {
  Assignment.update(req.body, { where: { id: req.params.id } })
    .then(num => {
      if (num[0] === 1) {
        res.json({ message: "Assignment updated successfully." });
      } else {
        res.status(404).json({ message: "Assignment not found or unchanged." });
      }
    })
    .catch(error => {
      console.error("Error updating assignment:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.delete = (req, res) => {
  Assignment.destroy({ where: { id: req.params.id } })
    .then(num => {
      if (num === 1) {
        res.json({ message: "Assignment deleted successfully." });
      } else {
        res.status(404).json({ message: "Assignment not found." });
      }
    })
    .catch(error => {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
