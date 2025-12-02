const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g. 'signup', 'sales'
    value: { type: Number, required: true },
    label: { type: String, required: true }, // e.g. 'Mon', 'Tue'
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metric", metricSchema);
