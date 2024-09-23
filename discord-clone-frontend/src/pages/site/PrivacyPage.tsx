import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Discord, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Account information (e.g., username, email address)</li>
          <li>Communications on our platform</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Protection</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. Contact us for any privacy-related requests.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
