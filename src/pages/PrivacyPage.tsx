import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | CompareTheLeaf</title>
        <meta name="description" content="Privacy Policy for CompareTheLeaf - Learn how we collect, use, and protect your personal information when using our medical cannabis clinic comparison service." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, medical cannabis, UK, CompareTheLeaf" />
        <link rel="canonical" href="https://comparetheleaf.co.uk/privacy" />
        <meta property="og:title" content="Privacy Policy | CompareTheLeaf" />
        <meta property="og:description" content="Privacy Policy for CompareTheLeaf - Learn how we protect your personal information." />
        <meta property="og:url" content="https://comparetheleaf.co.uk/privacy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | CompareTheLeaf" />
        <meta name="twitter:description" content="Privacy Policy for CompareTheLeaf - Learn how we protect your personal information." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  CompareTheLeaf ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website comparetheleaf.co.uk and use our services.
                </p>
                <p className="text-gray-700 mb-4">
                  This policy complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Use our clinic comparison tools</li>
                  <li>Contact us for support or inquiries</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or feedback forms</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Provide and improve our clinic comparison services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you relevant information about medical cannabis clinics</li>
                  <li>Analyze website usage to improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
                <p className="text-gray-700 mb-4">
                  Under UK GDPR, we process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Consent:</strong> When you have given clear consent for us to process your data</li>
                  <li><strong>Legitimate Interest:</strong> When processing is necessary for our legitimate business interests</li>
                  <li><strong>Legal Obligation:</strong> When we need to comply with legal requirements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>With medical cannabis clinics when you request information or appointments</li>
                  <li>With service providers who assist us in operating our website</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  Under UK GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                  <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Our website uses cookies to enhance your browsing experience. For detailed information about our cookie usage, please see our Cookie Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
                </p>
                <p className="text-gray-700">
                  Email: privacy@comparetheleaf.co.uk<br />
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

export default PrivacyPage;
