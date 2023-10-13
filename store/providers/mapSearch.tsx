import { useEffect, useState } from 'react';
import { PlaceData } from '../../definitions';
import { Coordinate, MapSearchContext } from '../contexts/mapSearch';

const MapSearchProvider = ({ children }) => {
  const [stateName, setStateName] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [coordinate, setCoordinate] = useState<Coordinate>(null);
  const [listData, setListData] = useState<PlaceData[]>([]);
  const [selectedData, setSelectedData] = useState<PlaceData>(null);
  const [showDistrictBar, setShowDistrictBar] = useState(false);
  const [searchText, setSearchText] = useState('masjid');
  const [hoveredMarker, setHoveredMarker] = useState<PlaceData>(null);

  const onSetStateName = (s: string) => setStateName(s);
  const onSetDistrict = (d: string) => setDistrict(d);
  const onSetCoordinate = (c: Coordinate) => setCoordinate(c);
  const onSetListData = (l: PlaceData[]) => setListData(l);
  const onSetSelectedData = (s: PlaceData) => setSelectedData(s);
  const onSetNextPageToken = (t: string) => setNextPageToken(t);

  useEffect(() => {
    if (stateName && stateName !== 'Kuala Lumpur') {
      setShowDistrictBar(true);
    } else {
      setShowDistrictBar(false);
    }
  }, [stateName]);

  useEffect(() => {
    if (stateName || district) {
      setSearchText(`at ${district || stateName}`);
    } else {
      setSearchText('masjid');
    }
  }, [stateName, district]);

  const onSetHoveredMarker = (marker: PlaceData, isHovered: boolean) => {
    setHoveredMarker(isHovered ? marker : null);
  };

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
        showDistrictBar,
        searchText,
        hoveredMarker,
        onSetHoveredMarker,
      }}
    >
      {children}
    </MapSearchContext.Provider>
  );
};

export default MapSearchProvider;
