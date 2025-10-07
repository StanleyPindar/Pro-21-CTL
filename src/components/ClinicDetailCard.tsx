import React from 'react';
import { FullClinicProfile } from '../types/clinic';
import ClinicHeader from './clinic-detail/ClinicHeader';
import ClinicContact from './clinic-detail/ClinicContact';
import ClinicPricing from './clinic-detail/ClinicPricing';
import ClinicServices from './clinic-detail/ClinicServices';
import ClinicProsAndCons from './clinic-detail/ClinicProsAndCons';

interface ClinicDetailCardProps {
  clinic: FullClinicProfile;
  className?: string;
}

const ClinicDetailCard: React.FC<ClinicDetailCardProps> = ({ clinic, className = '' }) => {
  const name = clinic?.overview?.name || 'Unknown Clinic';
  const description = clinic?.overview?.description || 'No description available';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
      itemScope
      itemType="https://schema.org/MedicalBusiness"
    >
      <ClinicHeader clinic={clinic} />

      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About {name}</h3>
        <p className="text-gray-700">{description}</p>
      </div>

      <ClinicContact clinic={clinic} />
      <ClinicPricing clinic={clinic} />
      <ClinicServices clinic={clinic} />
      <ClinicProsAndCons clinic={clinic} />
    </div>
  );
};

export default ClinicDetailCard;
