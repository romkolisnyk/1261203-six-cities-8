import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MAP_ICON_SIZE, MAP_ICON_ANCHOR } from '../../const';

type MapProps = {
  offers: Offer[],
  activeOfferId: number,
  city: City,
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

function Map({ offers, activeOfferId, city }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: offer.id === activeOfferId ? currentIcon : defaultIcon,
            },
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  return <section className="cities__map map" ref={mapRef} />;
}

export default Map;
