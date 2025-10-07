import React from 'react';
import { CreditCard, FileText, Truck } from 'lucide-react';
import { FullClinicProfile } from '../../types/clinic';

interface ClinicPricingProps {
  clinic: FullClinicProfile;
}

const ClinicPricing: React.FC<ClinicPricingProps> = ({ clinic }) => {
  const initialConsultationFee = clinic?.pricing?.initialConsultation?.price || 'TBC';
  const followUpFee = clinic?.pricing?.followUpConsultation?.price || 'TBC';
  const prescriptionFee = clinic?.pricing?.prescriptionFee || 'TBC';
  const deliveryFee = clinic?.pricing?.deliveryFee || 'TBC';
  const annualCostLow = clinic?.pricing?.estimatedAnnualCost?.low || 'TBC';
  const annualCostAverage = clinic?.pricing?.estimatedAnnualCost?.average || 'TBC';
  const annualCostHigh = clinic?.pricing?.estimatedAnnualCost?.high || 'TBC';

  const formatCurrency = (value: number | null | string) => {
    if (value === null || value === 'TBC') return 'TBC';
    return `£${value}`;
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Consultation Fees</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">Initial Consultation</span>
              </div>
              <span className="font-semibold text-gray-900">{formatCurrency(initialConsultationFee)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">Follow-up Consultation</span>
              </div>
              <span className="font-semibold text-gray-900">{formatCurrency(followUpFee)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">Prescription Fee</span>
              </div>
              <span className="font-semibold text-gray-900">{formatCurrency(prescriptionFee)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">Delivery Fee</span>
              </div>
              <span className="font-semibold text-gray-900">{formatCurrency(deliveryFee)}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Estimated Annual Cost</h4>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Low estimate:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(annualCostLow)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Average estimate:</span>
              <span className="font-bold text-lg text-blue-600">{formatCurrency(annualCostAverage)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">High estimate:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(annualCostHigh)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Estimates based on typical patient usage patterns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicPricing;
