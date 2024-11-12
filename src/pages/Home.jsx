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
    <div>
      <h1>{cumprimento}</h1>
      <Rolagem conteudo={conteudo} />
    </div>
  );
}

export default Home;