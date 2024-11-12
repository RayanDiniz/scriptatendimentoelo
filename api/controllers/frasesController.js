const Frase = require('../models/Frase');

// Listar todas as frases no formato JSON desejado
exports.getFrases = async (req, res) => {
  try {
    const frases = await Frase.find();

    // Definir o formato desejado da resposta
    const resposta = {
      tipoTexto: "Atendimento Suporte",
      empresa: "Elo SVA",
      ano: 2024,
      active: true,
      frases: frases.map(frase => ({
        id: frase._id,
        titulo: frase.titulo,
        autor: frase.autor,
        textos: frase.textos
      }))
    };

    res.json(resposta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar frases' });
  }
};

// Adicionar nova frase
exports.addFrase = async (req, res) => {
  try {
    const { titulo, autor, textos } = req.body;
    const novaFrase = new Frase({ titulo, autor, textos });
    const fraseSalva = await novaFrase.save();
    res.status(201).json(fraseSalva);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar frase' });
  }
};

// Editar frase
exports.updateFrase = async (req, res) => {
  try {
    const fraseAtualizada = await Frase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fraseAtualizada);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar frase' });
  }
};

// Excluir frase
exports.deleteFrase = async (req, res) => {
  try {
    await Frase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Frase excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir frase' });
  }
};