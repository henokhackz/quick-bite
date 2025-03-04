"use client";

import { useState } from "react";
import  Picker  from "@emoji-mart/react";
import * as data from "@emoji-mart/data";
import { Smile, Send } from "lucide-react";

export default function ChatInput({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="relative flex items-center border-t p-2 bg-white">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-2">
          <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
        </div>
      )}

      {/* Emoji Button */}
      <button className="p-2 text-gray-600 hover:text-gray-800" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <Smile size={24} />
      </button>

      {/* Input Field */}
      <input
        type="text"
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Send Button */}
      <button className="p-2 text-blue-600 hover:text-blue-800" onClick={sendMessage}>
        <Send size={24} />
      </button>
    </div>
  );
}
