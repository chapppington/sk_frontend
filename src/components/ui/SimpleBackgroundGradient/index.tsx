import React from 'react';
import './styles.css';

export const SimpleBackgroundGradient = () => {
    return (
        <div className="animated-gradient-background">
            <div className="gradient-overlay"></div>
            <div className="noise-texture"></div>
        </div>
    );
};