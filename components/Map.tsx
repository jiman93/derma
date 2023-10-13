import React, { useContext, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {} from '../lib/api';
import { MapSearchContext } from '../store/contexts/mapSearch';
import { ActionIcon, Tooltip } from '@mantine/core';
import { PlaceData } from '../definitions';

const Marker = ({ text, lat: _lat, lng: _lng, data, opened }) => {
  const { onSetSelectedData, onSetHoveredMarker } = useContext(MapSearchContext);

  return (
    <Tooltip label={data.name} color="red" opened={opened}>
      <ActionIcon
        variant="filled"
        size="sm"
        color="red"
        radius="xl"
        aria-label="marker"
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={() => onSetSelectedData(data)}
        onMouseEnter={() => onSetHoveredMarker(data, true)}
        onMouseLeave={() => onSetHoveredMarker(data, false)}
      >
        {text}
      </ActionIcon>
    </Tooltip>
  );
};

export default function SimpleMap() {
  const { coordinate, listData, hoveredMarker } = useContext(MapSearchContext);

  const defaultProps = {
    center: {
      lat: 3.1359527,
      lng: 101.7089209,
    },
    zoom: 12,
  };

  return (
    <div style={{ height: '700px  ', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCS2v0NPop4feGMV-ScidfHVz_cY1QQ7gI ' }}
        defaultCenter={defaultProps.center}
        center={coordinate}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        draggable={false}
        options={{ zoomControl: false }}
      >
        {listData.map((marker, index) => (
          <Marker
            key={index}
            lat={marker?.geometry?.location?.lat}
            lng={marker?.geometry?.location?.lng}
            data={marker}
            text={index}
            opened={hoveredMarker === marker}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
