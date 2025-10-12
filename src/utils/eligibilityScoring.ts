import { AssessmentResponses, EligibilityScore, ClinicMatchScore } from '../types/eligibility';
import { FullClinicProfile } from '../types/clinic';

export function calculateEligibility(responses: AssessmentResponses): EligibilityScore {
  const condition = responses.condition as string;
  const duration = responses.duration as string;
  const severity = parseInt(responses.severity as string) || 0;
  const treatmentStatus = responses['treatment-status'] as string;
  const treatmentEffectiveness = responses['treatment-effectiveness'] as string;
  const sideEffects = responses['side-effects'] as string;

  let confidenceScore = 0;
  const reasoning: string[] = [];
  const recommendedActions: string[] = [];

  if (condition && condition !== 'none') {
    confidenceScore += 25;
    reasoning.push(`You have a qualifying condition (${formatConditionName(condition)})`);
  }

  const durationMonths = parseDuration(duration);
  if (durationMonths >= 3) {
    confidenceScore += 15;
    reasoning.push(`Condition duration of ${formatDuration(duration)} shows established chronic nature`);
  } else {
    reasoning.push(`Recent onset - some clinics may want to see longer treatment history`);
  }

  if (severity >= 5) {
    confidenceScore += 20;
    reasoning.push(`Moderate to severe symptom severity (${severity}/10) demonstrates significant impact`);
  } else if (severity >= 3) {
    confidenceScore += 10;
    reasoning.push(`Mild to moderate symptoms showing noticeable impact`);
  }

  if (treatmentStatus !== 'no-treatment') {
    confidenceScore += 20;
    reasoning.push(`Previous conventional treatment experience supports eligibility`);

    if (treatmentEffectiveness && ['minimal', 'nothing-worked', 'worse', 'side-effects'].includes(treatmentEffectiveness)) {
      confidenceScore += 15;
      reasoning.push(`Inadequate response to conventional treatments is a key eligibility criterion`);
    }

    if (sideEffects && ['moderate', 'severe', 'worse-than-condition'].includes(sideEffects)) {
      confidenceScore += 5;
      reasoning.push(`Significant side effects from previous treatments support alternative therapy consideration`);
    }
  } else {
    reasoning.push(`No previous treatment history - clinics typically require evidence of conventional treatment attempts first`);
  }

  let status: 'highly_likely' | 'likely' | 'possible' | 'educational';

  if (confidenceScore >= 80) {
    status = 'highly_likely';
    recommendedActions.push('Book a consultation with a specialist clinic as soon as possible');
    recommendedActions.push('Gather your medical records and treatment history');
    recommendedActions.push('Prepare a list of current medications and previous treatments');
    recommendedActions.push('Consider which consultation format works best for you');
  } else if (confidenceScore >= 60) {
    status = 'likely';
    recommendedActions.push('Schedule a consultation to discuss your eligibility in detail');
    recommendedActions.push('Collect documentation of your condition and treatment history');
    recommendedActions.push('Research clinics specializing in your condition');
    recommendedActions.push('Prepare questions about treatment options and costs');
  } else if (confidenceScore >= 40) {
    status = 'possible';
    recommendedActions.push('Continue with conventional treatments as advised by your doctor');
    recommendedActions.push('Keep detailed records of treatment effectiveness and side effects');
    recommendedActions.push('Consider consultation if conventional treatments remain inadequate');
    recommendedActions.push('Monitor your symptoms and document their impact on daily life');
  } else {
    status = 'educational';
    recommendedActions.push('Focus on conventional treatment options with your healthcare provider');
    recommendedActions.push('Maintain detailed records of your symptoms and treatments');
    recommendedActions.push('Revisit medical cannabis as an option if other treatments prove inadequate');
    recommendedActions.push('Stay informed about evolving UK medical cannabis regulations');
  }

  return {
    status,
    confidence: Math.min(confidenceScore, 100),
    reasoning,
    recommendedActions
  };
}

