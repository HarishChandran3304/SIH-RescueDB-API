const express = require("express");
const router = express.Router();
const {
  getAgencies,
  sortAgencies,
  createAgency,
  loginAgency,
  getMyAgency,
  updateAgency,
  deleteAgency,
} = require("../controllers/agencyController");

router.get("/", getAgencies);
router.get("/sort", sortAgencies);
router.post("/", createAgency);
router.post("/login", loginAgency);
router.get("/me", getMyAgency);
router.put("/:id", updateAgency);
router.delete("/:id", deleteAgency);

module.exports = router;
