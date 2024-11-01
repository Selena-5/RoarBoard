// ClubAI.js
import React, { useState } from 'react';
import axios from 'axios';

function ClubAI() {
  const [userMessage, setUserMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSendMessage = async () => {
    if (!userMessage) return;

    // Add user message to responses
    setResponses((prev) => [...prev, { text: userMessage, sender: 'user' }]);

    // Call OpenAI API
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable
          'Content-Type': 'application/json',
        },
      });

      // Check if response contains a valid AI message
      if (response && response.data && response.data.choices && response.data.choices.length > 0) {
        const aiResponse = response.data.choices[0].message.content;
        setResponses((prev) => [...prev, { text: aiResponse, sender: 'ai' }]);
      } else {
        console.error('Unexpected response structure:', response);
        setResponses((prev) => [...prev, { text: 'Error: No response from AI', sender: 'ai' }]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponses((prev) => [...prev, { text: 'Error contacting AI. Please try again later.', sender: 'ai' }]);
    }

    setUserMessage(''); // Clear input
  };

  return (
    <div>
      <h3>Chat with Doc the AI</h3>
      <div className="chat-container" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {responses.map((resp, index) => (
          <div key={index} className={resp.sender === 'user' ? 'user-message' : 'ai-message'}>
            <strong>{resp.sender === 'user' ? 'You:' : 'AI:'}</strong> {resp.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ClubAI;
