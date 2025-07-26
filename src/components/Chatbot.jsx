import { useState, useRef, useEffect } from "react";
import { Trash2, X, Mic } from "lucide-react";

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = { from: "user", text: input, time: timestamp };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const botMsg = {
        from: "bot",
        text: data.answer || "Hmm... no response.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setError("Assistant is offline or unreachable.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
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

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          className="fixed bottom-24 right-6 z-50 bg-white text-blue-600 border border-blue-600 px-4 py-2 pr-5 rounded-full shadow-md text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg"
        >
          {/* Animated Chat Icon */}
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-60 animate-ping"></div>
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 13.586V4a2 2 0 00-2-2H4a2 2 0 00-2 2v9a2 2 0 002 2h10l4 4-.001-3.414z" />
              </svg>
            </div>
          </div>
          Chat with AI Assistant
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-28 right-8 w-[22rem] sm:w-96 h-[30rem] rounded-2xl flex flex-col overflow-hidden z-50 bg-white shadow-2xl transition-all duration-300"
          role="dialog"
          aria-label="Chat with AI Assistant"
        >
          <div className="flex justify-between items-center bg-blue-600 text-white px-5 py-3 font-semibold text-sm shadow">
            Mihir Kudale’s AI Assistant
            <div className="flex gap-2">
              <button onClick={clearChat} title="Clear chat">
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-3 bg-white space-y-3 text-sm"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col items-start max-w-[80%]">
                  {msg.from === "bot" && (
                    <div className="mb-1">
                      <img
                        src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Mihir"
                        alt="bot"
                        className="w-5 h-5 rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 border border-blue-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 self-end">{msg.time}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl border border-blue-100 text-gray-500 max-w-[60%] bg-white">
                  <div className="flex space-x-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t bg-white px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              aria-label="Chat input"
              className="flex-1 px-3 py-2 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={toggleMic}
              title="Speak"
              className={`p-2 rounded-full shadow border ${
                listening ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
              } transition`}
            >
              <Mic className={`w-4 h-4 ${listening ? "text-blue-600" : "text-gray-500"}`} />
            </button>
            <button
              onClick={sendMessage}
              disabled={loading}
              aria-label="Send message"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
            >
              Send
            </button>
          </div>

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