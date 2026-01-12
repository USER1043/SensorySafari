import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="main-navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/favicon.png" alt="Animal Learning" className="nav-logo-icon" style={{width: '1.5em', height: '1.5em'}}/>
          Animal Learning
        </Link>
        
        <button 
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`} id="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
              onClick={closeMenu}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
              aria-current={isActive('/gallery') ? 'page' : undefined}
              onClick={closeMenu}
            >
              🖼️ Gallery
            </Link>
          </li>
          <li>
            <Link 
              to="/matching" 
              className={`nav-link ${isActive('/matching') ? 'active' : ''}`}
              aria-current={isActive('/matching') ? 'page' : undefined}
              onClick={closeMenu}
            >
              🎯 Matching Game
            </Link>
          </li>
          <li>
            <Link 
              to="/quiz" 
              className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
              aria-current={isActive('/quiz') ? 'page' : undefined}
              onClick={closeMenu}
            >
              ❓ Quiz
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;