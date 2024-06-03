const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  propertyName: { type: String, required: true },
  city: { type: String, required: true },
  borrowerName: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const CaseModel = mongoose.model('case', caseSchema);

module.exports = CaseModel;
