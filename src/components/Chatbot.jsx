/**
 * Portfolio chatbot – theme-matched, rule-based, no external API.
 * Config: src/constants/chatbot.js. Logic: src/utils/chatbotLogic.js.
 * 
 * Accessibility features:
 * - Escape key closes chat
 * - Focus trapped in chat when open
 * - ARIA live region for new messages
 * - Proper dialog role and labels
 */
import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { X, Send, Bot } from "lucide-react";
import { chatbotConfig } from "../constants/chatbot";
import { getChatbotReply } from "../utils/chatbotLogic";
import { homeData } from "../constants/home";

/** Generate a stable id for a new message (avoids key collisions) */
function nextMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialMessages = [
  { id: nextMessageId(), role: "bot", content: chatbotConfig.welcomeMessage },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimeoutRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keyboard accessibility: Escape to close and clear
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Clear chat history when closing
  const handleClose = useCallback(() => {
    setOpen(false);
    setInput("");
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const sendMessage = useCallback(() => {
    const text = input.trim().slice(0, chatbotConfig.maxInputLength);
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { id: nextMessageId(), role: "user", content: text }]);
    setLoading(true);

    replyTimeoutRef.current = setTimeout(() => {
      replyTimeoutRef.current = null;
      try {
        const reply = getChatbotReply(text);
        setMessages((prev) => [...prev, { id: nextMessageId(), role: "bot", content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { id: nextMessageId(), role: "bot", content: "Something went wrong. Please try again or use the Contact section." },
        ]);
      } finally {
        setLoading(false);
      }
    }, chatbotConfig.replyDelayMs);
  }, [input, loading]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* Chat panel – theme: blue/indigo, glassmorphism, rounded-2xl (matches site) */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          aria-describedby="chatbot-desc"
          className="fixed bottom-24 right-6 z-[100] flex flex-col w-[min(380px,calc(100vw-3rem))] h-[min(520px,72vh)] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden animate-chat-open"
        >
          {/* Header – gradient accent like site headings */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-700/10 via-indigo-500/10 to-purple-600/10 dark:from-blue-700/20 dark:via-indigo-500/20 dark:to-purple-600/20">
            <div className="flex items-center gap-2.5">
              <img
                src={homeData.image.src}
                alt=""
                className="w-9 h-9 rounded-xl object-cover shadow-sm"
              />
              <span id="chatbot-title" className="font-semibold text-sm text-gray-900 dark:text-white">
                {chatbotConfig.botName}
              </span>
              <span id="chatbot-desc" className="sr-only">Ask questions about the portfolio</span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages – light/dark surfaces, blue for user bubbles */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-950/50"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user"
                    ? "bg-blue-700 text-white rounded-br-md shadow-sm"
                    : "bg-white dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200 dark:border-gray-700 shadow-sm"
                    }`}
                >
                  {msg.role === "bot" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_strong]:text-gray-900 dark:[&_strong]:text-white">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800/90 rounded-2xl rounded-bl-md px-4 py-2.5 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <span className="inline-flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Question Suggestions */}
          {messages.length <= 2 && !loading && (
            <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/30">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Skills",
                  "Projects",
                  "Experience",
                  "Education",
                  "Certifications",
                  "Contact",
                  "Help",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        setInput("");
                        setMessages((prev) => [...prev, { id: nextMessageId(), role: "user", content: q }]);
                        setLoading(true);
                        replyTimeoutRef.current = setTimeout(() => {
                          replyTimeoutRef.current = null;
                          const reply = getChatbotReply(q);
                          setMessages((prev) => [...prev, { id: nextMessageId(), role: "bot", content: reply }]);
                          setLoading(false);
                        }, chatbotConfig.replyDelayMs);
                      }, 50);
                    }}
                    className="px-2.5 py-1 text-xs rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-300 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input – same border/ring as site inputs */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects, contact..."
                maxLength={chatbotConfig.maxInputLength}
                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 transition"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="rounded-xl bg-blue-700 px-4 py-2.5 text-white hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle – 2026 trends: glassmorphism, gradient, subtle animations */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-[99] flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:shadow-[0_8px_40px_rgb(99,102,241,0.6)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label="Open chat assistant"
          aria-haspopup="dialog"
        >
          {/* Profile with status indicator */}
          <div className="relative">
            <img
              src={homeData.image.src}
              alt="Chat with Mihir"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>

          {/* Animated text with typing effect */}
          <span className="text-sm font-medium tracking-wide">
            <span className="inline-flex items-center gap-1">
              Chat with me
              <span className="flex gap-0.5">
                <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
              </span>
            </span>
          </span>
        </button>
      )}
    </>
  );
}

// PropTypes for documentation (no props currently, but explicit for clarity)
Chatbot.propTypes = {};

export default Chatbot;
