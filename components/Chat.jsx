import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdSend, MdArrowBack, MdChat } from 'react-icons/md';
import { FiSidebar } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Previous Chat 1', timestamp: '2024-03-20' },
    { id: 2, title: 'Previous Chat 2', timestamp: '2024-03-19' },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading spinner

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        navigate('/login');
        return;
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
        } else {
          navigate('/login');
        }
      });
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://204.12.203.155:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage = {
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className={`${isSidebarOpen ? 'w-60' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat History</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className="w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 transition-colors"
              onClick={() => {/* Handle conversation selection */}
            {/* >
              <div className="flex items-center gap-2">
                <MdChat className="text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">{conv.title}</p>
                  <p className="text-xs text-gray-500">{conv.timestamp}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div> */}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Toggle Sidebar Button */}
        {/* <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <FiSidebar className="text-2xl" />
        </button> */}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto pt-16 pb-24 px-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="px-4 py-3 mb-4"
              >
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'assistant' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {message.role === 'assistant' ? 'AI' : 'U'}
                  </div>
                  <div className="flex-1 leading-relaxed">
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="mb-2 text-gray-700">{children}</p>,
                        code: ({node, inline, children}) => 
                          inline ? (
                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800 font-mono">
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                              <code className="text-sm text-gray-800 font-mono block">
                                {children}
                              </code>
                            </pre>
                          ),
                        strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                        ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                        li: ({children}) => <li className="mb-1">{children}</li>,
                        h1: ({children}) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-bold mb-1">{children}</h3>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 outline-none bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-green-500 transition-colors disabled:opacity-50"
                disabled={!input.trim()}
              >
                <MdSend className="text-2xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;