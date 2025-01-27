// app/api/send-email/route.ts OR app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email template for booking confirmation
const generateEmailHtml = (expertName: string, time: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; padding: 20px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Your Expert Consultation is Confirmed!</h2>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your consultation with <strong>${expertName}</strong> has been successfully scheduled for <strong>${time}</strong>.</p>
      <p>Session Details:</p>
      <ul>
        <li>Expert: ${expertName}</li>
        <li>Date & Time: ${time}</li>
        <li>Duration: 5 minutes</li>
      </ul>
      <p>Please be ready 5 minutes before the scheduled time. Your expert will join the call at the scheduled time.</p>
      <p>Looking forward to connecting you with your expert!</p>
    </div>
    <div class="footer">
      <p>© 2024 Your Platform Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { email, expertName, time } = await request.json();

    // Validate required fields
    if (!email || !expertName || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: `Consultation Confirmed with ${expertName}`,
      html: generateEmailHtml(expertName, time),
      text: `Your consultation with ${expertName} is confirmed for ${time}. Duration: 5 minutes. Please be ready 5 minutes before the scheduled time.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}