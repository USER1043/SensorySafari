import { Link } from "react-router-dom";
import "./About.css";

function About() {
    return (
        <div className="about-container">
            {/* Hero Section */}
            <div className="about-hero">
                <h1 className="about-hero-title">🦁 Product Description & Team 🐾</h1>
                <p className="about-hero-subtitle">Lab Evaluation 2 Submission</p>
                <Link to="/" className="about-back-btn">
                    ← Back to App
                </Link>
            </div>

            {/* Content Grid */}
            <div className="about-content">
                {/* Product Details Card */}
                <div className="about-card product-details">
                    <div className="about-section-header">
                        <div className="about-section-icon">🐾</div>
                        <h2 className="about-section-title">Product Details</h2>
                    </div>

                    <div className="product-info-row">
                        <div className="product-info-item">
                            <div className="product-info-label">Product Name</div>
                            <div className="product-info-value">Sensory Safari</div>
                        </div>
                        <div className="product-info-item">
                            <div className="product-info-label">Version</div>
                            <div className="product-info-value">
                                2.0 <span>(Lab 2 Extension)</span>
                            </div>
                        </div>
                    </div>

                    <div className="extension-badge">
                        <div className="extension-badge-title">Extension Feature</div>
                        <p>
                            Maths-based learning module specifically designed for autism
                            accessibility, featuring visual counting, patterns, and comparison
                            games.
                        </p>
                    </div>

                    <p className="product-description">
                        Sensory Safari is a sensory-friendly platform for children to learn
                        about animals through interactive sound identification, image
                        galleries, matching games, quizzes, and rule-based pattern
                        recognition — all designed with autism accessibility in mind.
                    </p>
                </div>

                {/* Student Card */}
                <div className="about-card student-card">
                    <div className="student-avatar">👨‍🎓</div>
                    {/* TODO: Replace with your name */}
                    <h2 className="student-name">Prajan Karthik V</h2>
                    {/* TODO: Replace with your roll number */}
                    <div className="student-roll">CB.SC.U4CSE23439</div>
                    <div className="student-role">Student Collaborator</div>
                    <div className="student-specialization">Full Stack Development</div>
                </div>

                {/* Repository & Collaboration Card */}
                <div className="about-card repo-card">
                    <div className="about-section-header">
                        <div className="about-section-icon">🔗</div>
                        <h2 className="about-section-title">Repository & Collaboration</h2>
                    </div>

                    <div className="repo-content">
                        <div className="repo-item">
                            <div className="repo-item-label">Product Page</div>
                            <a
                                href="https://github.com/USER1043/SensorySafari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="repo-link"
                            >
                                View on GitHub ↗
                            </a>
                        </div>
                        <div className="repo-item">
                            <div className="repo-item-label">Collaborator - Academic</div>
                            <a
                                href="https://www.amrita.edu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="collab-item">
                                    <span className="collab-icon">🏫</span>
                                    Amrita Vishwa Vidyapeetham
                                </div>
                            </a>
                            <div className="repo-item-label" style={{ marginTop: "16px" }}>
                                Collaborator - Industry
                            </div>
                            <div className="collab-item">
                                <span className="collab-icon">🌐</span>
                                Open Source
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Details Card */}
                <div className="about-card course-card">
                    <div className="about-section-header">
                        <div className="about-section-icon">📖</div>
                        <h2 className="about-section-title">Course Details</h2>
                    </div>

                    <div className="course-code-badge">
                        <div className="course-code-label">Course Code</div>
                        <div className="course-code-value">23CSE461</div>
                    </div>

                    <div className="professor-name">Dr. T. Senthil Kumar</div>
                    <div className="professor-title">Professor</div>
                    <address className="professor-address">
                        Amrita School of Computing
                        <br />
                        Amrita Vishwa Vidyapeetham
                        <br />
                        Coimbatore - 641112
                    </address>

                    <a
                        href="mailto:t_senthilkumar@cb.amrita.edu"
                        className="professor-email"
                    >
                        ✉️ t_senthilkumar@cb.amrita.edu
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
