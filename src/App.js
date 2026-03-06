import React, { useState, useEffect } from 'react';
import LogoClima from './assets/LogoClima.png';
import WeatherHero from './components/WeatherHero';
import ForecastCarousel from './components/ForecastCarousel';
import AirQualityCard from './components/AirQualityCard';
import TechnicalDetails from './components/TechnicalDetails';
import FooterInfo from './components/FooterInfo';

const API_URL = import.meta.env.VITE_API_URL;


function formatNumber(v, digits = 0) {
  if (v == null) return '—';
  return Number(v).toFixed(digits).replace(/\.0+$/, '');
}

function getIconUrl(iconCode) {
  if (!iconCode) return null;
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getWeatherIcon(iconCode, description) {
  const open = getIconUrl(iconCode);
  if (open) return open;
  const desc = (description || '').toLowerCase();

  if (desc.includes('clear') || desc.includes('claro')) return 'https://img.icons8.com/fluency/96/sun.png';
  if (desc.includes('cloud') || desc.includes('nublado') || desc.includes('despejado')) return 'https://img.icons8.com/fluency/96/partly-cloudy-day.png';
  if (desc.includes('rain') || desc.includes('llovizna') || desc.includes('lluvia')) return 'https://img.icons8.com/fluency/96/rain.png';
  if (desc.includes('thunder') || desc.includes('tormenta')) return 'https://img.icons8.com/fluency/96/storm.png';
  if (desc.includes('snow') || desc.includes('nieve')) return 'https://img.icons8.com/fluency/96/snow.png';
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('niebla')) return 'https://img.icons8.com/fluency/96/fog.png';

  return 'https://img.icons8.com/fluency/96/partly-cloudy-day.png';
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [air, setAir] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  // Fetch default city on mount
  useEffect(() => {
    const fetchDefault = async () => {
      const defaultCity = 'Lima';
      setCity(defaultCity);
      setLoading(true);
      await executeSearch(defaultCity);
    };
    fetchDefault();
  }, []);

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!city) return setError('Por favor ingresa una ciudad');
    setLoading(true);
    await executeSearch(city);
  };

  const executeSearch = async (targetCity) => {
    setError('');
    try {
      let weatherData = null;
      try {
        const weatherRes = await fetch(`${API_URL}/api/weather?city=${encodeURIComponent(targetCity)}`);
        weatherData = await weatherRes.json();

        if (!weatherRes.ok) {
          throw new Error(weatherData.error || 'Ciudad no encontrada');
        }
      } catch (e) {
        console.error("Fetch error:", e);
        throw new Error('No se pudo conectar con el servidor');
      }

      const lat = weatherData.coord?.lat ?? weatherData.latitude;
      const lon = weatherData.coord?.lon ?? weatherData.longitude;

      if (!lat || !lon) {
        throw new Error('No se obtuvieron coordenadas para la ciudad');
      }

      // Fetch OneCall and Air Quality in parallel
      const [onecallRes, airRes] = await Promise.all([
        fetch(`${API_URL}/api/onecall?lat=${lat}&lon=${lon}&city=${encodeURIComponent(targetCity)}`),
        fetch(`${API_URL}/api/air-quality?lat=${lat}&lon=${lon}&city=${encodeURIComponent(targetCity)}`)
      ]);

      const onecallData = await onecallRes.json();
      const airData = await airRes.json();

      // Set Weather
      setWeather({
        name: weatherData.city || weatherData.name || targetCity,
        description: weatherData.description || 'Despejado',
        icon: weatherData.icon || null,
        temperature: weatherData.temperature ?? null,
        humidity: weatherData.humidity ?? null,
        wind_speed: weatherData.wind_speed ?? null,
        visibility: weatherData.visibility ?? null,
        pressure: weatherData.pressure ?? null,
        lat,
        lon,
      });

      // Set Forecast (Correct mapping: temp_max/temp_min)
      if (onecallRes.ok) {
        setForecast(onecallData.daily || []);
      }

      // Set Air Quality
      if (airRes.ok) {
        let aqi = airData.aqi ?? null;
        if (typeof aqi === 'number' && aqi >= 1 && aqi <= 5) {
          aqi = aqi * 50;
        }
        setAir({ aqi, components: airData.components });
      }

      setLastUpdate(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      setError(err.message);
      // We don't necessarily want to clear old weather if a new search fails, 
      // but if there's no weather yet, it's appropriate.
      if (!weather) {
        setWeather(null);
        setForecast(null);
        setAir(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-all duration-700 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header / Brand & Search */}
        <header className="flex flex-col gap-8 mb-10">
          <div className="relative flex items-center justify-center w-full min-h-[40px]">
            <div className="absolute left-0">
              <img src={LogoClima} alt="Logo" className="w-10 h-10 rounded-xl shadow-md border border-white/20" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase text-center">CLIMA360</h1>
          </div>

          <form className="w-full relative group" onSubmit={handleSearch}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-google-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Busca una ciudad..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-white/30 rounded-[28px] shadow-lg focus:shadow-xl focus:ring-2 focus:ring-google-blue focus:bg-white text-gray-700 text-lg transition-all outline-none"
            />
            {loading && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-google-blue"></div>
              </div>
            )}
          </form>
          {error && <p className="text-red-500 mt-4 text-sm font-bold bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm animate-bounce">{error}</p>}
        </header>

        {loading && !weather && (
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-white/20 rounded-[28px]"></div>
            <div className="h-32 bg-white/20 rounded-[28px]"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-48 bg-white/20 rounded-[28px]"></div>
              <div className="h-48 bg-white/20 rounded-[28px]"></div>
            </div>
          </div>
        )}

        {weather && (
          <main className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${loading ? 'opacity-50' : ''}`}>
            {/* Main Hero */}
            <WeatherHero weather={weather} lastUpdate={lastUpdate} />

            {/* Forecast Carousel */}
            <ForecastCarousel daily={forecast} getIcon={getWeatherIcon} />

            {/* Grid for AQI and Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AirQualityCard air={air} />
              <TechnicalDetails weather={weather} />
            </div>
          </main>
        )}

        {!weather && !loading && !error && (
          <div className="text-center py-20 opacity-50 transition-opacity">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <p className="text-xl text-gray-500 font-medium">Busca una ciudad para comenzar</p>
          </div>
        )}

        <FooterInfo />
      </div>
    </div>
  );
}

export default App;