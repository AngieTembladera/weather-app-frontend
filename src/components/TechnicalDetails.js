import React from 'react';

const TechnicalDetails = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="google-card mb-6">
            <h3 className="text-sm font-medium text-google-gray mb-4 uppercase tracking-wider">Detalles</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col">
                    <span className="text-xs text-google-gray mb-1">Humedad</span>
                    <span className="text-lg font-medium">{weather.humidity !== null ? `${weather.humidity}%` : '--'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-google-gray mb-1">Viento</span>
                    <span className="text-lg font-medium">{weather.wind_speed !== null ? `${weather.wind_speed} km/h` : '--'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-google-gray mb-1">Visibilidad</span>
                    <span className="text-lg font-medium">{weather.visibility !== null ? `${weather.visibility} km` : '--'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-google-gray mb-1">Presión</span>
                    <span className="text-lg font-medium">{weather.pressure !== null ? `${weather.pressure} mb` : '--'}</span>
                </div>
            </div>
        </div>
    );
};

export default TechnicalDetails;
