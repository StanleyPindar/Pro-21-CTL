import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, CheckCircle, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';
import MetaTags from '../../components/MetaTags';
import Breadcrumbs from '../../components/Breadcrumbs';

const ChronicPainArticle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/MedicalWebPage">
      <MetaTags 
        title="Medical Cannabis for Chronic Pain - Comprehensive Guide"
        description="A comprehensive guide to understanding how medical cannabis can help manage various types of chronic pain, backed by clinical evidence and patient experiences."
        datePublished="2024-01-10"
        dateModified="2024-02-12"
        author="Dr. Michael Roberts"
        keywords={['chronic pain', 'pain management', 'medical cannabis', 'neuropathic pain', 'inflammatory pain', 'cannabis treatment']}
        canonicalUrl="https://comparetheleaf.co.uk/conditions/chronic-pain-article"
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Conditions', path: '/conditions' },
          { label: 'Chronic Pain', path: '/conditions/chronic-pain-article' }
        ]}
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/education/hub')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Education Hub
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Activity className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4" itemProp="headline">
              Medical Cannabis for Chronic Pain
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto" itemProp="description">
              A comprehensive guide to understanding how medical cannabis can help manage various 
              types of chronic pain, backed by clinical evidence and patient experiences.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500" itemProp="author" itemScope itemType="https://schema.org/Person">
              <div className="flex items-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span>By <span itemProp="name">Dr. Michael Roberts</span>, Pain Medicine Specialist</span>
              </div>
              <div className="flex items-center" itemProp="dateModified">
                <span>Updated February 12, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction to Chronic Pain</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
            </div>
          </div>

          {/* Types of Chronic Pain */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Chronic Pain</h2>
            <div className="space-y-6">
              <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
            </div>
          </div>

          {/* How Cannabis Works for Pain */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Cannabis Works for Pain</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
            </div>
          </div>

          {/* Research Evidence */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Evidence</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Key Clinical Findings</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    A 2020 systematic review found that medical cannabis significantly reduced chronic pain scores in 64% of patients studied.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Clinical trials show that cannabinoids can be particularly effective for neuropathic pain, with response rates of 30-40%.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Studies indicate that medical cannabis may reduce the need for opioid medications in chronic pain patients.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
            </div>
          </div>

          {/* Treatment Considerations */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment Considerations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Safety Considerations</h3>
                  <ul className="space-y-2 text-yellow-700">
                    <p>
                Chronic pain affects millions of people worldwide and is defined as pain that persists for more than 3-6 months, 
                often continuing beyond the expected healing time of an injury or illness. Unlike acute pain, which serves as a 
                protective mechanism, chronic pain can significantly impact quality of life, mental health, and daily functioning.
              </p>
              <p>
                Medical cannabis has emerged as a promising treatment option for various types of chronic pain, offering an 
                alternative to traditional pain medications. Research suggests that cannabinoids can help modulate pain signals 
                and provide relief for conditions that have been difficult to treat with conventional therapies.
              </p>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <MedicalDisclaimer />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Chronic Pain Specialists
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Compare clinics that specialize in treating chronic pain with medical cannabis and find the right 
              treatment approach for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/quiz')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Take our three-minute quiz
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </button>
              <button
                onClick={() => navigate('/clinics')}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Compare Pain Clinics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChronicPainArticle;