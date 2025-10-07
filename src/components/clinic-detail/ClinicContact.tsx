import React from 'react';
import { Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { FullClinicProfile } from '../../types/clinic';

interface ClinicContactProps {
  clinic: FullClinicProfile;
}

const ClinicContact: React.FC<ClinicContactProps> = ({ clinic }) => {
  const phone = clinic?.overview?.phone || 'Contact clinic';
  const email = clinic?.overview?.email || 'Contact clinic';
  const website = clinic?.overview?.website || '#';

  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phone !== 'Contact clinic' && (
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">Phone</div>
              <a href={`tel:${phone}`} className="text-blue-600 hover:underline">{phone}</a>
            </div>
          </div>
        )}

        {email !== 'Contact clinic' && (
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">Email</div>
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
            </div>
          </div>
        )}

        {website !== '#' && (
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">Website</div>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                Visit Website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicContact;
