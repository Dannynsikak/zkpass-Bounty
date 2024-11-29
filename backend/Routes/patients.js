const express = require("express");
const PatientService = require("../services/PatientService");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

// Route to upload medical data (authenticated)
router.post("/upload", jwtAuth, async (req, res) => {
  const { data } = req.body;

  try {
    const patient = await PatientService.uploadMedicalData(
      req.user.userId,
      data
    );
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: "Error uploading medical data" });
  }
});

// Route to retrieve patient data (authenticated)
router.get("/data", jwtAuth, async (req, res) => {
  try {
    const patientData = await PatientService.getPatientData(req.user.userId);
    res.status(200).json(patientData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data" });
  }
});

module.exports = router;
