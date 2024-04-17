import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import questionsStructure from '../structure.json'; // Ensure the path to structure.json is correct

const QuestionScreen = ({ questionId, updateQuizResponse, onNextQuestion, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const questionData = questionsStructure[questionId];

  if (!questionData) {
    return <div>Question not found</div>;
  }

  // Function to handle option click
  const handleOptionClick = (optionKey) => {
    setSelectedOption(optionKey);
    updateQuizResponse(questionId, optionKey);

    // Scroll to end of page on last question
    if (isLastQuestion) {
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 300);
    }
  };

  // Function to handle next question or submit
  const handleNextOrSubmit = () => {
    if (selectedOption) {
      onNextQuestion();
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navigation and user profile at the top */}
      <div className="flex justify-between p-4 items-center">
        <img src="./logo.png" alt="Dice Logo" className="h-10" />
        <div className="flex space-x-4">
          <a href="/features" className="text-blue-400">Features</a>
          <a href="/about-us" className="text-blue-400">About us</a>
          <FaUser className="text-blue-400 text-2xl" />
        </div>
      </div>

      {/* Question Section */}
      <div className="flex flex-col items-center p-8">
        <div className="text-2xl font-bold text-black mb-8">{questionData.question}</div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          {Object.entries(questionData.options).map(([optionKey, option]) => (
            <button key={optionKey} onClick={() => handleOptionClick(optionKey)} className={`group focus:outline-none ${selectedOption === optionKey ? 'ring-2 ring-purple-500' : ''}`}>
              <img src={option.image} alt={option.short_text} className="rounded-lg" />
              <p className="mt-2 text-center text-base font-semibold leading-relaxed">{option.short_text}</p> {/* Updated font size and line height */}
            </button>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="mt-auto flex justify-between items-center p-4">
        <button className="flex items-center text-blue-400" onClick={handleNextOrSubmit}>
          <BsArrowLeft className="mr-2" />
          Previous
        </button>
        <div className="flex items-center">
          <button className="text-blue-400 mr-8" onClick={handleNextOrSubmit}>Skip</button>
          <button className={`bg-gradient-to-r from-purple-600 to-blue-400 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${!selectedOption && 'opacity-50 cursor-not-allowed'}`} onClick={handleNextOrSubmit} disabled={!selectedOption}>
            {isLastQuestion ? 'Submit' : 'Next'}
            <BsArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { QuestionScreen };
