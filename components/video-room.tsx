"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { toast } from 'sonner';


interface VideoRoomProps {

  expertId: string;

  userId?: string;

}


export function VideoRoom({ expertId }: VideoRoomProps) {
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        setLoading(false);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera and microphone');
        setLoading(false);
      }
    };

    initializeMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioEnabled;
        setAudioEnabled(!audioEnabled);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoEnabled;
        setVideoEnabled(!videoEnabled);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Connecting to video call...</span>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 bg-black/50 text-white rounded text-sm">
              You
            </span>
          </div>
        </div>
        <div className="relative bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-white text-center">
            <p className="mb-2">Waiting for expert to join...</p>
            <p className="text-sm text-gray-400">Expert ID: {expertId}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          variant={audioEnabled ? "default" : "destructive"}
          size="icon"
          onClick={toggleAudio}
        >
          {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </Button>
        <Button
          variant={videoEnabled ? "default" : "destructive"}
          size="icon"
          onClick={toggleVideo}
        >
          {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
export default VideoRoom;