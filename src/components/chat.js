// Chat.js

import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../config/firebase";

function generateChatId(bookId) {
  return `book_${bookId}`;
}

function Chat() {
  const { bookId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = auth.currentUser;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchBookChat = async () => {
      try {
        const q = query(
          collection(db, "book-chats", generateChatId(bookId), "messages"),
          orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setMessages(data);
          scrollToBottom();
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching book chat:", error.message);
      }
    };

    fetchBookChat();
  }, [bookId]);

  const handleSendMessage = async () => {
    const chatId = generateChatId(bookId);

    try {
      await addDoc(collection(db, "book-chats", chatId, "messages"), {
        text: newMessage,
        sender: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          pic: currentUser.photoURL,
        },
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error.message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-200 text-black p-8 min-h-screen">
      <h1 className="text-5xl font-bold mb-4">Chat</h1>

      <div className="max-h-80 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender.uid === currentUser.uid ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                message.sender.uid !== currentUser.uid ? "bg-white" : "bg-blue-400"
              } p-3 rounded-lg`}
            >
              {message.sender.uid !== currentUser.uid && (
                <div className="flex items-center mb-2">
                  <img
                    src={message.sender.pic}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-900">{message.sender.name}</span>
                </div>
              )}
              <p className={message.sender.uid !== currentUser.uid ? "text-black" : "text-white"}>
                {message.text}
              </p>
              <p className="text-xs text-gray-800 mt-1">{new Date(message.timestamp?.seconds * 1000).toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
