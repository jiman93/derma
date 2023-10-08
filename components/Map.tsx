import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {} from '../lib/api';
import { MapSearchContext } from '../store/contexts/mapSearch';
import { PlaceData } from '../definitions';
import { ActionIcon, HoverCard, Text, Tooltip } from '@mantine/core';

const getInfoWindowString = (place: PlaceData) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(
  5 - Math.floor(place.rating)
)}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.rating)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.user_ratings_total}
      </div>
    </div>`;

const Marker = ({ text, lat: _lat, lng: _lng, data }) => {
  const { onSetSelectedData } = useContext(MapSearchContext);

  return (
    // <HoverCard width={280} shadow="md">
    //   <HoverCard.Target>
    //     <div
    //       style={{
    //         backgroundColor: 'red',
    //         color: 'white',
    //         padding: '5px 10px',
    //         borderRadius: '50%',
    //         display: 'inline-block',
    //         transform: 'translate(-50%, -50%)',
    //       }}
    //     >
    //       {text}
    //     </div>
    //   </HoverCard.Target>
    //   <HoverCard.Dropdown>
    //     <Text size="sm">{data.name}</Text>
    //   </HoverCard.Dropdown>
    // </HoverCard>
    <Tooltip label={data.name} color="red">
      <ActionIcon
        variant="filled"
        size="sm"
        color="red"
        radius="xl"
        aria-label="marker"
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={() => onSetSelectedData(data)}
      >
        {text}
      </ActionIcon>
      {/* <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '50%',
          display: 'inline-block',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {text}
      </div> */}
    </Tooltip>
  );
};

export default function SimpleMap() {
  const { coordinate, listData } = useContext(MapSearchContext);

  const defaultProps = {
    center: {
      lat: 3.1359527,
      lng: 101.7089209,
    },
    zoom: 12,
  };

  const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach((place) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          map,
        })
      );

      infowindows.push(
        new maps.InfoWindow({
          content: getInfoWindowString(place),
        })
      );
    });

    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  return (
    <div style={{ height: '700px  ', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCS2v0NPop4feGMV-ScidfHVz_cY1QQ7gI ' }}
        defaultCenter={defaultProps.center}
        center={coordinate}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
      >
        {listData.map((marker, index) => (
          <Marker
            key={index}
            lat={marker?.geometry?.location?.lat}
            lng={marker?.geometry?.location?.lng}
            data={marker}
            text={index}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
