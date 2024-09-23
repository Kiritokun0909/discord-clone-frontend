import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to Discord. By using our services, you agree to these terms. Please read them carefully.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Discord, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
        <p className="mb-4">
          You agree to use Discord only for lawful purposes and in accordance with these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Content</h2>
        <p className="mb-4">
          You are solely responsible for the content you post, upload, or transmit through Discord.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Privacy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and disclose your personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your account and access to Discord at our sole discretion, without notice, for any reason.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
        <p className="mb-4">
          We may revise these Terms of Service at any time without notice. By using Discord, you agree to be bound by the current version of these Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
