import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Phone, Video } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface CallNotificationProps {
  call: {
    id: string;
    userId: string;
    type: 'voice' | 'video';
    userName: string;
  };
  onAccept: (callId: string) => void;
  onReject: (callId: string) => void;
}

export function CallNotification({ call, onAccept, onReject }: CallNotificationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'calls', call.id), {
        status: 'active',
        startTime: new Date().toISOString()
      });
      onAccept(call.id);
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'calls', call.id), {
        status: 'rejected'
      });
      onReject(call.id);
    } catch (error) {
      console.error('Error rejecting call:', error);
      toast.error('Failed to reject call');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incoming {call.type} Call</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {call.type === 'video' ? (
              <Video className="w-12 h-12 text-blue-500 animate-pulse" />
            ) : (
              <Phone className="w-12 h-12 text-blue-500 animate-pulse" />
            )}
          </div>
          <p className="text-center">
            {call.userName} is calling...
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="destructive"
              onClick={() => handleReject()}
              disabled={isLoading}
            >
              Reject
            </Button>
            <Button
              onClick={() => handleAccept()}
              disabled={isLoading}
            >
              Accept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}