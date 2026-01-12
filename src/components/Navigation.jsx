import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="main-navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🦁 Animal Learning
        </Link>
        
        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
              aria-current={isActive('/gallery') ? 'page' : undefined}
            >
              🖼️ Gallery
            </Link>
          </li>
          <li>
            <Link 
              to="/matching" 
              className={`nav-link ${isActive('/matching') ? 'active' : ''}`}
              aria-current={isActive('/matching') ? 'page' : undefined}
            >
              🎯 Matching Game
            </Link>
          </li>
          <li>
            <Link 
              to="/quiz" 
              className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
              aria-current={isActive('/quiz') ? 'page' : undefined}
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