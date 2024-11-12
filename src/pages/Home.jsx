import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rolagem from '../components/Rolagem';

function Home() {
  const [conteudo, setConteudo] = useState([]);
  const [cumprimento, setCumprimento] = useState('');

  // Configurar saudação com base na hora do dia
  useEffect(() => {
    const now = new Date();
    const hora = now.getHours();
    const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
    setCumprimento(saudacao);
  }, []);

  // Fazer chamada para a API ao carregar o componente
  useEffect(() => {
    const fetchFrases = async () => {
      try {
        const response = await axios.get('https://scriptatendimentoelo.onrender.com/api/frases');
        setConteudo(response.data);
      } catch (error) {
        console.error('Erro ao buscar frases da API:', error);
      }
    };

    fetchFrases();
  }, []);

  return (
    <section className="main">
      <h1>{cumprimento}! Bem-vindo ao Script de Atendimento da Elo.</h1>
      <div>
        {conteudo.map((frase, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{frase.titulo}</h3>
            <p><strong>Autor:</strong> {frase.autor}</p>
            <ul>
              {frase.textos.map((texto, idx) => (
                <li key={idx}>{texto}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Rolagem />
    </section>
  );
}

export default Home;