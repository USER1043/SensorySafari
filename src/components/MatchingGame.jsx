import { useState, useEffect } from 'react';
import { animals as allAnimals } from '../data/animals';
import Confetti from './Confetti';
import './MatchingGame.css';

function MatchingGame() {
  const [animals, setAnimals] = useState([]);
  const [animalNames, setAnimalNames] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastMatchedId, setLastMatchedId] = useState(null);

  const startNewGame = () => {
    // Get 6 unique random animals (no duplicates)
    const shuffled = [...allAnimals].sort(() => Math.random() - 0.5);
    const gameAnimals = shuffled.slice(0, 6);
    const names = gameAnimals.map(a => a.name).sort(() => Math.random() - 0.5);
    
    setAnimals(gameAnimals);
    setAnimalNames(names);
    setSelectedAnimal(null);
    setSelectedName(null);
    setMatchedPairs([]);
    setScore(0);
    setGameComplete(false);
    setLastMatchedId(null);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleAnimalClick = (animal) => {
    if (matchedPairs.includes(animal.id)) return;
    
    if (selectedAnimal === animal.id) {
      setSelectedAnimal(null);
    } else {
      setSelectedAnimal(animal.id);
      checkMatch(animal.id, selectedName);
    }
  };

  const handleNameClick = (name) => {
    if (matchedPairs.some(id => {
      const animal = animals.find(a => a.id === id);
      return animal && animal.name === name;
    })) return;

    if (selectedName === name) {
      setSelectedName(null);
    } else {
      setSelectedName(name);
      checkMatch(selectedAnimal, name);
    }
  };

  const playMatchSound = () => {
    // Gentle, calming sound for autism-friendly design
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Simple, gentle tone
      
      gainNode.gain.setValueAtTime(0.12, audioContext.currentTime); // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent fail
    }
  };

  const playErrorSound = () => {
    // Very gentle error sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime); // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      // Silent fail
    }
  };

  const checkMatch = (animalId, name) => {
    if (animalId && name) {
      const animal = animals.find(a => a.id === animalId);
      if (animal && animal.name === name) {
        // Correct match!
        playMatchSound();
        setLastMatchedId(animalId);
        // Subtle confetti for autism-friendly design
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 800); // Shorter duration
        
        setMatchedPairs(prevMatchedPairs => {
          const newMatchedPairs = [...prevMatchedPairs, animalId];
          
          // Check if game is complete using the new state
          setTimeout(() => {
            if (newMatchedPairs.length === animals.length) {
              setGameComplete(true);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 1500); // Shorter duration
            }
          }, 500);
          
          return newMatchedPairs;
        });
        setScore(prevScore => prevScore + 10);
        setSelectedAnimal(null);
        setSelectedName(null);
      } else {
        // Incorrect match
        playErrorSound();
        setTimeout(() => {
          setSelectedAnimal(null);
          setSelectedName(null);
        }, 1000);
      }
    }
  };

  const isMatched = (animalId) => {
    return matchedPairs.includes(animalId);
  };

  const isNameMatched = (name) => {
    return matchedPairs.some(id => {
      const animal = animals.find(a => a.id === id);
      return animal && animal.name === name;
    });
  };

  const isAnimalSelected = (animalId) => {
    return selectedAnimal === animalId;
  };

  const isNameSelected = (name) => {
    return selectedName === name;
  };

  return (
    <div className="matching-game">
      <Confetti active={showConfetti} />
      <h1 className="game-title">Matching Game</h1>
      <p className="game-instructions">
        Click on an animal picture and then click on its name to make a match!
      </p>

      <div className="game-score">
        <div className="score-info">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
          <span className="score-max">/ {animals.length * 10}</span>
        </div>
        <button className="new-game-button" onClick={startNewGame}>
          🔄 New Game
        </button>
      </div>

      {gameComplete && (
        <div className="game-complete" role="alert">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You matched all the animals!</p>
          <p>Final Score: {score}</p>
          <button className="play-again-button" onClick={startNewGame}>
            Play Again
          </button>
        </div>
      )}

      <div className="matching-container">
        <div className="animals-section">
          <h2 className="section-title">Animals</h2>
          <div className="animals-grid">
            {animals.map(animal => (
              <button
                key={animal.id}
                className={`animal-match-card ${
                  isMatched(animal.id) ? 'matched' : ''
                } ${
                  isAnimalSelected(animal.id) ? 'selected' : ''
                } ${
                  lastMatchedId === animal.id ? 'just-matched' : ''
                }`}
                onClick={() => handleAnimalClick(animal)}
                disabled={isMatched(animal.id)}
                aria-label={`Select ${animal.name}`}
              >
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=' + animal.name;
                  }}
                />
                {isMatched(animal.id) && (
                  <span className="match-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="names-section">
          <h2 className="section-title">Names</h2>
          <div className="names-grid">
            {animalNames.map((name, index) => (
              <button
                key={`${name}-${index}`}
                className={`name-button ${
                  isNameMatched(name) ? 'matched' : ''
                } ${
                  isNameSelected(name) ? 'selected' : ''
                }`}
                onClick={() => handleNameClick(name)}
                disabled={isNameMatched(name)}
                aria-label={`Select name ${name}`}
              >
                {name}
                {isNameMatched(name) && (
                  <span className="match-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchingGame;