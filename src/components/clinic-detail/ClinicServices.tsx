import React from 'react';
import { Video, Shield, Users, CheckCircle } from 'lucide-react';
import { FullClinicProfile } from '../../types/clinic';

interface ClinicServicesProps {
  clinic: FullClinicProfile;
}

const ClinicServices: React.FC<ClinicServicesProps> = ({ clinic }) => {
  const specialties = clinic?.services?.specialties || [];
  const conditions = clinic?.services?.conditions || [];
  const consultationTypes = clinic?.services?.consultationTypes || [];
  const languages = clinic?.services?.languages || [];
  const accessibility = clinic?.services?.accessibility || [];
  const homeDelivery = clinic?.services?.homeDelivery || false;
  const urgentAppointments = clinic?.services?.urgentAppointments || false;
  const followUpSupport = clinic?.services?.followUpSupport || false;
  const educationalResources = clinic?.services?.educationalResources || false;

  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services & Specialties</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialties.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {conditions.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Conditions Treated
            </h4>
            <div className="flex flex-wrap gap-2">
              {conditions.slice(0, 6).map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {condition}
                </span>
              ))}
              {conditions.length > 6 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  +{conditions.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {consultationTypes.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Consultation Types
            </h4>
            <div className="flex flex-wrap gap-2">
              {consultationTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full capitalize"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Additional Services</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {homeDelivery && (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Home Delivery Available</span>
            </div>
          )}
          {urgentAppointments && (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Urgent Appointments</span>
            </div>
          )}
          {followUpSupport && (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Follow-up Support</span>
            </div>
          )}
          {educationalResources && (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Educational Resources</span>
            </div>
          )}
        </div>
      </div>

      {accessibility.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Accessibility Features</h4>
          <ul className="list-disc list-inside space-y-1">
            {accessibility.map((feature, index) => (
              <li key={index} className="text-sm text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClinicServices;
