'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  ChevronRight,
  RotateCcw,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Minimize2
} from 'lucide-react';
import { getYearsBetween } from '@/utils/utils';

// Suggested quick prompts for site visitors
const QUICK_PROMPTS = [
  "Tell me about your experience",
  "What is your tech stack?",
  "What projects have you built?",
  "How can I contact you?"
];

type ChatMessage = {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
};

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm Hardik Donda's AI assistant. Ask me anything about Hardik's background, work at TCS, or tech stack!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input field when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const conversation = [...messagesRef.current, userMessage];
    while (conversation.length > 0 && conversation[0].sender === 'bot') {
      conversation.shift();
    }

    const historyForApi = conversation.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi }),
      });

      const data = await response.json().catch(() => ({}));
      const replyText =
        typeof data.reply === 'string' && data.reply.trim()
          ? data.reply.trim()
          : typeof data.error === 'string'
            ? data.error
            : 'Sorry, I could not get a response. Please try again.';

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Network error. Please check your connection and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Chat reset! How else can I help you learn about Hardik Donda?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Basic markdown parser for bold text (**text**) and bullet lists
  const renderFormattedText = (text: string) => {
    // Match URLs, email addresses and phone numbers
    const pattern =
      /(https?:\/\/[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?\d[\d\s()-]{7,}\d)/g;

    const renderParts = (line: string, lineIdx: number) => {
      const segments = line.split(pattern);

      return segments.map((part, pIdx) => {
        // URL
        if (/^https?:\/\//i.test(part)) {
          const match = part.match(/^(.*?)([.,!?;:)]*)$/);
          const url = match?.[1] ?? part;
          const punctuation = match?.[2] ?? "";

          return (
            <React.Fragment key={`${lineIdx}-${pIdx}`}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 break-all"
              >
                {url}
              </a>
              {punctuation}
            </React.Fragment>
          );
        }

        // Email address
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
          return (
            <a
              key={`${lineIdx}-${pIdx}`}
              href={`mailto:${part}`}
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
            >
              {part}
            </a>
          );
        }

        // Mobile / phone number
        if (/^\+?\d[\d\s()-]{7,}\d$/.test(part)) {
          const phone = part.replace(/[^\d+]/g, "");

          return (
            <a
              key={`${lineIdx}-${pIdx}`}
              href={`tel:${phone}`}
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
            >
              {part}
            </a>
          );
        }

        // Bold formatting
        return part.split(/(\*\*.*?\*\*)/g).map((boldPart, bIdx) => {
          if (
            boldPart.startsWith("**") &&
            boldPart.endsWith("**")
          ) {
            return (
              <strong
                key={`${lineIdx}-${pIdx}-${bIdx}`}
                className="font-semibold text-slate-900 dark:text-white"
              >
                {boldPart.slice(2, -2)}
              </strong>
            );
          }

          return boldPart;
        });
      });
    };

    return text.split("\n").map((line, idx) => (
      <span key={idx} className="block mb-1 last:mb-0">
        {renderParts(line, idx)}
      </span>
    ));
  };


  return (
    <div
      className={`fixed z-50 font-sans antialiased ${
        isOpen
          ? "inset-x-3 bottom-3 sm:inset-x-auto sm:left-auto sm:right-5 sm:bottom-5"
          : "bottom-5 right-5"
      }`}
    >
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative ml-auto flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          aria-label="Open Chatbot"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium">
            Ask AI about Hardik
          </span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Main Floating Chat Window */}
      {isOpen && (
        <div className="w-full sm:w-[400px] h-[min(550px,calc(100dvh-1.5rem))] max-h-[85dvh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Hardik's AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h3>
                <p className="text-[11px] text-blue-100/80 font-normal">Online • AI Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleResetChat}
                title="Reset Chat"
                className="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Window"
                className="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 min-w-0">
            <span className="flex items-center gap-1 font-medium min-w-0 truncate">
              <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" /> {getYearsBetween(new Date(2022, 6, 22), new Date())}+ Yrs Exp (TCS)
            </span>
            <span className="flex items-center gap-1 font-medium shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> GEC Bhavnagar
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] min-w-0 break-words rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-none'
                    }`}
                >
                  {renderFormattedText(msg.text)}
                  <span
                    className={`block text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
                      }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full border border-slate-200 dark:border-slate-700 transition flex items-center gap-1 shrink-0"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1.5 border border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all duration-200">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Hardik's background..."
                className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg transition-all duration-200 shadow-sm shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
              Powered by HD Intelligence • Built for Hardik Donda's Portfolio
            </div>
          </div>
        </div>
      )}
    </div>
  );
}