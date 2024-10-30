// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import Button from './components/Button';
import ThemeToggle from "./components/ThemeToggle.jsx";
import DigitInput from './DigitInput';
import SettingsDialog from './SettingsDialog';
import StatsPanel from './StatsPanel';
import {Settings} from 'lucide-react';
import './App.css';
import NumberDisplay from "./NumberDisplay";
import EnhancedNumberComparison from "@/components/NumberComparison.jsx";

const DEFAULT_SETTINGS = {
    length: 3,
    interval: 1000,
    increaseBy: 1,
    decreaseBy: 2,
    fontSize: 180,
    fontFamily: 'system-ui',
    numberColor: 'currentColor'
};

const DEFAULT_STATS = {
    highScore: 0,
    gamesPlayed: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0
};

const App = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('memoryGameSettings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    const [gameState, setGameState] = useState('idle');
    const [currentNumber, setCurrentNumber] = useState('');
    const [displayNumber, setDisplayNumber] = useState('');
    const [displayKey, setDisplayKey] = useState(0); // 新增：用于强制重新渲染
    const [userInput, setUserInput] = useState('');
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('memoryGameStats');
        return saved ? JSON.parse(saved) : DEFAULT_STATS;
    });
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        localStorage.setItem('memoryGameSettings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('memoryGameStats', JSON.stringify(stats));
    }, [stats]);

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

    const generateNumber = (length) => {
        return Array.from({length}, () => Math.floor(Math.random() * 10)).join('');
    };

    // 修改：显示单个数字的函数
    const showDigit = async (digit) => {
        setDisplayNumber(''); // 先清空
        await new Promise(resolve => setTimeout(resolve, 50)); // 短暂延迟
        setDisplayNumber(digit); // 设置新数字
        setDisplayKey(prev => prev + 1); // 增加 key 强制重新渲染
    };

    const startGame = async () => {
        setGameState('playing');
        const number = generateNumber(settings.length);
        setCurrentNumber(number);

        try {
            for (let i = 0; i < number.length; i++) {
                await showDigit(number[i]);
                await new Promise(resolve => setTimeout(resolve, settings.interval));
                if (i < number.length - 1) {
                    setDisplayNumber('');
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
                            <Button onClick={startGame}>开始游戏</Button>
                        </div>
                    </div>
                );

            case 'playing':
                return (
                    <NumberDisplay
                        key={displayKey}
                        number={displayNumber}
                        fontSize={settings.fontSize}
                        fontFamily={settings.fontFamily}
                        numberColor={settings.numberColor}
                    />
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
                    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center
            bg-gradient-to-b from-gray-50 via-white to-gray-50
            dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
            overflow-y-auto py-8">
                        <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
                            <EnhancedNumberComparison
                                userInput={userInput}
                                correctNumber={currentNumber}
                                currentLength={settings.length}
                            />
                            <Button
                                onClick={resetGame}
                                className="px-8 py-3 text-lg"
                            >
                                继续挑战
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
            <ThemeToggle/>
            {renderGameContent()}
            <button
                onClick={() => setShowSettings(true)}
                className="fixed bottom-4 right-4 z-50 p-3 rounded-lg transition-all duration-200
                    bg-blue-100 dark:bg-slate-800
                    hover:bg-blue-200 dark:hover:bg-slate-700
                    text-gray-900 dark:text-slate-50
                    border border-blue-200 dark:border-slate-700
                    shadow-sm hover:scale-110"
            >
                <Settings className="w-5 h-5"/>
            </button>
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
