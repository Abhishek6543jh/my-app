// Chat.js

import { addDoc, collection, getDocs, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../config/firebase";

function generateChatId(bookId) {
  return `book_${bookId}`;
}

function Chat() {
  const { bookId } = useParams(); // Assuming you're passing book id directly in the route
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchBookChat = async () => {
      try {
        const q = query(
          collection(db, 'book-chats', generateChatId(bookId), 'messages'),
          orderBy('timestamp')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setMessages(data);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching book chat:', error.message);
      }
    };

    fetchBookChat();
  }, [bookId]);

  const handleSendMessage = async () => {
    const chatId = generateChatId(bookId);

    try {
      const docRef = await addDoc(collection(db, 'book-chats', chatId, 'messages'), {
        text: newMessage,
        sender: auth.currentUser.email,
        timestamp: serverTimestamp(),
      });
      console.log("Message sent with ID: ", docRef.id);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error.message);
    }
  };

  return (
    <div className="bg-white-900 text-black p-8">
      <h1 className="text-5xl font-bold mb-4">Book Chat</h1>

      <div className="max-h-80 overflow-y-auto border p-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`text-${message.sender === auth.currentUser.email ? 'right' : 'left'}`}>
            <p>{message.text}</p>
          </div>
        ))}
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
