import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="menu-sup">
        <Link to="/">Home</Link>
        <Link to="/protocolos">Protocolos</Link>
        <Link to="/adicionar">Adicionar Frase</Link>
      </nav>
    </header>
  );
}

export default Header;
