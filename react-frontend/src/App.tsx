import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Landing from './components/Landing';
import LinkModal from './components/LinkModal';
import ChatInterface from './components/ChatInterface';
import { Message } from './types';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

type AppState = 'landing' | 'chat';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialModalUrl, setInitialModalUrl] = useState('');
  
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLink, setCurrentLink] = useState<string>('');
  
  const [isProcessingLink, setIsProcessingLink] = useState<boolean>(false);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const handleOpenModal = (url = '') => {
    setInitialModalUrl(url);
    setIsModalOpen(true);
    setLinkError(null);
  };

  const handleProcessLink = async (url: string) => {
    setIsProcessingLink(true);
    setLinkError(null);

    try {
      const response = await fetch(`${BACKEND}/link-injestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weburl: url.trim(), session_id: sessionId })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      
      if (data.message || data.status === 'success') {
        setCurrentLink(url.trim());
        setIsModalOpen(false);
        setAppState('chat');
        setMessages([]); // Clear older messages on new session
      } else {
        setLinkError('Failed to process the link.');
      }
    } catch (err) {
      setLinkError(err instanceof Error ? err.message : 'Error connecting to backend.');
    } finally {
      setIsProcessingLink(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isSendingMessage) return;

    const query = messageInput.trim();
    setMessageInput('');
    
    const newUserMsg: Message = { id: uuidv4(), role: 'user', content: query };
    setMessages(prev => [...prev, newUserMsg]);
    setIsSendingMessage(true);

    try {
      const response = await fetch(`${BACKEND}/link-retrieval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, session_id: sessionId })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const answer = data.message || data.response || data.answer || "No answer found";
      
      setMessages(prev => [...prev, { id: uuidv4(), role: 'assistant', content: answer }]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error communicating with server';
      setMessages(prev => [...prev, { id: uuidv4(), role: 'assistant', content: `**Error:** ${errorMsg}` }]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const clearSession = async () => {
    const previousSessionId = sessionId;
    
    // Reset state immediately
    setMessages([]);
    setCurrentLink('');
    setAppState('landing');
    setIsModalOpen(false);
    setInitialModalUrl('');
    setMessageInput('');
    setSessionId(uuidv4());
    
    try {
      await fetch(`${BACKEND}/clear-namespace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: previousSessionId })
      });
    } catch (err) {
      console.error('Failed to clear namespace:', err);
    }
  };

  return (
    <>
      {appState === 'landing' ? (
        <Landing 
          onGetStarted={() => handleOpenModal('')} 
          onTrySample={(url) => handleOpenModal(url)} 
        />
      ) : (
        <ChatInterface 
          currentLink={currentLink}
          messages={messages}
          isSending={isSendingMessage}
          messageInput={messageInput}
          onMessageInputChange={setMessageInput}
          onSendMessage={handleSendMessage}
          onEndSession={clearSession}
        />
      )}

      <LinkModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProcess={handleProcessLink}
        initialUrl={initialModalUrl}
        isProcessing={isProcessingLink}
        error={linkError}
      />
    </>
  );
}

