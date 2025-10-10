import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import TravelMap from '../../components/TravelMap';

const Vanlife = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTravelData = async () => {
      try {
        // Import the metadata.json file
        const response = await import('../../assets/map_data/metadata-vanlife.json');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Header fullWidth={true}/>
      <div className="w-full h-full">
        <TravelMap
          travelData={travelData}
          imagePath="/travel-images/vanlife/"
        />
      </div>
    </div>
  );
};

export default Vanlife;