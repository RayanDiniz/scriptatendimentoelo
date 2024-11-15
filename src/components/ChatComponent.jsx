import React, { useState } from 'react';
import { Client } from "@gradio/client";

function ChatComponent() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    setIsLoading(true);
    try {
      const client = await Client.connect("rayandiniz/elo");
      const result = await client.predict("/chat", {
        message: input,
        system_message: "You are a friendly Chatbot. Your name is Eloísa",
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.95,
      });

      setResponse(result.data); // Armazena a resposta no estado
    } catch (error) {
      console.error("Erro ao se conectar à API:", error);
      setResponse("Erro ao se conectar à API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Pergunte para a Eloísa.</h2>
      {response && (
        <div style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f1f1f1', borderRadius: '5px' }}>
          <p className="typing-effect">{response}</p>
        </div>
      )}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="4"
        placeholder="Digite sua mensagem"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleSendMessage} disabled={isLoading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {isLoading ? 'Carregando...' : 'Enviar'}
      </button>
    </div>
  );
}

export default ChatComponent;