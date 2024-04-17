import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { QuestionScreen } from '@/components';
import questionsStructure from '../structure.json'; // Ensure the path is correct

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});
  const router = useRouter();

  const questions = Object.keys(questionsStructure);
  const totalQuestions = 3;

  // Function to update quiz responses
  const updateQuizResponse = (questionId, selectedOption) => {
    setQuizResponses({
      ...quizResponses,
      [questionId]: selectedOption
    });
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  // Function to handle the submission of the quiz
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080//quiz?quiz=${JSON.stringify(quizResponses)}`);
      console.log('Server response:', response.data);
      // Serialize userMovies data to a JSON string
      const userMoviesString = JSON.stringify(response.data.user_movies);
      // Pass the string as a query parameter
      router.push(`/movies?userMovies=${encodeURIComponent(userMoviesString)}`);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  // Get the current question ID
  const currentQuestionId = questions[currentQuestionIndex];

  return (
    <div>
      <QuestionScreen 
        questionId={currentQuestionId}
        updateQuizResponse={updateQuizResponse}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === totalQuestions - 1}
      />
    </div>
  );
};

export default Quiz;
