import { useState, useEffect, useRef } from 'react';
import './AnimalCard.css';

function AnimalCard({ animal, showFacts = false, onClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
      audioObj.onended = () => setIsPlaying(false);
      audioObj.onerror = () => {
        // Handle missing audio files gracefully
        console.log(`Audio file not found: ${animal.sound}`);
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
    };
  }, [animal.sound]);

  const handlePlaySound = (e) => {
    e.stopPropagation(); // Prevent card click if button is clicked
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play error:', err);
          // Fallback: could show a message or use text-to-speech
        });
        setIsPlaying(true);
      }
    } else {
      // Fallback: Use Web Speech API as alternative
      if ('speechSynthesis' in window && !isPlaying) {
        const utterance = new SpeechSynthesisUtterance(`${animal.name} says ${animal.name}`);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 2000);
      }
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
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = 'https://via.placeholder.com/300x300?text=' + animal.name;
          }}
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