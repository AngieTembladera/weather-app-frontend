import React from 'react';

const AirQualityCard = ({ air }) => {
    if (!air) return null;

    const getAqiStatus = (aqi) => {
        if (aqi <= 50) return {
            label: 'Bueno',
            desc: 'La calidad del aire es satisfactoria y el riesgo es mínimo.',
            class: 'aqi-1'
        };
        if (aqi <= 100) return {
            label: 'Moderado',
            desc: 'La calidad del aire es aceptable. No obstante, en el caso de algunos contaminantes, podría haber una preocupación moderada de salud para una cantidad muy pequeña de personas.',
            class: 'aqi-2'
        };
        if (aqi <= 150) return {
            label: 'Insalubre para grupos sensibles',
            desc: 'Los miembros de grupos sensibles pueden experimentar efectos de salud.',
            class: 'aqi-3'
        };
        if (aqi <= 200) return {
            label: 'Insalubre',
            desc: 'Cualquier persona puede empezar a experimentar efectos de salud.',
            class: 'aqi-4'
        };
        if (aqi <= 300) return {
            label: 'Muy insalubre',
            desc: 'Advertencias de salud por condiciones de emergencia.',
            class: 'aqi-5'
        };
        return {
            label: 'Peligroso',
            desc: 'Alerta de salud: todo el mundo puede experimentar efectos de salud graves.',
            class: 'aqi-6'
        };
    };

    const status = getAqiStatus(air.aqi);

    const formatVal = (v) => (v != null ? Number(v).toFixed(1) : '--');

    return (
        <div className="google-card mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-[11px] font-bold text-google-gray mb-4 uppercase tracking-[0.1em]">Calidad del aire</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className={`flex-shrink-0 w-24 h-24 rounded-[32px] flex flex-col items-center justify-center shadow-inner ${status.class}`}>
                    <span className="text-3xl font-bold">{air.aqi}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">AQI</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{status.label}</h4>
                    <p className="text-[13px] text-gray-700 leading-snug font-medium opacity-90">{status.desc}</p>
                </div>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap gap-y-4 gap-x-8">
                <div>
                    <p className="text-[10px] text-google-gray uppercase font-bold tracking-wider mb-1">PM2.5</p>
                    <p className="text-sm font-bold text-gray-800">{formatVal(air.components?.pm2_5)} <span className="text-[10px] font-normal text-gray-500">µg/m³</span></p>
                </div>
                <div>
                    <p className="text-[10px] text-google-gray uppercase font-bold tracking-wider mb-1">PM10</p>
                    <p className="text-sm font-bold text-gray-800">{formatVal(air.components?.pm10)} <span className="text-[10px] font-normal text-gray-500">µg/m³</span></p>
                </div>
                <div>
                    <p className="text-[10px] text-google-gray uppercase font-bold tracking-wider mb-1">NO₂</p>
                    <p className="text-sm font-bold text-gray-800">{formatVal(air.components?.no2)} <span className="text-[10px] font-normal text-gray-500">µg/m³</span></p>
                </div>
                <div>
                    <p className="text-[10px] text-google-gray uppercase font-bold tracking-wider mb-1">O₃</p>
                    <p className="text-sm font-bold text-gray-800">{formatVal(air.components?.o3)} <span className="text-[10px] font-normal text-gray-500">µg/m³</span></p>
                </div>
            </div>
        </div>
    );
};

export default AirQualityCard;
