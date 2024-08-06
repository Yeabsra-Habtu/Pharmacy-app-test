const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: false },
  location: { type: String, required: true },
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;
