const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

startApp();

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function startApp() {
  const isConnected = await testDatabaseConnection();
  if (isConnected) {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  } else {
    console.log('Server not started due to database connection failure');
    process.exit(1);
  }
}

