const mongoose = require('mongoose');

const FraseSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  textos: { type: [String], required: true }
});

module.exports = mongoose.model('Frase', FraseSchema);