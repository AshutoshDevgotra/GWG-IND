"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoRoom } from "@/components/video-room";
import { CallNotification } from "@/components/CallNotification";
import { toast } from "sonner";
import { Bell, Phone, Video, MessageCircle } from "lucide-react";

interface Call {
  pricePerMinute: number;
  id: string;
  userId: string;
  type: 'voice' | 'video';
  status: string;
  userName: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  cost?: number;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: any;
  channelId: string;
}

interface Earning {
  id: string;
  amount: number;
  callId: string;
  timestamp: string;
}

export default function ExpertDashboard() {
  const [activeCalls, setActiveCalls] = useState<Call[]>([]);
  const [pendingCalls, setPendingCalls] = useState<Call[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please sign in to access expert dashboard');
      return;
    }

    // Update expert online status
    const expertRef = doc(db, 'experts', user.uid);
    updateDoc(expertRef, {
      isOnline: true,
      lastSeen: serverTimestamp()
    });

    // Listen for calls
    const callsQuery = query(
      collection(db, 'calls'),
      where('expertId', '==', user.uid)
    );

    const unsubscribeCalls = onSnapshot(callsQuery, (snapshot) => {
      const active: Call[] = [];
      const pending: Call[] = [];

      snapshot.docs.forEach((doc) => {
        const call = { id: doc.id, ...doc.data() } as Call;
        if (call.status === 'active') {
          active.push(call);
        } else if (call.status === 'pending') {
          pending.push(call);
        }
      });

      setActiveCalls(active);
      setPendingCalls(pending);
    });

    // Listen for unread messages
    const messagesQuery = query(
      collection(db, 'messages'),
      where('expertId', '==', user.uid),
      where('read', '==', false)
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      setUnreadMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
      );
    });

    // Fetch earnings
    const fetchEarnings = async () => {
      const earningsQuery = query(
        collection(db, 'earnings'),
        where('expertId', '==', user.uid)
      );
      const earningsSnapshot = await getDocs(earningsQuery);
      const earningsData = earningsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Earning)
      );
      setEarnings(earningsData);
      setTotalEarnings(
        earningsData.reduce((total, earning) => total + earning.amount, 0)
      );
    };

    fetchEarnings();

    // Cleanup
    return () => {
      unsubscribeCalls();
      unsubscribeMessages();
      updateDoc(expertRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
    };
  }, []);

  const handleAcceptCall = async (callId: string) => {
    try {
      const callRef = doc(db, 'calls', callId);
      await updateDoc(callRef, {
        status: 'active',
        startTime: serverTimestamp()
      });
      setActiveCallId(callId);
      toast.success('Call accepted');
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };

  const handleRejectCall = async (callId: string) => {
    try {
      const callRef = doc(db, 'calls', callId);
      await updateDoc(callRef, {
        status: 'rejected',
        endTime: serverTimestamp()
      });
      toast.success('Call rejected');
    } catch (error) {
      console.error('Error rejecting call:', error);
      toast.error('Failed to reject call');
    }
  };

  const handleEndCall = async (callId: string) => {
    try {
      const callRef = doc(db, 'calls', callId);
      const call = activeCalls.find(c => c.id === callId);
      
      if (call) {
        const startTime = new Date(call.startTime!).getTime();
        const endTime = new Date().getTime();
        const duration = Math.ceil((endTime - startTime) / (1000 * 60)); // Duration in minutes
        const cost = duration * call.pricePerMinute;

        await updateDoc(callRef, {
          status: 'completed',
          endTime: serverTimestamp(),
          duration,
          cost
        });

        // Add earnings
        await addDoc(collection(db, 'earnings'), {
          expertId: auth.currentUser!.uid,
          callId,
          amount: cost,
          timestamp: serverTimestamp()
        });

        setActiveCallId(null);
        toast.success('Call ended');
      }
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Failed to end call');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expert Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold">₹{totalEarnings}</p>
          </div>
          <Button
            variant={isOnline ? "default" : "outline"}
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Active Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeCalls.length === 0 ? (
              <p className="text-gray-500">No active calls</p>
            ) : (
              <ul className="space-y-4">
                {activeCalls.map((call) => (
                  <li key={call.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{call.userName}</p>
                      <p className="text-sm text-gray-500">{call.type} call</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleEndCall(call.id)}
                    >
                      End Call
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Pending Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Pending Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingCalls.length === 0 ? (
              <p className="text-gray-500">No pending calls</p>
            ) : (
              <ul className="space-y-4">
                {pendingCalls.map((call) => (
                  <li key={call.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{call.userName}</p>
                      <p className="text-sm text-gray-500">{call.type} call</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptCall(call.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRejectCall(call.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Unread Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unreadMessages.length === 0 ? (
              <p className="text-gray-500">No unread messages</p>
            ) : (
              <ul className="space-y-4">
                {unreadMessages.map((message) => (
                  <li key={message.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{message.content}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Mark as read
                        updateDoc(doc(db, 'messages', message.id), {
                          read: true
                        });
                      }}
                    >
                      Mark as Read
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          {earnings.length === 0 ? (
            <p className="text-gray-500">No earnings yet</p>
          ) : (
            <div className="space-y-4">
              {earnings.slice(0, 5).map((earning) => (
                <div key={earning.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">₹{earning.amount}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(earning.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">Call ID: {earning.callId}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Call Room */}
      {activeCallId && (
        <VideoRoom
          expertId={auth.currentUser?.uid || ''}
          callId={activeCallId}
          onEnd={() => handleEndCall(activeCallId)} onClose={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}

      {/* Incoming Call Notifications */}
      {pendingCalls.map((call) => (
        <CallNotification
          key={call.id}
          call={call}
          onAccept={() => handleAcceptCall(call.id)}
          onReject={() => handleRejectCall(call.id)}
        />
      ))}
    </div>
  );
}