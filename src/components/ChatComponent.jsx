import React from 'react';

function ChatComponent() {
  return (
    <div className="ChatBot">
      <h1>Pergunte para a Eloísa</h1>
      <iframe
        src="https://rayandiniz-elo.hf.space"
        frameBorder="0"
        width="850"
        height="450"
        title="Gradio App"
      ></iframe>
    </div>
  );
}

export default ChatComponent;