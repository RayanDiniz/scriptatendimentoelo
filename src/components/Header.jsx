import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import Lembrete from "./Lembrete";

function Header() {

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controla se o balão está aberto
  const popupRef = useRef(null); // Referência para o balão de notificações
  const iconRef = useRef(null); // Referência para o ícone de notificações

  // Função para alternar o estado do balão
  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  // Fechar o balão ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <nav className="menu">
        <Link className="guia" to="/">Home</Link>
        <Link className="guia" to="/protocolos">Protocolos</Link>
        <Link className="guia" to="/adicionar">Adicionar Frase</Link>
      </nav>
      <div className="notification" ref={iconRef} onClick={togglePopup}>
        <span class="icon">🔔</span>
        <span class="badge" id="notificationCount">3</span>
        {isPopupOpen && (
          <div class="notification-popup" ref={popupRef}>
            <Lembrete />
          </div>
        )}
      </div>
    </header >
  );
}

export default Header;
