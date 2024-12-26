import React from 'react';
import {Award, Brain, Timer} from 'lucide-react';

const StatsPanel = ({stats}) => {
    return (
        <div className="stats-panel">
            <div className="stat-card">
                <Award className="stat-icon"/>
                <div>
                    <div className="stat-title">High Score</div>
                    <div className="stat-value">{stats.highScore}</div>
                </div>
            </div>
            <div className="stat-card">
                <Brain className="stat-icon"/>
                <div>
                    <div className="stat-title">Games Played</div>
                    <div className="stat-value">{stats.gamesPlayed}</div>
                </div>
            </div>
            <div className="stat-card">
                <Timer className="stat-icon"/>
                <div>
                    <div className="stat-title">Accuracy</div>
                    <div className="stat-value">
                        {stats.gamesPlayed ? Math.round((stats.correctAnswers / stats.gamesPlayed) * 100) : 0}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
