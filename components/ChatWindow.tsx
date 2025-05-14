"use client";
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: any;
  senderName: string;
}


  
export interface ChatWindowProps {

  channelId: string;

  userId: string;

  expertId: string;

  onClose: () => void;

}

  

export function ChatWindow({ expertId, userId, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for messages
  useEffect(() => {
    const chatId = `chat-${userId}-${expertId}`;
    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(
      messagesRef,
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(newMessages);
    }, (error) => {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    });

    return () => unsubscribe();
  }, [expertId, userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const chatId = `chat-${userId}-${expertId}`;
      await addDoc(collection(db, 'messages'), {
        chatId,
        content: newMessage.trim(),
        senderId: userId,
        timestamp: serverTimestamp(),
        senderName: 'User', // You might want to fetch the actual user name
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-96 h-[500px] fixed bottom-4 right-4 flex flex-col shadow-lg">
      <div className="p-4 border-b bg-blue-50 flex justify-between items-center">
        <h3 className="font-semibold">Chat</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-blue-100 rounded-full h-8 w-8 p-0"
        >
          ×
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.senderId === userId
                    ? 'bg-blue-500 text-black'
                    : 'bg-gray-100'
                } break-words`}
              >
                <div className="text-xs opacity-75 mb-1">
                  {message.senderName}
                </div>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          onClick={sendMessage} 
          disabled={isLoading || !newMessage.trim()}
          className="min-w-[60px]"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            'Send'
          )}
        </Button>
      </div>
    </Card>
  );
}