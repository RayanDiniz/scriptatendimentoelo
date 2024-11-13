import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rolagem from '../components/Rolagem';
import { FaCopy } from "react-icons/fa6";
import ChatComponent from '../components/ChatComponent';

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
        setConteudo(response.data.frases); // Acessa o array "frases" dentro da resposta
      } catch (error) {
        console.error('Erro ao buscar frases da API:', error);
      }
    };

    fetchFrases();
  }, []);

  // Função para copiar o texto para a área de transferência
  const handleCopy = (texto) => {
    navigator.clipboard.writeText(texto).then()
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
      });
  };

  return (
    <section className="main">
      <h1>{cumprimento}! Bem-vindo ao Script de Atendimento da Elo.</h1>
      <ChatComponent />
      <div className="myDivSection">
        {conteudo.length > 0 ? (
          conteudo.map((frase) => (
            <div key={frase.id}>
              <div>
                <h3>{frase.titulo}</h3>
                <Link className="btn-edite" to={`/editar/${frase.id}`}>Editar</Link>
              </div>
              <ul>
                {frase.textos.map((texto, idx) => (
                  <li key={idx}>
                    {texto}
                    <button onClick={() => handleCopy(texto)} className="copy-btn">
                      <FaCopy />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Carregando conteúdo...</p>
        )}
      </div>
      <Rolagem />
    </section>
  );
}

export default Home;