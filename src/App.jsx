import React, {useEffect, useState} from 'react';
import Button from './components/Button';
import ThemeToggle from "./components/ThemeToggle.jsx";
import DigitInput from './DigitInput';
import SettingsDialog from './SettingsDialog';
import StatsPanel from './StatsPanel';
import './App.css';

const DEFAULT_SETTINGS = {
    length: 3,
    interval: 1000,
    increaseBy: 1,
    decreaseBy: 1,
    fontSize: 72
};

const DEFAULT_STATS = {
    highScore: 0,
    gamesPlayed: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0
};

const App = () => {
    // 状态管理
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('memoryGameSettings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    const [gameState, setGameState] = useState('idle'); // idle, playing, input, result
    const [currentNumber, setCurrentNumber] = useState('');
    const [displayNumber, setDisplayNumber] = useState('');
    const [userInput, setUserInput] = useState('');
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('memoryGameStats');
        return saved ? JSON.parse(saved) : DEFAULT_STATS;
    });

    // 本地存储
    useEffect(() => {
        localStorage.setItem('memoryGameSettings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('memoryGameStats', JSON.stringify(stats));
    }, [stats]);

    // 键盘快捷键
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                switch (gameState) {
                    case 'idle':
                        startGame();
                        break;
                    case 'result':
                        resetGame();
                        break;
                    default:
                        break;
                }
            } else if (e.key === 'Escape' && gameState === 'playing') {
                resetGame();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState]);

    // 生成随机数字
    const generateNumber = (length) => {
        return Array.from({length}, () => Math.floor(Math.random() * 10)).join('');
    };

    // 开始游戏
    const startGame = async () => {
        setGameState('playing');
        const number = generateNumber(settings.length);
        setCurrentNumber(number);

        try {
            for (let i = 0; i < number.length; i++) {
                setDisplayNumber(number[i]);
                await new Promise(resolve => setTimeout(resolve, settings.interval));
                if (i < number.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        } catch (error) {
            console.error('Game interrupted:', error);
        }

        setDisplayNumber('');
        setGameState('input');
    };

    // 检查答案
    const checkAnswer = () => {
        const correct = userInput === currentNumber;

        setStats(prev => {
            const newStats = {
                ...prev,
                gamesPlayed: prev.gamesPlayed + 1,
                currentStreak: correct ? prev.currentStreak + 1 : 0
            };

            if (correct) {
                newStats.correctAnswers = prev.correctAnswers + 1;
                newStats.highScore = Math.max(prev.highScore, settings.length);
                newStats.bestStreak = Math.max(prev.bestStreak, newStats.currentStreak);
            }

            return newStats;
        });

        if (correct) {
            setSettings(prev => ({
                ...prev,
                length: prev.length + prev.increaseBy
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                length: Math.max(1, prev.length - prev.decreaseBy)
            }));
        }

        setGameState('result');
    };

    // 重置游戏
    const resetGame = () => {
        setGameState('idle');
        setUserInput('');
        setCurrentNumber('');
        setDisplayNumber('');
    };

    // 渲染游戏内容
    const renderGameContent = () => {
        switch (gameState) {
            case 'idle':
                return (
                    <div className="flex flex-col items-center gap-8 p-4">
                        <StatsPanel stats={stats}/>
                        <Button
                            onClick={startGame}
                            className="start-button"
                            aria-label="Start Game"
                        >
                            开始游戏 (Enter)
                        </Button>
                    </div>
                );

            case 'playing':
                return (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
                        role="region"
                        aria-label="Number Display"
                    >
                        <div
                            className="number-display"
                            style={{fontSize: `${settings.fontSize}px`}}
                            aria-live="polite"
                        >
                            {displayNumber}
                        </div>
                    </div>
                );

            case 'input':
                return (
                    <div
                        className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
                        role="region"
                        aria-label="Number Input"
                    >
                        <DigitInput
                            length={settings.length}
                            value={userInput}
                            onChange={setUserInput}
                            onSubmit={checkAnswer}
                        />
                        <Button
                            onClick={checkAnswer}
                            className="submit-button"
                            disabled={userInput.length !== settings.length}
                        >
                            确认 (Enter)
                        </Button>
                    </div>
                );

            case 'result':
                return (
                    <div className="flex flex-col items-center gap-6 p-4">
                        <div
                            className={`result-message text-2xl font-bold ${
                                userInput === currentNumber ? 'text-green-500' : 'text-red-500 error'
                            }`}
                            role="alert"
                        >
                            {userInput === currentNumber ? (
                                <span>正确！继续下一关</span>
                            ) : (
                                <span>错误！正确答案是 {currentNumber}</span>
                            )}
                        </div>
                        <div className="text-lg">
                            当前长度: {settings.length}
                        </div>
                        <Button
                            onClick={resetGame}
                            className="continue-button"
                        >
                            继续 (Enter)
                        </Button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`game-container ${gameState === 'playing' ? 'playing' : ''}`}>
            <ThemeToggle/>
            <div className="min-h-screen flex flex-col items-center justify-center">
                {renderGameContent()}
            </div>
            <SettingsDialog settings={settings} onSettingsChange={setSettings}/>
        </div>
    );
};

export default App;
