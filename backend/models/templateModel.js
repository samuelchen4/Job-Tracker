const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
  name: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
  size: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
