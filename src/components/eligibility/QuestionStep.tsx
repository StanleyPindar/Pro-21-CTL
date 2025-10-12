import React from 'react';
import {
  Activity, Heart, CloudRain, AlertCircle, Moon, Zap,
  Brain, Shield, User, Compass, MoreHorizontal, Cpu
} from 'lucide-react';
import { Question, QuestionOption } from '../../types/eligibility';

interface QuestionStepProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'activity': Activity,
  'heart': Heart,
  'cloud-rain': CloudRain,
  'alert-circle': AlertCircle,
  'moon': Moon,
  'zap': Zap,
  'brain': Brain,
  'shield': Shield,
  'user': User,
  'compass': Compass,
  'more-horizontal': MoreHorizontal,
  'cpu': Cpu,
  'bone': Activity
};

const QuestionStep: React.FC<QuestionStepProps> = ({ question, value, onChange }) => {
  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultipleSelect = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter(v => v !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

  const isSelected = (optionValue: string): boolean => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  if (question.type === 'visual-cards') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {question.question}
          </h2>
          <p className="text-gray-600">Select the condition that best describes your situation</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.options.map((option) => {
            const IconComponent = option.icon ? iconMap[option.icon] : Activity;
            const selected = isSelected(option.value);

            return (
              <button
                key={option.value}
                onClick={() => handleSingleSelect(option.value)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                  ${selected
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex flex-col items-start space-y-3">
                  <div className={`
                    p-3 rounded-lg transition-colors
                    ${selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg mb-1 ${selected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {option.label}
                    </h3>
                    <p className={`text-sm ${selected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
                {selected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === 'scale') {
    const scaleValue = typeof value === 'string' ? parseInt(value) : 0;

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {question.question}
          </h2>
          <p className="text-gray-600">Rate your symptoms from 1 (minimal) to 10 (debilitating)</p>
        </div>

        <div className="space-y-6">
          <div className="relative pt-8 pb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Minimal</span>
              <span className="text-sm font-medium text-gray-600">Moderate</span>
              <span className="text-sm font-medium text-gray-600">Debilitating</span>
            </div>
            <div className="relative h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full">
              <div
                className="absolute h-4 w-4 bg-blue-600 rounded-full shadow-lg -top-1 transform -translate-x-1/2 cursor-pointer"
                style={{ left: `${(scaleValue / 10) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={scaleValue || 1}
              onChange={(e) => handleSingleSelect(e.target.value)}
              className="absolute top-0 left-0 w-full h-16 opacity-0 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {question.options.map((option) => {
              const optionValue = parseInt(option.value);
              const selected = scaleValue === optionValue;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect(option.value)}
                  className={`
                    p-4 rounded-lg border-2 text-center transition-all duration-200
                    ${selected
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                    }
                  `}
                >
                  <div className={`text-2xl font-bold mb-1 ${selected ? 'text-blue-600' : 'text-gray-900'}`}>
                    {option.value}
                  </div>
                  <div className={`text-xs ${selected ? 'text-blue-700' : 'text-gray-600'}`}>
                    {option.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {scaleValue > 0 && (
          <div className={`
            p-4 rounded-lg border-2
            ${scaleValue <= 3 ? 'border-green-200 bg-green-50' :
              scaleValue <= 6 ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'}
          `}>
            <p className={`font-medium ${
              scaleValue <= 3 ? 'text-green-900' :
              scaleValue <= 6 ? 'text-yellow-900' :
              'text-red-900'
            }`}>
              {scaleValue <= 3 && 'Mild symptoms - manageable with some support'}
              {scaleValue > 3 && scaleValue <= 6 && 'Moderate symptoms - significantly impacting daily life'}
              {scaleValue > 6 && 'Severe symptoms - major impact on quality of life'}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (question.type === 'multiple') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {question.question}
          </h2>
          <p className="text-gray-600">Select all that apply</p>
        </div>
        <div className="space-y-3">
          {question.options.map((option) => {
            const selected = isSelected(option.value);

            return (
              <button
                key={option.value}
                onClick={() => handleMultipleSelect(option.value)}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-start space-x-4
                  ${selected
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                  ${selected
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {selected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium mb-1 ${selected ? 'text-blue-900' : 'text-gray-900'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-sm ${selected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {option.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {question.question}
        </h2>
        <p className="text-gray-600">Select the option that best applies to you</p>
      </div>
      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = isSelected(option.value);

          return (
            <button
              key={option.value}
              onClick={() => handleSingleSelect(option.value)}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                ${selected
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`font-medium mb-1 ${selected ? 'text-blue-900' : 'text-gray-900'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-sm ${selected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {option.description}
                    </div>
                  )}
                </div>
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 transition-colors
                  ${selected
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {selected && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionStep;
