import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mail, Phone } from 'lucide-react';
import styles from './ChatAssistant.module.css';

const SYSTEM_PROMPT = `You are the AI Assistant for Appasamy Associates.
Help users navigate the website, explain products, and help them contact the company.

CRITICAL INSTRUCTION FOR CONTACT REQUESTS:
Never give out the official info@appasamy.com email or company phone numbers.
Instead, you MUST route all contact to: tejakrishnamanikantaravula59@gmail.com and WhatsApp number: 9493732359.

When a user wants to connect or contact:
1. Ask if they prefer Email or WhatsApp.
2. If they choose WhatsApp: output exactly <WHATSAPP_LINK> and explain they can click it.
3. If they choose Email: ask for their Name, their Email address, and the reason for connecting.
4. Once they provide those details, draft a professional email on their behalf.
5. Show the draft to the user in the chat and ask if they want any changes.
6. If they want changes, update the draft and show it again.
7. Once they approve the draft, output exactly <FINAL_MAILTO subject="[Insert Subject]" body="[Insert Body]"> so the system can generate the email link. (Make sure the subject and body inside the tags match the approved draft).`;

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the AI Assistant for Appasamy Associates. How can I help you today? If you want to connect with us, just let me know!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const callBedrockAPI = async (userMessage, conversationHistory) => {
    // Get token from environment variables instead of hardcoding
    const token = import.meta.env.VITE_AWS_BEDROCK_TOKEN || "";
    
    // Convert history to a text prompt suitable for a generic LLM completion
    let prompt = SYSTEM_PROMPT + "\n\n";
    conversationHistory.forEach(msg => {
      prompt += `\n\n${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`;
    });
    prompt += `\n\nHuman: ${userMessage}\n\nAssistant:`;

    try {
      // NOTE: Replace this URL with your actual AWS API Gateway endpoint that forwards to Bedrock.
      // Since Bedrock requires AWS Signature V4 natively, a Bearer token typically means you have a custom proxy endpoint.
      const response = await fetch('YOUR_BEDROCK_API_GATEWAY_URL_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.7,
        })
      });
      
      if (!response.ok) {
        throw new Error('API request failed. Please check your Bedrock Endpoint URL.');
      }
      
      const data = await response.json();
      return data.completion || data.text || data.message || "Sorry, I received an empty response.";
    } catch (error) {
      console.error(error);
      // Fallback response so you can test the UI flow even without a working endpoint URL yet
      return `[API Endpoint Error: ${error.message}]\n\nSince the API endpoint URL needs to be configured in the code, I will provide the contact options directly for you:\n\n<WHATSAPP_LINK>\n<EMAIL_FALLBACK>`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await callBedrockAPI(input, messages);
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  const parseMessageContent = (content) => {
    let elements = [];
    let text = content;

    // 1. Extract WhatsApp Link
    if (text.includes('<WHATSAPP_LINK>')) {
      text = text.replace('<WHATSAPP_LINK>', '');
      elements.push(
        <a key="wa" href="https://wa.me/919493732359" target="_blank" rel="noreferrer" className={styles.actionBtn}>
          <Phone size={16} /> Contact via WhatsApp
        </a>
      );
    }

    // 2. Extract Final Mailto
    const mailtoRegex = /<FINAL_MAILTO\s+subject="([^"]*)"\s+body="([^"]*)">/s;
    const match = text.match(mailtoRegex);
    if (match) {
      text = text.replace(match[0], '');
      const subject = encodeURIComponent(match[1]);
      const body = encodeURIComponent(match[2]);
      elements.push(
        <a key="mail" href={`mailto:tejakrishnamanikantaravula59@gmail.com?subject=${subject}&body=${body}`} className={styles.actionBtnEmail}>
          <Mail size={16} /> Send Email
        </a>
      );
    }

    // 3. Extract Email Fallback (for error testing)
    if (text.includes('<EMAIL_FALLBACK>')) {
      text = text.replace('<EMAIL_FALLBACK>', '');
      elements.push(
        <a key="mail_fb" href="mailto:tejakrishnamanikantaravula59@gmail.com" className={styles.actionBtnEmail}>
          <Mail size={16} /> Contact via Email
        </a>
      );
    }

    return (
      <div className={styles.parsedMessage}>
        <div className={styles.messageText}>{text.trim()}</div>
        {elements.length > 0 && <div className={styles.actionContainer}>{elements}</div>}
      </div>
    );
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>AI Assistant</h3>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className={styles.messagesArea}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
                {msg.role === 'assistant' ? parseMessageContent(msg.content) : msg.content}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.loadingDots}>
                  <div></div><div></div><div></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.inputArea} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className={styles.sendButton} disabled={!input.trim() || isLoading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className={styles.chatButton} onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}
