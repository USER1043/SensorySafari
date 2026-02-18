import './GameStartScreen.css';

function GameStartScreen({ icon, title, description, features, onStart, buttonText = 'Start Game 🎮' }) {
    return (
        <div className="start-screen">
            <div className="start-screen-card">
                <div className="start-screen-icon" aria-hidden="true">{icon}</div>
                <h1 className="start-screen-title">{title}</h1>
                <p className="start-screen-description">{description}</p>

                {features && features.length > 0 && (
                    <ul className="start-screen-features">
                        {features.map((feature, index) => (
                            <li key={index} className="start-screen-feature">
                                <span className="feature-bullet" aria-hidden="true">{feature.icon}</span>
                                <span className="feature-label">{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="start-screen-button"
                    onClick={onStart}
                    aria-label={`Start ${title}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default GameStartScreen;
