const db = require("../models");
const Intern = db.Intern;

// Create a new intern
exports.create = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (err) {
    if (err.original && err.original.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists." });
    }
  }
};


// Get all interns
exports.findAll = async (req, res) => {
  try {
    const interns = await Intern.findAll();
    res.status(200).json(interns);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error retrieving interns." });
  }
};

// Get one intern by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const intern = await Intern.findByPk(id);
    if (!intern) {
      return res.status(404).json({ message: "Intern not found." });
    }
    res.status(200).json(intern);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving intern with id=" + id });
  }
};

// Update an intern by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Intern.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedIntern = await Intern.findByPk(id);
      res.status(200).json(updatedIntern);
    } else {
      res.status(404).json({ message: `Cannot update intern with id=${id}. Intern not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating intern with id=" + id });
  }
};

// Delete an intern by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Intern.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: "Intern was deleted successfully." });
    } else {
      res.status(404).json({ message: `Cannot delete intern with id=${id}. Intern not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Could not delete intern with id=" + id });
  }
};
