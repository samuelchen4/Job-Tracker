const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  //blue print for how I want a document inside the job collection to look
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  applied: {
    type: Boolean,
    default: false,
  },
  priority: { type: String, default: 'low' },
  comments: { type: String, default: '' },
  salary: String,
  activity: String,
  location: String,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
