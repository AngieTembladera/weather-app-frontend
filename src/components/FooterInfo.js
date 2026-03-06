import React from 'react';

const FooterInfo = () => {
    return (
        <footer className="mt-12 mb-8 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-google-gray font-medium">
                CLIMA360
            </p>
            <p className="text-xs text-google-gray mt-1">
                Datos meteorológicos: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-google-blue hover:underline">Open-Meteo</a>
            </p>
            <p className="text-[10px] text-google-gray mt-4 opacity-75">
                &copy; {new Date().getFullYear()} Proyecto de Portafolio
            </p>
        </footer>
    );
};

export default FooterInfo;
