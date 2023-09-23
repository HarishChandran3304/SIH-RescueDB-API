const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Agency = require("../models/rescueAgencyModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getAgencies = asyncHandler(async (req, res) => {
  const agencies = await Agency.find({});
  //Omit sensitive data before sending the response
  const response = agencies.map((agency) => {
    return {
      _id: agency._id,
      name: agency.name,
      address: agency.address,
      agencyType: agency.agencyType,
      coordinates: agency.coordinates,
      available: agency.available,
    };
  });
  res.status(200).json(response);
});

const sortAgencies = asyncHandler(async (req, res) => {
  const agencies = await Agency.find({
    agencyType: req.body.agencyType,
    available: true,
  });
  const sourceCoordinates = req.body.sourceCoordinates;
  const sortedAgencies = agencies.sort((a, b) => {
    return (
      Math.pow(a.coordinates[0] - sourceCoordinates[0], 2) +
      Math.pow(a.coordinates[1] - sourceCoordinates[1], 2) -
      Math.pow(b.coordinates[0] - sourceCoordinates[0], 2) -
      Math.pow(b.coordinates[1] - sourceCoordinates[1], 2)
    );
  });
  //Omit sensitive data before sending the response
  const response = sortedAgencies.map((agency) => {
    return {
      _id: agency._id,
      name: agency.name,
      address: agency.address,
      agencyType: agency.agencyType,
      coordinates: agency.coordinates,
      available: agency.available,
    };
  });
  res.status(200).json(response);
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
  res.status(201).json({
    _id: agency.id,
    name: agency.name,
    email: agency.email,
    token: generateToken(agency.id),
  });
});

const loginAgency = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const agency = await Agency.findOne({ email });

  if (agency && (await bcrypt.compare(password, agency.password))) {
    res.json({
      _id: agency.id,
      name: agency.name,
      email: agency.email,
      token: generateToken(agency._id),
    });
  }
});

const getMyAgency = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Agency.findById(req.agency.id);
  res.status(200).json({ _id, name, email });
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

const getAssignedTo = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.agency.id);
  const assignedTo = await Request.findById(agency.assignedTo);
  res.status(200).json(assignedTo);
});

const assignRequestToAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.agency.id);
  const request = await Request.findById(req.params.id);

  agency.assignedTo.push(request.id);
  agency.available = false;
  request.assignedTo.push(agency.id);

  await agency.save();
  await request.save();

  res.status(200).json({ message: "Request assigned to agency" });
});

module.exports = {
  getAgencies,
  sortAgencies,
  createAgency,
  loginAgency,
  getMyAgency,
  updateAgency,
  deleteAgency,
  getAssignedTo,
  assignRequestToAgency,
};
