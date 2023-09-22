const mongoose = require("mongoose");

const rescueAgencySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    agencyType: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [String],
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RescueAgency", rescueAgencySchema);
