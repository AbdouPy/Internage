const db = require("../models");
const Program = db.Program;

exports.create = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch (err) {
    console.error('Create program error:', err);
    console.log("program model:", program);
    console.log("Request body:", req.body);

    res.status(500).json({ message: "Error creating program" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving programs" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving program" });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Program.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedProgram = await Program.findByPk(id);
      return res.status(200).json(updatedProgram);
    }

    res.status(404).json({ message: "Program not found" });
  } catch (err) {
    res.status(500).json({ message: "Error updating program" });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Program.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting program" });
  }
};
