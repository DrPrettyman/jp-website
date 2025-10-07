import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import TravelMap from '../../components/TravelMap';

const Vanlife = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTravelData = async () => {
      try {
        // Import the metadata.json file
        const response = await import('../../assets/map_data/vanlife/metadata.json');
        setTravelData(response.default);
      } catch (error) {
        console.error('Error loading travel data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTravelData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Van Life Journey 2019
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
              Follow our adventure across Europe in 2019, exploring unique locations 
              from the sound mirrors of Denge to the mountains of Andorra.
            </p>
          </div>

          <div className="mb-8">
            <TravelMap 
              travelData={travelData}
              imagePath="/src/assets/map_data/vanlife/"
              height="500px"
              defaultCenter={[48.8566, 2.3522]} // Paris as center of Europe
              defaultZoom={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelData
              .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime))
              .map((location) => (
                <div 
                  key={`${location.Chapter}-${location.Id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img 
                    src={`/src/assets/map_data/vanlife/${location.FileName.toLowerCase()}`}
                    alt={location.Description}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {location.Description.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {new Date(location.DateTime.replace(/:/g, '-').replace(/ /, 'T')).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Chapter {location.Chapter} • Stop {location.Id}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {location.Latitude.toFixed(4)}, {location.Longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vanlife;