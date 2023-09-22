const asyncHandler = require("express-async-handler");

const Agency = require("../models/rescueAgencyModel");

const getAgencies = asyncHandler(async (req, res) => {
  const agencies = await Agency.find({});
  res.status(200).json(agencies);
});

const createAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.create({
    name: req.body.name,
    address: req.body.address,
    agencyType: req.body.agencyType,
    coordinates: req.body.coordinates,
    available: req.body.available,
  });
  res.status(200).json({ message: "Agency created", agency });
});

const updateAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);

  const updatedAgency = await Agency.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: "Agency updated", agency: updatedAgency });
});

const deleteAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  await Agency.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
};
