import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarFrase() {
  const { id } = useParams(); // Obtém o ID da frase a partir dos parâmetros de URL
  const navigate = useNavigate();
  const [frase, setFrase] = useState({ titulo: '', autor: '', textos: '' });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    // Busca a frase pelo ID para edição
    const fetchFrase = async () => {
      try {
        const response = await axios.get(`https://scriptatendimentoelo.onrender.com/api/frases/${id}`);
        setFrase({
          ...response.data,
          textos: response.data.textos.join('; ') // Converte array de textos em string separada por ponto e vírgula
        });
      } catch (error) {
        console.error('Erro ao buscar frase:', error);
      }
    };

    fetchFrase();
  }, [id]);

  // Função para salvar as alterações
  const salvarEdicao = async (e) => {
    e.preventDefault();
    try {
      // Converte o campo 'textos' de volta em array
      const fraseAtualizada = {
        ...frase,
        textos: frase.textos.split(';').map(text => text.trim())
      };

      await axios.put(`https://scriptatendimentoelo.onrender.com/api/frases/${id}`, fraseAtualizada);
      setMensagem('Frase atualizada com sucesso!');
      setTimeout(() => navigate('/'), 2000); // Redireciona para a página inicial após salvar
    } catch (error) {
      setMensagem('Erro ao atualizar frase.');
      console.error('Erro ao atualizar frase:', error);
    }
  };

  // Função para lidar com alterações nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFrase((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form">
      <h1>Editar Frase</h1>
      <form className="form-container" onSubmit={salvarEdicao}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={frase.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="autor"
            value={frase.autor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Textos (separados por ponto e vírgula):</label>
          <textarea
            type="text"
            name="textos"
            value={frase.textos}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default EditarFrase;