import React from 'react';
import Layout from '../../components/Layout';
import HolidayMap from '../../components/HolidayMap';
import holidayData from '../../assets/holidays.json';

const HolidayMapProject = () => {
  return (    
          // <HolidayMap holidays={holidayData}/>

          <HolidayMap 
            holidays={holidayData}
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-20.0, -52.0, 0],
              scale: 700
            }}
            />
  )
}

export default HolidayMapProject
