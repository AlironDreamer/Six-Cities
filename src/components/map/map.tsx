import 'leaflet/dist/leaflet.css';
import {City, Location} from '../../types/offer';
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import useMap from '../../hooks/use-map/useMap';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';
import leaflet, {Marker} from 'leaflet';

type MapProps = {
  className: string;
  city: City;
  locations: Location[];
  selectedLocation?: Location | null | undefined;
  mode?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map = ({ className, city, locations, selectedLocation, mode = 'default' }: MapProps): JSX.Element => {
  const mapRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const map = useMap(mapRef, city);
  const [isMapActive, setMapActive] = useState(false);

  useEffect(() => {
    if (map) {
      if (!isMapActive && mode === 'wide') {
        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.touchZoom.disable();
      } else {
        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
        map.touchZoom.enable();
      }
    }
  }, [map, isMapActive]);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);
      locations.forEach((location) => {
        const marker = new Marker([
          location.latitude,
          location.longitude
        ]);

        marker
          .setIcon (
            selectedLocation !== null && selectedLocation !== undefined && location.latitude === selectedLocation.latitude && location.longitude === selectedLocation.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        markerLayer.clearLayers();
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
      style={{position: 'relative'}}
      onMouseLeave={() => setMapActive(false)}
    >
      {!isMapActive && mode === 'wide' && (
        <div
          className= 'map__wrapper'
          onClick={() => setMapActive(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,10%)',
          }}
        />
      )}
    </section>
  );
};

export default Map;