export function matchClinics(
  responses: AssessmentResponses,
  clinics: FullClinicProfile[]
): ClinicMatchScore[] {
  const condition = responses.condition as string;
  const budget = responses.budget as string;
  const consultationPreference = responses['consultation-preference'] as string;
  const timeline = responses.timeline as string;
  const severity = parseInt(responses.severity as string) || 0;

  const matches = clinics.map(clinic => {
    let totalScore = 0;
    const reasons: string[] = [];
    const breakdown = {
      conditionMatch: 0,
      budgetAlignment: 0,
      formatMatch: 0,
      timeline: 0,
      successRate: 0
    };

    const conditionScore = scoreConditionMatch(clinic, condition, severity);
    breakdown.conditionMatch = conditionScore;
    totalScore += conditionScore * 0.40;
    if (conditionScore > 70) {
      reasons.push(`Specializes in ${formatConditionName(condition)} treatment`);
    }

    const budgetScore = scoreBudgetAlignment(clinic, budget);
    breakdown.budgetAlignment = budgetScore;
    totalScore += budgetScore * 0.25;
    if (budgetScore > 70) {
      reasons.push(`Pricing aligns well with your budget`);
    }

    const formatScore = scoreConsultationFormat(clinic, consultationPreference);
    breakdown.formatMatch = formatScore;
    totalScore += formatScore * 0.15;
    if (formatScore === 100 && consultationPreference !== 'no-preference') {
      reasons.push(`Offers your preferred ${consultationPreference.replace('-', ' ')} consultation`);
    }

    const timelineScore = scoreTimeline(clinic, timeline);
    breakdown.timeline = timelineScore;
    totalScore += timelineScore * 0.10;
    if (timelineScore > 80 && timeline === 'asap') {
      reasons.push(`Fast appointment availability`);
    }

    const successScore = scoreSuccessRate(clinic);
    breakdown.successRate = successScore;
    totalScore += successScore * 0.10;
    if (clinic.patientExperience?.overallRating >= 4.5) {
      reasons.push(`Excellent patient reviews (${clinic.patientExperience.overallRating}/5.0)`);
    }

    if (clinic.services?.urgentAppointments && timeline === 'asap') {
      reasons.push('Offers urgent appointments');
    }

    if (clinic.services?.homeDelivery) {
      reasons.push('Provides home delivery service');
    }

    if (clinic.pharmacy?.inHousePharmacy) {
      reasons.push('Has in-house pharmacy for convenience');
    }

    return {
      clinicId: clinic.overview.id,
      clinicName: clinic.overview.name,
      score: Math.round(totalScore),
      percentage: Math.round(totalScore),
      reasons: reasons.slice(0, 4),
      breakdown
    };
  });

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scoreConditionMatch(clinic: FullClinicProfile, condition: string, severity: number): number {
  const conditions = clinic.services?.conditions || [];
  const specialties = clinic.services?.specialties || [];

  const conditionKeywords = getConditionKeywords(condition);

  let score = 0;

  for (const keyword of conditionKeywords) {
    if (conditions.some(c => c.toLowerCase().includes(keyword.toLowerCase()))) {
      score += 40;
    }
    if (specialties.some(s => s.toLowerCase().includes(keyword.toLowerCase()))) {
      score += 30;
    }
  }

  if (severity >= 7 && clinic.services?.urgentAppointments) {
    score += 10;
  }

  return Math.min(score, 100);
}

function scoreBudgetAlignment(clinic: FullClinicProfile, budget: string): number {
  const initialConsultFee = clinic.pricing?.initialConsultation?.price || 150;
  const followUpFee = clinic.pricing?.followUpConsultation?.price || 50;
  const estimatedMonthly = followUpFee + 100;

  const budgetRanges: Record<string, { min: number; max: number }> = {
    'under-100': { min: 0, max: 100 },
    '100-200': { min: 100, max: 200 },
    '200-300': { min: 200, max: 300 },
    '300-500': { min: 300, max: 500 },
    '500-plus': { min: 500, max: 10000 },
    'need-info': { min: 0, max: 300 },
    'not-concern': { min: 0, max: 10000 }
  };

  const range = budgetRanges[budget] || { min: 0, max: 300 };

  if (estimatedMonthly >= range.min && estimatedMonthly <= range.max) {
    return 100;
  }

  if (estimatedMonthly < range.min) {
    return 90;
  }

  const overBudget = estimatedMonthly - range.max;
  const score = Math.max(0, 100 - (overBudget / range.max) * 100);
  return Math.round(score);
}

function scoreConsultationFormat(clinic: FullClinicProfile, preference: string): number {
  if (preference === 'no-preference' || preference === 'depends-location') {
    return 100;
  }

  const consultationTypes = clinic.services?.consultationTypes || [];

  const formatMap: Record<string, string> = {
    'in-person': 'in-person',
    'video': 'video',
    'phone': 'phone'
  };

  const requiredFormat = formatMap[preference];
  if (!requiredFormat) return 100;

  return consultationTypes.includes(requiredFormat as any) ? 100 : 40;
}

function scoreTimeline(clinic: FullClinicProfile, timeline: string): number {
  const nextAvailable = clinic.patientExperience?.nextAvailableAppointment || '';
  const urgentAvailable = clinic.services?.urgentAppointments || false;

  if (timeline === 'researching' || timeline === 'depends') {
    return 100;
  }

  if (timeline === 'asap') {
    return urgentAvailable ? 100 : 60;
  }

  if (timeline === '2-weeks') {
    return nextAvailable.includes('week') ? 90 : 70;
  }

  return 80;
}

function scoreSuccessRate(clinic: FullClinicProfile): number {
  const rating = clinic.patientExperience?.overallRating || 0;
  const totalReviews = clinic.patientExperience?.totalReviews || 0;

  let score = (rating / 5) * 100;

  if (totalReviews > 100) {
    score = Math.min(score + 10, 100);
  } else if (totalReviews < 10) {
    score = score * 0.8;
  }

  return Math.round(score);
}

function getConditionKeywords(condition: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'chronic-pain': ['pain', 'chronic pain', 'neuropathic'],
    'anxiety': ['anxiety', 'mental health', 'GAD'],
    'depression': ['depression', 'mental health', 'mood'],
    'ptsd': ['PTSD', 'trauma', 'mental health'],
    'insomnia': ['insomnia', 'sleep', 'sleep disorders'],
    'epilepsy': ['epilepsy', 'seizures', 'neurological'],
    'multiple-sclerosis': ['multiple sclerosis', 'MS', 'neurological'],
    'ibd': ['IBD', 'Crohn', 'colitis', 'inflammatory'],
    'tourette': ['Tourette', 'tic', 'neurological'],
    'cancer': ['cancer', 'oncology', 'chemotherapy'],
    'fibromyalgia': ['fibromyalgia', 'pain', 'chronic'],
    'arthritis': ['arthritis', 'joint', 'pain'],
    'other-neurological': ['neurological', 'brain', 'nerve'],
    'other': ['general', 'chronic']
  };

  return keywordMap[condition] || ['general'];
}

