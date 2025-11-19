import { useState, useRef, useEffect, useMemo } from 'react';
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
    popupAnchor: [0, -41]
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
const BoundsUpdater = ({ bounds, disabled }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && !disabled) {
      const container = map.getContainer();
      const isLandscape = container.offsetWidth > container.offsetHeight;

      // Use paddingTopLeft to offset the view, accounting for the info panel
      const paddingOptions = isLandscape
        ? { paddingTopLeft: [container.offsetWidth * 0.25, 0], padding: [0, 0], animate: false } // Panel on left (1/4 width), no extra padding
        : { paddingBottomLeft: [0, container.offsetHeight * 0.33], padding: [0, 0], animate: false }; // Panel on bottom (1/3 height), no extra padding

      map.fitBounds(bounds, paddingOptions);
    }
  }, [map, bounds, disabled]);

  return null;
};

// Component to handle marker click events
const MarkerWithClick = ({ position, icon, location, imagePath, onMarkerClick, onImageClick, markerRef }) => {
  const map = useMap();

  const handleClick = (e) => {
    L.DomEvent.stopPropagation(e); // Prevent map click event

    // Center the marker in the map
    map.flyTo(position, map.getZoom(), {
      duration: 0.3
    });

    onMarkerClick(location);
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent marker click event
    onImageClick(location);
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
        interactive={true}
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
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={handleImageClick}
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

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

  // Preload all images
  useEffect(() => {
    if (!imagePath || !travelData?.Chapters) return;

    const imagePromises = [];
    const chapters = travelData.Chapters || [];

    chapters.forEach(chapter => {
      (chapter.Photos || []).forEach(photo => {
        const img = new Image();
        const promise = new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        img.src = `${imagePath}${photo.FileName.toLowerCase()}`;
        imagePromises.push(promise);
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(err => {
        console.error('Error preloading images:', err);
        setImagesLoaded(true); // Continue even if some images fail
      });
  }, [imagePath, travelData]);

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
  const allPhotos = useMemo(() =>
    chapters.flatMap(chapter =>
      (chapter.Photos || []).map(photo => ({
        ...photo,
        ChapterTitle: chapter.Title
      }))
    ), [chapters]
  );

  // Sort by chapter and photo number for sequential order
  const sortedPhotos = useMemo(() =>
    [...allPhotos].sort((a, b) => {
      if (a.Chapter !== b.Chapter) {
        return parseInt(a.Chapter) - parseInt(b.Chapter);
      }
      return parseInt(a.Photo) - parseInt(b.Photo);
    }), [allPhotos]
  );

  // Create path coordinates for polyline - memoized to prevent recalculation
  const pathCoordinates = useMemo(() =>
    sortedPhotos.map(point => [point.Latitude, point.Longitude]),
    [sortedPhotos]
  );

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close fullscreen on Escape
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
        return;
      }

      if (!selectedLocation) return;

      const currentIndex = sortedPhotos.findIndex(
        photo => photo.Chapter === selectedLocation.Chapter && photo.Photo === selectedLocation.Photo
      );

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        navigateToPhoto(sortedPhotos[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < sortedPhotos.length - 1) {
        e.preventDefault();
        navigateToPhoto(sortedPhotos[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLocation, sortedPhotos, fullscreenImage]);

  const goToChapter = (chapterNumber) => {
    // Find the first photo in the chapter
    const firstPhotoInChapter = sortedPhotos.find(photo => photo.Chapter === chapterNumber);
    if (firstPhotoInChapter) {
      navigateToPhoto(firstPhotoInChapter);
    }
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
        <BoundsUpdater bounds={bounds} disabled={selectedLocation !== null} />
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
              dashArray: '10, 10',
              dashOffset: '0'
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
              onImageClick={setFullscreenImage}
            />
          );
        })}

      </MapContainer>

      {/* Chapter legend - permanent, same position as info panel */}
      {!selectedLocation && (
        <div
          className="absolute bg-white/80 rounded-2xl shadow-2xl portrait:bottom-4 portrait:left-4 portrait:right-4 portrait:h-1/3 portrait:flex-row landscape:left-4 landscape:bottom-4 landscape:w-1/4 landscape:flex-col landscape:top-[4.5rem]"
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
            <div key={chapter.Chapter} className="flex items-start gap-3 mb-3 p-2">
              {/* Colored marker icon - clickable */}
              <div
                style={{
                  width: '25px',
                  height: '41px',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
                onClick={() => goToChapter(chapter.Chapter)}
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
                <p
                  className="font-bold text-md mb-1 cursor-pointer hover:text-gray-600 transition-colors"
                  onClick={() => goToChapter(chapter.Chapter)}
                >
                  {chapter.Chapter}. {chapter.Title} ({chapter.nPhotos} locations)
                </p>
                <p className="text-xs text-gray-500 mb-1">{chapter.DateRangeString}</p>
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
          className="absolute bg-white/80 rounded-2xl shadow-2xl portrait:bottom-4 portrait:left-4 portrait:right-4 portrait:h-1/3 portrait:flex-row landscape:left-4 landscape:bottom-4 landscape:w-1/4 landscape:flex-col landscape:top-[4.5rem]"
          style={{
            zIndex: 1000,
            padding: '1rem',
            display: 'flex',
            gap: '1rem'
          }}
        >
          {/* Photo */}
          <div
            className="hidden sm:block portrait:h-full portrait:w-auto landscape:w-full landscape:h-auto"
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
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Title, date, and navigation buttons */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1 sm:text-center">{selectedLocation.Title}</h3>
                <p className="text-md text-gray-600 sm:text-center">{formatDate(selectedLocation.DateTime)}</p>
              </div>
              {/* Navigation buttons - visible on mobile, hidden on larger screens */}
              <div className="flex gap-1 bg-white rounded-full p-1 sm:hidden">
                <button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  className={`p-1.5 rounded-full transition-colors ${
                    hasPrevious
                      ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className={`p-1.5 rounded-full transition-colors ${
                    hasNext
                      ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, overflow: 'auto', marginBottom: '0.5rem', minHeight: 0 }}>
              <p className="text-xs sm:text-base text-gray-600">
                {selectedLocation.Summary}
              </p>
            </div>

            {/* Chapter/Photo info and navigation in pill-shaped container - hidden on mobile */}
            <div
              className="hidden sm:flex items-center shadow-2xl justify-between rounded-full px-4 py-2"
              style={{ backgroundColor: `${getChapterColor(selectedLocation.Chapter)}20` }}
            >
              <p className="text-sm text-gray-700">
                Chapter {selectedLocation.Chapter} • Photo {selectedLocation.Photo}
              </p>
              <div className="flex gap-1 bg-white rounded-full p-1">
                <button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  className={`p-1.5 rounded-full transition-colors ${
                    hasPrevious
                      ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className={`p-1.5 rounded-full transition-colors ${
                    hasNext
                      ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen image modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          style={{ zIndex: 999999 }}
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close button - positioned below the header */}
          <button
            className="absolute right-4 text-white hover:bg-white/20 transition-colors bg-white/10 rounded-full p-3 shadow-xl border-2 border-white/30"
            style={{ zIndex: 1000000, top: 'calc(3.5rem + 1rem)' }}
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
            aria-label="Close fullscreen"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div className="relative max-w-full max-h-full p-4 flex flex-col items-center" style={{ marginTop: 'calc(3.5rem + 1rem)' }}>
            {/* Image */}
            <img
              src={`${imagePath}${fullscreenImage.FileName.toLowerCase()}`}
              alt={fullscreenImage.Title}
              className="max-w-full object-contain"
              style={{ maxHeight: 'calc(100vh - 3.5rem - 2rem - 8rem)' }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image caption */}
            <div className="mt-4 text-white text-center max-w-2xl">
              <h3 className="text-xl font-bold mb-2">{fullscreenImage.Title}</h3>
              <p className="text-sm text-gray-300">{formatDate(fullscreenImage.DateTime)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelMap;