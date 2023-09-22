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
      type: [Number],
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "agencies",
  }
);

module.exports = mongoose.model("RescueAgency", rescueAgencySchema);
