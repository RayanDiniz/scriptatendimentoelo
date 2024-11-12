import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="menu-sup">
      <nav>
        <Link className="guia" to="/">Home</Link>
        <Link className="guia" to="/protocolos">Protocolos</Link>
        <Link className="guia" to="/adicionar">Adicionar Frase</Link>
      </nav>
    </header>
  );
}

export default Header;
