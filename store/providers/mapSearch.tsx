import { useState } from 'react';
import { PlaceData } from '../../definitions';
import { Coordinate, MapSearchContext } from '../contexts/mapSearch';

const MapSearchProvider = ({ children }) => {
  const [stateName, setStateName] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [coordinate, setCoordinate] = useState<Coordinate>(null);
  const [listData, setListData] = useState<PlaceData[]>([]);
  const [selectedData, setSelectedData] = useState<PlaceData>(null);

  const onSetStateName = (s: string) => setStateName(s);
  const onSetDistrict = (d: string) => setDistrict(d);
  const onSetCoordinate = (c: Coordinate) => setCoordinate(c);
  const onSetListData = (l: PlaceData[]) => setListData(l);
  const onSetSelectedData = (s: PlaceData) => setSelectedData(s);
  const onSetNextPageToken = (t: string) => setNextPageToken(t);

  return (
    <MapSearchContext.Provider
      value={{
        stateName,
        onSetStateName,
        district,
        onSetDistrict,
        coordinate,
        onSetCoordinate,
        listData,
        onSetListData,
        selectedData,
        onSetSelectedData,
        nextPageToken,
        onSetNextPageToken,
      }}
    >
      {children}
    </MapSearchContext.Provider>
  );
};

export default MapSearchProvider;
