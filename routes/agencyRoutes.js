const express = require("express");
const router = express.Router();
const {
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
} = require("../controllers/agencyController");

router.get("/", getAgencies);
router.post("/", createAgency);
router.put("/:id", updateAgency);
router.delete("/:id", deleteAgency);

module.exports = router;
