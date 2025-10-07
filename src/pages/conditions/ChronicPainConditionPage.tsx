import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, InformationCircleIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../../components/Breadcrumbs';

const ChronicPainConditionPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Conditions', href: '/conditions' },
    { label: 'Chronic Pain', href: '/conditions/chronic-pain-article' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Medical Cannabis for Chronic Pain Treatment in the UK",
    "description": "Comprehensive guide to using medical cannabis for chronic pain management in the UK, including treatment options, clinic recommendations, and patient experiences.",
    "url": "https://comparetheleaf.co.uk/conditions/chronic-pain-article",
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": "Chronic Pain",
      "alternateName": ["Persistent Pain", "Long-term Pain"],
      "description": "Pain that persists for more than 12 weeks despite medication or treatment",
      "possibleTreatment": {
        "@type": "MedicalTherapy",
        "name": "Medical Cannabis Treatment",
        "description": "Cannabis-based medicines prescribed by specialist doctors for chronic pain management"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "CompareTheLeaf",
      "url": "https://comparetheleaf.co.uk"
    }
  };

  return (
    <>
      <Helmet>
        <title>Medical Cannabis for Chronic Pain Treatment | UK Guide | CompareTheLeaf</title>
        <meta name="description" content="Comprehensive guide to medical cannabis treatment for chronic pain in the UK. Learn about treatment options, clinic recommendations, costs, and patient experiences." />
        <meta name="keywords" content="medical cannabis chronic pain, UK chronic pain treatment, cannabis pain relief, medical marijuana chronic pain, pain management UK" />
        <link rel="canonical" href="https://comparetheleaf.co.uk/conditions/chronic-pain-article" />
        <meta property="og:title" content="Medical Cannabis for Chronic Pain Treatment | UK Guide" />
        <meta property="og:description" content="Comprehensive guide to medical cannabis treatment for chronic pain in the UK." />
        <meta property="og:url" content="https://comparetheleaf.co.uk/conditions/chronic-pain-article" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Medical Cannabis for Chronic Pain Treatment | UK Guide" />
        <meta name="twitter:description" content="Comprehensive guide to medical cannabis treatment for chronic pain in the UK." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto mt-6">
            <article className="bg-white rounded-lg shadow-sm p-8">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Medical Cannabis for Chronic Pain Treatment in the UK
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A comprehensive guide to understanding how medical cannabis can help manage chronic pain, 
                  including treatment options, clinic recommendations, and real patient experiences.
                </p>
                
                <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>12 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <InformationCircleIcon className="h-4 w-4" />
                    <span>Medically reviewed</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Chronic Pain</h2>
                  <p className="text-gray-700 mb-4">
                    Chronic pain affects millions of people in the UK, significantly impacting quality of life and daily functioning. 
                    Unlike acute pain, which serves as a warning signal for injury, chronic pain persists for months or years, 
                    often without a clear underlying cause.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex">
                      <InformationCircleIcon className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-blue-900 mb-2">Key Statistics</h3>
                        <ul className="text-blue-800 space-y-1">
                          <li>• Over 28 million adults in the UK live with chronic pain</li>
                          <li>• Chronic pain affects 43% of the UK population</li>
                          <li>• It's the leading cause of disability worldwide</li>
                          <li>• Traditional treatments fail for 20-30% of patients</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Medical Cannabis Helps Chronic Pain</h2>
                  <p className="text-gray-700 mb-4">
                    Medical cannabis works through the body's endocannabinoid system, which plays a crucial role in pain perception, 
                    inflammation, and mood regulation. The two main compounds in medical cannabis - THC and CBD - interact with 
                    cannabinoid receptors throughout the body to provide pain relief.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">THC (Tetrahydrocannabinol)</h3>
                      <ul className="text-green-800 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Reduces pain intensity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Improves sleep quality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Reduces muscle spasms</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">CBD (Cannabidiol)</h3>
                      <ul className="text-blue-800 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Anti-inflammatory effects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Reduces anxiety</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>No psychoactive effects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Chronic Pain Treated</h2>
                  <p className="text-gray-700 mb-4">
                    Medical cannabis has shown effectiveness in treating various types of chronic pain conditions:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Neuropathic Pain</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Fibromyalgia</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Arthritis</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Back Pain</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Migraine</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Cancer Pain</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Multiple Sclerosis</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Endometriosis</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Treatment Options and Delivery Methods</h2>
                  <p className="text-gray-700 mb-4">
                    Medical cannabis for chronic pain is available in several forms, each with different onset times and duration of effects:
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Oils and Tinctures</h3>
                      <p className="text-gray-700 text-sm mb-2">Onset: 30-90 minutes | Duration: 4-8 hours</p>
                      <p className="text-gray-600">Most common form, taken sublingually for precise dosing and consistent effects.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Vaporized Flower</h3>
                      <p className="text-gray-700 text-sm mb-2">Onset: 2-5 minutes | Duration: 2-4 hours</p>
                      <p className="text-gray-600">Fast-acting relief for breakthrough pain, allows for precise dose titration.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Capsules</h3>
                      <p className="text-gray-700 text-sm mb-2">Onset: 60-120 minutes | Duration: 6-10 hours</p>
                      <p className="text-gray-600">Long-lasting effects, ideal for consistent daily pain management.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started with Treatment</h2>
                  <p className="text-gray-700 mb-4">
                    To access medical cannabis for chronic pain in the UK, you'll need to consult with a specialist doctor 
                    at a licensed clinic. Here's what the process typically involves:
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Initial Assessment</h3>
                        <p className="text-gray-600">Comprehensive review of your medical history and current pain management strategies.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Treatment Plan</h3>
                        <p className="text-gray-600">Personalized cannabis treatment plan based on your specific condition and needs.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Prescription & Monitoring</h3>
                        <p className="text-gray-600">Regular follow-ups to monitor progress and adjust treatment as needed.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cost Considerations</h2>
                  <p className="text-gray-700 mb-4">
                    Medical cannabis treatment costs vary depending on the clinic and treatment plan:
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">Typical Costs (Monthly)</h3>
                    <ul className="text-yellow-800 space-y-2">
                      <li>• Initial consultation: £49-£300</li>
                      <li>• Follow-up appointments: £49-£150</li>
                      <li>• Cannabis oils: £150-£400</li>
                      <li>• Vaporized flower: £200-£500</li>
                      <li>• Total monthly cost: £300-£800</li>
                    </ul>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Explore Medical Cannabis for Chronic Pain?</h3>
                  <p className="text-gray-700 mb-6">
                    Compare UK medical cannabis clinics specializing in chronic pain treatment. Find the right clinic for your needs and budget.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/clinics"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Compare Clinics
                    </Link>
                    <Link
                      to="/quiz"
                      className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Take Assessment Quiz
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChronicPainConditionPage;
