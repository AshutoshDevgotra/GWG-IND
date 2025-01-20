import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export default function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKey = process.env.TWILIO_API_KEY;
  const apiSecret = process.env.TWILIO_API_SECRET;
  const appSid = process.env.TWILIO_TWIML_APP_SID;

  const identity = 'user_' + Math.random().toString(36).substring(7);

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: appSid,
  });

  const token = new AccessToken(accountSid, apiKey, apiSecret);
  token.addGrant(voiceGrant);
  token.identity = identity;

  res.json({ token: token.toJwt(), identity });
}
