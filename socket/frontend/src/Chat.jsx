import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";

function Chat({ username, room, onLeave }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // 🔹 Connect + Join Room
  useEffect(() => {
    socket.connect();
    setIsConnected(true);

    socket.emit("join-room", { username, room });

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [room, username]);

  // 🔹 Listen Messages
  useEffect(() => {
    const handleMessage = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  // 🔹 Send Message
  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("send-message", message);

    setChat((prev) => [...prev, { username, message, isOwn: true }]);

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const leaveRoom = () => {
    socket.emit("leave-room", { username, room });
    setChat([]);
    onLeave?.();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">💬 {room}</h1>
              <p className="text-xs text-gray-500 mt-1">
                You are logged in as{" "}
                <span className="font-semibold text-gray-700">{username}</span>
              </p>
            </div>
          </div>
          <button
            onClick={leaveRoom}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {chat.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center space-y-2">
              <div className="text-5xl">💭</div>
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.username === username ? "justify-end" : "justify-start"
              }`}
            >
              {msg.system ? (
                <div className="w-full text-center py-2">
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                    {msg.message}
                  </span>
                </div>
              ) : (
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    msg.username === username
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200"
                  } rounded-2xl px-4 py-3 space-y-1`}
                >
                  {msg.username !== username && (
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                      {msg.username}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed break-words">
                    {msg.message}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex gap-3 max-w-7xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... (Enter to send)"
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:shadow-md text-gray-800 placeholder-gray-400 font-medium transition"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold rounded-2xl transition transform hover:scale-105 active:scale-95 shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
