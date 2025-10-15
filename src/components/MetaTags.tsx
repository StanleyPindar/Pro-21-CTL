import React, { useLayoutEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  type?: 'MedicalWebPage' | 'Article' | 'FAQPage' | 'LocalBusiness' | 'MedicalBusiness' | 'Organization' | 'WebSite';
  keywords?: string[];
  canonicalUrl?: string;
  lastmod?: string;
  image?: string;
  imageAlt?: string;
  clinicData?: {
    name: string;
    address?: {
      street?: string;
      city?: string;
      postcode?: string;
      region?: string;
    };
    phone?: string;
    email?: string;
    website?: string;
    rating?: number;
    reviewCount?: number;
    priceRange?: string;
    specialties?: string[];
    openingHours?: Record<string, string>;
  };
  conditionData?: {
    name: string;
    symptoms?: string[];
    treatments?: string[];
    prevalence?: string;
    riskFactors?: string[];
    diagnosis?: string[];
  };
  faqData?: Array<{
    question: string;
    answer: string;
    acceptedAnswerType?: 'text' | 'video' | 'audio';
    dateCreated?: string;
    dateModified?: string;
    author?: string;
    upvoteCount?: number;
    category?: string;
  }>;
  organizationData?: {
    name: string;
    url: string;
    logo: string;
    description: string;
    foundingDate?: string;
    contactPoint?: {
      telephone: string;
      email: string;
    };
    sameAs?: string[];
  };
  medicalBusinessData?: {
    name: string;
    address: {
      street?: string;
      city: string;
      postcode?: string;
      region?: string;
    };
    phone?: string;
    email?: string;
    website?: string;
    rating?: number;
    reviewCount?: number;
    priceRange?: string;
    specialties?: string[];
    services?: string[];
    openingHours?: Record<string, string>;
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
      bestRating?: number;
      worstRating?: number;
    };
  };
  breadcrumbData?: Array<{
    name: string;
    url: string;
  }>;
  reviewData?: {
    rating: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  healthTopicData?: {
    name: string;
    description: string;
    symptoms?: string[];
    causes?: string[];
    treatments?: string[];
    prevention?: string[];
  };
  medicalEntityData?: {
    type: 'MedicalCondition' | 'MedicalProcedure' | 'MedicalTherapy' | 'Drug' | 'MedicalDevice';
    name: string;
    alternateName?: string[];
    description: string;
    medicalCode?: Array<{
      code: string;
      codingSystem: string;
    }>;
    associatedAnatomy?: string[];
    signOrSymptom?: string[];
    possibleTreatment?: string[];
    riskFactor?: string[];
    epidemiology?: string;
    pathophysiology?: string;
    stage?: string;
    subtype?: string[];
    contraindication?: string[];
    seriousAdverseOutcome?: string[];
    possibleComplication?: string[];
    expectedPrognosis?: string;
    naturalProgression?: string;
    typicalTest?: string[];
    relevantSpecialty?: string[];
    guideline?: Array<{
      name: string;
      url: string;
      organization: string;
    }>;
    clinicalTrial?: Array<{
      name: string;
      phase: string;
      status: string;
      url?: string;
    }>;
  };
  drugData?: {
    name: string;
    alternateName?: string[];
    description: string;
    activeIngredient?: string[];
    dosageForm?: string[];
    routeOfAdministration?: string[];
    mechanismOfAction?: string;
    indication?: string[];
    contraindication?: string[];
    adverseOutcome?: string[];
    drugClass?: string[];
    legalStatus?: string;
    prescriptionStatus?: string;
    availableStrength?: string[];
    manufacturer?: string[];
    clinicalPharmacology?: string;
    pharmacokinetics?: string;
    pharmacodynamics?: string;
  };
  medicalProcedureData?: {
    name: string;
    alternateName?: string[];
    description: string;
    procedureType?: string;
    bodyLocation?: string[];
    preparation?: string[];
    followup?: string[];
    howPerformed?: string;
    status?: string;
    category?: string[];
    medicationUsed?: string[];
    device?: string[];
    expectedPrognosis?: string;
    typicalTest?: string[];
    contraindication?: string[];
    seriousAdverseOutcome?: string[];
  };
}

