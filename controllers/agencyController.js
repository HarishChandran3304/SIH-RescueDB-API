const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Agency = require("../models/rescueAgencyModel");

const getAgencies = asyncHandler(async (req, res) => {
  const agencies = await Agency.find({});
  res.status(200).json(agencies);
});

const createAgency = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const agency = await Agency.create({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    address: req.body.address,
    agencyType: req.body.agencyType,
    coordinates: req.body.coordinates,
    available: req.body.available,
  });
  res.status(200).json({ message: "Agency created", agency });
});

const loginAgency = asyncHandler(async (req, res) => {});

const getMyAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.user._id);
  res.status(200).json(agency);
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
  loginAgency,
  getMyAgency,
  updateAgency,
  deleteAgency,
};
