import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">🦁 Sensory Safari 🐾</h1>
        <p className="home-subtitle">
          Learn about amazing animals through fun activities!
        </p>
      </div>

      <div className="activities-grid">
        <Link to="/gallery" className="activity-card">
          <div className="activity-icon">🖼️</div>
          <h2 className="activity-title">Animal Gallery</h2>
          <p className="activity-description">
            Browse through our collection of animals. Click on any animal to
            learn more and hear their sound!
          </p>
          <div className="activity-button">Explore Gallery →</div>
        </Link>

        <Link to="/matching" className="activity-card">
          <div className="activity-icon">🎯</div>
          <h2 className="activity-title">Matching Game</h2>
          <p className="activity-description">
            Test your knowledge by matching animal pictures with their names.
            How many can you get right?
          </p>
          <div className="activity-button">Play Game →</div>
        </Link>

        <Link to="/quiz" className="activity-card">
          <div className="activity-icon">❓</div>
          <h2 className="activity-title">Animal Quiz</h2>
          <p className="activity-description">
            Take a quiz to see how well you know animals. Answer 10 questions
            and see your score!
          </p>
          <div className="activity-button">Start Quiz →</div>
        </Link>

        <Link to="/rule-validation" className="activity-card">
          <div className="activity-icon">🔢</div>
          <h2 className="activity-title">Rule Validation</h2>
          <p className="activity-description">
            Check if number patterns follow a rule. Spot the group that
            doesn't belong!
          </p>
          <div className="activity-button">Play Game →</div>
        </Link>
      </div>

      <div className="home-features">
        <h2 className="features-title">Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🔊</span>
            <span className="feature-text">Hear animal sounds</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span className="feature-text">Learn fun facts</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎮</span>
            <span className="feature-text">Play interactive games</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌟</span>
            <span className="feature-text">See progress bar in games</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
