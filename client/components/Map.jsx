import React, { useState, useEffect } from 'react';
import mapbox from 'mapbox-gl';

const Map = () => {
  const [longitude, setLongitude] = useState('-74.0060');
  const [latitude, setLatitude] = useState('40.7128');
  const [zoom, setZoom] = useState('12');
  const [style, setStyle] = useState('mapbox://styles/mapbox/outdoors-v11');

  useEffect(() => {
    mapbox.accessToken =
      'pk.eyJ1IjoiaWtqdWRkIiwiYSI6ImNrcWppMTM2ZTA5ODQybm9ieTE5M2J0YTAifQ._eHutyLjit-nTSOpnD-Vmg';

    const map = new mapbox.Map({
      container: 'map',
      style: style,
      center: [longitude, latitude],
      zoom: zoom,
    });
  });

  return (
    <div
      id="map"
      style={{ position: 'absolute', top: 0, bottom: 0, height: '100%', width: '100%', zIndex: -1 }}
    ></div>
  );
};

export default Map;
