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

// exports.getAllApplications = async (req, res) => {
//   try {
//     const applications = await Application.findAll({
//       include: [
//         {
//           model: Intern,
//           as: "intern",
//           attributes: ["id", "first_name", "last_name", "email", "birthDate", "phone", "gender","university","field_of_study"],
//         },
//         {
//           model: Program,
//           as: "program",
//           attributes: ["name"],
//         },
//       ],
//     });

//     const grouped = {};

//     applications.forEach((app) => {
//       const internId = app.intern_id;

//       if (!grouped[internId]) {
//         grouped[internId] = {
//           intern_id: internId,
//           name: `${app.intern.first_name} ${app.intern.last_name}`,
//           email: app.intern.email,
//           gender: app.intern.gender,
//           phone: app.intern.phone,
//           university: app.intern.university,
//           field_of_study: app.intern.field_of_study,
//           cv: app.cv,
//           motivation_letter: app.motivation_letter,
//           status: app.status,
//           programs: [],
//           totalApplications: 0,
//           hasBeenAccepted: false,
//           hasBeenRejected: false,
//         };
//       }

//       grouped[internId].programs.push(app.program.name);
//       grouped[internId].totalApplications += 1;
//       if (app.status === "accepted") grouped[internId].hasBeenAccepted = true;
//       if (app.status === "rejected") grouped[internId].hasBeenRejected = true;
//     });

//     const enriched = Object.values(grouped);
//     res.status(200).json(enriched);
//   } catch (err) {
//     console.error("Error fetching applications:", err);
//     res.status(500).json({ message: "Failed to fetch applications." });
//   }
// };

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      attributes: ["intern_id", "program_id", "cv", "motivation_letter", "status", "createdAt"],
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
            "internship_period",
            "createdAt"
          ],
        },
        {
          model: Program,
          as: "program",
          attributes: ["id", "name"],
        },
      ],
    });

    const groupedApplicants = {};

    for (const app of applications) {
      const intern = app.intern;
      const key = `${intern.first_name}-${intern.last_name}-${intern.birthDate}`;

      if (!groupedApplicants[key]) {
        groupedApplicants[key] = {
          intern_id: app.intern_id,
          program_id: app.program_id,
          name: `${intern.first_name} ${intern.last_name}`,
          birthDate: intern.birthDate,
          email: intern.email,
          phone: intern.phone,
          gender: intern.gender,
          university: intern.university,
          field_of_study: intern.field_of_study,
          internship_period: intern.internship_period,
          createdAt: intern.createdAt,
          cv: app.cv,
          motivation_letter: app.motivation_letter,
          status: app.status,
          hasBeenAccepted: false,
          hasBeenRejected: false,
          totalApplications: 0,
          sessions: {},
        };
      }

      const dateKey = new Date(app.createdAt).toISOString();

      if (!groupedApplicants[key].sessions[dateKey]) {
        groupedApplicants[key].sessions[dateKey] = {
          date: dateKey,
          programs: [],
          status: app.status,
          cv: app.cv,
          motivation_letter: app.motivation_letter,
        };
        groupedApplicants[key].totalApplications += 1;
      }

      groupedApplicants[key].sessions[dateKey].programs.push(app.program.name);

      if (app.status === "accepted") groupedApplicants[key].hasBeenAccepted = true;
      if (app.status === "rejected") groupedApplicants[key].hasBeenRejected = true;
    }

    const finalList = Object.values(groupedApplicants).map((applicant) => ({
      ...applicant,
      sessions: Object.values(applicant.sessions),
    }));

    res.status(200).json(finalList);



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
      console.log(programId);
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

exports.submitApplication = async (req, res) => {
  try {
    const now = new Date();
    const allowedMonths = [0, 3, 6, 9]; // January (0), April (3), July (6), October (9)

    const currentMonth = now.getMonth(); // 0 = January

    if (!allowedMonths.includes(currentMonth)) {
      return res.status(403).json({
        message: "Applications are not open at this time. Try again during the next session.",
      });
    }

    // Proceed with saving the application...
    // e.g. await Application.create({ ... });

    res.status(201).json({ message: "Application submitted successfully." });

  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server error" });
  }
};
