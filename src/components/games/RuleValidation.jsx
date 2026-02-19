import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameStartScreen from './GameStartScreen';
import './RuleValidation.css';

/* ───────────────────────────────────────────
   Difficulty levels & rule pools
   ─────────────────────────────────────────── */

const LEVEL_RULES = {
    1: [
        { label: 'Add 1 each time', op: 'add', value: 1 },
        { label: 'Add 2 each time', op: 'add', value: 2 },
        { label: 'Add 3 each time', op: 'add', value: 3 },
    ],
    2: [
        { label: 'Add 5 each time', op: 'add', value: 5 },
        { label: 'Subtract 1 each time', op: 'sub', value: 1 },
    ],
    3: [
        { label: 'Subtract 2 each time', op: 'sub', value: 2 },
        { label: 'Multiply by 2 each time', op: 'mul', value: 2 },
    ],
    4: [
        { label: 'Multiply by 3 each time', op: 'mul', value: 3 },
    ],
};

/* Max balls in any single group, per level — keeps Level 1 visually simple */
const LEVEL_MAX_BALLS = { 1: 15, 2: 20, 3: 30, 4: 40 };

/* Valid start ranges so every group stays between 1 and the level cap */
function getStartRange(op, value, length, level) {
    const cap = LEVEL_MAX_BALLS[level] || 40;
    const steps = length - 1; // 4 steps
    if (op === 'add') {
        const maxStart = cap - value * steps;
        return { min: 1, max: Math.max(1, maxStart) };
    }
    if (op === 'sub') {
        const minStart = 1 + value * steps;
        return { min: Math.min(cap, minStart), max: cap };
    }
    if (op === 'mul') {
        const maxStart = Math.floor(cap / Math.pow(value, steps));
        return { min: 1, max: Math.max(1, maxStart) };
    }
    return { min: 1, max: Math.min(10, cap) };
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function applyOp(n, op, value) {
    if (op === 'add') return n + value;
    if (op === 'sub') return n - value;
    if (op === 'mul') return n * value;
    return n;
}

/* ───────────────────────────────────────────
   Interest-based themes
   ─────────────────────────────────────────── */

const THEMES = {
    default: { label: 'Balls', icon: '🔵', emojis: null },
    animals: { label: 'Animals', icon: '🐶', emojis: ['🐶', '🐱', '🐰', '🐻', '🐼'] },
    cars: { label: 'Cars', icon: '🚗', emojis: ['🚗', '🏎️', '🚙', '🛻', '🚕'] },
    space: { label: 'Space', icon: '⭐', emojis: ['⭐', '🪐', '🚀', '🌙', '☄️'] },
};

/* Emoji icons need slightly larger sizes to stay legible */
function getThemedSize(size) {
    return Math.max(size + 2, 10);
}

/* ───────────────────────────────────────────
   Question generator
   ─────────────────────────────────────────── */

const GROUP_COUNT = 5;
const TOTAL_QUESTIONS = 10;

function generateQuestion(level) {
    const rule = pickRandom(LEVEL_RULES[level]);
    const range = getStartRange(rule.op, rule.value, GROUP_COUNT, level);
    const start = randInt(range.min, range.max);

    // Build correct sequence
    const sequence = [start];
    for (let i = 1; i < GROUP_COUNT; i++) {
        sequence.push(applyOp(sequence[i - 1], rule.op, rule.value));
    }

    // Keep a copy of the correct sequence for feedback
    const correctSequence = [...sequence];

    // Decide valid vs invalid (≈50 / 50)
    const isValid = Math.random() < 0.5;
    let wrongIndex = -1;

    if (!isValid) {
        // Pick one index to corrupt (never the first)
        wrongIndex = randInt(1, GROUP_COUNT - 1);
        const correct = sequence[wrongIndex];
        // Offset by ±1‒3 but stay 1–40 and don't accidentally match correct value
        let offset;
        let attempts = 0;
        do {
            offset = pickRandom([-3, -2, -1, 1, 2, 3]);
            attempts++;
        } while (
            (correct + offset < 1 || correct + offset > 40 || correct + offset === correct) &&
            attempts < 20
        );
        sequence[wrongIndex] = Math.max(1, Math.min(40, correct + offset));
        // If after clamping it matches the correct value, force a different value
        if (sequence[wrongIndex] === correct) {
            sequence[wrongIndex] = correct >= 3 ? correct - 2 : correct + 2;
            sequence[wrongIndex] = Math.max(1, Math.min(40, sequence[wrongIndex]));
        }
    }

    return {
        rule: rule.label,
        ruleOp: rule.op,
        ruleValue: rule.value,
        sequence,
        correctSequence,
        isValid,
        wrongIndex,
    };
}

function generateQuestionSet(level) {
    return Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(level));
}

/* ───────────────────────────────────────────
   Ball-group sizing helper
   Keeps balls from overflowing the container.
   For groups > 20 we shrink ball size;
   we arrange balls in rows of a computed width.
   ─────────────────────────────────────────── */

