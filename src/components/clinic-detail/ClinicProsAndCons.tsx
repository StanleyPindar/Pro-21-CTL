import React from 'react';
import { CheckCircle, XCircle, Star, AlertTriangle } from 'lucide-react';
import { FullClinicProfile } from '../../types/clinic';

interface ClinicProsAndConsProps {
  clinic: FullClinicProfile;
}

const ClinicProsAndCons: React.FC<ClinicProsAndConsProps> = ({ clinic }) => {
  const pros = clinic?.prosAndCons?.pros || [];
  const cons = clinic?.prosAndCons?.cons || [];
  const standoutFeatures = clinic?.prosAndCons?.standoutFeatures || [];
  const potentialDrawbacks = clinic?.prosAndCons?.potentialDrawbacks || [];

  const hasProsOrCons = pros.length > 0 || cons.length > 0;
  const hasStandoutOrDrawbacks = standoutFeatures.length > 0 || potentialDrawbacks.length > 0;

  if (!hasProsOrCons && !hasStandoutOrDrawbacks) {
    return null;
  }

  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pros & Cons</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pros.length > 0 && (
          <div>
            <h4 className="font-medium text-green-700 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Pros
            </h4>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {cons.length > 0 && (
          <div>
            <h4 className="font-medium text-red-700 mb-3 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Cons
            </h4>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {(standoutFeatures.length > 0 || potentialDrawbacks.length > 0) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {standoutFeatures.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-700 mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Standout Features
              </h4>
              <ul className="space-y-2">
                {standoutFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {potentialDrawbacks.length > 0 && (
            <div>
              <h4 className="font-medium text-yellow-700 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Potential Drawbacks
              </h4>
              <ul className="space-y-2">
                {potentialDrawbacks.map((drawback, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{drawback}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClinicProsAndCons;
