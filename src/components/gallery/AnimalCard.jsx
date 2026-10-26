import { useState, useEffect, useRef, useCallback } from 'react';
import './AnimalCard.css';

// Only one card plays at a time: this holds the stop function of the card that is
// currently playing, so starting another card silences it first.
let stopActiveCard = null;

function AnimalCard({ animal, showFacts = false, onClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const releaseActive = useCallback(() => {
    if (stopActiveCard === stopPlayback) {
      stopActiveCard = null;
    }
  }, [stopPlayback]);

  // Update audio object when animal prop changes
  useEffect(() => {
    // Clean up previous audio object
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create new audio object for the current animal
    try {
      const audioObj = new Audio(animal.sound);
      audioObj.onended = () => {
        setIsPlaying(false);
        releaseActive();
      };
      audioObj.onerror = () => {
        setIsPlaying(false);
        releaseActive();
        // Fallback to text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(animal.name);
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
        // MediaError codes: 2 = network, 3 = decode, 4 = not found / unsupported
        console.warn(`[asset] Audio failed to load for ${animal.name} (MediaError ${audioObj.error?.code}): ${animal.sound || '(empty URL)'}`);
      };
      audioRef.current = audioObj;
    } catch (error) {
      console.log('Audio initialization error:', error);
      audioRef.current = null;
    }

    // Cleanup function to pause and remove audio when component unmounts or animal changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      releaseActive();
    };
  }, [animal.sound, releaseActive]);

  const handlePlaySound = (e) => {
    e.stopPropagation(); // Prevent card click if button is clicked

    if (isPlaying) {
      stopPlayback();
      releaseActive();
      return;
    }

    // Silence whichever other card is playing before starting this one
    if (stopActiveCard && stopActiveCard !== stopPlayback) {
      stopActiveCard();
    }
    stopActiveCard = stopPlayback;

    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio play error:', err);
        setIsPlaying(false);
        releaseActive();
      });
      setIsPlaying(true);
    } else if ('speechSynthesis' in window) {
      // Fallback: Use Web Speech API as alternative
      const utterance = new SpeechSynthesisUtterance(`${animal.name} says ${animal.name}`);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
        releaseActive();
      }, 2000);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(animal);
    }
  };

  return (
    <div
      className={`animal-card ${onClick ? 'clickable' : ''}`}
      onClick={handleCardClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={onClick ? `Select ${animal.name}` : `${animal.name} card`}
    >
      <div className="animal-card-image-container">
        <img
          src={animal.image}
          alt={animal.name}
          className="animal-card-image"
          loading="lazy"
          onError={() => console.warn(`[asset] Image failed to load for ${animal.name}: ${animal.image || '(empty URL)'}`)}
        />
      </div>

      <div className="animal-card-content">
        <h3 className="animal-card-name">{animal.name}</h3>

        {showFacts && (
          <div className="animal-card-info">
            <p className="animal-card-habitat">📍 {animal.habitat}</p>
            <p className="animal-card-facts">{animal.facts}</p>
          </div>
        )}

        <button
          className="animal-card-sound-button"
          onClick={handlePlaySound}
          aria-label={`Play ${animal.name} sound`}
          title={`Play ${animal.name} sound`}
        >
          {isPlaying ? '⏸️ Pause Sound' : '🔊 Play Sound'}
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;