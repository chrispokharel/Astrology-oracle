
import React from 'react';
import { Prediction } from '../types';
import { CareerIcon } from './icons/CareerIcon';
import { HealthIcon } from './icons/HealthIcon';
import { HeartIcon } from './icons/HeartIcon';

interface PredictionDisplayProps {
  prediction: Prediction;
}

const PredictionCard: React.FC<{ title: string; icon: React.ReactNode; text: string }> = ({ title, icon, text }) => (
    <div className="bg-black/20 p-6 rounded-xl border border-white/20 transform hover:scale-105 hover:border-purple-400 transition-all duration-300">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-500/30 rounded-full mr-4">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">{title}</h3>
        </div>
        <p className="text-purple-100 leading-relaxed">{text}</p>
    </div>
);


const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ prediction }) => {
  return (
    <div className="space-y-8 animate-fade-in">
        <PredictionCard 
            title="Career & Fortune" 
            icon={<CareerIcon className="h-6 w-6 text-yellow-300"/>} 
            text={prediction.career} 
        />
        <PredictionCard 
            title="Relationships & Love" 
            icon={<HeartIcon className="h-6 w-6 text-red-400"/>} 
            text={prediction.relationships} 
        />
        <PredictionCard 
            title="Health & Wellness" 
            icon={<HealthIcon className="h-6 w-6 text-green-400"/>} 
            text={prediction.health} 
        />
    </div>
  );
};

export default PredictionDisplay;
