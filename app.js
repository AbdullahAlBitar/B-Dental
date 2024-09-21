const express = require("express");
const cors = require('cors');

const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const visitRoutes = require("./routes/visitRoutes");
const authRoutes = require("./routes/authRoutes");

const { handleError } = require("./middleware/errorMiddleware");
const authenticateJWT = require('./middleware/authMiddleware');

const app = express();

app.use(express.static("public"));
app.use(express.json());

//app.use('/uploads', express.static('./uploads'));

app.use("/auth", authRoutes);
app.use("/visits", visitRoutes);

app.use(authenticateJWT);

app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);

app.use((err, req, res, next) => {
  handleError(err, res, req);
});

//app.use(handleError);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

