import {City} from '../../types/offer';
import {MutableRefObject, useEffect, useState} from 'react';
import leaflet, {TileLayer} from 'leaflet';


const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): leaflet.Map | null => {
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    let instance = map;
    if (mapRef.current !== null && map === null) {
      instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer (
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      instance.addLayer(layer);

      setMap(instance);
    }

    return () => {
      if (instance) {
        instance.remove();
        setMap(null);
      }
    };
  }, [mapRef]);

  // Эффект для обновления центра и зума при смене города
  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [city, map]);

  return map;
};

export default useMap;
