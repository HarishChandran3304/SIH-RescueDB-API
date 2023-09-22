const express = require("express");
const router = express.Router();
const {
  getAgencies,
  createAgency,
  loginAgency,
  getMyAgency,
  updateAgency,
  deleteAgency,
} = require("../controllers/agencyController");

router.get("/", getAgencies);
router.post("/", createAgency);
router.post("/login", loginAgency);
router.get("/me", getMyAgency);
router.put("/:id", updateAgency);
router.delete("/:id", deleteAgency);

module.exports = router;
