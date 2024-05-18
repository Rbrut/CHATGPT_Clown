import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Access the environment variables
const apiKey = import.meta.env.VITE_API_KEY_1;
const apiUrl = import.meta.env.VITE_API_URL;

// System message for AI behavior
const systemMessage = { 
  role: "system", 
  content: "Explain things like you are a pirate"
};

function App() {

  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([{
    content: "Hello! How can I assist you today?",
    sender: 'ChatGPT',
    direction: "incoming",
    time: "just now"
  }]);

  const handleSend = async () => {
    const message = userInput.trim();
    if (message.length === 0) {
      return;
    }

    const userMessage = {
      content: message,
      direction: 'outgoing',
      sender: "user",
      time: new Date().toLocaleTimeString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    await chatGPTMessage(newMessages);
  };

  async function chatGPTMessage(chatMessages, retryCount = 0) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? 'assistant' : 'user';
      return { role, content: messageObject.content };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        if (response.status === 429 && retryCount < 5) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return chatGPTMessage(chatMessages, retryCount + 1);
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      setMessages([...chatMessages, {
        content: data.choices[0].message.content,
        sender: "ChatGPT",
        direction: "incoming",
        time: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTyping(false);
    }
  }

  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      <div className="title text-center">
        <h2 className='Display-4'>chatGPT-Clone 🤖</h2>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {isTyping && <div className="typing-indicator">ChatGPT is typing...</div>}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.direction}`}>
            <div className="message-content">
              <div className="text-message">
                <p>
                  {msg.direction === 'incoming' && <i className="bi bi-robot icon" />} 
                  {msg.direction === 'outgoing' && <i className="bi bi-person-circle icon" />}
                  {msg.content}
                </p>
                <span className="time">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Write message" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className='btn btn-secondary' type='button' onClick={handleSend}>Send</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
