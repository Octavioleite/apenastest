import React, { useState } from "react";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    try {
      const res = await fetch("https://flask-hello-world-two-blond-93.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await res.json();
      setResponse(data.response || "Desculpe, não entendi.");
    } catch (error) {
      console.error("Erro ao se comunicar com a API:", error);
      setResponse("Erro ao se comunicar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Chat com a API</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <div>
        <h2>Resposta:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatApp;
