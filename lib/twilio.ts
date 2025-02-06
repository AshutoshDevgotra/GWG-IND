import { Client } from 'twilio-chat';

export const initializeTwilioClient = async (token: string) => {
  try {
    const client = await Client.create(token);
    return client;
  } catch (error) {
    console.error('Error initializing Twilio client:', error);
    throw error;
  }
};

export const createOrJoinChannel = async (client: any, channelName: string) => {
  try {
    let channel = await client.getChannelByUniqueName(channelName);
    if (!channel) {
      channel = await client.createChannel({
        uniqueName: channelName,
        friendlyName: `Chat with ${channelName}`,
      });
    }
    await channel.join();
    return channel;
  } catch (error) {
    console.error('Error creating/joining channel:', error);
    throw error;
  }
};