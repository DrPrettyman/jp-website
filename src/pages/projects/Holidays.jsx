import React from 'react';
import Layout from '../../components/Layout';
import HolidayMap from '../../components/HolidayMap';
import holidayData from '../../assets/holidays.json';

const HolidayMapProject = () => {
  return (    
          <HolidayMap holidays={holidayData}/>
  )
}

export default HolidayMapProject
