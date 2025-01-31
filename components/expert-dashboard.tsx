import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
}

const ExpertDashboard = ({ expertId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const chatRef = collection(db, 'chats');
    const q = query(chatRef, where('receiverId', '==', expertId), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [expertId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Chat Requests</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded-lg">
            <p className="text-gray-700">{msg.text}</p>
            <p className="text-sm text-gray-500">From: {msg.senderId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertDashboard;