import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rolagem from '../components/Rolagem';
import { FaCopy } from "react-icons/fa6";

function Home() {
  const [conteudo, setConteudo] = useState([]);
  const [cumprimento, setCumprimento] = useState('');
  const [editandoFrase, setEditandoFrase] = useState(null);

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

  // Função para abrir o formulário de edição com a frase atual
  const iniciarEdicao = (frase) => {
    // Certifica-se de que `textos` é um array antes de usar join
    setEditandoFrase({
      ...frase,
      textos: Array.isArray(frase.textos) ? frase.textos.join('; ') : '' // Garante que `textos` é uma string
    });
  };

  // Função para salvar as alterações
  const salvarEdicao = async (e) => {
    e.preventDefault();
    try {
      // Divide o campo 'textos' em um array usando ponto e vírgula
      const fraseAtualizada = {
        ...editandoFrase,
        textos: editandoFrase.textos.split(';').map(text => text.trim()) // Divide os textos usando ponto e vírgula
      };

      await axios.put(`https://scriptatendimentoelo.onrender.com/api/frases/${editandoFrase.id}`, fraseAtualizada);
      setConteudo(conteudo.map(frase => (frase.id === editandoFrase.id ? fraseAtualizada : frase)));
      setEditandoFrase(null); // Fecha o formulário de edição
    } catch (error) {
      console.error('Erro ao atualizar frase:', error);
    }
  };

  // Função para lidar com alterações no formulário de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditandoFrase(prev => ({ ...prev, [name]: value }));
  };

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
      <div className="myDivSection">
        {conteudo.length > 0 ? (
          conteudo.map((frase) => (
            <div key={frase.id} style={{ marginBottom: '20px' }}>
              {editandoFrase && editandoFrase.id === frase.id ? (
                <form onSubmit={salvarEdicao}>
                  <div>
                    <label>Título:</label>
                    <input
                      type="text"
                      name="titulo"
                      value={editandoFrase.titulo}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label>Autor:</label>
                    <input
                      type="text"
                      name="autor"
                      value={editandoFrase.autor}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label>Textos:</label>
                    <input
                      type="text"
                      name="textos"
                      value={editandoFrase.textos.join(', ')}
                      onChange={(e) =>
                        handleEditChange({
                          target: { name: 'textos', value: e.target.value.split(', ') },
                        })
                      }
                    />
                  </div>
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setEditandoFrase(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                  <h3>{frase.titulo}</h3>
                  {/* <p><strong>Autor:</strong> {frase.autor}</p> */}
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
                  <button onClick={() => iniciarEdicao(frase)}>Editar</button>
                </>
              )}
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