import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const CookiesPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <>
      <Helmet>
        <title>Cookie Policy | CompareTheLeaf</title>
        <meta name="description" content="Cookie Policy for CompareTheLeaf - Learn about the cookies we use on our medical cannabis clinic comparison website and how to manage your preferences." />
        <meta name="keywords" content="cookie policy, cookies, tracking, medical cannabis, UK, CompareTheLeaf" />
        <link rel="canonical" href="https://comparetheleaf.co.uk/cookies" />
        <meta property="og:title" content="Cookie Policy | CompareTheLeaf" />
        <meta property="og:description" content="Cookie Policy for CompareTheLeaf - Learn about our cookie usage and preferences." />
        <meta property="og:url" content="https://comparetheleaf.co.uk/cookies" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Cookie Policy | CompareTheLeaf" />
        <meta name="twitter:description" content="Cookie Policy for CompareTheLeaf - Learn about our cookie usage and preferences." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p className="text-gray-700 mb-4">
                  CompareTheLeaf uses cookies to enhance your browsing experience and provide you with personalized content and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Session management cookies</li>
                  <li>Security cookies</li>
                  <li>Load balancing cookies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve how our website works.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Google Analytics cookies</li>
                  <li>Page load time tracking</li>
                  <li>Error reporting cookies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Functionality Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Language preference cookies</li>
                  <li>User interface customization</li>
                  <li>Form data retention</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Targeting Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Advertising network cookies</li>
                  <li>Social media integration cookies</li>
                  <li>Remarketing cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We may also use third-party services that set cookies on your device. These include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Ads:</strong> For advertising and remarketing purposes</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Your Cookie Preferences</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our cookie consent banner when you first visit our website.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookie Retention</h2>
                <p className="text-gray-700 mb-4">
                  Different cookies have different retention periods:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 1-24 months)</li>
                  <li><strong>Analytics Cookies:</strong> Usually retained for 24 months</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

export default CookiesPage;
