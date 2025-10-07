import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const TermsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', href: '/terms' }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | CompareTheLeaf</title>
        <meta name="description" content="Terms of Service for CompareTheLeaf - UK's leading medical cannabis clinic comparison platform. Read our terms and conditions for using our services." />
        <meta name="keywords" content="terms of service, terms and conditions, medical cannabis, UK, legal, CompareTheLeaf" />
        <link rel="canonical" href="https://comparetheleaf.co.uk/terms" />
        <meta property="og:title" content="Terms of Service | CompareTheLeaf" />
        <meta property="og:description" content="Terms of Service for CompareTheLeaf - UK's leading medical cannabis clinic comparison platform." />
        <meta property="og:url" content="https://comparetheleaf.co.uk/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | CompareTheLeaf" />
        <meta name="twitter:description" content="Terms of Service for CompareTheLeaf - UK's leading medical cannabis clinic comparison platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to CompareTheLeaf ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services located at comparetheleaf.co.uk (the "Service") operated by CompareTheLeaf.
                </p>
                <p className="text-gray-700 mb-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Service</h2>
                <p className="text-gray-700 mb-4">
                  CompareTheLeaf provides information and comparison services for medical cannabis clinics in the UK. Our service is intended for informational purposes only and should not be considered as medical advice.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>You must be 18 years or older to use this service</li>
                  <li>You agree to provide accurate information when using our services</li>
                  <li>You will not use the service for any unlawful purposes</li>
                  <li>You will not attempt to interfere with the proper functioning of the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Medical Disclaimer</h2>
                <p className="text-gray-700 mb-4">
                  The information provided on CompareTheLeaf is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of CompareTheLeaf and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall CompareTheLeaf, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-700">
                  Email: info@comparetheleaf.co.uk<br />
                  Website: comparetheleaf.co.uk
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
