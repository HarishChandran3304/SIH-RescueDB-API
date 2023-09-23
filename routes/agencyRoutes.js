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
  getAssignedTo,
  assignRequestToAgency,
} = require("../controllers/agencyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAgencies);
router.get("/sort", protect, sortAgencies);
router.post("/", protect, createAgency);
router.post("/login", protect, loginAgency);
router.get("/myagency", protect, getMyAgency);
router.put("/:id", protect, updateAgency);
router.delete("/:id", protect, deleteAgency);
router.get("/assignedto", protect, getAssignedTo);
router.put("/:id/assign", protect, assignRequestToAgency);

module.exports = router;