function getBallStyle(count) {
    if (count <= 12) return { size: 12, cols: 4 };
    if (count <= 20) return { size: 10, cols: 5 };
    if (count <= 30) return { size: 8, cols: 6 };
    return { size: 7, cols: 7 }; // up to 40
}

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */

function RuleValidation() {
    const [gameStarted, setGameStarted] = useState(false);
    const [theme, setTheme] = useState('default');
    const [questions, setQuestions] = useState(() => generateQuestionSet(1));
    const [index, setIndex] = useState(0);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [correctStreak, setCorrectStreak] = useState(0);
    const [mistakeStreak, setMistakeStreak] = useState(0);
    const [feedback, setFeedback] = useState(null);      // 'correct' | 'incorrect'
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // 'correct' | 'wrong'
    const [gameComplete, setGameComplete] = useState(false);

    const feedbackRef = useRef(null);

    // Scroll to feedback when it appears
    useEffect(() => {
        if (showFeedback && feedbackRef.current) {
            feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [showFeedback]);


    const current = questions[index];

    /* ---- Adaptive difficulty ---- */

    const adjustLevel = useCallback(
        (newCorrectStreak, newMistakeStreak) => {
            let newLevel = level;
            if (newCorrectStreak >= 3 && level < 4) {
                newLevel = level + 1;
            } else if (newMistakeStreak >= 2 && level > 1) {
                newLevel = level - 1;
            }
            if (newLevel !== level) {
                setLevel(newLevel);
                // Regenerate remaining questions at new level
                const remaining = TOTAL_QUESTIONS - (index + 1);
                if (remaining > 0) {
                    const newQs = Array.from({ length: remaining }, () =>
                        generateQuestion(newLevel),
                    );
                    setQuestions((prev) => [
                        ...prev.slice(0, index + 1),
                        ...newQs,
                    ]);
                }
                // Reset streaks when level changes
                return { resetStreaks: true };
            }
            return { resetStreaks: false };
        },
        [level, index],
    );

    /* ---- Handlers ---- */

    const advanceToNext = () => {
        if (index + 1 >= TOTAL_QUESTIONS) {
            setGameComplete(true);
            return;
        }
        setIndex((i) => i + 1);
        setFeedback(null);
        setShowFeedback(false);
        setSelectedAnswer(null);
    };

    const handleAnswer = (answer) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrectAnswer =
            (answer === 'correct' && current.isValid) ||
            (answer === 'wrong' && !current.isValid);

        if (isCorrectAnswer) {
            setFeedback('correct');
            setScore((s) => s + 1);
            const newCorrect = correctStreak + 1;
            setCorrectStreak(newCorrect);
            setMistakeStreak(0);
            const result = adjustLevel(newCorrect, 0);
            if (result.resetStreaks) {
                setCorrectStreak(0);
            }
            setTimeout(advanceToNext, 2000);
        } else {
            setFeedback('incorrect');
            const newMistake = mistakeStreak + 1;
            setMistakeStreak(newMistake);
            setCorrectStreak(0);
            const result = adjustLevel(0, newMistake);
            if (result.resetStreaks) {
                setMistakeStreak(0);
            }
            setTimeout(advanceToNext, 4000);
        }
    };

    const handlePlayAgain = () => {
        const newLevel = 1;
        setLevel(newLevel);
        setQuestions(generateQuestionSet(newLevel));
        setIndex(0);
        setScore(0);
        setCorrectStreak(0);
        setMistakeStreak(0);
        setFeedback(null);
        setShowFeedback(false);
        setSelectedAnswer(null);
        setGameComplete(false);
    };



    /* ---- Completion screen ---- */

    if (!gameStarted) {
        return (
            <GameStartScreen
                icon="🔢"
                title="Rule Validation Game"
                description="Check if number patterns follow a rule. Can you spot the group that doesn't belong?"
                features={[
                    { icon: '🔍', text: 'Examine number patterns' },
                    { icon: '✅', text: 'Decide if they follow the rule' },
                    { icon: '📈', text: 'Difficulty adapts to you' },
                    { icon: '🔟', text: '10 questions per round' },
                ]}
                onStart={() => setGameStarted(true)}
                buttonText="Start Game 🎯"
            />
        );
    }

    if (gameComplete) {
        return (
            <div className="rv-container">
                <div className="rv-complete">
                    <div className="rv-complete-star">⭐</div>
                    <h1 className="rv-complete-title">Great Work!</h1>
                    <p className="rv-complete-subtitle">
                        You completed the Rule Validation Game
                    </p>
                    <p className="rv-complete-score">
                        {score} / {TOTAL_QUESTIONS}
                    </p>
                    <div className="rv-complete-buttons">
                        <button className="rv-play-again-btn" onClick={handlePlayAgain}>
                            🔄 Play Again
                        </button>
                        <Link to="/" className="rv-home-link">
                            🏠 Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* ---- Active game screen ---- */

    const progressPct = (index / TOTAL_QUESTIONS) * 100;

    // Determine if we should show the wrong group highlight
    const highlightWrong =
        showFeedback && feedback === 'correct' && !current.isValid;
    // Also show highlight when user selected Wrong and they were correct
    // (i.e. the sequence IS wrong and user identified it)
    const showWrongGroup =
        highlightWrong ||
        (showFeedback && feedback === 'incorrect' && !current.isValid);

    return (
        <div className="rv-container">
            <h1 className="rv-title">Rule Validation Game</h1>
            <p className="rv-instructions">
                Does this sequence follow the rule?
            </p>

            {/* Theme Selector */}
            <div className="rv-theme-selector" role="radiogroup" aria-label="Choose a theme">
                {Object.entries(THEMES).map(([key, t]) => (
                    <button
                        key={key}
                        className={`rv-theme-btn${theme === key ? ' active' : ''}`}
                        onClick={() => setTheme(key)}
                        aria-pressed={theme === key}
                        aria-label={`${t.label} theme`}
                    >
                        <span className="rv-theme-btn-icon">{t.icon}</span>
                        <span className="rv-theme-btn-label">{t.label}</span>
                    </button>
                ))}
            </div>

            {/* Progress */}
            <div className="rv-progress">
                <div className="rv-progress-bar">
                    <div
                        className="rv-progress-fill"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
                <div className="rv-progress-stats">
                    <p className="rv-progress-text">
                        Question {index + 1} of {TOTAL_QUESTIONS}
                    </p>
                    <span className="rv-level-badge">Level {level}</span>
                </div>
            </div>

            {/* Game card */}
            <div className="rv-card">
                {/* Rule */}
                <div className="rv-rule-row">
                    <span className="rv-rule-label">
                        Rule: {current.rule}
                    </span>
                </div>

                {/* Sequence of ball groups */}
                <div className="rv-sequence">
                    {current.sequence.map((count, i) => {
                        const { size, cols } = getBallStyle(count);
                        const isWrong = showWrongGroup && i === current.wrongIndex;
                        const activeTheme = THEMES[theme];
                        const isEmoji = activeTheme.emojis !== null;
                        const renderSize = isEmoji ? getThemedSize(size) : size;
                        const groupWidth = cols * (renderSize + 4) + 20;
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {i > 0 && <span className="rv-arrow">→</span>}
                                <div
                                    className={`rv-group${isWrong ? ' rv-group-wrong' : ''}`}
                                    style={{ width: `${groupWidth}px` }}
                                    aria-label={`Group of ${count}`}
                                >
                                    {Array.from({ length: count }, (_, b) => (
                                        isEmoji ? (
                                            <span
                                                key={b}
                                                className="rv-icon"
                                                style={{ fontSize: `${renderSize}px` }}
                                                aria-hidden="true"
                                            >
                                                {activeTheme.emojis[b % activeTheme.emojis.length]}
                                            </span>
                                        ) : (
                                            <div
                                                key={b}
                                                className="rv-ball"
                                                style={{ width: `${renderSize}px`, height: `${renderSize}px` }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Answer buttons */}
                <div className="rv-answer-row">
                    <button
                        className={`rv-answer-btn${showFeedback && selectedAnswer === 'correct'
                            ? feedback === 'correct'
                                ? ' rv-btn-correct-choice'
                                : ' rv-btn-wrong-choice'
                            : ''
                            }`}
                        onClick={() => handleAnswer('correct')}
                        disabled={showFeedback}
                    >
                        ✅ Correct
                    </button>
                    <button
                        className={`rv-answer-btn${showFeedback && selectedAnswer === 'wrong'
                            ? feedback === 'correct'
                                ? ' rv-btn-correct-choice'
                                : ' rv-btn-wrong-choice'
                            : ''
                            }`}
                        onClick={() => handleAnswer('wrong')}
                        disabled={showFeedback}
                    >
                        ❌ Wrong
                    </button>
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div
                        ref={feedbackRef}
                        className={`rv-feedback ${feedback === 'correct' ? 'rv-feedback-correct' : 'rv-feedback-incorrect'
                            }`}
                    >
                        {feedback === 'correct' ? (
                            <>
                                <p className="rv-feedback-text">🎉 Well done!</p>
                                <p className="rv-feedback-sub">
                                    {current.isValid
                                        ? 'Great! This follows the rule.'
                                        : 'Good eye! You spotted the mistake.'}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="rv-feedback-text">Almost there!</p>
                                <p className="rv-feedback-sub">
                                    {current.isValid
                                        ? `The pattern ${current.ruleOp === 'add' ? 'increases' : current.ruleOp === 'sub' ? 'decreases' : 'multiplies'} by ${current.ruleValue} each time. This sequence follows the rule!`
                                        : `The pattern ${current.ruleOp === 'add' ? 'increases' : current.ruleOp === 'sub' ? 'decreases' : 'multiplies'} by ${current.ruleValue} each time. This group should have ${current.correctSequence[current.wrongIndex]} balls.`}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RuleValidation;
