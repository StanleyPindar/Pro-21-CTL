import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ClinicRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Use React Router's Navigate component for proper 301 redirect
  const redirectPath = slug ? `/clinics/${slug}` : '/clinics';
  
  // Log the redirect for analytics (with error handling)
  useEffect(() => {
    try {
      console.log(`301 Redirect: /clinic/${slug || ''} → ${redirectPath}`);
      
      // Track redirect for analytics if available (with error handling)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'redirect', {
          event_category: 'navigation',
          event_label: `clinic_to_clinics_redirect`,
          old_path: `/clinic/${slug || ''}`,
          new_path: redirectPath
        });
      }
    } catch (error) {
      // Silently handle analytics errors to prevent 5xx responses
      console.warn('Redirect analytics failed:', error);
    }
  }, [slug, redirectPath]);

  return <Navigate to={redirectPath} replace />;
};

export default ClinicRedirect;