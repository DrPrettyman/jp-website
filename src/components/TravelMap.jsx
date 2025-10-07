import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Chapter color mapping
const getChapterColor = (chapter) => {
  const colors = {
    '0': '#ef4444', // red
    '1': '#3b82f6', // blue
    '2': '#10b981', // green
    '3': '#f59e0b', // amber
    '4': '#8b5cf6', // violet
    '5': '#06b6d4', // cyan
    '6': '#f97316', // orange
    '7': '#ec4899', // pink
    '8': '#84cc16', // lime
    '9': '#6366f1', // indigo
    '10': '#f43f5e', // rose
    '11': '#14b8a6', // teal
  };
  return colors[chapter] || '#6b7280'; // gray as fallback
};

// Create custom colored pin marker icon
const createChapterIcon = (chapter) => {
  const color = getChapterColor(chapter);
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5,0 C5.6,0 0,5.6 0,12.5 C0,19.4 12.5,41 12.5,41 S25,19.4 25,12.5 C25,5.6 19.4,0 12.5,0 Z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

// Custom fullscreen button component
const FullscreenButton = ({ containerRef }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef?.current) {
      containerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="absolute top-2 right-2 bg-white border border-gray-300 rounded shadow-lg hover:bg-gray-50 p-2 transition-colors"
      style={{ zIndex: 1000 }}
      title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
    >
      {isFullscreen ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7V3h4M21 7V3h-4M21 17v4h-4M3 17v4h4"/>
        </svg>
      )}
    </button>
  );
};

const TravelMap = ({ 
  travelData = [], 
  imagePath = '', 
  height = '400px',
  defaultCenter = [51.505, -0.09],
  defaultZoom = 6 
}) => {
  const mapContainerRef = useRef(null);

  // Sort travel data by chapter and id for sequential order
  const sortedTravelData = [...travelData].sort((a, b) => {
    if (a.Chapter !== b.Chapter) {
      return parseInt(a.Chapter) - parseInt(b.Chapter);
    }
    return parseInt(a.Id) - parseInt(b.Id);
  });

  // Calculate bounds if we have data points
  const bounds = travelData.length > 0 
    ? travelData.map(point => [point.Latitude, point.Longitude])
    : null;

  // Create path coordinates for polyline
  const pathCoordinates = sortedTravelData.map(point => [point.Latitude, point.Longitude]);

  return (
    <div ref={mapContainerRef} className="w-full aspect-square relative">
      <FullscreenButton containerRef={mapContainerRef} />
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        bounds={bounds}
        className="w-full h-full rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw dotted line connecting locations in chronological order */}
        {pathCoordinates.length > 1 && (
          <Polyline
            positions={pathCoordinates}
            pathOptions={{
              color: '#6b7280',
              weight: 3,
              opacity: 0.7,
              dashArray: '10, 10'
            }}
          />
        )}
        
        {travelData.map((location) => (
          <Marker
            key={`${location.Chapter}-${location.Id}`}
            position={[location.Latitude, location.Longitude]}
            icon={createChapterIcon(location.Chapter)}
          >
            <Popup>
              {(() => {
                const isPortrait = location.AspectRatio < 1;
                const imageWidth = isPortrait ? 180 : 240;
                const imageHeight = isPortrait ? 240 : 160;
                const popupWidth = imageWidth + 10;
                
                return (
                  <div style={{ width: `${popupWidth}px` }}>
                    <h3 className="font-semibold text-lg mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {location.Description.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    {imagePath && (
                      <div 
                        className="mb-2 mx-auto"
                        style={{
                          width: `${imageWidth}px`,
                          height: `${imageHeight}px`,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img 
                          src={`${imagePath}${location.FileName.toLowerCase()}`}
                          alt={location.Description}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            e.target.parentElement.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Chapter {location.Chapter} • Stop {location.Id} • {new Date(location.DateTime.replace(/^(\d{4}):(\d{2}):(\d{2}) /, '$1-$2-$3T')).toLocaleDateString()}
                    </p>
                  </div>
                );
              })()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
    </div>
  );
};

export default TravelMap;