import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom styles for circular popup
const style = document.createElement('style');
style.textContent = `
  .circular-popup .leaflet-popup-content-wrapper {
    border-radius: 50%;
    padding: 4px;
    background: white;
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
  }
  .circular-popup .leaflet-popup-content {
    margin: 0;
    width: 120px !important;
    height: 120px;
  }
  .circular-popup .leaflet-popup-tip-container {
    display: none;
  }
`;
document.head.appendChild(style);

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


// Component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [map, onMapClick]);

  return null;
};

// Component to handle bounds updates
const BoundsUpdater = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      const container = map.getContainer();
      const isLandscape = container.offsetWidth > container.offsetHeight;

      // Use paddingTopLeft to offset the view, accounting for the info panel
      const paddingOptions = isLandscape
        ? { paddingTopLeft: [container.offsetWidth * 0.25, 0], padding: [0, 0], animate: false } // Panel on left (1/4 width), no extra padding
        : { paddingBottomLeft: [0, container.offsetHeight * 0.33], padding: [0, 0], animate: false }; // Panel on bottom (1/3 height), no extra padding

      map.fitBounds(bounds, paddingOptions);
    }
  }, [map, bounds]);

  return null;
};

// Component to handle marker click events
const MarkerWithClick = ({ position, icon, location, imagePath, onMarkerClick, markerRef }) => {
  const map = useMap();

  const handleClick = (e) => {
    L.DomEvent.stopPropagation(e); // Prevent map click event
    map.flyTo(position, map.getZoom(), {
      duration: 0.5
    });
    onMarkerClick(location);
  };

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={{
        click: handleClick
      }}
    >
      <Popup
        closeButton={false}
        className="circular-popup"
      >
        <div style={{ width: '120px', height: '120px', textAlign: 'center' }}>
          {imagePath && (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={`${imagePath}${location.FileName.toLowerCase()}`}
                alt={location.Title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

const TravelMap = ({
  travelData = {},
  imagePath = ''
}) => {
  const mapContainerRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markerRefs = useRef({});

  // Format date as "13th November 2025"
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString.replace(/^(\d{4}):(\d{2}):(\d{2}) /, '$1-$2-$3T'));
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                   day === 2 || day === 22 ? 'nd' :
                   day === 3 || day === 23 ? 'rd' : 'th';
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
  };

  // Get chapters from travelData
  const chapters = travelData?.Chapters || [];

  // Get bounds from travelData
  const bounds = (() => {
    if (!travelData?.Bounds) return null;

    const { North, South, East, West } = travelData.Bounds;

    // The metadata has West/East swapped - West is 7.15 (east) and East is -1.50 (west)
    const actualWest = Math.min(East, West);
    const actualEast = Math.max(East, West);

    // Return simple bounds - padding will be handled by fitBounds in BoundsUpdater
    return [
      [South, actualWest],
      [North, actualEast]
    ];
  })();

  const defaultCenter = [travelData.Bounds.CenterLatitude, travelData.Bounds.CenterLongitude];

  // Flatten the nested structure: extract all photos from all chapters
  const allPhotos = chapters.flatMap(chapter =>
    (chapter.Photos || []).map(photo => ({
      ...photo,
      ChapterTitle: chapter.Title
    }))
  );

  // Sort by chapter and photo number for sequential order
  const sortedPhotos = [...allPhotos].sort((a, b) => {
    if (a.Chapter !== b.Chapter) {
      return parseInt(a.Chapter) - parseInt(b.Chapter);
    }
    return parseInt(a.Photo) - parseInt(b.Photo);
  });

  // Create path coordinates for polyline
  const pathCoordinates = sortedPhotos.map(point => [point.Latitude, point.Longitude]);

  // Navigation functions
  const getCurrentIndex = () => {
    if (!selectedLocation) return -1;
    return sortedPhotos.findIndex(
      photo => photo.Chapter === selectedLocation.Chapter && photo.Photo === selectedLocation.Photo
    );
  };

  const navigateToPhoto = (photo) => {
    const markerKey = `${photo.Chapter}-${photo.Photo}`;
    const marker = markerRefs.current[markerKey];
    if (marker) {
      // Simulate a click on the marker
      marker.fire('click');
    }
  };

  const goToPrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      navigateToPhoto(sortedPhotos[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < sortedPhotos.length - 1) {
      navigateToPhoto(sortedPhotos[currentIndex + 1]);
    }
  };

  const hasPrevious = getCurrentIndex() > 0;
  const hasNext = getCurrentIndex() < sortedPhotos.length - 1;

  const handleMapClick = () => {
    setSelectedLocation(null);
  };

  return (
    <div ref={mapContainerRef} className="w-full h-full relative" style={{ zIndex: 0 }}>
      <style>{`
        .leaflet-control-zoom {
          margin-right: 10px !important;
          margin-top: calc(3.5rem + 10px) !important;
        }
        .leaflet-left {
          left: auto !important;
          right: 0 !important;
        }
      `}</style>

      {/* Title pill at top center */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-2"
        style={{
          top: 'calc(3.5rem + 1rem)',
          zIndex: 1000
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800">{travelData.Title}</h2>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={6}
        className="w-full h-full"
        style={{ zIndex: 0 }}
      >
        <BoundsUpdater bounds={bounds} />
        <MapClickHandler onMapClick={handleMapClick} />
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

        {allPhotos.map((location) => {
          const markerKey = `${location.Chapter}-${location.Photo}`;
          return (
            <MarkerWithClick
              key={markerKey}
              markerRef={(ref) => {
                if (ref) {
                  markerRefs.current[markerKey] = ref;
                }
              }}
              position={[location.Latitude, location.Longitude]}
              icon={createChapterIcon(location.Chapter)}
              location={location}
              imagePath={imagePath}
              onMarkerClick={setSelectedLocation}
            />
          );
        })}

      </MapContainer>

      {/* Chapter legend - permanent, same position as info panel */}
      {!selectedLocation && (
        <div
          className="absolute bg-white rounded-2xl shadow-2xl portrait:bottom-4 portrait:left-4 portrait:right-4 portrait:h-1/3 portrait:flex-row landscape:left-4 landscape:bottom-4 landscape:w-1/4 landscape:flex-col landscape:top-[4.5rem]"
          style={{
            zIndex: 1000,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            overflow: 'auto'
          }}
        >
          <h3 className="font-bold text-xl mb-2">Chapters</h3>
          {chapters.map((chapter) => (
            <div key={chapter.Chapter} className="flex items-start gap-3 mb-3">
              {/* Colored marker icon */}
              <div
                style={{
                  width: '25px',
                  height: '41px',
                  flexShrink: 0
                }}
                dangerouslySetInnerHTML={{
                  __html: `
                    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                      <path fill="${getChapterColor(chapter.Chapter)}" stroke="#fff" stroke-width="2" d="M12.5,0 C5.6,0 0,5.6 0,12.5 C0,19.4 12.5,41 12.5,41 S25,19.4 25,12.5 C25,5.6 19.4,0 12.5,0 Z"/>
                      <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
                    </svg>
                  `
                }}
              />
              {/* Chapter info */}
              <div className="flex-1">
                <p className="font-bold text-md mb-1">{chapter.Chapter}. {chapter.Title}</p>
                <p className="text-xs text-gray-500 mb-1">{chapter.StartDate} to {chapter.EndDate}</p>
                {chapter.Summary && (
                  <p className="text-sm text-gray-600">{chapter.Summary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info panel - responsive: bottom 1/3 on portrait, left 1/4 on landscape */}
      {selectedLocation && (
        <div
          className="absolute bg-white rounded-2xl shadow-2xl portrait:bottom-4 portrait:left-4 portrait:right-4 portrait:h-1/3 portrait:flex-row landscape:left-4 landscape:bottom-4 landscape:w-1/4 landscape:flex-col landscape:top-[4.5rem]"
          style={{
            zIndex: 1000,
            padding: '1rem',
            display: 'flex',
            gap: '1rem'
          }}
        >
          {/* Photo */}
          <div
            className="portrait:h-full portrait:w-auto landscape:w-full landscape:h-auto"
            style={{
              aspectRatio: '1',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <img
              src={`${imagePath}${selectedLocation.FileName.toLowerCase()}`}
              alt={selectedLocation.Title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <h3 className="font-bold text-xl mb-2 text-center">{selectedLocation.Title}</h3>
            <p className="text-md text-gray-600 mb-2 text-center">{formatDate(selectedLocation.DateTime)}</p>
            <p className="text-md text-gray-600 mb-2">{selectedLocation.Summary}</p>
            <p className="text-sm text-gray-500 mt-auto">
              Chapter {selectedLocation.Chapter} • Photo {selectedLocation.Photo} • {formatDate(selectedLocation.DateTime)}
            </p>
          </div>

          {/* Navigation arrows in bottom right */}
          <div className="absolute bottom-3 right-3 flex gap-1 bg-white rounded-full shadow-lg p-1" style={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
            <button
              onClick={goToPrevious}
              disabled={!hasPrevious}
              className={`p-2 rounded-full transition-colors ${
                hasPrevious
                  ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={goToNext}
              disabled={!hasNext}
              className={`p-2 rounded-full transition-colors ${
                hasNext
                  ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelMap;