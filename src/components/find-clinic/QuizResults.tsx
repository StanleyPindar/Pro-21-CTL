import React from 'react';
import { ArrowRight, MapPin, Phone, CheckCircle } from 'lucide-react';
import { FullClinicProfile } from '../../types/clinic';
import StarRating from '../common/StarRating';

interface QuizResultsProps {
  matches: FullClinicProfile[];
  onBooking: (clinic: FullClinicProfile) => void;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ matches, onBooking, onRestart }) => {
  const formatCurrency = (value: number | null | string) => {
    if (value === null || value === 'TBC') return 'TBC';
    return `£${value}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Your Top Matches</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your responses, we've found {matches.length} clinics that best match your needs
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {matches.map((clinic, index) => {
          const name = clinic?.overview?.name || 'Unknown Clinic';
          const tagline = clinic?.overview?.tagline || '';
          const rating = clinic?.patientExperience?.overallRating || 0;
          const reviewCount = clinic?.patientExperience?.totalReviews || 0;
          const initialFee = clinic?.pricing?.initialConsultation?.price || 'TBC';
          const annualCost = clinic?.pricing?.estimatedAnnualCost?.average || 'TBC';
          const city = clinic?.overview?.address?.city || 'UK';
          const phone = clinic?.overview?.phone || '';
          const specialties = clinic?.services?.specialties || [];

          return (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                        #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                    </div>
                    {tagline && <p className="text-gray-600 mb-3">{tagline}</p>}

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <StarRating value={Math.round(rating)} size={16} />
                        <span className="ml-2 text-sm font-semibold">{rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-gray-600">({reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {city}
                      </div>
                    </div>

                    {specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {specialties.slice(0, 3).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formatCurrency(initialFee)}
                    </div>
                    <div className="text-xs text-gray-500">Initial Consultation</div>
                    <div className="mt-2 text-sm text-gray-700">
                      ~{formatCurrency(annualCost)}/year
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onBooking(clinic)}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    View Full Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
