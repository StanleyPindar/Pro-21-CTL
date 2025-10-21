export interface SectionInfo {
  sectionNumber: number;
  totalSections: number;
  sectionName: string;
  questionsInSection: number[];
}

export const TOTAL_SECTIONS = 5;

export function getSectionFromStep(step: number): number {
  if (step <= 1) return 1;
  if (step <= 3) return 2;
  if (step <= 7) return 3;
  if (step <= 10) return 4;
  return 5;
}

export function getSectionInfo(currentStep: number): SectionInfo {
  const section = getSectionFromStep(currentStep);

  const sectionNames: Record<number, string> = {
    1: 'Primary Condition',
    2: 'Condition Details',
    3: 'Treatment History',
    4: 'Daily Life Impact',
    5: 'Treatment Preferences'
  };

  const sectionQuestions: Record<number, number[]> = {
    1: [1],
    2: [2, 3],
    3: [4, 5, 6, 7],
    4: [8, 9, 10],
    5: [11, 12, 13, 14]
  };

  return {
    sectionNumber: section,
    totalSections: TOTAL_SECTIONS,
    sectionName: sectionNames[section] || '',
    questionsInSection: sectionQuestions[section] || []
  };
}

export function getProgressMessage(percentage: number): string {
  if (percentage < 30) return "Getting started...";
  if (percentage < 60) return "You're making great progress!";
  if (percentage < 90) return "Almost there!";
  return "Finalizing your assessment...";
}

export function calculateSectionPercentage(currentSection: number, totalSections: number): number {
  return Math.round((currentSection / totalSections) * 100);
}
