import React, { useState } from 'react';
import axios from 'axios';

function AdicionarFrase() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [texto, setTexto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaFrase = { texto, autor };
      await axios.post('https://scriptatendimentoelo.onrender.com/api/frases', novaFrase);
      setMensagem('Frase adicionada com sucesso!');
      setTitulo(''); // Limpar o campo titulo
      setAutor(''); // Limpar o campo autor
      setTexto(''); // Limpar o campo texto
    } catch (error) {
      setMensagem('Erro ao adicionar frase.');
      console.error('Erro ao adicionar frase:', error);
    }
  };

  return (
    <div>
      <h1>Adicionar Nova Frase</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label>Autor (opcional):</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <div>
          <label>Texto da Frase:</label>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Frase</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AdicionarFrase;