const MetaTags = React.memo<MetaTagsProps>(({
  title,
  description,
  datePublished,
  dateModified,
  author = 'CompareTheLeaf Medical Team',
  type = 'MedicalWebPage',
  keywords = [],
  canonicalUrl,
  lastmod,
  image,
  imageAlt,
  clinicData,
  conditionData,
  faqData,
  organizationData,
  medicalBusinessData,
  breadcrumbData,
  reviewData,
  healthTopicData,
  medicalEntityData,
  drugData,
  medicalProcedureData
}) => {
  // Format dates for schema
  const dates = React.useMemo(() => {
    const publishDate = datePublished || new Date().toISOString().split('T')[0];
    return {
      formattedPublishDate: publishDate,
      formattedModifiedDate: dateModified || publishDate
    };
  }, [datePublished, dateModified]);
  
  // Default keywords for medical cannabis content
  const allKeywords = React.useMemo(() => {
    const defaultKeywords = [
      'medical cannabis', 'UK', 'prescription', 'treatment', 'clinic'
    ];
    return [...new Set([...defaultKeywords, ...keywords])].join(', ');
  }, [keywords]);
  
  const currentUrl = React.useMemo(() => {
    // Always use the provided canonicalUrl - never fall back to window.location.href
    // This prevents indexing issues with duplicate content
    if (canonicalUrl) {
      return canonicalUrl;
    }
    
    // If no canonical URL provided, construct it from the current path
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return `https://comparetheleaf.co.uk${path}`;
    }
    
    return 'https://comparetheleaf.co.uk';
  }, [canonicalUrl]);
  
  const socialImage = React.useMemo(() => 
    image || 'https://comparetheleaf.co.uk/images/CTL_Logo_384 (1).webp',
    [image]
  );
  
  const socialImageAlt = React.useMemo(() => 
    imageAlt || 'CompareTheLeaf - UK Medical Cannabis Clinic Comparison',
    [imageAlt]
  );

  // Build schema based on type
  const schema = React.useMemo(() => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      headline: title,
      description: description,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'CompareTheLeaf',
        logo: {
          '@type': 'ImageObject',
          url: 'https://comparetheleaf.co.uk/images/CTL_Logo_384 (1).webp'
        }
      },
      datePublished: dates.formattedPublishDate,
      dateModified: dates.formattedModifiedDate,
      url: currentUrl
    };
    
    // Add breadcrumb schema if provided
    if (breadcrumbData && breadcrumbData.length > 0) {
      baseSchema.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbData.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
    }
    
    // Add medical business schema with review schema
    if (medicalBusinessData) {
      const schemas = [];
      
      // Main MedicalBusiness schema
      const businessSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: medicalBusinessData.name,
        description: description,
        url: medicalBusinessData.website || currentUrl,
        telephone: medicalBusinessData.phone,
        email: medicalBusinessData.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: medicalBusinessData.address.street,
          addressLocality: medicalBusinessData.address.city,
          postalCode: medicalBusinessData.address.postcode,
          addressRegion: medicalBusinessData.address.region,
          addressCountry: 'GB'
        },
        aggregateRating: medicalBusinessData.rating ? {
          '@type': 'AggregateRating',
          ratingValue: medicalBusinessData.rating,
          reviewCount: medicalBusinessData.reviewCount || 0,
          bestRating: 5,
          worstRating: 1
        } : undefined,
        medicalSpecialty: medicalBusinessData.specialties || ['Medical Cannabis Treatment'],
        serviceType: 'Medical Cannabis Treatment',
        paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
        currenciesAccepted: 'GBP',
        openingHours: medicalBusinessData.openingHours ? 
          Object.entries(medicalBusinessData.openingHours).map(([day, hours]) => 
            `${day.charAt(0).toUpperCase() + day.slice(1)} ${hours}`
          ) : undefined
      };
      
      schemas.push(businessSchema);
      
      // Add individual Review schema if reviewData is provided
      if (reviewData && reviewData.rating) {
        const reviewSchema = {
          '@context': 'https://schema.org',
          '@type': 'Review',
          '@id': `${currentUrl}#review`,
          itemReviewed: {
            '@type': 'MedicalBusiness',
            name: medicalBusinessData.name,
            url: medicalBusinessData.website || currentUrl,
            telephone: medicalBusinessData.phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: medicalBusinessData.address.city,
              addressCountry: 'GB'
            }
          },
          author: {
            '@type': 'Organization',
            name: 'CompareTheLeaf Editorial Team',
            url: 'https://comparetheleaf.co.uk/about'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: reviewData.rating,
            bestRating: reviewData.bestRating || 5,
            worstRating: reviewData.worstRating || 1
          },
          reviewBody: description,
          datePublished: dates.formattedPublishDate,
          dateModified: dates.formattedModifiedDate,
          publisher: {
            '@type': 'Organization',
            name: 'CompareTheLeaf',
            url: 'https://comparetheleaf.co.uk',
            logo: {
              '@type': 'ImageObject',
              url: 'https://comparetheleaf.co.uk/images/CTL_Logo_384 (1).webp'
            }
          }
        };
        
        schemas.push(reviewSchema);
      }
      
      return schemas;
    }
    
    // Add specific schema based on type
    if (type === 'LocalBusiness' || type === 'MedicalBusiness') {
      return {
        ...baseSchema,
        '@type': 'MedicalBusiness',
        name: clinicData?.name || title,
        address: clinicData?.address ? {
          '@type': 'PostalAddress',
          streetAddress: clinicData.address.street,
          addressLocality: clinicData.address.city,
          postalCode: clinicData.address.postcode,
          addressRegion: clinicData.address.region,
          addressCountry: 'GB'
        } : undefined,
        telephone: clinicData?.phone,
        email: clinicData?.email,
        url: clinicData?.website,
        aggregateRating: clinicData?.rating ? {
          '@type': 'AggregateRating',
          ratingValue: clinicData.rating.toString(),
          reviewCount: parseInt((clinicData.reviewCount || 0).toString()),
          bestRating: '5',
          worstRating: '1'
        } : undefined,
        priceRange: clinicData?.priceRange || '£150-£400',
        medicalSpecialty: clinicData?.specialties || ['Medical Cannabis Treatment'],
        serviceType: 'Medical Cannabis Treatment',
        paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
        currenciesAccepted: 'GBP'
      };
    }
    
    if (type === 'FAQPage' && faqData) {
      return {
        ...baseSchema,
        '@type': 'FAQPage',
        name: title,
        description: description,
        inLanguage: 'en-GB',
        about: {
          '@type': 'Thing',
          name: 'Medical Cannabis Treatment UK'
        },
        mainEntity: faqData.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          dateCreated: faq.dateCreated || dates.formattedPublishDate,
          dateModified: faq.dateModified || dates.formattedModifiedDate,
          author: faq.author ? {
            '@type': 'Person',
            name: faq.author
          } : {
            '@type': 'Organization',
            name: 'CompareTheLeaf Medical Team'
          },
          upvoteCount: faq.upvoteCount || 0,
          answerCount: 1,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
            dateCreated: faq.dateCreated || dates.formattedPublishDate,
            dateModified: faq.dateModified || dates.formattedModifiedDate,
            upvoteCount: faq.upvoteCount || 0,
            author: faq.author ? {
              '@type': 'Person',
              name: faq.author
            } : {
              '@type': 'Organization',
              name: 'CompareTheLeaf Medical Team'
            }
          }
        }))
      };
    }
    
    if (conditionData) {
      const medicalCondition = {
        '@type': 'MedicalCondition',
        name: conditionData.name,
        possibleTreatment: conditionData.treatments || ['Medical Cannabis Treatment'],
        signOrSymptom: conditionData.symptoms || [],
        epidemiology: conditionData.prevalence,
        riskFactor: conditionData.riskFactors || [],
        possibleComplication: conditionData.diagnosis || [],
        associatedAnatomy: {
          '@type': 'AnatomicalStructure',
          name: 'Human Body'
        }
      };
      
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: medicalCondition,
        about: medicalCondition
      };
    }
    
    if (type === 'Organization' && organizationData) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organizationData.name,
        url: organizationData.url,
        logo: organizationData.logo,
        description: organizationData.description,
        foundingDate: organizationData.foundingDate,
        contactPoint: organizationData.contactPoint ? {
          '@type': 'ContactPoint',
          telephone: organizationData.contactPoint.telephone,
          email: organizationData.contactPoint.email,
          contactType: 'customer service'
        } : undefined,
        sameAs: organizationData.sameAs || [
          'https://www.facebook.com/comparetheleaf',
          'https://www.twitter.com/comparetheleaf',
          'https://www.linkedin.com/company/comparetheleaf'
        ]
      };
    }
    
    if (type === 'WebSite') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CompareTheLeaf',
        url: 'https://comparetheleaf.co.uk',
        description: 'UK Medical Cannabis Clinic Comparison Platform',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://comparetheleaf.co.uk/clinics?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
    }
    
    if (healthTopicData) {
      const medicalCondition = {
        '@type': 'MedicalCondition',
        name: healthTopicData.name,
        description: healthTopicData.description,
        signOrSymptom: healthTopicData.symptoms || [],
        cause: healthTopicData.causes || [],
        possibleTreatment: healthTopicData.treatments || [],
        prevention: healthTopicData.prevention || []
      };
      
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: medicalCondition,
        about: medicalCondition
      };
    }
    
    // Add medical entity schema
    if (medicalEntityData) {
      const medicalEntity = {
        '@type': medicalEntityData.type,
        name: medicalEntityData.name,
        alternateName: medicalEntityData.alternateName,
        description: medicalEntityData.description,
        ...(medicalEntityData.type === 'MedicalCondition' && {
          signOrSymptom: medicalEntityData.signOrSymptom,
          possibleTreatment: medicalEntityData.possibleTreatment,
          riskFactor: medicalEntityData.riskFactor,
          epidemiology: medicalEntityData.epidemiology,
          pathophysiology: medicalEntityData.pathophysiology,
          stage: medicalEntityData.stage,
          subtype: medicalEntityData.subtype,
          contraindication: medicalEntityData.contraindication,
          seriousAdverseOutcome: medicalEntityData.seriousAdverseOutcome,
          expectedPrognosis: medicalEntityData.expectedPrognosis,
          naturalProgression: medicalEntityData.naturalProgression,
          typicalTest: medicalEntityData.typicalTest,
          relevantSpecialty: medicalEntityData.relevantSpecialty,
          associatedAnatomy: medicalEntityData.associatedAnatomy?.map(anatomy => ({
            '@type': 'AnatomicalStructure',
            name: anatomy
          })),
          code: medicalEntityData.medicalCode?.map(code => ({
            '@type': 'MedicalCode',
            code: code.code,
            codingSystem: code.codingSystem
          })),
          guideline: medicalEntityData.guideline?.map(guideline => ({
            '@type': 'MedicalGuideline',
            name: guideline.name,
            url: guideline.url,
            author: {
              '@type': 'Organization',
              name: guideline.organization
            }
          }))
        })
      };
      
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: medicalEntity,
        about: medicalEntity
      };
    }
    
    // Add drug schema
    if (drugData) {
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: {
          '@type': 'Drug',
          name: drugData.name,
          alternateName: drugData.alternateName,
          description: drugData.description,
          activeIngredient: drugData.activeIngredient,
          dosageForm: drugData.dosageForm,
          routeOfAdministration: drugData.routeOfAdministration,
          mechanismOfAction: drugData.mechanismOfAction,
          indication: drugData.indication,
          contraindication: drugData.contraindication,
          adverseOutcome: drugData.adverseOutcome,
          drugClass: drugData.drugClass,
          legalStatus: drugData.legalStatus,
          prescriptionStatus: drugData.prescriptionStatus,
          availableStrength: drugData.availableStrength,
          manufacturer: drugData.manufacturer?.map(mfg => ({
            '@type': 'Organization',
            name: mfg
          })),
          clinicalPharmacology: drugData.clinicalPharmacology,
          pharmacokinetics: drugData.pharmacokinetics,
          pharmacodynamics: drugData.pharmacodynamics
        }
      };
    }
    
    // Add medical procedure schema
    if (medicalProcedureData) {
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: {
          '@type': 'MedicalProcedure',
          name: medicalProcedureData.name,
          alternateName: medicalProcedureData.alternateName,
          description: medicalProcedureData.description,
          procedureType: medicalProcedureData.procedureType,
          bodyLocation: medicalProcedureData.bodyLocation?.map(location => ({
            '@type': 'AnatomicalStructure',
            name: location
          })),
          preparation: medicalProcedureData.preparation,
          followup: medicalProcedureData.followup,
          howPerformed: medicalProcedureData.howPerformed,
          status: medicalProcedureData.status,
          category: medicalProcedureData.category,
          medicationUsed: medicalProcedureData.medicationUsed?.map(med => ({
            '@type': 'Drug',
            name: med
          })),
          device: medicalProcedureData.device?.map(device => ({
            '@type': 'MedicalDevice',
            name: device
          })),
          expectedPrognosis: medicalProcedureData.expectedPrognosis,
          typicalTest: medicalProcedureData.typicalTest,
          contraindication: medicalProcedureData.contraindication,
          seriousAdverseOutcome: medicalProcedureData.seriousAdverseOutcome
        }
      };
    }
    
    return baseSchema;
  }, [
    type, title, description, author, dates, currentUrl, breadcrumbData,
    medicalBusinessData, clinicData, faqData, conditionData, organizationData, healthTopicData,
    medicalEntityData, drugData, medicalProcedureData
  ]);

  // Use useLayoutEffect for immediate DOM manipulation to avoid race conditions
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove existing meta tags to prevent duplicates
    const existingTags = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'link[rel="canonical"]',
      'script[type="application/ld+json"]'
    ];

    existingTags.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Update document title
    document.title = `${title} | CompareTheLeaf`;

    // Create and append meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: allKeywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'en-GB' },
      { name: 'geo.region', content: 'GB' },
      { name: 'geo.country', content: 'UK' },
      { name: 'geo.placename', content: 'United Kingdom' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type === 'Article' ? 'article' : 'website' },
      { property: 'og:site_name', content: 'CompareTheLeaf' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:locale', content: 'en_GB' },
      { property: 'og:image', content: socialImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: socialImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: socialImage },
      { name: 'twitter:site', content: '@comparetheleaf' },
      { name: 'twitter:creator', content: '@comparetheleaf' },
      { name: 'theme-color', content: '#1A9F52' },
      { name: 'medical-disclaimer', content: 'This information is for educational purposes only. Always consult with qualified healthcare professionals.' },
      { name: 'content-rating', content: 'medical' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.name) meta.name = tag.name;
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Add canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = currentUrl;
    document.head.appendChild(canonical);

    // Add structured data
    // Handle both single schema objects and arrays of schemas
    if (Array.isArray(schema)) {
      // If schema is an array, add each schema as a separate script tag
      schema.forEach((schemaItem, index) => {
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.setAttribute('data-schema-index', index.toString());
        schemaScript.textContent = JSON.stringify(schemaItem);
        document.head.appendChild(schemaScript);
      });
    } else {
      // Single schema object
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup function
    return () => {
      existingTags.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
    };
  }, [title, description, allKeywords, currentUrl, socialImage, socialImageAlt, type, schema]);

  // This component doesn't render anything visible
  return null;
});

export default MetaTags;