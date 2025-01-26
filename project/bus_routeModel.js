const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  bus_No: {
    type: Number,
    required: true,
  },
  Route: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Route', routeSchema);
