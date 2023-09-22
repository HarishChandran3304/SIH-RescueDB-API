const asyncHandler = require("express-async-handler");

const Agency = require("../models/requestModel");

const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({});
  res.status(200).json(requests);
});

const createRequest = asyncHandler(async (req, res) => {
  const request = await Request.create({
    name: req.body.name,
    address: req.body.address,
    requiredAgencyTypes: req.body.requiredAgencyTypes,
    coordinates: req.body.coordinates,
    active: req.body.active,
    requestedBy: req.body.requestedBy,
    assignedTo: req.body.assignedTo,
  });
  res.status(200).json({ message: "Request created", request });
});

const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  const updatedRequest = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: "Request updated", request: updatedRequest });
});

const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  await Request.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
};
