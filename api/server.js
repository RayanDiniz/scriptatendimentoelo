require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const frasesRoutes = require('./routes/frases');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Usar rotas
app.use('/api/frases', frasesRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));