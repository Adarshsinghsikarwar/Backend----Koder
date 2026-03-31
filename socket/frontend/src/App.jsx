import { useState } from "react";
import Chat from "./chat";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      setJoined(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {!joined ? (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-gray-800">Chat Room</h1>
              <p className="text-gray-500 text-sm font-medium">
                Join the conversation
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:shadow-md text-gray-800 placeholder-gray-400 font-medium transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  placeholder="Enter room name"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:shadow-md text-gray-800 placeholder-gray-400 font-medium transition"
                />
              </div>
            </div>

            <button
              onClick={joinRoom}
              disabled={!username || !room}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Join Chat Room
            </button>

            <div className="text-center text-xs text-gray-500">
              💬 Real-time chat powered by WebSocket
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen">
          <Chat
            username={username}
            room={room}
            onLeave={() => setJoined(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
