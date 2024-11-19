import React, { useState } from 'react';

function Lembrete() {
  const [lembretes, setLembretes] = useState([]);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [status, setStatus] = useState('');

  // Solicita permissão para notificações
  const solicitarPermissao = async () => {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações.");
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return true;
    } else {
      alert("Permissão negada para notificações.");
      return false;
    }
  };

  // Adiciona um lembrete e agenda notificação
  const adicionarLembrete = async (e) => {
    e.preventDefault();

    const permissaoConcedida = await solicitarPermissao();
    if (!permissaoConcedida) return;

    const novoLembrete = { id: Date.now(), nome, numero, descricao, horario };
    setLembretes([...lembretes, novoLembrete]);

    // Calcula o tempo até o horário definido
    const horarioAtual = new Date();
    const horarioDefinido = new Date();
    const [hora, minuto] = horario.split(':').map(Number);

    horarioDefinido.setHours(hora);
    horarioDefinido.setMinutes(minuto);
    horarioDefinido.setSeconds(0);

    const diferenca = horarioDefinido - horarioAtual;

    if (diferenca <= 0) {
      alert("O horário definido deve ser no futuro.");
      return;
    }

    setStatus(`Lembrete adicionado para ${horarioDefinido.toLocaleTimeString()}`);

    // Agenda a notificação
    setTimeout(() => {
      new Notification("Lembrete de Retorno", {
        body: `Nome: ${nome}\nNúmero: ${numero}\nDescrição: ${descricao}`,
      });
      setStatus("Notificação enviada!");
    }, diferenca);

    // Limpa os campos após adicionar
    setNome('');
    setNumero('');
    setDescricao('');
    setHorario('');
  };

  // Remove um lembrete pelo ID
  const excluirLembrete = (id) => {
    setLembretes(lembretes.filter((lembrete) => lembrete.id !== id));
    setStatus('Lembrete excluído com sucesso!');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'center' }}>
      <h2>Gerenciador de Lembretes</h2>
      <form onSubmit={adicionarLembrete} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Número:</label>
          <input
            type="tel"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Digite o número"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Breve descrição"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            rows="3"
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Horário (HH:mm):</label>
          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Adicionar Lembrete
        </button>
      </form>
      {status && <p>{status}</p>}
      <h3>Lembretes Criados:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lembretes.map((lembrete) => (
          <li
            key={lembrete.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              background: '#f9f9f9',
              border: '1px solid #ddd',
            }}
          >
            <p><strong>Nome:</strong> {lembrete.nome}</p>
            <p><strong>Número:</strong> {lembrete.numero}</p>
            <p><strong>Descrição:</strong> {lembrete.descricao}</p>
            <p><strong>Horário:</strong> {lembrete.horario}</p>
            <button
              onClick={() => excluirLembrete(lembrete.id)}
              style={{
                padding: '5px 10px',
                background: '#ff4d4d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lembrete;
