export type QuestionType = 'single' | 'multiple' | 'scale' | 'visual-cards';

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options: QuestionOption[];
  required: boolean;
  skipLogic?: (responses: AssessmentResponses) => boolean;
}

export interface AssessmentResponses {
  [questionId: string]: string | string[];
  email?: string;
  name?: string;
}

export interface EligibilityScore {
  status: 'highly_likely' | 'likely' | 'possible' | 'educational';
  confidence: number;
  reasoning: string[];
  recommendedActions: string[];
}

export interface ClinicMatchScore {
  clinicId: string;
  clinicName: string;
  score: number;
  percentage: number;
  reasons: string[];
  breakdown: {
    conditionMatch: number;
    budgetAlignment: number;
    formatMatch: number;
    timeline: number;
    successRate: number;
  };
}

export interface AssessmentResult {
  assessmentId: string;
  eligibility: EligibilityScore;
  clinicMatches: ClinicMatchScore[];
  responses: AssessmentResponses;
  completedAt: string;
}

export interface AssessmentProgress {
  sessionId: string;
  currentStep: number;
  responses: AssessmentResponses;
  emailCaptured: boolean;
  startedAt: string;
}

export interface AssessmentAnalytics {
  stepNumber: number;
  stepName: string;
  responseValue: string;
  timeSpentSeconds: number;
  timestamp: string;
}

export interface TreatmentOption {
  value: string;
  label: string;
  category: 'physical' | 'medication' | 'therapy' | 'alternative';
}

export const CHRONIC_PAIN_TREATMENTS: TreatmentOption[] = [
  { value: 'otc-painkillers', label: 'OTC painkillers', category: 'medication' },
  { value: 'prescription-painkillers', label: 'Prescription painkillers', category: 'medication' },
  { value: 'anti-inflammatories', label: 'Anti-inflammatories', category: 'medication' },
  { value: 'muscle-relaxants', label: 'Muscle relaxants', category: 'medication' },
  { value: 'antidepressants', label: 'Antidepressants for pain', category: 'medication' },
  { value: 'physiotherapy', label: 'Physiotherapy', category: 'physical' },
  { value: 'steroid-injections', label: 'Steroid injections', category: 'physical' },
  { value: 'surgery', label: 'Surgery', category: 'physical' },
  { value: 'alternative-therapies', label: 'Alternative therapies', category: 'alternative' },
  { value: 'none', label: 'None', category: 'alternative' }
];

export const MENTAL_HEALTH_TREATMENTS: TreatmentOption[] = [
  { value: 'antidepressants', label: 'Antidepressants', category: 'medication' },
  { value: 'anti-anxiety', label: 'Anti-anxiety medications', category: 'medication' },
  { value: 'mood-stabilizers', label: 'Mood stabilizers', category: 'medication' },
  { value: 'antipsychotics', label: 'Antipsychotics', category: 'medication' },
  { value: 'talking-therapy', label: 'Talking therapy', category: 'therapy' },
  { value: 'cbt', label: 'CBT (Cognitive Behavioral Therapy)', category: 'therapy' },
  { value: 'emdr', label: 'EMDR', category: 'therapy' },
  { value: 'mindfulness', label: 'Mindfulness programs', category: 'therapy' },
  { value: 'alternative-therapies', label: 'Alternative therapies', category: 'alternative' },
  { value: 'none', label: 'None', category: 'alternative' }
];

export const SLEEP_TREATMENTS: TreatmentOption[] = [
  { value: 'sleeping-pills', label: 'Sleeping pills', category: 'medication' },
  { value: 'melatonin', label: 'Melatonin supplements', category: 'medication' },
  { value: 'antihistamines', label: 'Antihistamines', category: 'medication' },
  { value: 'cbt-insomnia', label: 'CBT for insomnia', category: 'therapy' },
  { value: 'sleep-hygiene', label: 'Sleep hygiene programs', category: 'therapy' },
  { value: 'relaxation-techniques', label: 'Relaxation techniques', category: 'alternative' },
  { value: 'none', label: 'None', category: 'alternative' }
];

export const NEUROLOGICAL_TREATMENTS: TreatmentOption[] = [
  { value: 'anti-epileptics', label: 'Anti-epileptic drugs', category: 'medication' },
  { value: 'disease-modifying', label: 'Disease-modifying therapies', category: 'medication' },
  { value: 'steroids', label: 'Steroids', category: 'medication' },
  { value: 'immunosuppressants', label: 'Immunosuppressants', category: 'medication' },
  { value: 'physiotherapy', label: 'Physiotherapy', category: 'physical' },
  { value: 'occupational-therapy', label: 'Occupational therapy', category: 'therapy' },
  { value: 'surgery', label: 'Surgery', category: 'physical' },
  { value: 'none', label: 'None', category: 'alternative' }
];

export const OTHER_TREATMENTS: TreatmentOption[] = [
  { value: 'prescription-meds', label: 'Prescription medications', category: 'medication' },
  { value: 'otc-treatments', label: 'Over-the-counter treatments', category: 'medication' },
  { value: 'therapy', label: 'Therapy/counseling', category: 'therapy' },
  { value: 'physical-therapy', label: 'Physical therapy', category: 'physical' },
  { value: 'alternative-medicine', label: 'Alternative medicine', category: 'alternative' },
  { value: 'none', label: 'None', category: 'alternative' }
];
