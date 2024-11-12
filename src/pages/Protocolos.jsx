import React from 'react';
import { FaCopy } from 'react-icons/fa';

const protocolos = [
  "Protocolo 1: Texto do protocolo para abertura de chamado.",
  "Protocolo 2: Outro texto de protocolo para abertura de chamado.",
  // Adicione outros protocolos aqui
];

function Protocolos() {
  const handleCopy = (texto) => {
    navigator.clipboard.writeText(texto);
    alert("Texto copiado!");
  };

  return (
    <div>
      <h1>Protocolos</h1>
      <ul>
        {protocolos.map((texto, index) => (
          <li key={index}>
            {texto}
            <button onClick={() => handleCopy(texto)}>
              <FaCopy /> Copiar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Protocolos;