function formatConditionName(condition: string): string {
  const nameMap: Record<string, string> = {
    'chronic-pain': 'Chronic Pain',
    'anxiety': 'Anxiety',
    'depression': 'Depression',
    'ptsd': 'PTSD',
    'insomnia': 'Insomnia',
    'epilepsy': 'Epilepsy',
    'multiple-sclerosis': 'Multiple Sclerosis',
    'ibd': 'IBD',
    'tourette': 'Tourette Syndrome',
    'cancer': 'Cancer Side Effects',
    'fibromyalgia': 'Fibromyalgia',
    'arthritis': 'Arthritis',
    'other-neurological': 'Neurological Condition',
    'other': 'Qualifying Condition'
  };

  return nameMap[condition] || condition;
}

function parseDuration(duration: string): number {
  const durationMap: Record<string, number> = {
    'under-6-months': 3,
    '6-12-months': 9,
    '1-2-years': 18,
    '2-5-years': 42,
    '5-10-years': 90,
    'over-10-years': 120
  };

  return durationMap[duration] || 0;
}

function formatDuration(duration: string): string {
  const formatMap: Record<string, string> = {
    'under-6-months': 'less than 6 months',
    '6-12-months': '6-12 months',
    '1-2-years': '1-2 years',
    '2-5-years': '2-5 years',
    '5-10-years': '5-10 years',
    'over-10-years': 'over 10 years'
  };

  return formatMap[duration] || duration;
}
