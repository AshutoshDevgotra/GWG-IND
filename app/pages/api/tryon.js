// pages/api/tryon.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Kwai-Kolors/Kolors-Virtual-Try-On',
      req.body,
      {
        headers: {
          'Authorization': `process.env.HUGGINGFACE_API_KEY`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error interacting with Hugging Face API' });
  }
}
