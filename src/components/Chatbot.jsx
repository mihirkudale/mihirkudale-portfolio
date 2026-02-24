/**
 * Portfolio chatbot – 2026 Standard
 * 
 * Features:
 * - SSE streaming (token-by-token rendering)
 * - Source attribution badges (AI Agent vs Rule-based)
 * - Conversation persistence (survives close, clears on page refresh)
 * - Expanded context window (20 messages)
 * - Accessibility: Escape, focus trap, ARIA, reduced motion
 * 
 * Config: src/constants/chatbot.js
 * Logic: src/utils/chatbotLogic.js
 */
import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotConfig } from "../constants/chatbot";
import { getChatbotReplyAsync } from "../utils/chatbotLogic";
import { homeData } from "../constants/home";

// Lazy load ReactMarkdown (12KB+) since only used in chatbot
const ReactMarkdown = lazy(() => import("react-markdown").then(m => ({ default: m.default })));

/** Generate a stable id for a new message */
function nextMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialMessages = [
  { id: nextMessageId(), role: "bot", content: chatbotConfig.welcomeMessage },
];

/** Hook to detect user's reduced motion preference */
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/** Source badge component */
function SourceBadge({ source }) {
  if (!source) return null;

  const isAI = source === 'api';
  return (
    <span
      className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${isAI
        ? 'bg-blue-50 text-blue-600 border border-blue-100'
        : 'bg-slate-50 text-slate-400 border border-slate-100'
        }`}
    >
      {isAI ? '🤖 AI Agent' : '📋 Rule-based'}
    </span>
  );
}

SourceBadge.propTypes = {
  source: PropTypes.string,
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [slowResponse, setSlowResponse] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const slowTimerRef = useRef(null);
  const dialogRef = useRef(null);
  const streamingMsgIdRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus trap for modal accessibility
  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleTabKey);
    return () => dialog.removeEventListener('keydown', handleTabKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Conversation persists on close — only resets on page refresh
  const handleClose = useCallback(() => {
    setOpen(false);
    setInput("");
    // Messages are NOT reset — they persist until page refresh
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim().slice(0, chatbotConfig.maxInputLength);
    if (!text || loading) return;

    setInput("");
    setSlowResponse(false);
    setMessages((prev) => [...prev, { id: nextMessageId(), role: "user", content: text }]);
    setLoading(true);

    // Show 'still thinking' hint after 4s (catches cold starts)
    slowTimerRef.current = setTimeout(() => setSlowResponse(true), 4000);

    // Create a placeholder bot message for streaming
    const botMsgId = nextMessageId();
    streamingMsgIdRef.current = botMsgId;

    try {
      // Use last 20 messages for context (up from 6)
      const conversationHistory = messages.slice(-20).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      // Add empty bot message that we'll stream into
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "bot", content: "", source: null, isStreaming: true }
      ]);
      setStreaming(true);

      const { reply, source } = await getChatbotReplyAsync(
        text,
        conversationHistory,
        // onToken callback — progressively update the bot message
        (token, fullReplacement) => {
          clearTimeout(slowTimerRef.current);
          setSlowResponse(false);

          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id !== botMsgId) return msg;
              return {
                ...msg,
                // If fullReplacement is provided (guardrail), replace entirely
                content: fullReplacement || (msg.content + token),
              };
            })
          );
        }
      );

      // Finalize the message with source badge
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== botMsgId) return msg;
          return {
            ...msg,
            content: reply || msg.content,
            source,
            isStreaming: false,
          };
        })
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        // If we already have the streaming placeholder, update it
        const hasPlaceholder = prev.some(m => m.id === botMsgId);
        if (hasPlaceholder) {
          return prev.map(msg => {
            if (msg.id !== botMsgId) return msg;
            return { ...msg, content: "Something went wrong. Please try again.", isStreaming: false, source: 'error' };
          });
        }
        return [...prev, { id: nextMessageId(), role: "bot", content: "Something went wrong. Please try again.", source: 'error' }];
      });
    } finally {
      clearTimeout(slowTimerRef.current);
      setSlowResponse(false);
      setLoading(false);
      setStreaming(false);
      streamingMsgIdRef.current = null;
    }
  }, [input, loading, messages]);

  const handleSuggestionClick = useCallback(async (q) => {
    if (loading) return;

    const runLogic = async () => {
      setMessages((prev) => [...prev, { id: nextMessageId(), role: "user", content: q }]);
      setLoading(true);

      const botMsgId = nextMessageId();
      streamingMsgIdRef.current = botMsgId;

      try {
        const conversationHistory = messages.slice(-20).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }));

        setMessages((prev) => [
          ...prev,
          { id: botMsgId, role: "bot", content: "", source: null, isStreaming: true }
        ]);
        setStreaming(true);

        const { reply, source } = await getChatbotReplyAsync(
          q,
          conversationHistory,
          (token, fullReplacement) => {
            setMessages((prev) =>
              prev.map((msg) => {
                if (msg.id !== botMsgId) return msg;
                return {
                  ...msg,
                  content: fullReplacement || (msg.content + token),
                };
              })
            );
          }
        );

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id !== botMsgId) return msg;
            return { ...msg, content: reply || msg.content, source, isStreaming: false };
          })
        );
      } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) => {
          const hasPlaceholder = prev.some(m => m.id === botMsgId);
          if (hasPlaceholder) {
            return prev.map(msg => {
              if (msg.id !== botMsgId) return msg;
              return { ...msg, content: "Something went wrong. Please try again.", isStreaming: false, source: 'error' };
            });
          }
          return [...prev, { id: nextMessageId(), role: "bot", content: "Something went wrong. Please try again.", source: 'error' }];
        });
      } finally {
        setLoading(false);
        setStreaming(false);
        streamingMsgIdRef.current = null;
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runLogic, { timeout: 100 });
    } else {
      setTimeout(runLogic, 0);
    }
  }, [loading, messages]);

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
      <AnimatePresence>
        {/* ── Chat Panel (Light Mode Glassmorphism) ── */}
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            className={`fixed bottom-24 right-6 z-[100] flex flex-col w-[min(380px,calc(100vw-3rem))] h-[min(540px,72vh)] rounded-[1.5rem] bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={homeData.image.src}
                    alt="Mihir"
                    className="w-10 h-10 rounded-xl object-cover shadow-sm border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 id="chatbot-title" className="font-bold text-[15px] text-slate-900 leading-tight">
                    {chatbotConfig.botName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">AI-powered</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/30"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex flex-col max-w-[85%]">
                    <div
                      className={`rounded-[1.25rem] px-4 py-3 text-[15px] shadow-sm ${msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm shadow-[0_4px_14px_rgba(37,99,235,0.2)]"
                        : "bg-white text-slate-700 rounded-bl-sm border border-slate-100/80 leading-relaxed font-medium"
                        }`}
                    >
                      {msg.role === "bot" ? (
                        <div className="prose prose-sm max-w-none text-slate-700 font-medium leading-[1.6] [&_a]:text-blue-600 [&_a]:underline [&_strong]:text-slate-900 [&_strong]:font-bold">
                          {msg.content ? (
                            <Suspense fallback={<span>{msg.content}</span>}>
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </Suspense>
                          ) : (
                            /* Empty streaming placeholder — show cursor blink */
                            <span className="inline-block w-1.5 h-4 bg-blue-500 rounded-sm animate-pulse" />
                          )}
                          {/* Streaming cursor */}
                          {msg.isStreaming && msg.content && (
                            <span className="inline-block w-1.5 h-4 bg-blue-500 rounded-sm animate-pulse ms-0.5 align-middle" />
                          )}
                        </div>
                      ) : (
                        <span>{msg.content}</span>
                      )}
                    </div>
                    {/* Source attribution badge */}
                    {msg.role === "bot" && !msg.isStreaming && msg.source && (
                      <SourceBadge source={msg.source} />
                    )}
                  </div>
                </div>
              ))}

              {loading && !streaming && (
                <div className="flex flex-col items-start gap-1">
                  <div className="bg-white rounded-[1.25rem] rounded-bl-sm px-5 py-3.5 border border-slate-100 shadow-sm">
                    <span className="inline-flex gap-1.5 align-middle">
                      <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                  {slowResponse && (
                    <p className="text-xs text-slate-400 font-medium ps-1 animate-pulse">
                      Still thinking... first response may take a moment ☕
                    </p>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 py-3 border-t border-slate-100 bg-white">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {["Experience", "Projects", "Skills", "Contact"].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSuggestionClick(q)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about my work..."
                  maxLength={chatbotConfig.maxInputLength}
                  className="flex-1 rounded-xl bg-slate-100/80 px-4 py-3 text-[15px] font-medium text-slate-800 placeholder-slate-400 border border-transparent focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all"
                  disabled={loading}
                  aria-label="Chat message"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white shadow-[0_4px_14px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:pointer-events-none transition-all focus:outline-none active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 -ms-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Toggle Button (Light Mode) ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-20 z-[99] flex items-center gap-2.5 p-1.5 pe-5 rounded-full bg-white text-slate-900 border border-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:border-slate-300 transition-colors duration-300 focus:outline-none"
            aria-label="Open chat assistant"
            aria-haspopup="dialog"
          >
            {/* Profile ring */}
            <div className="relative">
              <img
                src={homeData.image.src}
                alt="Mihir"
                className="w-11 h-11 rounded-full object-cover"
              />
              {/* Green dot */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <span className="text-sm font-bold tracking-tight text-slate-700">
              Ask me anything
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
