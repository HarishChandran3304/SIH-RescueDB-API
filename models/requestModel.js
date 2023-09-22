const mongoose = require("mongoose");

const rescueRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    requiredAgencyTypes: {
      type: [String],
      required: true,
    },
    coordinates: {
      type: [String],
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    requestedBy: {
      type: String,
      required: false,
    },
    assignedTo: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RescueRequest", rescueRequestSchema);
