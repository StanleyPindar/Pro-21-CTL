import React from 'react';
import { MapPin } from 'lucide-react';
import StarRating from '../common/StarRating';
import { FullClinicProfile } from '../../types/clinic';

interface ClinicHeaderProps {
  clinic: FullClinicProfile;
}

const ClinicHeader: React.FC<ClinicHeaderProps> = ({ clinic }) => {
  const name = clinic?.overview?.name || 'Unknown Clinic';
  const tagline = clinic?.overview?.tagline || '';
  const rating = clinic?.patientExperience?.overallRating || 0;
  const reviewCount = clinic?.patientExperience?.totalReviews || 0;
  const recommendationLevel = clinic?.verdict?.recommendationLevel || 'TBC';
  const website = clinic?.overview?.website || '#';
  const phone = clinic?.overview?.phone || 'Contact clinic';
  const email = clinic?.overview?.email || 'Contact clinic';
  const initialConsultationFee = clinic?.pricing?.initialConsultation?.price || 'TBC';
  const annualCostAverage = clinic?.pricing?.estimatedAnnualCost?.average || 'TBC';

  const getFullAddress = () => {
    const street = clinic?.overview?.address?.street || 'TBC';
    const city = clinic?.overview?.address?.city || 'TBC';
    const postcode = clinic?.overview?.address?.postcode || 'TBC';

    if (street === 'TBC' && city === 'TBC' && postcode === 'TBC') {
      return 'Address not available';
    }

    return `${street}, ${city}, ${postcode}`;
  };

  const getRecommendationColor = () => {
    switch (recommendationLevel) {
      case 'highly-recommended': return 'bg-green-100 text-green-800';
      case 'recommended': return 'bg-blue-100 text-blue-800';
      case 'conditional': return 'bg-yellow-100 text-yellow-800';
      case 'not-recommended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number | null | string) => {
    if (value === null || value === 'TBC') return 'TBC';
    return `£${value}`;
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1" itemProp="name">{name}</h2>
          {tagline && <p className="text-gray-600 mb-2" itemProp="description">{tagline}</p>}

          <div className="flex items-center mb-2" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <StarRating value={Math.round(rating)} size={18} />
            <span className="ml-2 text-lg font-semibold" itemProp="ratingValue">{rating.toFixed(1)}</span>
            <span className="text-gray-600 ml-1">(<span itemProp="reviewCount">{reviewCount}</span> reviews)</span>
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />

            <span className={`ml-4 px-2 py-0.5 text-xs font-medium rounded-full ${getRecommendationColor()}`}>
              {recommendationLevel.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center text-gray-600" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span itemProp="streetAddress">{getFullAddress()}</span>
            <meta itemProp="addressCountry" content="GB" />
          </div>

          <div className="sr-only">
            <span itemProp="url">{website}</span>
            <span itemProp="telephone">{phone}</span>
            <span itemProp="email">{email}</span>
            <div itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
              <span itemProp="name">Medical Cannabis Services</span>
              <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
                <div itemProp="itemOffered" itemScope itemType="https://schema.org/MedicalProcedure">
                  <span itemProp="name">Medical Cannabis Consultation</span>
                </div>
                <div itemProp="priceSpecification" itemScope itemType="https://schema.org/PriceSpecification">
                  <span itemProp="price">{initialConsultationFee}</span>
                  <span itemProp="priceCurrency">GBP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {formatCurrency(initialConsultationFee)}
          </div>
          <div className="text-sm text-gray-500">Initial Consultation</div>

          <div className="mt-2 text-sm">
            <span className="font-medium">Annual Cost:</span> {formatCurrency(annualCostAverage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicHeader;
