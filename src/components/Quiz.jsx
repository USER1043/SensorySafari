import { useState, useEffect } from 'react';
import { animals, getRandomAnimals } from '../data/animals';
import './Quiz.css';

function Quiz() {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const generateQuestion = () => {
    const randomAnimals = getRandomAnimals(4);
    const correctAnimal = randomAnimals[0];
    const shuffledOptions = [...randomAnimals].sort(() => Math.random() - 0.5);
    
    setCurrentAnimal(correctAnimal);
    setOptions(shuffledOptions);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
  };

  const startQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setQuizComplete(false);
    generateQuestion();
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const handleAnswerSelect = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    const correct = option.id === currentAnimal.id;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (totalQuestions >= 10) {
      setQuizComplete(true);
    } else {
      generateQuestion();
    }
  };

  const playAnimalSound = (animal) => {
    try {
      const audio = new Audio(animal.sound);
      audio.play().catch(err => {
        console.log('Audio play error:', err);
        // Fallback to text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(animal.name);
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
      });
    } catch (error) {
      console.log('Audio error:', error);
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-complete">
          <h1>🎉 Quiz Complete! 🎉</h1>
          <div className="quiz-results">
            <p className="quiz-score-text">
              You got {score} out of {totalQuestions} correct!
            </p>
            <p className="quiz-percentage">
              {percentage}% Correct
            </p>
            {percentage === 100 && (
              <p className="quiz-perfect">Perfect Score! You're an animal expert! 🌟</p>
            )}
            {percentage >= 80 && percentage < 100 && (
              <p className="quiz-great">Great job! You know your animals! 👏</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="quiz-good">Good work! Keep learning! 💪</p>
            )}
            {percentage < 60 && (
              <p className="quiz-encourage">Keep practicing! You'll get better! 🎓</p>
            )}
          </div>
          <button className="quiz-restart-button" onClick={startQuiz}>
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Animal Quiz</h1>
      <p className="quiz-instructions">
        Look at the animal picture and choose the correct name!
      </p>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(totalQuestions / 10) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Question {totalQuestions + 1} of 10 | Score: {score}/{totalQuestions || 1}
        </p>
      </div>

      {currentAnimal && (
        <>
          <div className="quiz-question">
            <div className="quiz-animal-image-container">
              <img 
                src={currentAnimal.image} 
                alt="What animal is this?"
                className="quiz-animal-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Animal';
                }}
              />
              <button
                className="quiz-sound-button"
                onClick={() => playAnimalSound(currentAnimal)}
                aria-label="Play animal sound"
              >
                🔊 Play Sound
              </button>
            </div>

            <div className="quiz-options">
              <h2 className="options-title">What animal is this?</h2>
              {options.map((option) => {
                const isSelected = selectedAnswer && selectedAnswer.id === option.id;
                const isCorrectOption = option.id === currentAnimal.id;
                let buttonClass = 'quiz-option-button';
                
                if (showResult) {
                  if (isCorrectOption) {
                    buttonClass += ' correct';
                  } else if (isSelected && !isCorrectOption) {
                    buttonClass += ' incorrect';
                  }
                } else if (isSelected) {
                  buttonClass += ' selected';
                }

                return (
                  <button
                    key={option.id}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    aria-pressed={isSelected}
                  >
                    {option.name}
                    {showResult && isCorrectOption && (
                      <span className="option-check">✓</span>
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <span className="option-x">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <div className="quiz-feedback">
              {isCorrect ? (
                <div className="feedback-correct">
                  <h2>🎉 Correct!</h2>
                  <p>Great job! This is a {currentAnimal.name}.</p>
                  <p className="animal-fact">{currentAnimal.facts}</p>
                </div>
              ) : (
                <div className="feedback-incorrect">
                  <h2>❌ Not quite</h2>
                  <p>The correct answer is: <strong>{currentAnimal.name}</strong></p>
                  <p className="animal-fact">{currentAnimal.facts}</p>
                </div>
              )}
              <button className="quiz-next-button" onClick={handleNext}>
                {totalQuestions >= 10 ? 'Finish Quiz' : 'Next Question →'}
              </button>
            </div>
          )}
        </>
      )}

      <button className="quiz-restart-button-secondary" onClick={startQuiz}>
        🔄 Restart Quiz
      </button>
    </div>
  );
}

export default Quiz;