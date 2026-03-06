import React from 'react';

const ForecastCarousel = ({ daily, getIcon }) => {
    if (!daily || daily.length === 0) return null;

    // Filtrar para asegurar que no haya días duplicados (p.ej. hoy dos veces por zona horaria)
    const uniqueDays = [];
    const seenDates = new Set();

    daily.forEach(day => {
        const dateStr = new Date(day.dt * 1000).toDateString();
        if (!seenDates.has(dateStr)) {
            seenDates.add(dateStr);
            uniqueDays.push(day);
        }
    });

    const daysToShow = uniqueDays.slice(0, 8);

    const formatDayName = (dt) => {
        // Multiplicamos por 1000 para obtener milisegundos
        // Usamos la fecha local para determinar el nombre del día
        const date = new Date(dt * 1000);
        return date.toLocaleDateString('es-ES', { weekday: 'short', timeZone: 'UTC' }).replace('.', '');
    };

    return (
        <div className="google-card mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-bold text-google-gray uppercase tracking-[0.1em]">Pronóstico de 8 días</h3>
                <span className="text-[10px] text-google-blue font-bold cursor-pointer hover:underline">Ver más</span>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                {daysToShow.map((day, i) => (
                    <div
                        key={i}
                        className={`forecast-item flex-shrink-0 flex flex-col items-center justify-between min-w-[75px] py-4 px-2 rounded-2xl transition-all ${i === 0
                            ? 'bg-[#1a73e8] text-white shadow-lg scale-105 z-10'
                            : 'hover:bg-white/50'
                            }`}
                    >
                        <span className={`text-[13px] font-bold capitalize ${i === 0 ? 'text-white' : 'text-gray-600'}`}>
                            {formatDayName(day.dt)}
                        </span>

                        <img
                            src={getIcon(day.weather?.[0]?.icon, day.weather?.[0]?.description)}
                            alt={day.weather?.[0]?.description}
                            className={`w-10 h-10 my-2 drop-shadow-md ${i === 0 ? 'brightness-110' : ''}`}
                        />

                        <div className="flex gap-1.5 items-baseline">
                            <span className={`text-[15px] font-bold ${i === 0 ? 'text-white' : 'text-gray-900'}`}>
                                {day.temp_max != null ? Math.round(day.temp_max) : '--'}°
                            </span>
                            <span className={`text-[11px] font-medium ${i === 0 ? 'text-blue-100' : 'text-google-gray'}`}>
                                {day.temp_min != null ? Math.round(day.temp_min) : '--'}°
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCarousel;
