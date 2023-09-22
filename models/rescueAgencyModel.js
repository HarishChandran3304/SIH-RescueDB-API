const mongoose = require("mongoose");
const Agency = require("./rescueAgencyModel");

const rescueAgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
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
    currentRequest: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Rescue",
    },
  },
  {
    timestamps: true,
    collection: "agencies",
  }
);

module.exports = mongoose.model("RescueAgency", rescueAgencySchema);
