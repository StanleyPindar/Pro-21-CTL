import React from 'react';
import { QuestionOption } from '../../types/eligibility';

interface ConditionSelectorProps {
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
}

const ConditionSelector: React.FC<ConditionSelectorProps> = ({ options, value, onChange }) => {
  const conditionCategories = {
    'Most Common': [
      'chronic-pain',
      'anxiety',
      'insomnia',
      'ptsd'
    ],
    'Neurological': [
      'epilepsy',
      'multiple-sclerosis',
      'other-neurological',
      'tourette'
    ],
    'Inflammatory & Pain': [
      'fibromyalgia',
      'arthritis',
      'ibd'
    ],
    'Cancer & Other': [
      'cancer',
      'depression',
      'other'
    ]
  };

  const optionsByValue = options.reduce((acc, opt) => {
    acc[opt.value] = opt;
    return acc;
  }, {} as Record<string, QuestionOption>);

  return (
    <div className="space-y-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 cursor-pointer hover:border-teal-400 shadow-sm"
      >
        <option value="">Choose your primary condition</option>
        {Object.entries(conditionCategories).map(([category, conditionValues]) => (
          <optgroup key={category} label={category} className="font-semibold text-gray-900">
            {conditionValues.map(conditionValue => {
              const option = optionsByValue[conditionValue];
              if (!option) return null;
              return (
                <option key={option.value} value={option.value} className="py-2">
                  {option.label} - {option.description}
                </option>
              );
            })}
          </optgroup>
        ))}
      </select>

      {value && optionsByValue[value] && (
        <div className="p-5 bg-teal-50 border-2 border-teal-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-teal-900 mb-1">
                {optionsByValue[value].label}
              </h4>
              <p className="text-sm text-teal-700">
                {optionsByValue[value].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionSelector;
