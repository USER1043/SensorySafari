import { useState, useEffect } from 'react';
import { getRandomAnimals } from '../data/animals';
import './MatchingGame.css';

function MatchingGame() {
  const [animals, setAnimals] = useState([]);
  const [animalNames, setAnimalNames] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const startNewGame = () => {
    const gameAnimals = getRandomAnimals(6);
    const names = gameAnimals.map(a => a.name).sort(() => Math.random() - 0.5);
    
    setAnimals(gameAnimals);
    setAnimalNames(names);
    setSelectedAnimal(null);
    setSelectedName(null);
    setMatchedPairs([]);
    setScore(0);
    setGameComplete(false);
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

  const checkMatch = (animalId, name) => {
    if (animalId && name) {
      const animal = animals.find(a => a.id === animalId);
      if (animal && animal.name === name) {
        // Correct match!
        setMatchedPairs(prevMatchedPairs => {
          const newMatchedPairs = [...prevMatchedPairs, animalId];
          
          // Check if game is complete using the new state
          setTimeout(() => {
            if (newMatchedPairs.length === animals.length) {
              setGameComplete(true);
            }
          }, 500);
          
          return newMatchedPairs;
        });
        setScore(prevScore => prevScore + 10);
        setSelectedAnimal(null);
        setSelectedName(null);
      } else {
        // Incorrect match
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
      <h1 className="game-title">Matching Game</h1>
      <p className="game-instructions">
        Click on an animal picture and then click on its name to make a match!
      </p>

      <div className="game-score">
        <span>Score: {score}</span>
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