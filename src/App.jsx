import React, { useState, useEffect } from 'react';
import './App.css'; // Link para o estilo global
import { FaCopy } from "react-icons/fa6";
import dadosFrases from './dadosfrases.json'; // Importe o JSON diretamente (se ele estiver disponível localmente)
import Rolagem from './components/Rolagem/Rolagem';

function App() {
  // Estado para armazenar o nome do usuário, cumprimento e conteúdo das frases
  const [nome, setNome] = useState('');
  const [conteudo, setConteudo] = useState([]);
  const [cumprimento, setCumprimento] = useState('');
  const [nomeConfirmado, setNomeConfirmado] = useState(false);

  // Define o cumprimento com base na hora atual
  useEffect(() => {
    const now = new Date();
    const hora = now.getHours();
    if (hora >= 0 && hora < 12) {
      setCumprimento('Bom dia');
    } else if (hora >= 12 && hora < 18) {
      setCumprimento('Boa tarde');
    } else {
      setCumprimento('Boa noite');
    }
  }, []);

  // Carrega as frases quando o nome é confirmado
  useEffect(() => {
    if (nomeConfirmado) {
      setConteudo(dadosFrases.frases);
    }
  }, [nomeConfirmado]);

  // Função para confirmar o nome do usuário e carregar o conteúdo
  const handleConfirmarNome = () => {
    const inputNome = document.getElementById('nome').value.trim();
    if (inputNome) {
      setNome(inputNome);         // Define o nome confirmado
      setNomeConfirmado(true);     // Confirma o nome e exibe o conteúdo
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  // Função para copiar texto para a área de transferência
  const copiaTexto = (texto) => {
    navigator.clipboard.writeText(texto).then();
  };

  return (
    <div className="App">
      <header className="menu-sup">
        <h1>Script de Atendimento ao Cliente</h1>
        <Rolagem />
      </header>

      {!nome ? (
        // Tela de entrada de nome
        <div id="nomeContainer">
          <label htmlFor="nome">Digite seu nome:</label>
          <input
            type="text"
            id="nome"
            placeholder="Seu nome"
          />
          <button onClick={handleConfirmarNome}>Confirmar</button>
        </div>
      ) : (
        // Exibição do conteúdo com frases personalizadas
        <section className="main">
          {conteudo.map((item, i) => (
            <div key={i} className="myDivSection">
              <h2>{`${i + 1}. ${item.titulo}`}</h2>
              {item.textos.map((texto, j) => (
                <div key={j} className="myDivTxt">
                  <p id={`text${i}.${j}`}>
                    {texto
                      .replace('{cumprimento}', cumprimento)
                      .replace('{nome}', nome)}
                  </p>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      copiaTexto(
                        texto.replace('{cumprimento}', cumprimento).replace('{nome}', nome)
                      )
                    }
                  >
                    <FaCopy />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default App;
