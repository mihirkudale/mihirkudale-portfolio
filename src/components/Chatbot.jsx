import { useState, useRef, useEffect } from "react";
import { Trash2, X, Mic } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);

  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const sendMessage = async () => {
    if (loading) return;                    // prevent double-send
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = { from: "user", text: input.trim(), time: timestamp };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send recent history so follow-ups work
        body: JSON.stringify({
          query: userMsg.text,
          history: messages.map(({ from, text }) => ({ from, text })),
        }),
      });

      const data = await res.json();
      const botMsg = {
        from: "bot",
        text: data?.answer || "Hmm... no response.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);

      // surface upstream error text if present
      if (data?.error) {
        setError("Assistant degraded response (provider error).");
        setTimeout(() => setError(null), 4000);
      }
    } catch (e) {
      console.error(e);
      setError(e?.message || "Assistant is offline or unreachable.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chat_messages");
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError("Speech recognition not supported.");
        setTimeout(() => setError(null), 4000);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognition.onerror = () => {
        setError("Voice input error.");
        setTimeout(() => setError(null), 4000);
        setListening(false);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }

    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // auto-scroll on new messages
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // persist chat
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  // first-open welcome message
  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      const hand = String.fromCodePoint(0x1f44b);
      const greeting = getTimeGreeting();
      const welcomeText = `${greeting}! ${hand}\n\nI'm Mihir Kudale's AI assistant. Got any questions about him or his work? Feel free to ask — I'm here to help!`;
      const welcomeMsg = {
        from: "bot",
        text: welcomeText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* FAB Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-white text-blue-600 border border-blue-600 px-4 py-2 pr-5 rounded-full shadow-md text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg"
        >
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-60 animate-ping"></div>
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 13.586V4a2 2 0 00-2-2H4a2 2 0 00-2 2v9a2 2 0 002 2h10l4 4-.001-3.414z" />
              </svg>
            </div>
          </div>
          Chat with AI Assistant
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[22rem] sm:w-96 h-[30rem] rounded-2xl flex flex-col overflow-hidden z-50 bg-white shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center bg-blue-600 text-white px-5 py-3 font-semibold text-sm shadow">
            Mihir Kudale’s AI Assistant
            <div className="flex gap-2">
              <button onClick={clearChat}><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 bg-white space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col items-start max-w-[80%]">
                  {msg.from === "bot" && (
                    <div className="mb-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 13.586V4a2 2 0 00-2-2H4a2 2 0 00-2 2v9a2 2 0 002 2h10l4 4-.001-3.414z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-xl whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 border border-blue-100 rounded-bl-none"
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 self-end">{msg.time}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl border border-blue-100 text-gray-500 max-w-[60%] bg-white">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-white px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full shadow border ${listening ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"}`}
            >
              <Mic className={`w-4 h-4 ${listening ? "text-blue-600" : "text-gray-500"}`} />
            </button>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow disabled:opacity-60"
            >
              Send
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 text-xs rounded shadow">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}