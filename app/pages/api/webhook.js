export default function handler(req, res) {
    if (req.method === "GET") {
      // Verification challenge from Instagram
      const VERIFY_TOKEN = "IGAAJJ90O2ZCIRBZAE1jSUw1X0ZAxc19ZAbGliZAjU2LWNleTdhLTJPcXE3anZASVTZAhTWxYaGhQb1ZAEUU5uMHNybnc5UEJsaGRiS1hKdHdONWNabGlTNDFGMERISXdMN1A3VEY0dVJuRE95bWs0UVF3cDVLRE9yT3hJQ0hHZAm9IaVlkZAwZDZD";
      const { "hub.mode": mode, "hub.verify_token": token, "hub.challenge": challenge } = req.query;
  
      if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verified successfully!");
        return res.status(200).send(challenge);
      } else {
        return res.status(403).json({ error: "Verification failed" });
      }
    }
  
    if (req.method === "POST") {
      // Handle incoming Instagram webhook events
      console.log("Received Instagram Webhook:", req.body);
      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  