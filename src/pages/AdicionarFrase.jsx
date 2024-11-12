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
      // Transforme 'texto' em um array, como esperado pelo modelo
      const novaFrase = { 
        titulo, 
        autor, 
        textos: texto.split(';').map(text => text.trim()) // Passa 'texto' como um array de strings
      };
      await axios.post('https://scriptatendimentoelo.onrender.com/api/frases', novaFrase);
      setMensagem('Frase adicionada com sucesso!');
      
      // Limpar os campos após o envio
      setTitulo('');
      setAutor('');
      setTexto('');
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
        <div>
          <label>Texto da Frase:</label>
          <textarea
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