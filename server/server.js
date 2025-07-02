const express = require("express");
const app = express();
const db = require("./models");
const path = require("path");

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'  // your React app
}));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
const internRoutes = require("./routes/intern.routes");
const programRoutes = require("./routes/program.routes");
const applicationRoutes = require("./routes/application.routes");
const assignmentRoutes = require("./routes/assignment.routes");

app.use("/api/interns", internRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/assignments", assignmentRoutes);


db.sequelize.sync({ force: false }).then(() => {
    console.log("✅ Database synced");
});

app.get("/", (req, res) => {
    res.send("Intern Management API Running");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


