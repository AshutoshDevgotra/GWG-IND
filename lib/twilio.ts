import { connect } from 'twilio-video';

export const connectToRoom = async (token: string, roomName: string) => {
  try {
    const room = await connect(token, {
      name: roomName,
      audio: true,
      video: true,
      dominantSpeaker: true,
      networkQuality: { local: 1, remote: 1 },
    });
    return room;
  } catch (error) {
    console.error('Error connecting to Twilio room:', error);
    throw error;
  }
};

export const disconnectFromRoom = (room: any) => {
  if (room) {
    room.disconnect();
  }
};

export const toggleAudioTrack = (room: any, enabled: boolean) => {
  if (room && room.localParticipant) {
    room.localParticipant.audioTracks.forEach((publication: any) => {
      if (publication.track) {
        publication.track.enable(enabled);
      }
    });
  }
};

export const toggleVideoTrack = (room: any, enabled: boolean) => {
  if (room && room.localParticipant) {
    room.localParticipant.videoTracks.forEach((publication: any) => {
      if (publication.track) {
        publication.track.enable(enabled);
      }
    });
  }
};