import React, { useState } from 'react';
import axios from 'axios';
import './DocAI.css'; // Add this line for custom styles

function DocAI() {
  const [userMessage, setUserMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSendMessage = async () => {
    if (!userMessage) return;

    setResponses((prev) => [...prev, { text: userMessage, sender: 'user' }]);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data?.choices?.length > 0) {
        const aiResponse = response.data.choices[0].message.content;
        setResponses((prev) => [...prev, { text: aiResponse, sender: 'ai' }]);
      } else {
        setResponses((prev) => [...prev, { text: 'Error: No response from DocAI', sender: 'ai' }]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponses((prev) => [...prev, { text: 'Error contacting DocAI. Please try again later.', sender: 'ai' }]);
    }

    setUserMessage('');
  };

  return (
    <div className="docai-container">
      <h3>Chat with DocAI</h3>
      <div className="chat-box">
        {responses.map((resp, index) => (
          <div key={index} className={`message ${resp.sender}`}>
            <strong>{resp.sender === 'user' ? 'You' : 'DocAI'}:</strong> {resp.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default DocAI;
