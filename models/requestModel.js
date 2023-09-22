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
      type: [Number],
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    assignedTo: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "requests",
  }
);

module.exports = mongoose.model("RescueRequest", rescueRequestSchema);
