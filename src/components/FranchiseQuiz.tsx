import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, DollarSign, Briefcase, Building2, CheckCircle } from 'lucide-react';
import { FranchiseQuizState, FranchiseMatchRequest } from '../types/franchise';

interface FranchiseQuizProps {
  onComplete: (criteria: FranchiseMatchRequest) => void;
  onBack: () => void;
}

const quizSteps = [
  {
    id: 1,
    title: 'What industry interests you most?',
    subtitle: 'Choose the business sector that aligns with your passion',
    icon: Briefcase,
    options: [
      { value: 'Food & Beverage', label: 'Food & Beverage', description: 'Restaurants, cafes, quick service' },
      { value: 'Business Services', label: 'Business Services', description: 'Cleaning, consulting, B2B services' },
      { value: 'Health & Senior Care', label: 'Health & Senior Care', description: 'Home care, wellness, medical' },
      { value: 'Real Estate', label: 'Real Estate', description: 'Property sales, management, investment' },
      { value: 'Education', label: 'Education', description: 'Tutoring, training, child development' },
      { value: 'Retail', label: 'Retail', description: 'Stores, products, consumer goods' },
      { value: 'Automotive', label: 'Automotive', description: 'Car services, parts, maintenance' },
      { value: 'Any Industry', label: 'Any Industry', description: 'Open to all opportunities' }
    ]
  },
  {
    id: 2,
    title: 'What\'s your investment budget?',
    subtitle: 'Select your available capital range for franchise investment',
    icon: DollarSign,
    options: [
      { value: '$5k - $25k', label: '$5,000 - $25,000', description: 'Low investment, home-based options' },
      { value: '$25k - $100k', label: '$25,000 - $100,000', description: 'Service-based franchises' },
      { value: '$100k - $500k', label: '$100,000 - $500,000', description: 'Retail and restaurant opportunities' },
      { value: '$500k+', label: '$500,000+', description: 'Premium franchises and multiple units' }
    ]
  },
  {
    id: 3,
    title: 'What\'s your preferred lifestyle?',
    subtitle: 'Choose the business model that fits your lifestyle goals',
    icon: Building2,
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
    icon: MapPin,
    options: [
      { value: 'Ontario', label: 'Ontario', description: 'Canada\'s largest market' },
      { value: 'Quebec', label: 'Quebec', description: 'French-Canadian market' },
      { value: 'Canada-Wide', label: 'Canada-Wide', description: 'National opportunities' }
    ]
  }
];

export const FranchiseQuiz: React.FC<FranchiseQuizProps> = ({ onComplete, onBack }) => {
  const [quizState, setQuizState] = useState<FranchiseQuizState>({
    currentStep: 1,
    answers: [],
    isComplete: false
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentStepData = quizSteps.find(step => step.id === quizState.currentStep);

  const handleAnswerSelect = (stepId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [stepId]: answer
    }));
  };

  const handleNext = () => {
    const currentAnswer = selectedAnswers[quizState.currentStep];
    if (!currentAnswer) return;

    const newAnswer = {
      step: quizState.currentStep,
      question: currentStepData?.title || '',
      answer: currentAnswer,
      weight: 1
    };

    const updatedAnswers = [...quizState.answers.filter(a => a.step !== quizState.currentStep), newAnswer];

    if (quizState.currentStep === quizSteps.length) {
      // Quiz complete
      const criteria: FranchiseMatchRequest = {
        industry: selectedAnswers[1],
        investmentRange: selectedAnswers[2],
        lifestyle: selectedAnswers[3],
        region: selectedAnswers[4]
      };
      
      setQuizState({
        ...quizState,
        answers: updatedAnswers,
        isComplete: true
      });
      
      onComplete(criteria);
    } else {
      setQuizState({
        ...quizState,
        currentStep: quizState.currentStep + 1,
        answers: updatedAnswers
      });
    }
  };

  const handlePrevious = () => {
    if (quizState.currentStep > 1) {
      setQuizState({
        ...quizState,
        currentStep: quizState.currentStep - 1
      });
    } else {
      onBack();
    }
  };

  const progress = (quizState.currentStep / quizSteps.length) * 100;

  if (!currentStepData) return null;

  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">
              Step {quizState.currentStep} of {quizSteps.length}
            </h2>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentStepData.title}</h1>
                <p className="text-blue-100 mt-1">{currentStepData.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="p-8">
            <div className="grid gap-4">
              {currentStepData.options.map((option) => {
                const isSelected = selectedAnswers[quizState.currentStep] === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(quizState.currentStep, option.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-2 ${
                          isSelected ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </h3>
                        <p className={`text-sm ${
                          isSelected ? 'text-blue-700' : 'text-gray-600'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-blue-500 ml-4" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                {quizState.currentStep === 1 ? 'Back to News' : 'Previous'}
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers[quizState.currentStep]}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedAnswers[quizState.currentStep]
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {quizState.currentStep === quizSteps.length ? 'Find My Matches' : 'Next Step'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {quizSteps.map((step) => (
            <div
              key={step.id}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                step.id <= quizState.currentStep
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};