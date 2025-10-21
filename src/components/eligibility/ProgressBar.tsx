import React from 'react';
import { CheckCircle } from 'lucide-react';
import { getSectionFromStep, getProgressMessage, TOTAL_SECTIONS } from '../../utils/sectionUtils';

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
  const currentSection = getSectionFromStep(currentStep);
  const progressMessage = getProgressMessage(percentage);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-teal-700">
              Section {currentSection} of {TOTAL_SECTIONS}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Medical Assessment
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 hidden sm:inline">{percentage}% complete</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between mt-3">
            {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => {
              const sectionNumber = index + 1;
              const isCompleted = currentSection > sectionNumber;
              const isCurrent = currentSection === sectionNumber;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center ${index === 0 ? 'items-start' : index === TOTAL_SECTIONS - 1 ? 'items-end' : 'items-center'}`}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                      ${isCompleted
                        ? 'bg-teal-600 text-white shadow-lg'
                        : isCurrent
                        ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100'
                        : 'bg-gray-200 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      sectionNumber
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {percentage > 0 && percentage < 100 && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-teal-700">
              {progressMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
