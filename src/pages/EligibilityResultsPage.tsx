import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle, AlertCircle, Info, Clock, Phone, Video,
  MapPin, Star, TrendingUp, Award, ArrowRight, RotateCcw
} from 'lucide-react';
import MetaTags from '../components/MetaTags';
import StarRating from '../components/common/StarRating';
import { EligibilityScore, ClinicMatchScore, AssessmentResponses } from '../types/eligibility';
import { useClinicData } from '../context/ClinicDataProvider';

interface LocationState {
  eligibility: EligibilityScore;
  clinicMatches: ClinicMatchScore[];
  responses: AssessmentResponses;
}

const EligibilityResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clinics } = useClinicData();

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state || !state.eligibility) {
      navigate('/eligibility');
    }
  }, [state, navigate]);

  if (!state || !state.eligibility) {
    return null;
  }

  const { eligibility, clinicMatches, responses } = state;

  const getStatusConfig = () => {
    switch (eligibility.status) {
      case 'highly_likely':
        return {
          icon: CheckCircle,
          color: 'green',
          title: 'Highly Likely to Qualify',
          subtitle: 'Based on your responses, you meet the key criteria for medical cannabis treatment',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          iconColor: 'text-green-600'
        };
      case 'likely':
        return {
          icon: CheckCircle,
          color: 'blue',
          title: 'Likely to Qualify',
          subtitle: 'You appear to meet several eligibility criteria - worth discussing with a specialist',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          iconColor: 'text-blue-600'
        };
      case 'possible':
        return {
          icon: Info,
          color: 'yellow',
          title: 'Possibly Eligible',
          subtitle: 'You may qualify depending on your full medical history and specialist assessment',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
          iconColor: 'text-yellow-600'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'gray',
          title: 'More Information Needed',
          subtitle: 'Consider discussing with your doctor about conventional treatment options first',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          iconColor: 'text-gray-600'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const getClinicDetails = (match: ClinicMatchScore) => {
    return clinics.find(c => c.overview.id === match.clinicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <MetaTags
        title="Your Eligibility Assessment Results - Medical Cannabis UK"
        description="View your personalized medical cannabis eligibility assessment results and matched clinic recommendations."
        canonicalUrl="https://comparetheleaf.co.uk/eligibility/results"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Assessment Results
          </h1>
          <p className="text-lg text-gray-600">
            Based on your responses, here's what we found
          </p>
        </div>

        <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-2xl p-8 mb-8 shadow-xl`}>
          <div className="flex items-start space-x-4 mb-6">
            <div className={`${statusConfig.iconColor} bg-white p-3 rounded-full`}>
              <StatusIcon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${statusConfig.textColor} mb-2`}>
                {statusConfig.title}
              </h2>
              <p className={`text-lg ${statusConfig.textColor} opacity-90`}>
                {statusConfig.subtitle}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${statusConfig.iconColor}`}>
                {eligibility.confidence}%
              </div>
              <div className={`text-sm ${statusConfig.textColor} opacity-75`}>
                Confidence
              </div>
            </div>
          </div>

          <div className={`${statusConfig.textColor} space-y-3`}>
            <h3 className="font-semibold text-lg mb-3">Key Findings:</h3>
            <ul className="space-y-2">
              {eligibility.reasoning.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 opacity-75" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recommended Next Steps
          </h2>
          <div className="space-y-4">
            {eligibility.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </div>
                <p className="text-gray-900 flex-1">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {clinicMatches.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Your Matched Clinics
              </h2>
              <p className="text-lg text-gray-600">
                Based on your condition, preferences, and budget
              </p>
            </div>

            <div className="space-y-6">
              {clinicMatches.map((match, index) => {
                const clinic = getClinicDetails(match);
                if (!clinic) return null;

                return (
                  <div
                    key={match.clinicId}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {match.clinicName}
                            </h3>
                          </div>
                          {clinic.overview.tagline && (
                            <p className="text-gray-600 mb-3">{clinic.overview.tagline}</p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-3xl font-bold text-blue-600 mb-1">
                            {match.percentage}%
                          </div>
                          <div className="text-sm text-gray-500">Match</div>
                        </div>
                      </div>

                      {clinic.patientExperience && (
                        <div className="flex items-center space-x-4 mb-4">
                          <StarRating rating={clinic.patientExperience.overallRating} />
                          <span className="text-sm text-gray-600">
                            {clinic.patientExperience.totalReviews} reviews
                          </span>
                        </div>
                      )}

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-green-900 mb-2">Why This Clinic:</h4>
                        <ul className="space-y-1">
                          {match.reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start text-sm text-green-800">
                              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        {clinic.pricing?.initialConsultation?.price && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>£{clinic.pricing.initialConsultation.price} initial</span>
                          </div>
                        )}
                        {clinic.services?.consultationTypes && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            {clinic.services.consultationTypes.includes('video') ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <Phone className="w-4 h-4" />
                            )}
                            <span>{clinic.services.consultationTypes.join(', ')}</span>
                          </div>
                        )}
                        {clinic.patientExperience?.nextAvailableAppointment && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Award className="w-4 h-4" />
                            <span>{clinic.patientExperience.nextAvailableAppointment}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/clinics/${clinic.overview.slug || clinic.overview.id}`}
                          className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
                        >
                          View Full Profile
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        {clinic.overview.website && (
                          <a
                            href={clinic.overview.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                          >
                            Book Consultation
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Our assessment provides guidance, but only a specialist doctor can confirm your eligibility.
            Book a consultation with one of our matched clinics to discuss your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/clinics"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all"
            >
              View All Clinics
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <button
              onClick={() => navigate('/eligibility')}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Take Assessment Again
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Medical Disclaimer
          </h3>
          <p className="text-sm text-yellow-800">
            This assessment is for informational purposes only and does not constitute medical advice.
            Only a registered specialist doctor can assess your eligibility for medical cannabis treatment.
            Always consult with qualified healthcare professionals about your medical conditions and treatment options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EligibilityResultsPage;
