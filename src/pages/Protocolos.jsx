import React from 'react';
import { FaCopy } from 'react-icons/fa';

const protocolos = [
  "SEM CONEXÃO LINK LOSS: - Cliente sem conexão; - Feito reinicialização dos equipamentos porém problema persiste; - Verificado Led Los Piscando no modem de fibra após envio de vídeo pelo cliente; - Cliente ciente da taxa de R$ 100,00 caso seja identificado dano na fibra na parte interna do ponto; - Contato: []",
  "LENTIDÃO: - Cliente informou que está com lentidão; - Verificado versão de firmware do aparelho; - Verificado configurações de rede WIFI; - Verificado Wan Services; - Reiniciado o aparelho; - Nenhum problema foi identificado com o link;  - Contato: []"

];

function Protocolos() {
  const handleCopy = (texto) => {
    navigator.clipboard.writeText(texto);
  };

  return (
    <div className="myDivSection">
      <h1>Protocolos</h1>
      <ul>
        {protocolos.map((texto, index) => (
          <li key={index} style={{ whiteSpace: 'pre-line' }}>
            {texto}
            <button className="copy-btn" onClick={() => handleCopy(texto)}>
              <FaCopy />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Protocolos;