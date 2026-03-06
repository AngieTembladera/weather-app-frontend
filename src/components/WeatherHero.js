import React from 'react';

const WeatherHero = ({ weather, lastUpdate }) => {
    if (!weather) return null;

    return (
        <div className="flex flex-col items-center text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight drop-shadow-sm">
                {weather.name}
            </h2>
            <p className="inline-block text-white font-medium bg-black/10 px-4 py-1 rounded-full backdrop-blur-sm capitalize mb-6 text-sm">
                {weather.description}
            </p>

            <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-8xl md:text-9xl font-light text-gray-900 tracking-tighter">
                    {weather.temperature !== null ? Math.round(weather.temperature) : '--'}
                </span>
                <span className="text-4xl font-light text-gray-700 align-top mt-4">°C</span>
            </div>

            {lastUpdate && (
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700 uppercase tracking-widest bg-white/30 px-3 py-1 rounded-lg mt-4 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Última actualización: {lastUpdate}
                </div>
            )}
        </div>
    );
};

export default WeatherHero;
