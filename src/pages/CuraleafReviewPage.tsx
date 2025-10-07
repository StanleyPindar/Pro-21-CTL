import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, ExternalLink, CheckCircle, AlertTriangle, Award, Shield, Calendar, Clock, CreditCard, Users, Target } from 'lucide-react';
import StarRating from '../components/common/StarRating';
import Breadcrumbs from '../components/Breadcrumbs';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import { generateClinicMetaDescription } from '../utils/metaDescriptionGenerator';
import MetaTags from '../components/MetaTags';

const CuraleafReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const clinicData = {
    name: 'Curaleaf',
    rating: 4.5,
    reviewCount: 1850,
    consultationFee: 0,
    annualFee: 100,
    website: 'https://curaleafclinic.com',
    phone: '0203 488 4200',
    email: 'info@curaleafclinic.com',
    location: 'UK Wide (Online & In-Person)',
    established: 2019,
    cqcRegistered: true
  };

  // Prepare clinicData for generateClinicMetaDescription
  const curaleafClinicDataForMeta = {
    name: clinicData.name,
    rating: clinicData.rating,
    reviewCount: clinicData.reviewCount,
    consultationFee: clinicData.consultationFee,
    annual_cost_first_year: clinicData.annualFee,
    location: clinicData.location,
  };

  const pricingData = [
    { type: 'Initial consultation', amount: 'Free', notes: 'No charge for first appointment' },
    { type: 'Annual subscription', amount: '£100', notes: 'Covers all follow-ups for 12 months' },
    { type: 'Follow-up consultations', amount: 'Included', notes: 'Unlimited within annual fee' },
    { type: 'Repeat prescriptions', amount: 'Included', notes: 'No additional charges' },
    { type: 'Delivery', amount: 'From £4.99', notes: 'Standard tracked delivery' }
  ];

  const processSteps = [
    { step: 1, title: 'Free eligibility assessment', description: 'Complete online questionnaire to check if you qualify for medical cannabis treatment' },
    { step: 2, title: 'Medical records upload', description: 'Securely upload your medical history and previous treatment records' },
    { step: 3, title: 'Free initial consultation', description: '30-minute video consultation with GMC-registered specialist doctor' },
    { step: 4, title: 'Treatment plan development', description: 'Personalized treatment plan with specific product recommendations if appropriate' },
    { step: 5, title: 'Annual subscription activation', description: 'Pay £100 annual fee for unlimited follow-ups and prescription management' },
    { step: 6, title: 'Prescription fulfillment', description: 'Medication dispensed through integrated Curaleaf Pharmacy network' },
    { step: 7, title: 'Ongoing monitoring', description: 'Unlimited follow-up consultations included in annual subscription' },
    { step: 8, title: 'Continuous support', description: 'Patient support team available for questions and guidance throughout treatment' }
  ];

  const prosAndCons = {
    strengths: [
      'Free initial consultation removes financial barriers to access',
      'Low £100 annual fee covers unlimited follow-ups and prescriptions',
      'Integrated Curaleaf Pharmacy ensures reliable medication supply',
      'Established network with strong brand recognition and trust',
      'Flexible service model accommodating different patient needs',
      'Project Twenty21 research participation enhances evidence base'
    ],
    limitations: [
      'Annual fee model may not suit patients preferring pay-per-consultation',
      'Less emphasis on highly specialized sub-condition expertise',
      'Mainstream approach may feel less personalized than boutique clinics',
      'Limited availability of some niche or specialty cannabis products',
      'May not offer the same level of concierge service as premium providers'
    ]
  };

  const uniqueFeatures = [
    {
      title: 'Free Initial Consultation',
      description: 'No upfront cost barrier - first consultation is completely free'
    },
    {
      title: 'Low Annual Subscription',
      description: 'Just £100 per year covers all follow-ups and prescription management'
    },
    {
      title: 'Integrated Pharmacy Network',
      description: 'Curaleaf Pharmacy provides reliable medication supply and delivery'
    },
    {
      title: 'Research Participation',
      description: 'Contributing to Project Twenty21 and other important cannabis research'
    }
  ];

  const handleBookConsultation = () => {
    window.open(clinicData.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {slug && ( // Only render MetaTags if slug is available
        <MetaTags
          title="Curaleaf Review - UK's Most Accessible Medical Cannabis Clinic"
          description={generateClinicMetaDescription(curaleafClinicDataForMeta)}
          keywords={['Curaleaf', 'medical cannabis clinic', 'UK cannabis clinic review', 'free consultation', 'accessible medical cannabis']}
          type="Article"
          reviewData={{
            rating: 4.5,
            reviewCount: 1850,
            bestRating: 5,
            worstRating: 1
          }}
          canonicalUrl={`https://comparetheleaf.co.uk/reviews/${slug}`}
        />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Reviews', path: '/reviews' },
          { label: 'Curaleaf Review', path: '/reviews/curaleaf-review' }
        ]}
      />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/reviews')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviews
          </button>
        </div>
      </div>

      {/* Clinic Header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Clinic Image */}
            <div className="lg:col-span-1">
              <div className="h-64 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">C</div>
                    <div className="text-lg opacity-90">Most Accessible Cannabis Clinic</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{clinicData.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">UK's Most Accessible Medical Cannabis Clinic</p>
                  
                  <div className="flex items-center mb-2">
                    <StarRating value={Math.round(clinicData.rating)} size={20} />
                    <span className="text-lg font-semibold ml-2">{clinicData.rating}</span>
                    <span className="text-gray-600 ml-2">({clinicData.reviewCount}+ reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{clinicData.location}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700 font-medium">CQC Registered</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600 mb-1">
                    FREE
                  </div>
                  <div className="text-sm text-gray-500">Initial consultation</div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">
                    £{clinicData.annualFee}/year
                  </div>
                  <div className="text-sm text-gray-500">Annual subscription</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${clinicData.phone}`}
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a
                  href={`mailto:${clinicData.email}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
                <a
                  href={clinicData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Introduction and Overview */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction and Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Curaleaf has positioned itself as the UK's most accessible medical cannabis clinic by removing the primary barrier to treatment: cost. With a completely free initial consultation and a low £100 annual subscription that covers all follow-ups and prescription management, Curaleaf makes medical cannabis treatment available to patients who might otherwise be priced out of care.
              </p>
              <p className="mb-4">
                Operating under the established Sapphire Medical Clinics framework, Curaleaf combines accessibility with clinical credibility. The clinic serves patients across the UK through both online consultations and physical clinic locations, offering flexibility that suits different patient preferences and needs.
              </p>
              <p className="mb-4">
                As a contributor to Project Twenty21 - the UK's largest medical cannabis research initiative - Curaleaf not only provides treatment but also helps build the evidence base for medical cannabis effectiveness. This dual focus on accessibility and research makes it a compelling option for patients seeking both affordable care and participation in advancing medical cannabis understanding.
              </p>
              <p className="mb-4">
                This Curaleaf Review examines the clinic's unique free consultation model, annual subscription approach, patient experience, and overall value proposition to help you determine if their accessible care model aligns with your treatment needs and budget considerations.
              </p>
            </div>
          </div>

          {/* Services and Specialisations */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services and Specialisations</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Curaleaf operates through a network of GMC-registered specialists covering pain medicine, neurology, psychiatry, and general practice. The clinic treats a comprehensive range of conditions including chronic pain, cancer support, neurological conditions, and mental health disorders.
              </p>
              <p className="mb-4">
                The free initial consultation removes financial barriers, allowing patients to explore medical cannabis treatment without upfront costs. During this 30-minute assessment, specialists review medical history, discuss treatment goals, and determine eligibility for medical cannabis therapy.
              </p>
              <p className="mb-4">
                The annual subscription model at £100 provides unlimited follow-up consultations, prescription renewals, and ongoing support throughout the year. This predictable pricing structure helps patients budget for their treatment while ensuring continuous access to specialist care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Unique Programme Elements</h3>
                <ul className="space-y-3">
                  {uniqueFeatures.map((feature, index) => (
                    <li key={index}>
                      <div className="font-medium text-blue-800">{feature.title}</div>
                      <div className="text-sm text-blue-700">{feature.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Core Specialisations</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Chronic pain management</li>
                  <li>• Cancer support and palliative care</li>
                  <li>• Neurological conditions</li>
                  <li>• Mental health and PTSD</li>
                  <li>• Sleep disorders and insomnia</li>
                  <li>• Epilepsy and seizure disorders</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing and Cost Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing and Cost Analysis</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{item.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>First-year total: £100</strong> (after free consultation)<br/>
                <strong>Ongoing annual cost: £100</strong>
              </p>
              <p className="mb-4">
                This represents exceptional value in the UK medical cannabis market. The free initial consultation removes the typical £150-£300 barrier to entry, while the £100 annual fee is significantly lower than most competitors' consultation costs alone.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold text-blue-800 mb-3">Comparative annual consultation costs:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• <strong>Curaleaf – £100</strong></li>
                  <li>• Alternaleaf – £120</li>
                  <li>• CB1 Medical – £120</li>
                  <li>• Mamedica – £150</li>
                  <li>• Releaf (Releaf+) – £579.87</li>
                </ul>
              </div>
              
              <p className="mb-4">
                Medication costs are separate and competitive with market rates. The integrated Curaleaf Pharmacy network ensures reliable supply and competitive pricing on a wide range of cannabis-based medicines.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <div className="flex items-center mb-3">
                <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-800">Exceptional Accessibility</h3>
              </div>
              <p className="text-green-700">
                Free initial consultation and £100 annual fee make Curaleaf the most accessible medical cannabis clinic in the UK, removing financial barriers to treatment.
              </p>
            </div>
          </div>

          {/* Patient Experience and Process */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Experience and Process</h2>
            
            <div className="space-y-6 mb-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                The patient journey is designed for simplicity and accessibility. The free consultation allows patients to explore treatment options without financial commitment, while the annual subscription provides predictable costs and unlimited access to specialist care.
              </p>
              <p className="mb-4">
                Patient feedback consistently highlights the value proposition and accessibility of the service. The combination of free initial access and low ongoing costs makes Curaleaf particularly attractive to patients who have been deterred by high consultation fees elsewhere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-800">Free consultation</div>
                <div className="text-sm text-blue-600">No upfront costs or barriers</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-800">£100 annual fee</div>
                <div className="text-sm text-green-600">Covers all follow-ups for 12 months</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-purple-800">1,850+ patients</div>
                <div className="text-sm text-purple-600">Served through accessible model</div>
              </div>
            </div>
          </div>

          {/* Pros and Cons Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros and Cons Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Strengths */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700">Strengths</h3>
                </div>
                
                <ul className="space-y-3">
                  {prosAndCons.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-700">Limitations</h3>
                </div>
                
                <ul className="space-y-3">
                  {prosAndCons.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-2">Competitive Advantages</h4>
                <p className="text-blue-700 text-sm">
                  Free consultation and low annual fee make Curaleaf the most accessible option in the UK market, backed by established Sapphire Medical Clinics expertise and research contributions.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">Potential Drawbacks</h4>
                <p className="text-orange-700 text-sm">
                  Patients seeking highly specialized care for complex conditions or preferring pay-as-you-go models might find better fits with boutique clinics or flexible payment structures.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-2">Suitability Considerations</h4>
                <p className="text-green-700 text-sm">
                  <strong>Ideal for:</strong> patients seeking affordable, mainstream care with regular monitoring needs.<br/>
                  <strong>Less ideal for:</strong> those requiring highly specialized veteran support or boutique personalized care.
                </p>
              </div>
            </div>
          </div>

          {/* Pharmacy and Prescription Management */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pharmacy and Prescription Management</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Curaleaf operates through an integrated pharmacy network that ensures reliable medication supply and competitive pricing. The streamlined prescription process means patients can access their medication quickly and efficiently.
              </p>
              <p className="mb-4">
                Prescription renewals are included in the annual subscription, eliminating additional fees for ongoing medication management. The pharmacy network stocks a comprehensive range of cannabis-based medicines to meet diverse patient needs.
              </p>
              <p className="mb-4">
                Delivery options include standard tracked delivery from £4.99, with expedited options available for urgent needs. All medications are shipped in discreet, secure packaging with full tracking and signature requirements.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
              <div className="flex items-center mb-3">
                <Award className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-purple-800">Integrated Pharmacy Benefits</h3>
              </div>
              <ul className="space-y-2 text-purple-700">
                <li>• Reliable medication supply through established network</li>
                <li>• Competitive pricing on wide range of products</li>
                <li>• Streamlined prescription processing</li>
                <li>• Free prescription renewals with annual subscription</li>
                <li>• Tracked delivery with secure packaging</li>
              </ul>
            </div>
          </div>

          {/* Regulatory Compliance and Credentials */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Regulatory Compliance and Credentials</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Curaleaf operates under full CQC registration and employs only GMC-registered specialists. The clinic maintains strict compliance with all UK medical cannabis regulations and follows established clinical protocols.
              </p>
              <p className="mb-4">
                As part of the Sapphire Medical Clinics network, Curaleaf benefits from established regulatory frameworks and clinical governance structures. This ensures consistent, compliant care delivery across all patient interactions.
              </p>
              <p className="mb-4">
                The clinic's participation in Project Twenty21 demonstrates commitment to evidence-based practice and regulatory advancement. This research contribution helps build the clinical evidence base for medical cannabis effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Regulatory Credentials</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• CQC registered clinic</li>
                  <li>• GMC-registered specialists</li>
                  <li>• Full MHRA compliance</li>
                  <li>• Established clinical governance</li>
                  <li>• Project Twenty21 participant</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Quality Assurance</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Standardized clinical protocols</li>
                  <li>• Regular compliance audits</li>
                  <li>• Continuous professional development</li>
                  <li>• Patient safety monitoring</li>
                  <li>• Research-backed practices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final Verdict and Recommendations */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Verdict and Recommendations</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <StarRating value={Math.round(clinicData.rating)} size={24} />
                  <span className="text-2xl font-bold ml-3">{clinicData.rating}/5</span>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-green-600">Excellent Value</div>
                  <div className="text-sm text-gray-600">Most Accessible Option</div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-4">
                <strong>Curaleaf stands out as the UK's most accessible medical cannabis clinic</strong>, removing financial barriers through free consultations and low annual fees while maintaining clinical quality and regulatory compliance.
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Who Should Choose Curaleaf:</h3>
              <ul className="mb-6 space-y-2">
                <li><strong>Budget-conscious patients</strong> seeking quality care without high consultation fees</li>
                <li><strong>First-time medical cannabis patients</strong> wanting to explore treatment without upfront costs</li>
                <li><strong>Patients requiring regular monitoring</strong> who benefit from unlimited follow-ups</li>
                <li><strong>Those seeking mainstream, evidence-based care</strong> with research participation opportunities</li>
                <li><strong>Patients preferring predictable annual costs</strong> over pay-per-consultation models</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Consider Alternatives If:</h3>
              <ul className="mb-6 space-y-2">
                <li>You prefer highly specialized, boutique-style personalized care</li>
                <li>You need specific veteran support services or military-focused expertise</li>
                <li>You prefer pay-as-you-go consultation models over annual subscriptions</li>
                <li>You require access to very specialized or niche cannabis products</li>
                <li>You prioritize concierge-level service over accessibility and value</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">Bottom Line:</h4>
                <p className="text-blue-700">
                  Curaleaf has revolutionized medical cannabis accessibility in the UK by removing the primary barrier to treatment: cost. With free consultations and £100 annual subscriptions, they've made quality medical cannabis care available to patients who might otherwise be priced out of treatment. While they may not offer the boutique experience of premium clinics, their combination of accessibility, clinical quality, and research participation makes them an excellent choice for mainstream medical cannabis care.
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={handleBookConsultation}
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-lg"
                >
                  Book Free Consultation
                  <ExternalLink className="h-5 w-5 ml-2" />
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  No upfront costs • 30-minute specialist consultation • Same-day booking available
                </p>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default CuraleafReviewPage;