import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
}

const Chat = ({ expertId, userId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const chatRef = collection(db, 'chats');
    const q = query(chatRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [expertId, userId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'chats'), {
      text: newMessage,
      senderId: userId,
      receiverId: expertId,
      timestamp: new Date()
    });

    setNewMessage('');
  };

  return (
    <div className="border p-4 rounded-lg">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.senderId === userId ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;