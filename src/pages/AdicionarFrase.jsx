import React, { useState } from 'react';
import axios from 'axios';

function AdicionarFrase() {
  const [texto, setTexto] = useState('');
  const [autor, setAutor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaFrase = { texto, autor };
      await axios.post('https://scriptatendimentoelo.onrender.com/api/frases', novaFrase);
      setMensagem('Frase adicionada com sucesso!');
      setTexto(''); // Limpar o campo texto
      setAutor(''); // Limpar o campo autor
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
          <label>Texto da Frase:</label>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
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
        <button type="submit">Adicionar Frase</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AdicionarFrase;