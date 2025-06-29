import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { X, MapPin } from 'lucide-react';

const HolidayMap = ({ holidays, projection = "geoNaturalEarth1", projectionConfig = { scale: 120, center: [0, 0] } }) => {
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  

  const closeModal = () => {
    setSelectedHoliday(null);
  };

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas/countries-110m.json";

  return (
    <div className="w-full h-screen bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-lg border-b">
        <div className="p-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <MapPin className="text-blue-600" size={28} />
            My Holiday Adventures
          </h1>
          <p className="text-gray-600 mt-1">Click on the markers to explore my travels around the world</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-full pt-24 pb-4">
        <ComposableMap
          projection={projection}
          projectionConfig={projectionConfig}
          width={800}
          height={500}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E2E8F0"
                  stroke="#CBD5E1"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { 
                      fill: "#F1F5F9", 
                      outline: "none",
                      cursor: "default"
                    },
                    pressed: { outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Holiday Markers */}
          {holidays.map((holiday) => (
            <Marker
              key={holiday.id}
              coordinates={holiday.coordinates}
              onClick={() => setSelectedHoliday(holiday)}
            >
              <g className="cursor-pointer">
                {/* Marker shadow */}
                <circle
                  r={8}
                  fill="rgba(0,0,0,0.2)"
                  transform="translate(1,1)"
                />
                {/* Main marker */}
                <circle
                  r={8}
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  className="hover:r-10 transition-all duration-200"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                  }}
                />
                {/* Inner dot */}
                <circle
                  r={3}
                  fill="#FFFFFF"
                />
                {/* Pulse animation */}
                <circle
                  r={8}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth={2}
                  opacity={0.6}
                >
                  <animate
                    attributeName="r"
                    values="8;12;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Holiday Stats */}
      <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 border">
        <div className="text-sm text-gray-500 uppercase tracking-wide">Adventures</div>
        <div className="text-3xl font-bold text-blue-600">{holidays.length}</div>
        <div className="text-xs text-gray-400 mt-1">Countries Explored</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4 border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
          <span className="text-sm text-gray-600">Holiday Location</span>
        </div>
      </div>

      {/* Modal */}
      {selectedHoliday && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl transform transition-all">
              {/* Modal Image */}
              <div className="relative">
                <img 
                  src={selectedHoliday.photo} 
                  alt={selectedHoliday.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {selectedHoliday.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedHoliday.text}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HolidayMap;