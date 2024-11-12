const mongoose = require('mongoose');

const FraseSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  autor: { type: String }
});

module.exports = mongoose.model('Frase', FraseSchema);
