import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Protocolos from './pages/Protocolos';
import AdicionarFrase from './pages/AdicionarFrase';
import EditarFrase from './pages/EditarFrase';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocolos" element={<Protocolos />} />
        <Route path="/adicionar" element={<AdicionarFrase />} />
        <Route path="/editar/:id" element={<EditarFrase />} />
      </Routes>
    </Router>
  );
}

export default App;