const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Note', noteSchema);
