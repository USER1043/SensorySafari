import { useEffect, useRef } from 'react';
import './Confetti.css';

function Confetti({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    
    // Create confetti particles - fewer and calmer for autism-friendly design
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 1 + 1) + 's';
      container.appendChild(confetti);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [active]);

  if (!active) return null;

  return <div ref={containerRef} className="confetti-container" aria-hidden="true" />;
}

export default Confetti;
