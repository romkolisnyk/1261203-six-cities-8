import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MAP_ICON_SIZE, MAP_ICON_ANCHOR } from '../../const';

type MapProps = {
  offers: Offer[],
  activeOfferId: number,
};

const defaultIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [MAP_ICON_SIZE.height, MAP_ICON_SIZE.width],
  iconAnchor: [MAP_ICON_ANCHOR.midPoint, MAP_ICON_ANCHOR.bottomPoint],
});

const currentIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [MAP_ICON_SIZE.height, MAP_ICON_SIZE.width],
  iconAnchor: [MAP_ICON_ANCHOR.midPoint, MAP_ICON_ANCHOR.bottomPoint],
});

function Map({ offers, activeOfferId }: MapProps): JSX.Element {
  const [{ city }] = offers;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach(({ location, id }) => {
        leaflet
          .marker(
            {
              lat: location.latitude,
              lng: location.longitude,
            },
            {
              icon: id === activeOfferId ? currentIcon : defaultIcon,
            },
          )
          .addTo(map);
      });
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, offers, activeOfferId]);

  return <section className="cities__map map" ref={mapRef} />;
}

export default Map;
