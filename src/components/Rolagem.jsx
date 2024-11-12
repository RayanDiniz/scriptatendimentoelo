import React from 'react';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";

function Rolagem() {
  // Função para rolar ao topo
  const irTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Função para rolar até a base
  const irBase = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Captura a altura total da página
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll">
      <button onClick={irTopo}><FaRegArrowAltCircleUp /></button>
      <button onClick={irBase}><FaRegArrowAltCircleDown /></button>
      {/* Conteúdo do componente */}
    </div>
  );
}

export default Rolagem;