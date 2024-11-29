const express = require("express");
const ZKPService = require("../services/ZKPService");

const router = express.Router();

// Route to generate ZKP proof (authenticated)
router.post("/generate", async (req, res) => {
  const { data } = req.body;

  try {
    const proof = await ZKPService.generateProof(data);
    res.status(200).json({ proof });
  } catch (err) {
    res.status(500).json({ message: "Error generating ZKP" });
  }
});

// Route to verify ZKP proof
router.post("/verify", async (req, res) => {
  const { proof } = req.body;

  try {
    const isValid = await ZKPService.verifyProof(proof);
    res.status(200).json({ isValid });
  } catch (err) {
    res.status(500).json({ message: "Error verifying ZKP" });
  }
});

module.exports = router;
