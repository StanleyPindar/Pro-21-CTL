import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/Breadcrumbs';
import MetaTags from '../components/MetaTags';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' }
  ];

  const faqData: FAQItem[] = [
    {
      category: "Getting Started",
      question: "What is CompareTheLeaf?",
      answer: "CompareTheLeaf is the UK's leading medical cannabis clinic comparison platform. We help patients find the right medical cannabis clinic by comparing services, prices, treatments, and patient reviews across all licensed clinics in the UK."
    },
    {
      category: "Getting Started",
      question: "How do I use CompareTheLeaf to find a clinic?",
      answer: "Simply use our clinic finder tool on the homepage. Answer a few questions about your condition, location preferences, and treatment needs. Our algorithm will match you with the most suitable clinics and provide detailed comparisons to help you make an informed decision."
    },
    {
      category: "Medical Cannabis",
      question: "Is medical cannabis legal in the UK?",
      answer: "Yes, medical cannabis has been legal in the UK since November 2018. However, it can only be prescribed by specialist doctors and is available through licensed medical cannabis clinics. All clinics listed on CompareTheLeaf are fully licensed and regulated."
    },
    {
      category: "Medical Cannabis",
      question: "What conditions can be treated with medical cannabis?",
      answer: "Medical cannabis can be prescribed for various conditions including chronic pain, epilepsy, multiple sclerosis, PTSD, anxiety, depression, and many others. Each clinic has different specialties and treatment approaches, which is why comparison is important."
    },
    {
      category: "Clinic Services",
      question: "How much does medical cannabis treatment cost?",
      answer: "Costs vary significantly between clinics. Initial consultations typically range from £49-£300, with follow-up appointments from £49-£150. Medication costs depend on the specific products prescribed. Use our comparison tool to see detailed pricing from different clinics."
    },
    {
      category: "Clinic Services",
      question: "What's the difference between clinics?",
      answer: "Clinics differ in their specialties, consultation fees, medication options, appointment availability, and treatment approaches. Some focus on specific conditions, others offer broader services. Our detailed clinic profiles help you understand these differences."
    },
    {
      category: "Treatment Process",
      question: "How long does it take to get an appointment?",
      answer: "Appointment availability varies by clinic. Some offer same-day consultations, while others may have waiting lists of several weeks. We display current availability and average waiting times for each clinic to help you choose."
    },
    {
      category: "Treatment Process",
      question: "Do I need a referral from my GP?",
      answer: "Most medical cannabis clinics do not require a GP referral, though some may request medical records. Each clinic has different requirements, which we clearly outline in their profiles on our platform."
    },
    {
      category: "Using Our Service",
      question: "Is CompareTheLeaf free to use?",
      answer: "Yes, CompareTheLeaf is completely free for patients. We don't charge any fees for using our comparison service, reading reviews, or getting matched with clinics. Our service is funded through partnerships with clinics."
    },
    {
      category: "Using Our Service",
      question: "How do you ensure review authenticity?",
      answer: "We have strict verification processes for all reviews. Only verified patients who have actually attended appointments can leave reviews. We also monitor for fake reviews and remove any that don't meet our authenticity standards."
    },
    {
      category: "Privacy & Security",
      question: "Is my personal information secure?",
      answer: "Yes, we take data protection very seriously. All personal information is encrypted and stored securely in compliance with UK GDPR regulations. We never share your personal details without your explicit consent."
    },
    {
      category: "Privacy & Security",
      question: "Will clinics contact me directly?",
      answer: "Only if you choose to share your contact details with them. When you request information from a clinic through our platform, you can decide whether to share your contact information. You're always in control of your privacy."
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Prepare FAQ data for MetaTags component
  const faqSchemaData = faqData.map(item => ({
    question: item.question,
    answer: item.answer,
    author: 'CompareTheLeaf Medical Team'
  }));

  return (
    <>
      <MetaTags
        title="Frequently Asked Questions"
        description="Get answers to common questions about medical cannabis clinics, treatments, costs, and using CompareTheLeaf's comparison service in the UK."
        keywords={[
          'medical cannabis FAQ',
          'UK cannabis clinics',
          'medical marijuana questions',
          'cannabis treatment',
          'CompareTheLeaf',
          'medical cannabis questions',
          'UK medical cannabis FAQ',
          'cannabis clinic questions'
        ]}
        canonicalUrl="https://comparetheleaf.co.uk/faq"
        type="FAQPage"
        faqData={faqSchemaData}
        datePublished="2024-01-15"
        dateModified={new Date().toISOString().split('T')[0]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto mt-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about medical cannabis clinics, treatments, and using CompareTheLeaf's services.
              </p>
            </div>

            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {category}
                </h2>
                
                <div className="space-y-4">
                  {faqData
                    .filter(item => item.category === category)
                    .map((item, index) => {
                      const globalIndex = faqData.indexOf(item);
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={globalIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                          <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                            onClick={() => toggleItem(globalIndex)}
                          >
                            <span className="text-lg font-medium text-gray-900 pr-4">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}

            <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-700 mb-6">
                Can't find the answer you're looking for? Our team is here to help you navigate your medical cannabis journey.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
