const asyncHandler = require("express-async-handler");

const getAgencies = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get agencies" });
});

const createAgency = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create agency" });
});

const updateAgency = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update agency ${req.params.id}` });
});

const deleteAgency = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete agency ${req.params.id}` });
});

module.exports = {
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
};
