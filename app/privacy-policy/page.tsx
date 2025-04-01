import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Privacy Policy | Growwithgarry</title>
        <meta name="description" content="Privacy Policy of Growwithgarry" />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: 1st April,2025</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Growwithgarry. Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">2. Information We Collect</h2>
      <p className="mb-2 font-semibold">Personal Data:</p>
      <p className="mb-4">We may collect personal information such as your name, email address, phone number, and payment details when you register or make a purchase.</p>
      <p className="mb-2 font-semibold">Non-Personal Data:</p>
      <p className="mb-4">We may collect non-personal data such as browser type, IP address, and pages visited to improve user experience.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our services</li>
        <li>To process transactions securely</li>
        <li>To communicate with you about updates, offers, or customer support</li>
        <li>To improve our website and services</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">4. Data Protection & Security</h2>
      <p className="mb-4">We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">We may use third-party services such as payment gateways, analytics providers, or marketing platforms. These services have their own privacy policies, and we encourage you to review them.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">6. Cookies & Tracking Technologies</h2>
      <p className="mb-4">We use cookies to enhance your browsing experience. You can manage your cookie preferences in your browser settings.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">7. Your Rights</h2>
      <p className="mb-4">You have the right to access, modify, or delete your personal data. If you wish to exercise these rights, please contact us.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">8. Changes to This Privacy Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">9. Contact Us</h2>
      <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us at: <strong>support@growwithgarry.in</strong></p>
    </div>
  );
};

export default PrivacyPolicy;
