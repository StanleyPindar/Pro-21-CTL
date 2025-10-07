import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClinicHeader from './ClinicHeader';
import { FullClinicProfile } from '../../types/clinic';

const mockClinic: FullClinicProfile = {
  overview: {
    id: 'test-clinic',
    name: 'Test Medical Clinic',
    tagline: 'Quality Healthcare',
    description: 'A test clinic',
    website: 'https://test.com',
    phone: '0800-123-4567',
    email: 'test@clinic.com',
    address: {
      street: '123 Test Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      region: 'Greater London',
      country: 'United Kingdom'
    }
  },
  patientExperience: {
    overallRating: 4.5,
    totalReviews: 150,
    averageWaitTime: '2 weeks',
    responseTime: '24 hours',
    nextAvailableAppointment: 'This week',
    recommendationRate: 95
  },
  pricing: {
    initialConsultation: {
      price: 50,
      notes: 'First consultation'
    },
    followUpConsultation: {
      price: 30,
      notes: 'Follow-up'
    },
    prescriptionFee: 20,
    deliveryFee: 5,
    estimatedAnnualCost: {
      low: 500,
      average: 1000,
      high: 2000
    }
  },
  verdict: {
    recommendationLevel: 'highly-recommended',
    overallScore: '9/10',
    summary: 'Excellent clinic',
    bestFor: ['First-time patients'],
    notIdealFor: [],
    keyStrengths: [],
    areasForImprovement: [],
    lastUpdated: '2024-01-01'
  },
  services: {
    specialties: [],
    conditions: [],
    consultationTypes: [],
    languages: [],
    accessibility: [],
    homeDelivery: false,
    urgentAppointments: false,
    followUpSupport: false,
    educationalResources: false
  },
  pharmacy: {
    inHousePharmacy: false,
    partnerPharmacies: [],
    stockAvailability: 'Good'
  },
  prosAndCons: {
    pros: [],
    cons: [],
    standoutFeatures: [],
    potentialDrawbacks: []
  }
};

describe('ClinicHeader', () => {
  it('renders clinic name', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText('Test Medical Clinic')).toBeInTheDocument();
  });

  it('renders tagline when provided', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText('Quality Healthcare')).toBeInTheDocument();
  });

  it('displays rating value', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('displays review count', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByText(/reviews/)).toBeInTheDocument();
  });

  it('displays initial consultation fee', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText('£50')).toBeInTheDocument();
  });

  it('displays annual cost average', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText(/£1000/)).toBeInTheDocument();
  });

  it('formats address correctly', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText(/123 Test Street, London, SW1A 1AA/)).toBeInTheDocument();
  });

  it('displays recommendation badge', () => {
    render(<ClinicHeader clinic={mockClinic} />);
    expect(screen.getByText(/highly recommended/i)).toBeInTheDocument();
  });

  it('handles missing tagline', () => {
    const clinicWithoutTagline = {
      ...mockClinic,
      overview: { ...mockClinic.overview, tagline: '' }
    };
    render(<ClinicHeader clinic={clinicWithoutTagline} />);
    expect(screen.queryByText('Quality Healthcare')).not.toBeInTheDocument();
  });

  it('shows TBC for missing pricing', () => {
    const clinicWithoutPricing = {
      ...mockClinic,
      pricing: {
        ...mockClinic.pricing,
        initialConsultation: { price: null as any, notes: '' }
      }
    };
    render(<ClinicHeader clinic={clinicWithoutPricing} />);
    expect(screen.getAllByText('TBC').length).toBeGreaterThan(0);
  });

  it('applies correct color for highly-recommended', () => {
    const { container } = render(<ClinicHeader clinic={mockClinic} />);
    const badge = screen.getByText(/highly recommended/i);
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });

  it('handles address unavailable', () => {
    const clinicWithoutAddress = {
      ...mockClinic,
      overview: {
        ...mockClinic.overview,
        address: {
          street: 'TBC',
          city: 'TBC',
          postcode: 'TBC',
          region: '',
          country: 'UK'
        }
      }
    };
    render(<ClinicHeader clinic={clinicWithoutAddress} />);
    expect(screen.getByText('Address not available')).toBeInTheDocument();
  });
});
