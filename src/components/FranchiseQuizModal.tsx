import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface QuizStep {
  id: number;
  title: string;
  subtitle: string;
  options: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    title: 'What industry interests you most?',
    subtitle: 'Choose the business sector that aligns with your passion',
    options: [
      { value: 'Food & Beverage', label: 'Food & Beverage', description: 'Restaurants, cafes, quick service' },
      { value: 'Business Services', label: 'Business Services', description: 'Cleaning, consulting, B2B services' },
      { value: 'Real Estate', label: 'Real Estate', description: 'Property sales, management, investment' },
      { value: 'Education', label: 'Education', description: 'Tutoring, training, child development' },
      { value: 'Retail', label: 'Retail', description: 'Stores, products, consumer goods' },
      { value: 'Any Industry', label: 'Any Industry', description: 'Open to all opportunities' }
    ]
  },
  {
    id: 2,
    title: 'What\'s your investment budget?',
    subtitle: 'Select your available capital range for franchise investment',
    options: [
      { value: '$5k - $25k', label: '$5,000 - $25,000', description: 'Low investment, home-based options' },
      { value: '$25k - $100k', label: '$25,000 - $100,000', description: 'Service-based franchises' },
      { value: '$100k+', label: '$100,000+', description: 'Retail and restaurant opportunities' }
    ]
  },
  {
    id: 3,
    title: 'What\'s your preferred lifestyle?',
    subtitle: 'Choose the business model that fits your lifestyle goals',
    options: [
      { value: 'Work from Home', label: 'Work from Home', description: 'Manage remotely, flexible schedule' },
      { value: 'Retail Storefront', label: 'Retail Storefront', description: 'Customer-facing, fixed location' },
      { value: 'Service-Based', label: 'Service-Based', description: 'Mobile services, client visits' },
      { value: 'B2B Operations', label: 'B2B Operations', description: 'Business-to-business focus' }
    ]
  },
  {
    id: 4,
    title: 'Where do you want to operate?',
    subtitle: 'Select your preferred business region in Canada',
    options: [
      { value: 'Ontario', label: 'Ontario', description: 'Canada\'s largest market' },
      { value: 'Quebec', label: 'Quebec', description: 'French-Canadian market' },
      { value: 'Canada-Wide', label: 'Canada-Wide', description: 'National opportunities' }
    ]
  }
];

// Import real franchise data
import { fetchRealTimeFranchises, getMatchingFranchises } from '../data/franchiseData';

interface FranchiseQuizModalProps {
  onClose: () => void;
  onComplete: (matches: any[]) => void;
}

export const FranchiseQuizModal: React.FC<FranchiseQuizModalProps> = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentStepData = quizSteps.find(step => step.id === currentStep);
  const progress = (currentStep / quizSteps.length) * 100;

  const handleAnswerSelect = (stepId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep === quizSteps.length) {
      // Quiz complete - find matches
      findMatches(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const findMatches = async (userAnswers: Record<number, string>) => {
    const industry = userAnswers[1];
    const budget = userAnswers[2];
    const lifestyle = userAnswers[3];
    const region = userAnswers[4];

    console.log('=== QUIZ COMPLETED ===');
    console.log('User selected:', { industry, budget, lifestyle, region });
    
    const criteria = {
      industry,
      investmentRange: budget,
      lifestyle,
      region
    };

    console.log('Calling getMatchingFranchises with criteria:', criteria);
    const localMatches = getMatchingFranchises(criteria);
    console.log('=== FINAL MATCHES ===');
    console.log('Number of matches found:', localMatches.length);
    console.log('Matches:', localMatches.map(m => `${m.name} (${m.industry})`));
    onComplete(localMatches);
  };

  if (!currentStepData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Franchise Matching Quiz</h2>
            <p className="text-gray-600">Step {currentStep} of {quizSteps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{currentStepData.title}</h3>
          <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>

          {/* Options */}
          <div className="space-y-3">
            {currentStepData.options.map((option) => {
              const isSelected = answers[currentStep] === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(currentStep, option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        isSelected ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </h4>
                      <p className={`text-sm ${
                        isSelected ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentStep]}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              answers[currentStep]
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === quizSteps.length ? 'Find Matches' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};