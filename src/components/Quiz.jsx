import { useState, useEffect, useRef } from 'react';
import { animals, getRandomAnimals } from '../data/animals';
import Confetti from './Confetti';
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [usedAnimalIds, setUsedAnimalIds] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const generateQuestion = () => {
    // Stop any playing audio when new question loads
    stopAnimalSound();
    
    // Get animals that haven't been used yet
    const availableAnimals = animals.filter(animal => !usedAnimalIds.includes(animal.id));
    
    // If we've used all animals, reset (but keep score)
    if (availableAnimals.length < 4) {
      setUsedAnimalIds([]);
      const randomAnimals = getRandomAnimals(4);
      const correctAnimal = randomAnimals[0];
      const shuffledOptions = [...randomAnimals].sort(() => Math.random() - 0.5);
      
      setCurrentAnimal(correctAnimal);
      setOptions(shuffledOptions);
      setUsedAnimalIds([correctAnimal.id]);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
      return;
    }
    
    // Get 4 random animals from available ones
    const shuffled = [...availableAnimals].sort(() => Math.random() - 0.5);
    const randomAnimals = shuffled.slice(0, 4);
    const correctAnimal = randomAnimals[0];
    const shuffledOptions = [...randomAnimals].sort(() => Math.random() - 0.5);
    
    setCurrentAnimal(correctAnimal);
    setOptions(shuffledOptions);
    setUsedAnimalIds(prev => [...prev, correctAnimal.id]);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
  };

  const startQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setQuizComplete(false);
    setUsedAnimalIds([]);
    setCurrentStreak(0);
    setBestStreak(0);
    generateQuestion();
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const playSuccessSound = () => {
    // Gentle, calming success sound for autism-friendly design
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 - gentle tone
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Much quieter
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent fail - no sound is better than jarring sound
    }
  };

  const playErrorSound = () => {
    // Very gentle error sound - just a soft tone
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Silent fail
    }
  };

  const handleAnswerSelect = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    const correct = option.id === currentAnimal.id;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);
    
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      // Subtle confetti for autism-friendly design
      setShowConfetti(true);
      setCelebrating(true);
      playSuccessSound();
      setTimeout(() => {
        setShowConfetti(false);
        setCelebrating(false);
      }, 1000); // Shorter duration
    } else {
      setCurrentStreak(0); // Reset streak on wrong answer
      playErrorSound();
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
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsAudioPlaying(false);
    }

    try {
      const audio = new Audio(animal.sound);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsAudioPlaying(false);
        audioRef.current = null;
      };
      
      audio.onerror = () => {
        console.log('Audio play error');
        setIsAudioPlaying(false);
        audioRef.current = null;
        // Fallback to text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(animal.name);
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
      };
      
      audio.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(err => {
        console.log('Audio play error:', err);
        setIsAudioPlaying(false);
        audioRef.current = null;
      });
    } catch (error) {
      console.log('Audio error:', error);
      setIsAudioPlaying(false);
    }
  };

  const stopAnimalSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsAudioPlaying(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
            {bestStreak > 0 && (
              <p className="best-streak">Best Streak: {bestStreak} correct in a row! 🌟</p>
            )}
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
      <Confetti active={showConfetti} />
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
        <div className="progress-stats">
          <p className="progress-text">
            Question {totalQuestions + 1} of 10
          </p>
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}/{totalQuestions || 1}</span>
            {currentStreak > 0 && (
              <span className="streak-indicator">🔥 {currentStreak} in a row!</span>
            )}
          </div>
        </div>
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
              <div className="audio-controls">
                <button
                  className="quiz-sound-button"
                  onClick={() => isAudioPlaying ? stopAnimalSound() : playAnimalSound(currentAnimal)}
                  aria-label={isAudioPlaying ? "Stop animal sound" : "Play animal sound"}
                >
                  {isAudioPlaying ? '⏸️ Stop Sound' : '🔊 Play Sound'}
                </button>
              </div>
            </div>

            <div className={`quiz-options ${celebrating ? 'celebrating' : ''}`}>
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
                <div className={`feedback-correct ${celebrating ? 'celebrate' : ''}`}>
                  <h2 className="celebration-text">🎉 Correct! 🎉</h2>
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