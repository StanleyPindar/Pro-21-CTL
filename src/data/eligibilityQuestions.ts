import { Question, CHRONIC_PAIN_TREATMENTS, MENTAL_HEALTH_TREATMENTS, SLEEP_TREATMENTS, NEUROLOGICAL_TREATMENTS, OTHER_TREATMENTS } from '../types/eligibility';

export const eligibilityQuestions: Question[] = [
  {
    id: 'condition',
    question: 'Which condition are you seeking treatment for?',
    type: 'visual-cards',
    required: true,
    options: [
      {
        value: 'chronic-pain',
        label: 'Chronic Pain',
        description: 'Back pain, arthritis, fibromyalgia, neuropathic pain',
        icon: 'activity'
      },
      {
        value: 'anxiety',
        label: 'Anxiety',
        description: 'Generalized anxiety, panic attacks, social anxiety',
        icon: 'heart'
      },
      {
        value: 'depression',
        label: 'Depression',
        description: 'Major depressive disorder, persistent low mood',
        icon: 'cloud-rain'
      },
      {
        value: 'ptsd',
        label: 'PTSD',
        description: 'Post-traumatic stress disorder',
        icon: 'alert-circle'
      },
      {
        value: 'insomnia',
        label: 'Insomnia',
        description: 'Sleep disorders, difficulty sleeping',
        icon: 'moon'
      },
      {
        value: 'epilepsy',
        label: 'Epilepsy',
        description: 'Seizures, treatment-resistant epilepsy',
        icon: 'zap'
      },
      {
        value: 'multiple-sclerosis',
        label: 'Multiple Sclerosis',
        description: 'MS symptoms, spasticity, pain',
        icon: 'brain'
      },
      {
        value: 'ibd',
        label: 'IBD',
        description: 'Crohn\'s disease, ulcerative colitis',
        icon: 'activity'
      },
      {
        value: 'tourette',
        label: 'Tourette Syndrome',
        description: 'Tic disorders',
        icon: 'user'
      },
      {
        value: 'cancer',
        label: 'Cancer Side Effects',
        description: 'Chemotherapy side effects, pain management',
        icon: 'shield'
      },
      {
        value: 'fibromyalgia',
        label: 'Fibromyalgia',
        description: 'Widespread pain, fatigue',
        icon: 'compass'
      },
      {
        value: 'arthritis',
        label: 'Arthritis',
        description: 'Joint pain and inflammation',
        icon: 'bone'
      },
      {
        value: 'other-neurological',
        label: 'Other Neurological',
        description: 'Parkinson\'s, dystonia, other conditions',
        icon: 'cpu'
      },
      {
        value: 'other',
        label: 'Other Qualifying',
        description: 'Other condition not listed',
        icon: 'more-horizontal'
      }
    ]
  },
  {
    id: 'duration',
    question: 'How long have you been experiencing this condition?',
    type: 'single',
    required: true,
    options: [
      { value: 'under-6-months', label: 'Less than 6 months', description: 'Recent onset' },
      { value: '6-12-months', label: '6 months - 1 year', description: 'Developing condition' },
      { value: '1-2-years', label: '1-2 years', description: 'Established condition' },
      { value: '2-5-years', label: '2-5 years', description: 'Long-term condition' },
      { value: '5-10-years', label: '5-10 years', description: 'Chronic condition' },
      { value: 'over-10-years', label: 'More than 10 years', description: 'Long-standing condition' }
    ]
  },
  {
    id: 'severity',
    question: 'How would you rate the severity of your symptoms?',
    type: 'scale',
    required: true,
    options: [
      { value: '1', label: '1 - Minimal', description: 'Barely noticeable' },
      { value: '2', label: '2', description: 'Very mild' },
      { value: '3', label: '3 - Mild', description: 'Noticeable but manageable' },
      { value: '4', label: '4', description: 'Mild to moderate' },
      { value: '5', label: '5', description: 'Moderate discomfort' },
      { value: '6', label: '6 - Moderate', description: 'Significant discomfort, some daily impact' },
      { value: '7', label: '7', description: 'Moderate to severe' },
      { value: '8', label: '8 - Severe', description: 'Major daily life impact' },
      { value: '9', label: '9', description: 'Very severe' },
      { value: '10', label: '10 - Debilitating', description: 'Unable to function normally' }
    ]
  },
  {
    id: 'treatment-status',
    question: 'What is your current treatment status?',
    type: 'single',
    required: true,
    options: [
      { value: 'no-treatment', label: 'Not receiving any treatment', description: 'Currently untreated' },
      { value: 'nhs-inadequate', label: 'NHS treatment but inadequate relief', description: 'Current NHS care insufficient' },
      { value: 'private-inadequate', label: 'Private treatment but inadequate relief', description: 'Private care not working' },
      { value: 'multiple-failed', label: 'Multiple treatments with little success', description: 'Tried many options' },
      { value: 'side-effects', label: 'Current medication with significant side effects', description: 'Treatment causing problems' },
      { value: 'between-treatments', label: 'Between treatments, seeking alternatives', description: 'Looking for new options' }
    ]
  },
  {
    id: 'previous-treatments',
    question: 'Which treatments have you previously tried?',
    type: 'multiple',
    required: true,
    skipLogic: (responses) => responses['treatment-status'] === 'no-treatment',
    options: []
  },
  {
    id: 'treatment-effectiveness',
    question: 'How effective were these previous treatments?',
    type: 'single',
    required: true,
    skipLogic: (responses) => responses['treatment-status'] === 'no-treatment',
    options: [
      { value: 'initially-effective', label: 'Very effective initially, but decreased over time', description: 'Lost effectiveness' },
      { value: 'somewhat-effective', label: 'Somewhat effective but insufficient relief', description: 'Partial benefit only' },
      { value: 'minimal', label: 'Minimal effectiveness, little improvement', description: 'Limited benefit' },
      { value: 'side-effects', label: 'Effective but unacceptable side effects', description: 'Side effects too severe' },
      { value: 'worse', label: 'Made symptoms worse', description: 'Negative reaction' },
      { value: 'nothing-worked', label: 'Nothing has worked', description: 'No benefit from any treatment' }
    ]
  },
  {
    id: 'side-effects',
    question: 'Have you experienced side effects from previous treatments?',
    type: 'single',
    required: true,
    skipLogic: (responses) => responses['treatment-status'] === 'no-treatment',
    options: [
      { value: 'none', label: 'No significant side effects', description: 'Well tolerated' },
      { value: 'mild', label: 'Mild, manageable side effects', description: 'Minor issues only' },
      { value: 'moderate', label: 'Moderate side effects affecting daily life', description: 'Noticeable impact' },
      { value: 'severe', label: 'Severe side effects requiring treatment stoppage', description: 'Had to stop treatment' },
      { value: 'worse-than-condition', label: 'Side effects worse than original condition', description: 'Treatment worse than illness' }
    ]
  },
  {
    id: 'medication-concerns',
    question: 'What concerns do you have about your current medications?',
    type: 'multiple',
    required: true,
    options: [
      { value: 'not-effective', label: 'Not effective enough', description: 'Insufficient symptom relief' },
      { value: 'side-effects', label: 'Too many side effects', description: 'Causing other problems' },
      { value: 'dependency', label: 'Dependency/addiction concerns', description: 'Worried about dependence' },
      { value: 'cost', label: 'Cost of medications', description: 'Too expensive' },
      { value: 'interactions', label: 'Drug interactions', description: 'Conflicts with other meds' },
      { value: 'long-term-effects', label: 'Long-term health effects', description: 'Worried about future impact' },
      { value: 'no-concerns', label: 'No concerns', description: 'Satisfied with current treatment' },
      { value: 'not-taking', label: 'Not taking medications', description: 'Currently not medicated' }
    ]
  },
  {
    id: 'lifestyle-impact',
    question: 'How does your condition impact your daily life?',
    type: 'multiple',
    required: true,
    options: [
      { value: 'sleep', label: 'Sleep difficulties', description: 'Trouble sleeping or poor quality sleep' },
      { value: 'work-study', label: 'Work/study concentration problems', description: 'Difficulty focusing or performing' },
      { value: 'physical-activity', label: 'Reduced physical activity', description: 'Can\'t exercise or move normally' },
      { value: 'social', label: 'Relationship/social impact', description: 'Affects relationships and social life' },
      { value: 'household', label: 'Household task difficulties', description: 'Struggle with daily chores' },
      { value: 'appetite', label: 'Appetite/eating issues', description: 'Changes in eating patterns' },
      { value: 'mood', label: 'Mood changes', description: 'Emotional ups and downs' },
      { value: 'financial', label: 'Financial impact', description: 'Medical costs or lost income' },
      { value: 'help-needed', label: 'Need help with daily activities', description: 'Require assistance from others' },
      { value: 'minimal', label: 'Minimal impact', description: 'Life relatively unaffected' }
    ]
  },
  {
    id: 'work-situation',
    question: 'What is your current work situation?',
    type: 'single',
    required: true,
    options: [
      { value: 'full-time', label: 'Full-time employed', description: '35+ hours per week' },
      { value: 'part-time', label: 'Part-time employed', description: 'Less than 35 hours per week' },
      { value: 'self-employed', label: 'Self-employed', description: 'Running own business' },
      { value: 'unable-work', label: 'Unable to work due to condition', description: 'Condition prevents employment' },
      { value: 'retired', label: 'Retired', description: 'No longer working' },
      { value: 'student', label: 'Student', description: 'In education' },
      { value: 'unemployed', label: 'Unemployed (not condition-related)', description: 'Not working for other reasons' }
    ]
  },
  {
    id: 'treatment-goals',
    question: 'What are your primary treatment goals?',
    type: 'multiple',
    required: true,
    options: [
      { value: 'complete-relief', label: 'Complete symptom relief', description: 'Eliminate all symptoms' },
      { value: 'significant-reduction', label: 'Significant symptom reduction', description: 'Major improvement' },
      { value: 'better-sleep', label: 'Better sleep quality', description: 'Improve rest and recovery' },
      { value: 'reduced-medication', label: 'Reduced medication reliance', description: 'Take fewer medications' },
      { value: 'quality-of-life', label: 'Improved quality of life', description: 'Better overall wellbeing' },
      { value: 'return-activities', label: 'Return to normal activities', description: 'Resume regular life' },
      { value: 'pain-management', label: 'Pain management for activities', description: 'Enable movement and exercise' },
      { value: 'mood-stabilization', label: 'Mood stabilization', description: 'Emotional balance' }
    ]
  },
  {
    id: 'consultation-preference',
    question: 'What is your preferred consultation format?',
    type: 'single',
    required: true,
    options: [
      { value: 'in-person', label: 'In-person at clinic', description: 'Face-to-face appointment' },
      { value: 'video', label: 'Video consultation', description: 'Online video call' },
      { value: 'phone', label: 'Phone consultation', description: 'Telephone appointment' },
      { value: 'no-preference', label: 'No preference (fastest)', description: 'Whatever is available soonest' },
      { value: 'depends-location', label: 'Depends on location', description: 'Based on clinic proximity' }
    ]
  },
  {
    id: 'budget',
    question: 'What is your monthly budget for treatment?',
    type: 'single',
    required: true,
    options: [
      { value: 'under-100', label: 'Under £100/month', description: 'Budget-conscious' },
      { value: '100-200', label: '£100-200/month', description: 'Moderate budget' },
      { value: '200-300', label: '£200-300/month', description: 'Flexible budget' },
      { value: '300-500', label: '£300-500/month', description: 'Higher budget' },
      { value: '500-plus', label: '£500+/month', description: 'Premium budget' },
      { value: 'need-info', label: 'Need to understand costs first', description: 'Want more information' },
      { value: 'not-concern', label: 'Budget not a concern', description: 'Cost not limiting factor' }
    ]
  },
  {
    id: 'timeline',
    question: 'When are you looking to start treatment?',
    type: 'single',
    required: true,
    options: [
      { value: 'asap', label: 'ASAP (this week)', description: 'Urgent need' },
      { value: '2-weeks', label: 'Within 2 weeks', description: 'Soon but not urgent' },
      { value: '1-month', label: 'Within 1 month', description: 'No rush' },
      { value: '3-months', label: 'Within 3 months', description: 'Planning ahead' },
      { value: 'researching', label: 'Just researching', description: 'Gathering information' },
      { value: 'depends', label: 'Depends on finding right clinic', description: 'Quality over speed' }
    ]
  },
  {
    id: 'information-source',
    question: 'How did you learn about medical cannabis treatment?',
    type: 'single',
    required: true,
    options: [
      { value: 'healthcare-professional', label: 'Healthcare professional', description: 'Doctor or medical provider' },
      { value: 'online-research', label: 'Online research', description: 'Internet searching' },
      { value: 'friend-family', label: 'Friend/family recommendation', description: 'Personal referral' },
      { value: 'social-media', label: 'Social media/forums', description: 'Online communities' },
      { value: 'news-media', label: 'News/media coverage', description: 'Articles or news stories' },
      { value: 'support-groups', label: 'Patient support groups', description: 'Condition-specific groups' },
      { value: 'other-patients', label: 'Other patients', description: 'Patient testimonials' },
      { value: 'clinic-advertising', label: 'Clinic advertising', description: 'Clinic marketing' }
    ]
  }
];

export function getTreatmentOptionsForCondition(condition: string) {
  switch (condition) {
    case 'chronic-pain':
    case 'fibromyalgia':
    case 'arthritis':
      return CHRONIC_PAIN_TREATMENTS;
    case 'anxiety':
    case 'depression':
    case 'ptsd':
      return MENTAL_HEALTH_TREATMENTS;
    case 'insomnia':
      return SLEEP_TREATMENTS;
    case 'epilepsy':
    case 'multiple-sclerosis':
    case 'other-neurological':
      return NEUROLOGICAL_TREATMENTS;
    default:
      return OTHER_TREATMENTS;
  }
}
