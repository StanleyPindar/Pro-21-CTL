import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Users, X, RotateCcw, ChevronLeft } from 'lucide-react';
import MetaTags from '../components/MetaTags';
import ProgressBar from '../components/eligibility/ProgressBar';
import QuestionStep from '../components/eligibility/QuestionStep';
import EmailCaptureModal from '../components/EmailCaptureModal';
import { eligibilityQuestions, getTreatmentOptionsForCondition } from '../data/eligibilityQuestions';
import { AssessmentResponses } from '../types/eligibility';
import { EligibilityService } from '../services/eligibilityService';
import { calculateEligibility, matchClinics } from '../utils/eligibilityScoring';
import { useClinicData } from '../context/ClinicDataProvider';
import { getSectionFromStep } from '../utils/sectionUtils';

const EligibilityCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const { clinics, isLoading: clinicsLoading } = useClinicData();

  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [sessionId, setSessionId] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedAssessments] = useState(1247);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const newSessionId = EligibilityService.getSessionId();
    setSessionId(newSessionId);

    const savedProgress = EligibilityService.loadProgress();
    if (savedProgress) {
      setResponses(savedProgress.responses);
      setCurrentStep(savedProgress.currentStep);
      setSessionId(savedProgress.sessionId);
      setEmailCaptured(!!savedProgress.responses.email);
    }

    localStorage.setItem('ctq_assessment_started', Date.now().toString());

    return () => {
      if (currentStep < eligibilityQuestions.length && currentStep > 0) {
        EligibilityService.recordDropoff(sessionId, currentStep, responses);
      }
    };
  }, []);

  useEffect(() => {
    setStepStartTime(Date.now());
  }, [currentStep]);

  useEffect(() => {
    if (currentStep > 0 && Object.keys(responses).length > 0) {
      EligibilityService.saveProgress(sessionId, currentStep, responses);
    }
  }, [currentStep, responses, sessionId]);

  const getCurrentQuestion = () => {
    let question = eligibilityQuestions[currentStep - 1];

    if (question.id === 'previous-treatments') {
      const condition = responses.condition as string;
      const treatmentOptions = getTreatmentOptionsForCondition(condition);
      question = {
        ...question,
        options: treatmentOptions.map(t => ({
          value: t.value,
          label: t.label,
          description: ''
        }))
      };
    }

    return question;
  };

  const shouldSkipQuestion = (question: typeof eligibilityQuestions[0]): boolean => {
    if (question.skipLogic) {
      return question.skipLogic(responses);
    }
    return false;
  };

  const handleAnswerChange = (value: string | string[]) => {
    const question = getCurrentQuestion();
    setResponses(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = async () => {
    const question = getCurrentQuestion();
    const timeSpent = Math.floor((Date.now() - stepStartTime) / 1000);

    if (currentStep === 3 && !emailCaptured) {
      setShowEmailModal(true);
      return;
    }

    let nextStep = currentStep + 1;
    while (nextStep <= eligibilityQuestions.length) {
      if (!shouldSkipQuestion(eligibilityQuestions[nextStep - 1])) {
        break;
      }
      nextStep++;
    }

    if (nextStep > eligibilityQuestions.length) {
      await handleSubmit();
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handleEmailSubmit = (data: { email: string; name: string }) => {
    setResponses(prev => ({
      ...prev,
      email: data.email,
      name: data.name
    }));
    setEmailCaptured(true);
    setShowEmailModal(false);
  };

  const handleSkipEmail = () => {
    setEmailCaptured(true);
    setShowEmailModal(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restart the assessment? All progress will be lost.')) {
      EligibilityService.clearProgress();
      setCurrentStep(1);
      setResponses({});
      setEmailCaptured(false);
      setSubmitError(null);
      setIsSubmitting(false);
      localStorage.setItem('ctq_assessment_started', Date.now().toString());
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      let prevStep = currentStep - 1;
      while (prevStep > 0) {
        if (!shouldSkipQuestion(eligibilityQuestions[prevStep - 1])) {
          break;
        }
        prevStep--;
      }
      setCurrentStep(Math.max(1, prevStep));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('Calculating eligibility with responses:', responses);
      console.log('Clinics loading:', clinicsLoading);
      console.log('Available clinics:', clinics?.length || 0);

      if (!responses.condition) {
        throw new Error('Missing condition information');
      }

      if (clinicsLoading) {
        setSubmitError('Loading clinic data, please wait a moment and try again...');
        setIsSubmitting(false);
        return;
      }

      const eligibility = calculateEligibility(responses);
      console.log('Eligibility calculated:', eligibility);

      const validClinics = Array.isArray(clinics) ? clinics : [];
      console.log('Valid clinics count:', validClinics.length);

      if (validClinics.length === 0) {
        console.warn('No clinics available - proceeding without clinic matches');
      }

      const clinicMatches = validClinics.length > 0
        ? matchClinics(responses, validClinics)
        : [];
      console.log('Clinic matches:', clinicMatches.length);

      EligibilityService.saveAssessmentResult(
        sessionId,
        responses,
        eligibility.status,
        eligibility.confidence,
        clinicMatches
      ).catch(error => {
        console.error('Error saving assessment to database:', error);
      });

      navigate('/eligibility/results', {
        state: {
          eligibility,
          clinicMatches,
          responses
        }
      });
    } catch (error) {
      console.error('Error calculating eligibility:', error);
      console.error('Error details:', error);
      console.error('Stack:', error instanceof Error ? error.stack : 'No stack');
      setSubmitError(`Unable to calculate results: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
      setIsSubmitting(false);
    }
  };

  const isStepValid = (): boolean => {
    const question = getCurrentQuestion();
    const answer = responses[question.id];

    if (!answer) return false;

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return answer.trim() !== '';
  };

  const currentQuestion = getCurrentQuestion();
  const currentValue = responses[currentQuestion.id] || (currentQuestion.type === 'multiple' ? [] : '');
  const currentSection = getSectionFromStep(currentStep);
  const isLastQuestionInAssessment = currentStep >= eligibilityQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <X className="h-5 w-5 mr-2" />
              <span className="font-medium">Exit Assessment</span>
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              <span className="font-medium">Reset</span>
            </button>
          </div>
        </div>
      </div>
      <MetaTags
        title="Medical Cannabis Eligibility Assessment UK - Check If You Qualify"
        description="Take our comprehensive 15-question medical cannabis eligibility assessment. Get personalized clinic recommendations and understand your qualification status in minutes."
        keywords={[
          'medical cannabis eligibility assessment',
          'qualify for medical cannabis UK',
          'cannabis clinic finder',
          'medical cannabis prescription UK',
          'eligibility checker medical cannabis'
        ]}
        canonicalUrl="https://comparetheleaf.co.uk/eligibility"
      />

      <ProgressBar
        currentStep={currentStep}
        totalSteps={eligibilityQuestions.length}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {currentStep === 1 && (
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Cannabis Eligibility Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Complete our comprehensive assessment to understand your eligibility and get matched with specialist clinics
            </p>
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
              <Users className="w-4 h-4" />
              <span>{completedAssessments.toLocaleString()} people have completed this assessment</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8">
          <QuestionStep
            question={currentQuestion}
            value={currentValue}
            onChange={handleAnswerChange}
          />

          <div className="mt-10 pt-6 border-t border-gray-200">
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-medium">{submitError}</p>
                <button
                  onClick={() => setSubmitError(null)}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            )}
            <div className="flex justify-between items-center">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </button>
              )}
              <div className="flex-1"></div>
              <button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span>
                      {isLastQuestionInAssessment ? 'Get Your Results' : 'Continue'}
                    </span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Your responses are saved automatically. You can return anytime within 24 hours.</p>
        </div>
      </div>

      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={handleSkipEmail}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
};

export default EligibilityCheckerPage;
