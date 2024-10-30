import React from 'react';
import {Award, Brain, Timer} from 'lucide-react';

const StatsPanel = ({stats}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
            <div className="flex items-center gap-2 bg-white/80 rounded-lg p-4">
                <Award className="w-6 h-6 text-yellow-500"/>
                <div>
                    <div className="text-sm">最高记录</div>
                    <div className="text-xl font-bold">{stats.highScore}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-lg p-4">
                <Brain className="w-6 h-6 text-blue-500"/>
                <div>
                    <div className="text-sm">次数</div>
                    <div className="text-xl font-bold">{stats.gamesPlayed}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-lg p-4">
                <Timer className="w-6 h-6 text-green-500"/>
                <div>
                    <div className="text-sm">正确率</div>
                    <div className="text-xl font-bold">
                        {stats.gamesPlayed ? Math.round((stats.correctAnswers / stats.gamesPlayed) * 100) : 0}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
