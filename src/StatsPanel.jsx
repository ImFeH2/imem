import React from 'react';
import {Award, Brain, Timer} from 'lucide-react';

const StatsPanel = ({stats}) => {
    return (
        <div className="stats-panel">
            <div className="stat-card">
                <Award className="stat-icon"/>
                <div>
                    <div className="stat-title">最高记录</div>
                    <div className="stat-value">{stats.highScore}</div>
                </div>
            </div>
            <div className="stat-card">
                <Brain className="stat-icon"/>
                <div>
                    <div className="stat-title">游戏次数</div>
                    <div className="stat-value">{stats.gamesPlayed}</div>
                </div>
            </div>
            <div className="stat-card">
                <Timer className="stat-icon"/>
                <div>
                    <div className="stat-title">正确率</div>
                    <div className="stat-value">
                        {stats.gamesPlayed ? Math.round((stats.correctAnswers / stats.gamesPlayed) * 100) : 0}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
