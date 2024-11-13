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
        system_message: "Hello!!",
        max_tokens: 1,
        temperature: 0.1,
        top_p: 0.1,
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
      <h2>Chat com API</h2>
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
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f1f1f1', borderRadius: '5px' }}>
          <h4>Resposta da API:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;