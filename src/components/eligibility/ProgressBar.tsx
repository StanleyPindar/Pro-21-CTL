import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  completedSteps = []
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-900">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Medical Cannabis Eligibility Assessment
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-blue-600">
              {percentage}%
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">Complete</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between mt-2">
            {Array.from({ length: Math.min(5, totalSteps) }).map((_, index) => {
              const stepNumber = Math.floor((index * totalSteps) / 4) + 1;
              const isCompleted = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center ${index === 0 ? 'items-start' : index === 4 ? 'items-end' : 'items-center'}`}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300
                      ${isCompleted
                        ? 'bg-green-600 text-white shadow-md'
                        : isCurrent
                        ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {currentStep > 0 && currentStep < totalSteps && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              {totalSteps - currentStep} {totalSteps - currentStep === 1 ? 'question' : 'questions'} remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
