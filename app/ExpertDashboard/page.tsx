"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VideoRoom = lazy(() => import("@/components/video-room"));

interface Notification {
  id: string;
  message: string;
  expertId: string;
  [key: string]: any;
}

interface VideoCallRequest {
  id: string;
  clientName: string;
  expertId: string;
  [key: string]: any;
}

interface Booking {
  id: string;
  clientName: string;
  date: string;
  expertId: string;
  [key: string]: any;
}

const ExpertDashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [videoCallRequests, setVideoCallRequests] = useState<VideoCallRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);

  // Enable Firestore caching
  useEffect(() => {
    enableIndexedDbPersistence(db).catch((err) =>
      console.error("Firestore caching error:", err)
    );
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchData = async () => {
      try {
        const notificationsQuery = query(
          collection(db, "notifications"),
          where("expertId", "==", user.uid),
          limit(10)
        );
        const videoCallRequestsQuery = query(
          collection(db, "videoCallRequests"),
          where("expertId", "==", user.uid),
          limit(5)
        );
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("expertId", "==", user.uid),
          limit(10)
        );

        const [notificationsSnapshot, videoCallRequestsSnapshot, bookingsSnapshot] =
          await Promise.all([
            getDocs(notificationsQuery),
            getDocs(videoCallRequestsQuery),
            getDocs(bookingsQuery),
          ]);

        setNotifications(
          notificationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notification))
        );
        setVideoCallRequests(
          videoCallRequestsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as VideoCallRequest))
        );
        setBookings(
          bookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Booking))
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Expert Dashboard</h1>

      {/* Notifications */}
      <Card className="mb-6 shadow-lg border">
        <CardHeader>
          <CardTitle>🔔 Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="bg-gray-100 p-3 rounded-lg shadow-md">
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Video Call Requests & Bookings in Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Call Requests */}
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle>📞 Video Call Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {videoCallRequests.length === 0 ? (
              <p className="text-gray-500">No new video call requests.</p>
            ) : (
              <ul className="space-y-2">
                {videoCallRequests.map((request) => (
                  <li
                    key={request.id}
                    className="bg-blue-100 p-3 rounded-lg flex justify-between items-center"
                  >
                    <span>{request.clientName} requested a call</span>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => setIsVideoCallModalOpen(true)}
                    >
                      Join Call
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle>📅 Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No upcoming bookings.</p>
            ) : (
              <ul className="space-y-2">
                {bookings.map((booking) => (
                  <li key={booking.id} className="bg-green-100 p-3 rounded-lg shadow-md">
                    {booking.clientName} - {booking.date}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Video Call Modal */}
      <Suspense fallback={<LoadingSpinner />}>
        {isVideoCallModalOpen && <VideoRoom expertId={""} />}
      </Suspense>
    </div>
  );
};

export default ExpertDashboard;
