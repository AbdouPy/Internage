// controller/applicationController.js
const db = require("../models");
const { Application, Intern, Program } = require("../models");
const { sendAcceptanceEmail } = require("../utils/emailService");

exports.getApplicationStats = async (req, res) => {
  try {
    const total = await Application.count();
    const pending = await Application.count({ where: { status: "pending" } });
    const accepted = await Application.count({ where: { status: "accepted" } });
    const rejected = await Application.count({ where: { status: "rejected" } });

    res.json({ total, pending, accepted, rejected });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: Intern,
          as: "intern",
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "gender",
            "birthDate",
            "university",
            "field_of_study",
            "internship_period"
          ],
        },
        {
          model: Program,
          as: "program",
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const internMap = new Map();
    const grouped = {};

    applications.forEach((app) => {
      const internId = app.intern_id;
      const internKey = `${internId}`;

      if (!grouped[internKey]) {
        grouped[internKey] = {
          intern_id: internId,
          first_name: app.intern.first_name,
          last_name: app.intern.last_name,
          email: app.intern.email,
          phone: app.intern.phone,
          gender: app.intern.gender,
          birthDate: app.intern.birthDate,
          university: app.intern.university,
          field_of_study: app.intern.field_of_study,
          internship_period: app.intern.internship_period,
          status: app.status,
          cv: app.cv,
          motivation_letter: app.motivation_letter,
          programs: [],
          totalApplications: 0,
          hasBeenAccepted: false,
          hasBeenRejected: false,
          fullHistory: [],
          lastCreatedAt: app.createdAt,
        };
      }

      const internGroup = grouped[internKey];

      // Update last application if this one is more recent
      if (new Date(app.createdAt) > new Date(internGroup.lastCreatedAt)) {
        internGroup.status = app.status;
        internGroup.cv = app.cv;
        internGroup.motivation_letter = app.motivation_letter;
        internGroup.lastCreatedAt = app.createdAt;
        internGroup.programs = [];
      }

      internGroup.programs.push(app.program.name);
      internGroup.totalApplications += 1;

      if (app.status === "accepted") internGroup.hasBeenAccepted = true;
      if (app.status === "rejected") internGroup.hasBeenRejected = true;

      internGroup.fullHistory.push({
        program: app.program.name,
        status: app.status,
        createdAt: app.createdAt,
        cv: app.cv,
        motivation_letter: app.motivation_letter,
      });
    });

    const enriched = Object.values(grouped);
    res.status(200).json(enriched);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      first_name, last_name, email, phone, gender, birthDate,
      university, field_of_study, internship_period
    } = req.body;

    const intern = await Intern.create({
      first_name,
      last_name,
      email,
      phone,
      gender,
      birthDate,
      university,
      field_of_study,
      internship_period,
    });

    let programIds = req.body.programIds;

    if (typeof programIds === "string") {
      programIds = programIds.split(",").map((id) => parseInt(id.trim(), 10));
    }

    for (const programId of programIds) {
      await Application.create({
        intern_id: intern.id,
        program_id: programId,
        cv: req.files?.cv?.[0]?.filename,
        motivation_letter: req.files?.motivationLetter?.[0]?.filename,
      });
    }

    res.status(201).json({ message: "Application submitted!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists." });
    }
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { internId, programId } = req.params;
    const { status } = req.body;

    const application = await Application.findOne({
      where: { intern_id: internId, program_id: programId },
      include: [{ model: Intern, as: "intern", attributes: ["first_name", "email"] }]
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    if (status === "accepted") {
      await sendAcceptanceEmail(application.intern.email, application.intern.first_name);
    }

    return res.status(200).json({ message: "Status updated", application });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
