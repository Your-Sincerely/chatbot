import React, { useState, useRef, useEffect } from 'react';

const CollegeInquiryChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const suggestions = [
    {
      title: "Admissions Info",
      description: "Application deadlines, requirements, and process",
      icon: "📝",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      title: "Financial Aid",
      description: "Scholarships, grants, and payment options",
      icon: "💰",
      color: "bg-gradient-to-br from-blue-500 to-teal-400"
    },
    {
      title: "Campus Resources",
      description: "Facilities, services, and student support",
      icon: "🏫",
      color: "bg-gradient-to-br from-orange-400 to-pink-500"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    const newUserMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setShowSuggestions(false);
    
    // Simulate bot response - replace with actual API call in production
    setTimeout(() => {
      const responses = [
        "Thanks for your question about our college! I'll help you find that information.",
        "Great question! Here's what you need to know about that topic.",
        "I'm here to help with your college questions. Let me find that information for you.",
        "That's something many students ask about. Here's what you should know."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botResponse = {
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (title) => {
    const newUserMessage = {
      content: `I'd like information about ${title}`,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setShowSuggestions(false);
    
    // Simulate bot response based on topic selected
    setTimeout(() => {
      let response = "";
      
      switch(title) {
        case "Admissions Info":
          response = "For admissions, our application deadlines are October 15 for early decision and January 15 for regular decision. You'll need to submit transcripts, test scores, and a personal statement. Would you like more specific information about any part of the admissions process?";
          break;
        case "Financial Aid":
          response = "We offer various financial aid options including merit scholarships, need-based grants, and work-study programs. The FAFSA deadline for priority consideration is March 1. Would you like details about a specific financial aid program?";
          break;
        case "Campus Resources":
          response = "Our campus features modern dormitories, a recently renovated library, 24/7 computer labs, health and counseling services, and various student centers. Which campus resource would you like to learn more about?";
          break;
        default:
          response = "I'd be happy to help you with information about our college. What specific details are you looking for?";
      }
      
      const botResponse = {
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button className="mr-3 bg-white bg-opacity-20 rounded-full p-1.5 hover:bg-opacity-30 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-xl">Campus Connect</h1>
              <p className="text-xs text-blue-100">Your College Assistant</p>
            </div>
          </div>
          <div className="flex-grow"></div>
          <button className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat area with subtle pattern background */}
      <div 
        className="flex-grow overflow-y-auto p-4 bg-gray-50" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed'
        }}
      >
        {messages.length === 0 && showSuggestions ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center mb-6 shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 text-center">How can I help you today?</h2>
            <p className="text-gray-600 text-center text-base mb-8 max-w-lg">
              I'm your personal college assistant, ready to answer questions about admissions, campus life, courses, and more!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className={`${suggestion.color} rounded-xl p-6 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white`}
                  onClick={() => handleSuggestionClick(suggestion.title)}
                >
                  <div className="text-3xl mb-3">{suggestion.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{suggestion.title}</h3>
                  <p className="text-sm opacity-90">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                <div 
                  className={`max-w-3/4 p-4 rounded-2xl shadow-md ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <div className={`text-xs mt-1 text-right ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Intl.DateTimeFormat('en-US', { 
                      hour: 'numeric', 
                      minute: 'numeric',
                      hour12: true 
                    }).format(message.timestamp)}
                  </div>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area with floating design */}
      <div className="p-4 bg-white border-t border-gray-200 shadow-md">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about our college..."
            className="w-full bg-gray-100 pl-5 pr-16 py-4 rounded-full outline-none focus:ring-2 focus:ring-blue-500 shadow-inner text-gray-800"
          />
          <button 
            type="submit" 
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 rounded-full ${
              inputValue.trim() 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                : 'bg-gray-300 text-gray-500'
            } transition-all duration-200`}
            disabled={!inputValue.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        <div className="flex justify-center mt-3">
          <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
            <span className="text-blue-600 mr-1">ℹ️</span> Need urgent help? Call Student Services at (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollegeInquiryChatbot;