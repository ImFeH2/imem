// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import Button from './components/Button';
import ThemeToggle from "./components/ThemeToggle.jsx";
import DigitInput from './DigitInput';
import SettingsDialog from './SettingsDialog';
import StatsPanel from './StatsPanel';
import {Settings} from 'lucide-react';
import './App.css';

const DEFAULT_SETTINGS = {
    length: 3,
    interval: 1000,
    increaseBy: 1,
    decreaseBy: 2,
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
    const [showSettings, setShowSettings] = useState(false);

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

    const renderGameContent = () => {
        switch (gameState) {
            case 'idle':
                return (
                    <div
                        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-blue-50/20 to-gray-50 dark:from-slate-950 dark:via-blue-900/5 dark:to-slate-950">
                        <div className="flex flex-col items-center gap-8 p-4">
                            <StatsPanel stats={stats}/>
                            <Button
                                onClick={startGame}
                                className="start-button"
                                aria-label="Start Game"
                            >
                                开始游戏
                            </Button>
                        </div>
                    </div>
                );

            case 'playing':
                return (
                    <div
                        className="fixed inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
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
                        className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                        <DigitInput
                            length={settings.length}
                            value={userInput}
                            onChange={setUserInput}
                            onSubmit={checkAnswer}
                        />
                    </div>
                );

            case 'result':
                return (
                    <div
                        className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
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
                                继续
                            </Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* 固定在顶部的主题切换按钮 */}
            <ThemeToggle/>

            {/* 游戏内容 */}
            {renderGameContent()}

            {/* 固定在右下角的设置按钮 */}
            <button
                onClick={() => setShowSettings(true)}
                className="fixed bottom-4 right-4 z-50 p-3 rounded-lg transition-all duration-200
          bg-blue-100 dark:bg-slate-800
          hover:bg-blue-200 dark:hover:bg-slate-700
          text-gray-900 dark:text-slate-50
          border border-blue-200 dark:border-slate-700
          shadow-sm hover:scale-110"
                aria-label="Settings"
            >
                <Settings className="w-5 h-5"/>
            </button>

            {/* 设置对话框 */}
            <SettingsDialog
                settings={settings}
                onSettingsChange={setSettings}
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
};

export default App;
