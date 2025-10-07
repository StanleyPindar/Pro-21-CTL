import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface QuizOption {
  value: string;
  label: string;
  description: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (value: string) => void;
  onBack: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  currentQuestion,
  totalQuestions,
  progress,
  onAnswer,
  onBack
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          {currentQuestion > 0 && (
            <button
              onClick={onBack}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{question}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
