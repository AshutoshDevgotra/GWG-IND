"use client";
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, MessageSquare, PhoneCall, Calendar, Bell } from 'lucide-react';
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from "firebase/firestore";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: 'video' | 'chat' | 'call' | 'booking';
  status: 'pending' | 'accepted' | 'rejected';
  clientId: string;
  clientName: string;
  timestamp: string;
  message?: string;
  scheduledTime?: string;
}

interface Stats {
  totalSessions: number;
  totalEarnings: number;
  rating: number;
  completedBookings: number;
}

export default function ExpertDashboard() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    totalEarnings: 0,
    rating: 0,
    completedBookings: 0
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Subscribe to notifications
    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("expertId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      
      setNotifications(newNotifications);
      setLoading(false);
    });

    // Fetch expert stats
    const fetchStats = async () => {
      const statsRef = collection(db, "expertStats");
      const statsQuery = query(statsRef, where("expertId", "==", user.uid));
      const statsSnapshot = await getDocs(statsQuery);
      
      if (!statsSnapshot.empty) {
        setStats(statsSnapshot.docs[0].data() as Stats);
      }
    };

    fetchStats();
    return () => unsubscribe();
  }, []);

  const handleNotificationAction = async (notificationId: string, action: 'accept' | 'reject') => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        status: action === 'accept' ? 'accepted' : 'rejected',
        updatedAt: new Date().toISOString()
      });

      toast.success(`Request ${action}ed successfully`);
    } catch (error) {
      console.error('Error updating notification:', error);
      toast.error('Failed to process request');
    }
  };

  const renderNotification = (notification: Notification) => {
    const icons = {
      video: <VideoIcon className="w-4 h-4" />,
      chat: <MessageSquare className="w-4 h-4" />,
      call: <PhoneCall className="w-4 h-4" />,
      booking: <Calendar className="w-4 h-4" />
    };

    return (
      <Card key={notification.id} className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icons[notification.type]}
            <div>
              <p className="font-medium">{notification.clientName}</p>
              <p className="text-sm text-gray-500">
                {notification.type === 'booking' 
                  ? `Scheduled for ${new Date(notification.scheduledTime!).toLocaleString()}`
                  : `Requested ${new Date(notification.timestamp).toLocaleString()}`
                }
              </p>
            </div>
          </div>
          {notification.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleNotificationAction(notification.id, 'accept')}
                className="bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleNotificationAction(notification.id, 'reject')}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Decline
              </Button>
            </div>
          )}
          {notification.status !== 'pending' && (
            <Badge variant={notification.status === 'accepted' ? 'default' : 'destructive'}>
              {notification.status}
            </Badge>
          )}
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expert Dashboard</h1>
          <Badge variant={notifications.some(n => n.status === 'pending') ? 'default' : 'secondary'}>
            <Bell className="w-4 h-4 mr-2" />
            {notifications.filter(n => n.status === 'pending').length} New Requests
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
            <p className="text-2xl font-bold">{stats.totalSessions}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
            <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Rating</h3>
            <p className="text-2xl font-bold">{stats.rating.toFixed(1)}/5.0</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed Bookings</h3>
            <p className="text-2xl font-bold">{stats.completedBookings}</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                {notifications.slice(0, 5).map(renderNotification)}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
                {notifications
                  .filter(n => n.status === 'pending')
                  .map(renderNotification)}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
                {notifications
                  .filter(n => n.status === 'accepted' && n.type === 'booking')
                  .map(renderNotification)}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
                {/* Add earnings chart/details here */}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}